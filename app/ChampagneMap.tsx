'use client';

import {useCallback,useEffect,useMemo,useRef,useState,type PointerEvent,type MouseEvent} from 'react';
import {LocateFixed,MapPin,Minus,Plus,Search,X} from 'lucide-react';
import {champagnePlaces,champagneRegions,mapDataSources,type ChampagnePlace} from './champagne-map-data';
import './champagne-map.css';

type View={lat:number;lon:number;zoom:number};
type Pt={x:number;y:number};
type VineFeature={type:'Feature';id?:string|number;geometry:{type:'Polygon'|'MultiPolygon';coordinates:any};properties:Record<string,unknown>};
type VineCollection={type:'FeatureCollection';features:VineFeature[];numberMatched?:number|string};
const clamp=(v:number,a:number,b:number)=>Math.max(a,Math.min(b,v));
const overviewPlaceIds=new Set(['reims','epernay','troyes','bar-sur-seine','les-riceys','montgueux']);
const grandCruCountByRegion=champagnePlaces.filter(p=>p.cru==='Grand Cru').reduce<Record<string,number>>((counts,p)=>{counts[p.region]=(counts[p.region]||0)+1;return counts;},{});
const world=(lat:number,lon:number,z:number)=>{const s=256*2**z;const sin=Math.sin(lat*Math.PI/180);return {x:(lon+180)/360*s,y:(.5-Math.log((1+sin)/(1-sin))/(4*Math.PI))*s};};
const fromWorld=(x:number,y:number,z:number)=>{const s=256*2**z;return {lon:x/s*360-180,lat:Math.atan(Math.sinh(Math.PI*(1-2*y/s)))*180/Math.PI};};

function fitView(width:number,height:number):View{
  const west=3.48,east=4.72,south=47.84,north=49.38;
  const x1=world(0,west,0).x,x2=world(0,east,0).x;
  const y1=world(north,0,0).y,y2=world(south,0,0).y;
  const zoom=clamp(Math.log2(Math.min(width/(x2-x1),height/(y2-y1))*.88),6.5,9.4);
  return {lat:(south+north)/2,lon:(west+east)/2,zoom};
}

function tileLayer(view:View,width:number,height:number){
  const z=Math.ceil(view.zoom),scale=2**(view.zoom-z),center=world(view.lat,view.lon,z);
  const left=center.x-width/(2*scale),top=center.y-height/(2*scale);
  const minX=Math.floor(left/256)-1,maxX=Math.floor((left+width/scale)/256)+1;
  const minY=Math.max(0,Math.floor(top/256)-1),maxY=Math.min(2**z-1,Math.floor((top+height/scale)/256)+1);
  const tiles=[];
  for(let y=minY;y<=maxY;y++)for(let tx=minX;tx<=maxX;tx++){
    const x=((tx%(2**z))+(2**z))%(2**z);
    tiles.push({key:`${z}/${x}/${y}`,url:`https://tile.openstreetmap.org/${z}/${x}/${y}.png`,left:(tx*256-center.x)*scale+width/2,top:(y*256-center.y)*scale+height/2,size:256*scale});
  }
  return {z,scale,center,tiles};
}

function vineyardPath(feature:VineFeature,project:(lat:number,lon:number)=>Pt){
  const rings=feature.geometry.type==='Polygon'?feature.geometry.coordinates:feature.geometry.coordinates.flat();
  return rings.map((ring:any[])=>ring.map(([lon,lat],i)=>{const p=project(lat,lon);return `${i?'L':'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`;}).join(' ')+' Z').join(' ');
}

function vineyardQuery(view:View,width:number,height:number,startIndex=0){
  const z=Math.floor(view.zoom),scale=2**(view.zoom-z),c=world(view.lat,view.lon,z);
  const sw=fromWorld(c.x-width/(2*scale),c.y+height/(2*scale),z),ne=fromWorld(c.x+width/(2*scale),c.y-height/(2*scale),z);
  const xml=`<fes:Filter xmlns:fes="http://www.opengis.net/fes/2.0" xmlns:gml="http://www.opengis.net/gml/3.2"><fes:And><fes:PropertyIsEqualTo><fes:ValueReference>nature</fes:ValueReference><fes:Literal>Vigne</fes:Literal></fes:PropertyIsEqualTo><fes:BBOX><fes:ValueReference>geometrie</fes:ValueReference><gml:Envelope srsName="urn:ogc:def:crs:OGC:1.3:CRS84"><gml:lowerCorner>${sw.lon} ${sw.lat}</gml:lowerCorner><gml:upperCorner>${ne.lon} ${ne.lat}</gml:upperCorner></gml:Envelope></fes:BBOX></fes:And></fes:Filter>`;
  const params=new URLSearchParams({SERVICE:'WFS',VERSION:'2.0.0',REQUEST:'GetFeature',TYPENAMES:'BDTOPO_V3:zone_de_vegetation',COUNT:'2000',STARTINDEX:String(startIndex),OUTPUTFORMAT:'application/json',FILTER:xml});
  return `https://data.geopf.fr/wfs/ows?${params.toString()}`;
}

export function ChampagneMap(){
  const mapRef=useRef<HTMLDivElement>(null),pointers=useRef(new Map<number,Pt>()),pinchStart=useRef<{distance:number;zoom:number;mid:Pt;geo:{lat:number;lon:number}}|null>(null),dragged=useRef(false),tapTarget=useRef<string|null>(null);
  const [view,setView]=useState<View>({lat:48.66,lon:4.12,zoom:7.3});
  const [size,setSize]=useState({width:1000,height:620});
  const [selected,setSelected]=useState<ChampagnePlace|null>(null),[selectedVineyard,setSelectedVineyard]=useState<VineFeature|null>(null),[vineyards,setVineyards]=useState<VineFeature[]>([]),[vineStatus,setVineStatus]=useState<'overview'|'loading'|'ready'|'error'>('overview'),[query,setQuery]=useState(''),[showPlaces,setShowPlaces]=useState(true),[showRegions,setShowRegions]=useState(true),[showVineyards,setShowVineyards]=useState(true),[searchOpen,setSearchOpen]=useState(false),[tileError,setTileError]=useState(false);
  const touchPointers=pointers.current;

  useEffect(()=>{
    const el=mapRef.current;if(!el)return;
    const ro=new ResizeObserver(entries=>{const r=entries[0]?.contentRect;if(r?.width&&r?.height){setSize({width:r.width,height:r.height});setView(v=>v.zoom===7.3?fitView(r.width,r.height):v);}});
    ro.observe(el);return()=>ro.disconnect();
  },[]);

  const layer=useMemo(()=>tileLayer(view,size.width,size.height),[view,size]);
  const project=useCallback((lat:number,lon:number)=>{const p=world(lat,lon,layer.z);return {x:(p.x-layer.center.x)*layer.scale+size.width/2,y:(p.y-layer.center.y)*layer.scale+size.height/2};},[layer,size]);
  useEffect(()=>{
    if(!showVineyards||view.zoom<11.7){setVineStatus('overview');setVineyards([]);return;}
    const controller=new AbortController();setVineStatus('loading');
    const timer=window.setTimeout(async()=>{
      try{
        const all:VineFeature[]=[];let offset=0,matched=Infinity;
        do{
          const response=await fetch(vineyardQuery(view,size.width,size.height,offset),{signal:controller.signal,headers:{Accept:'application/geo+json, application/json'}});
          if(!response.ok)throw new Error(`WFS ${response.status}`);
          const page=await response.json() as VineCollection;const features=page.features||[];all.push(...features);
          if(page.numberMatched!==undefined&&page.numberMatched!=='unknown')matched=Number(page.numberMatched);
          offset+=features.length;
          if(controller.signal.aborted)return;
          setVineyards(all.slice());
          if(!features.length||offset>=matched||features.length<2000||offset>=8000)break;
        }while(true);
        if(!controller.signal.aborted)setVineStatus('ready');
      }catch(e){if((e as Error).name!=='AbortError'){setVineStatus('error');setVineyards([]);}}
    },380);
    return()=>{window.clearTimeout(timer);controller.abort();};
  },[view.lat,view.lon,view.zoom,size.width,size.height,showVineyards]);
  const zoomTo=(zoom:number,at?:Pt)=>{
    const target=clamp(zoom,6,17),rect=mapRef.current?.getBoundingClientRect();if(!rect)return;
    if(!at){setView(v=>({...v,zoom:target}));return;}
    const z0=Math.floor(view.zoom),s0=2**(view.zoom-z0),before=world(view.lat,view.lon,z0);
    const anchor=fromWorld(before.x+(at.x-size.width/2)/s0,before.y+(at.y-size.height/2)/s0,z0);
    const z1=Math.floor(target),s1=2**(target-z1),a=world(anchor.lat,anchor.lon,z1);
    const nextCenter=fromWorld(a.x-(at.x-size.width/2)/s1,a.y-(at.y-size.height/2)/s1,z1);
    setView({...nextCenter,zoom:target});
  };
  const reset=()=>{setSelected(null);setSelectedVineyard(null);setQuery('');setSearchOpen(false);setView(fitView(size.width,size.height));};
  const choose=(place:ChampagnePlace)=>{setSelected(place);setView(v=>({...v,lat:place.lat,lon:place.lon,zoom:Math.max(v.zoom,11.7)}));};
  const matches=champagnePlaces.filter(p=>`${p.name} ${p.zh} ${p.region}`.toLowerCase().includes(query.trim().toLowerCase())).slice(0,6);
  const markerPlaces=view.zoom<9.7?champagnePlaces.filter(p=>overviewPlaceIds.has(p.id)):champagnePlaces;

  const onDown=(e:PointerEvent<HTMLDivElement>)=>{
    if(e.pointerType==='mouse'&&e.button!==0)return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const r=e.currentTarget.getBoundingClientRect(),pt={x:e.clientX-r.left,y:e.clientY-r.top};
    if(touchPointers.size===0){const feature=(e.target as Element).closest?.('[data-place-id],[data-vine-id]') as SVGElement|null;tapTarget.current=feature?.dataset.placeId?`place:${feature.dataset.placeId}`:feature?.dataset.vineId?`vine:${feature.dataset.vineId}`:null;dragged.current=false;}else{tapTarget.current=null;dragged.current=true;}
    touchPointers.set(e.pointerId,pt);
    if(touchPointers.size===2){const values=[...touchPointers.values()],mid={x:(values[0].x+values[1].x)/2,y:(values[0].y+values[1].y)/2};const z=Math.floor(view.zoom),s=2**(view.zoom-z),c=world(view.lat,view.lon,z);pinchStart.current={distance:Math.hypot(values[0].x-values[1].x,values[0].y-values[1].y),zoom:view.zoom,mid,geo:fromWorld(c.x+(mid.x-size.width/2)/s,c.y+(mid.y-size.height/2)/s,z)};dragged.current=true;}
  };
  const onMove=(e:PointerEvent<HTMLDivElement>)=>{
    if(!touchPointers.has(e.pointerId))return;
    const r=e.currentTarget.getBoundingClientRect(),pt={x:e.clientX-r.left,y:e.clientY-r.top},prev=touchPointers.get(e.pointerId)!;touchPointers.set(e.pointerId,pt);
    if(touchPointers.size===1){const dx=pt.x-prev.x,dy=pt.y-prev.y;if(Math.hypot(dx,dy)>8)dragged.current=true;const z=Math.floor(view.zoom),scale=2**(view.zoom-z),c=world(view.lat,view.lon,z);setView({...fromWorld(c.x-dx/scale,c.y-dy/scale,z),zoom:view.zoom});}
    else if(touchPointers.size>=2&&pinchStart.current){const pts=[...touchPointers.values()],mid={x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2},distance=Math.hypot(pts[0].x-pts[1].x,pts[0].y-pts[1].y),target=clamp(pinchStart.current.zoom+Math.log2(distance/pinchStart.current.distance),6,17),z=Math.floor(target),scale=2**(target-z),anchor=world(pinchStart.current.geo.lat,pinchStart.current.geo.lon,z);setView({...fromWorld(anchor.x-(mid.x-size.width/2)/scale,anchor.y-(mid.y-size.height/2)/scale,z),zoom:target});dragged.current=true;}
  };
  const onUp=(e:PointerEvent<HTMLDivElement>)=>{const endingLastPointer=touchPointers.size===1;touchPointers.delete(e.pointerId);if(endingLastPointer&&!dragged.current&&tapTarget.current){if(tapTarget.current.startsWith('place:')){const place=champagnePlaces.find(p=>p.id===tapTarget.current?.slice(6));if(place){setSelected(place);setSelectedVineyard(null);}}else{const vine=vineyards.find(f=>String(f.id??f.properties.cleabs)===tapTarget.current?.slice(5));if(vine){setSelectedVineyard(vine);setSelected(null);}}}if(touchPointers.size<2)pinchStart.current=null;if(touchPointers.size===0)tapTarget.current=null;};
  const handlePlace=(e:MouseEvent,place:ChampagnePlace)=>{e.stopPropagation();if(dragged.current)return;setSelected(place);setSelectedVineyard(null);};

  return <section className="champagne-atlas" aria-label="Champagne interactive wine map">
    <div className="champagne-map-heading"><div><span className="eyebrow">SOMM100 · WINE ATLAS · FRANCE</span><h2>Champagne</h2><p>从四大主要种植区读到周边产区，再放大到村镇与葡萄园覆盖。拖动、滚轮、双击或双指缩放。</p></div><a href="#library?type=region&id=fr-champagne">打开 Champagne 产区资料 ↗</a></div>
    <div className="champagne-map-toolbar">
      <div className="champagne-search"><Search size={16}/><input aria-label="搜索香槟村镇" value={query} placeholder="搜索村镇 / village" onFocus={()=>setSearchOpen(true)} onChange={e=>{setQuery(e.target.value);setSearchOpen(true);}} onKeyDown={e=>{if(e.key==='Enter'&&matches[0]){choose(matches[0]);setQuery(matches[0].name);setSearchOpen(false);}}}/>{query&&<button aria-label="清空搜索" onClick={()=>{setQuery('');setSearchOpen(false);}}><X size={15}/></button>}
        {searchOpen&&query&&<div className="champagne-search-results">{matches.length?matches.map(p=><button key={p.id} onClick={()=>{choose(p);setQuery(p.name);setSearchOpen(false);}}><span>{p.name}<small>{p.zh}</small></span><em>{p.region}</em></button>):<p>没有匹配的地点</p>}</div>}
      </div>
      <div className="champagne-map-actions"><button onClick={()=>zoomTo(view.zoom-.6)} aria-label="缩小地图"><Minus size={16}/></button><span>{Math.round(2**(view.zoom-7)*100)}%</span><button onClick={()=>zoomTo(view.zoom+.6)} aria-label="放大地图"><Plus size={16}/></button><button className="fit" onClick={reset}><LocateFixed size={15}/><span>全览</span></button></div>
    </div>
    <div className="champagne-map-shell">
      <div className="champagne-map-canvas" ref={mapRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onDoubleClick={e=>{e.preventDefault();const r=e.currentTarget.getBoundingClientRect();zoomTo(view.zoom+1,{x:e.clientX-r.left,y:e.clientY-r.top});}} onWheel={e=>{e.preventDefault();const r=e.currentTarget.getBoundingClientRect();zoomTo(view.zoom+(e.deltaY<0?.35:-.35),{x:e.clientX-r.left,y:e.clientY-r.top});}} onClick={()=>{if(searchOpen)setSearchOpen(false);}}>
        <div className="champagne-tiles" aria-hidden="true">{layer.tiles.map(t=><img key={t.key} src={t.url} alt="" draggable="false" onError={()=>setTileError(true)} style={{left:t.left,top:t.top,width:t.size,height:t.size}}/>)}</div>
        <svg className={`champagne-overlay ${view.zoom<11.25?'zoom-wide':'zoom-detail'}`} width={size.width} height={size.height} viewBox={`0 0 ${size.width} ${size.height}`} aria-label="Champagne 葡萄酒地图">
          {showRegions&&view.zoom<10.7&&champagneRegions.filter(r=>r.type==='major'||view.zoom<9.35).map(r=>{const sector=r.type==='sector',w=sector?144:170,h=sector?36:44,p=project(r.lat,r.lon),rawDx=r.labelDx||0,rawDy=r.labelDy||0,labelX=clamp(p.x+rawDx,w/2+7,size.width-w/2-7),labelY=clamp(p.y+rawDy,h/2+8,size.height-h/2-8),dx=labelX-p.x,dy=labelY-p.y,count=grandCruCountByRegion[r.id]||0,endX=dx>0?-w/2:dx<0?w/2:0,endY=dy>0?-h/2:dy<0?h/2:0;return <g key={r.id} className={`champagne-region-tag ${sector?'sector':''}`} transform={`translate(${labelX},${labelY})`}><path className="region-leader" d={`M${-dx},${-dy} L${endX},${endY}`}/><circle className="region-anchor" cx={-dx} cy={-dy} r="3"/><rect x={-w/2} y={-h/2} width={w} height={h} rx="7"/><text textAnchor="middle" y={sector?'-2':'-9'} className="region-name">{r.id}</text><text textAnchor="middle" y={sector?'9':'3'} className="region-grape">{sector?r.zh:r.grape}</text>{count>0&&<text textAnchor="middle" y="15" className="region-count">{count} Grand Cru villages</text>}</g>;})}
          {showVineyards&&vineyards.map((feature,i)=>{const id=String(feature.id??feature.properties.cleabs??i),d=vineyardPath(feature,project);return <path key={id} data-vine-id={id} className={`champagne-vineyard ${String(selectedVineyard?.id??selectedVineyard?.properties.cleabs)===id?'active':''}`} d={d} fillRule="evenodd" onClick={e=>{e.stopPropagation();if(!dragged.current){setSelectedVineyard(feature);setSelected(null);}}} aria-label="IGN mapped vineyard area"/>;})}
          {showPlaces&&markerPlaces.map(p=>{const at=project(p.lat,p.lon),active=selected?.id===p.id;return <g key={p.id} data-place-id={p.id} transform={`translate(${at.x},${at.y})`} className={`champagne-place ${active?'active':''}`} onClick={e=>handlePlace(e,p)} role="button" tabIndex={0} aria-label={`${p.name}, ${p.zh}, ${p.cru||p.region}`} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(p);}}}><circle className="marker-halo" r={p.cru==='Grand Cru'?6:4.5}/><circle className="marker-dot" r={p.cru==='Grand Cru'?2.8:2.2}/><text x="7" y="3" className="place-label">{p.name}</text></g>;})}
        </svg>
        {tileError&&<div className="champagne-tile-error">地图底图暂时无法连接；地名图层仍可查看。<button onClick={()=>setTileError(false)}>知道了</button></div>}
        {showPlaces&&<div className="champagne-map-legend"><span><i className="legend-grand"/> Grand Cru</span><span><i/>村镇定位</span>{showVineyards&&view.zoom>=11.7&&<span><i className="legend-vine"/>IGN 葡萄园覆盖</span>}</div>}
        {showVineyards&&<div className="champagne-vine-status">{view.zoom<11.7?'放大村镇地图以查看 IGN 葡萄园覆盖':vineStatus==='loading'?'正在载入 IGN 葡萄园几何…':vineStatus==='error'?'葡萄园图层暂时无法载入':`${vineyards.length.toLocaleString()} 处地图葡萄园覆盖`}</div>}
        <div className="champagne-map-attribution">底图 © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> · 葡萄园 © <a href="https://geoservices.ign.fr/bdtopo" target="_blank" rel="noreferrer">IGN BD TOPO</a></div>
      </div>
      <aside className="champagne-map-side">
        <div className="champagne-map-side-title"><div><span className="eyebrow">MAP LAYERS</span><h3>地图图层</h3></div><MapPin size={18}/></div>
        <label className="champagne-layer-option"><input type="checkbox" checked={showRegions} onChange={e=>setShowRegions(e.target.checked)}/><span><b>种植区与特色产区</b><small>四个主要区域 + 三个补充种植区；标注是定位点，不是边界</small></span></label>
        <label className="champagne-layer-option"><input type="checkbox" checked={showPlaces} onChange={e=>setShowPlaces(e.target.checked)}/><span><b>村镇与传统分级</b><small>显示已核验的重点村镇；点位不是葡萄园地块</small></span></label>
        <label className="champagne-layer-option"><input type="checkbox" checked={showVineyards} onChange={e=>setShowVineyards(e.target.checked)}/><span><b>葡萄园地表覆盖</b><small>放大后显示 IGN BD TOPO 的 Vigne 几何，不是法定地块</small></span></label>
        <div className="champagne-side-divider"/>
        <div className="champagne-map-facts"><span><b>34,300 ha</b><small>葡萄园面积</small></span><span><b>319 crus</b><small>法定种植区村镇</small></span><span><b>280,000</b><small>葡萄园地块</small></span></div>
        <div className="champagne-grape-key"><span>Chardonnay</span><span>Pinot Noir</span><span>Meunier</span></div>
        <span className="eyebrow">FOUR MAIN REGIONS</span>
        <div className="champagne-region-list">{champagneRegions.filter(r=>r.type==='major').map(r=><button key={r.id} title={r.note} onClick={()=>{setView(v=>({...v,lat:r.lat,lon:r.lon,zoom:9.1}));setSelected(null);}}><span>{r.zh}<small>{r.id}</small></span><em>{r.grape.split(' · ')[0]}</em></button>)}</div>
        <span className="eyebrow">OTHER VINEYARD SECTORS</span>
        <div className="champagne-region-list secondary">{champagneRegions.filter(r=>r.type==='sector').map(r=><button key={r.id} title={r.note} onClick={()=>{setView(v=>({...v,lat:r.lat,lon:r.lon,zoom:9.1}));setSelected(null);}}><span>{r.zh}<small>{r.id}</small></span><em>{r.grape.split(' · ')[0]}</em></button>)}</div>
        <div className="champagne-map-footnote">葡萄园层仅表示 IGN 地形数据库记录的葡萄园覆盖，几何精度和采集方法因记录而异。村镇点用于定位；若历史村名已并入新 commune，则为近似位置。它们都不是 cadastral 土地权属线，也不能证明 AOC 法定资格。</div>
      </aside>
      {selected&&<div className="champagne-place-card" role="dialog" aria-label={`${selected.name} map details`}><button className="card-close" onClick={()=>setSelected(null)} aria-label="关闭地点卡片"><X size={17}/></button><span className={`champagne-cru-tag ${selected.cru==='Grand Cru'?'grand':''}`}>{selected.cru||selected.region}</span><h3>{selected.name}</h3><p className="place-translation">{selected.zh} · {selected.region}</p><p>{selected.note}</p>{selected.grapes&&<div className="grape-note"><span>区域常见品种参考</span><b>{selected.grapes}</b></div>}<div className="place-card-actions"><a href={selected.source} target="_blank" rel="noreferrer">查看地图资料来源 ↗</a><a href="#library?type=region&id=fr-champagne">SOMM100 产区知识 ↗</a></div></div>}
      {selectedVineyard&&<div className="champagne-place-card vineyard-card" role="dialog" aria-label="IGN 葡萄园覆盖记录"><button className="card-close" onClick={()=>setSelectedVineyard(null)} aria-label="关闭葡萄园卡片"><X size={17}/></button><span className="champagne-cru-tag vineyard-tag">IGN BD TOPO · NATURE: VIGNE</span><h3>地图记录的葡萄园覆盖</h3><p>记录编号：{String(selectedVineyard.properties.cleabs??selectedVineyard.id??'—')}</p><dl><dt>平面定位精度</dt><dd>{String(selectedVineyard.properties.precision_planimetrique??'未提供')} 米</dd><dt>采集方式</dt><dd>{String(selectedVineyard.properties.methode_d_acquisition_planimetrique??'未提供')}</dd><dt>记录创建日期</dt><dd>{String(selectedVineyard.properties.date_creation??'未提供')}</dd></dl><p className="vineyard-limit">这表示地形数据库中的葡萄园覆盖范围，不是地籍产权界线、单个葡萄行或 INAO 法定 AOC 地块界线。</p><div className="place-card-actions"><a href="https://geoservices.ign.fr/bdtopo" target="_blank" rel="noreferrer">IGN BD TOPO 数据说明 ↗</a><a href="https://www.inao.gouv.fr/en/geographic-data" target="_blank" rel="noreferrer">INAO 法定地理数据 ↗</a></div></div>}
    </div>
    <div className="champagne-data-note"><b>读图说明</b><span>四大种植区标签为教学定位，非边界线。IGN 葡萄园覆盖按地图视野实时加载；缩放到村镇级后可点击查看具体几何的精度与采集方法。它不等于地籍地块或法定 AOC 边界。底图使用 OpenStreetMap，专题葡萄园层来自法国 IGN BD TOPO（Licence Ouverte 2.0）公开 WFS。</span><a href={mapDataSources.champagne} target="_blank" rel="noreferrer" className="official-source">香槟行业官方产区说明 ↗</a><a href={mapDataSources.inao} target="_blank" rel="noreferrer">INAO 法定地理数据说明 ↗</a></div>
  </section>;
}
