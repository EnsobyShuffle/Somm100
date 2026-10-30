export const defaultSettings = {goalMinutes:20,reminderEnabled:false,reminderTime:'20:30',reminderDays:[1,2,3,4,5,6,0],fontScale:'normal',defaultDifficulty:'all'};
export function chinaDay(date=new Date()){return new Date(date.getTime()+8*3600000).toISOString().slice(0,10)}
export function previousDay(day:string){return new Date(Date.parse(day+'T00:00:00Z')-86400000).toISOString().slice(0,10)}
export function streakFor(days:string[],today=chinaDay()){
 const set=new Set(days);let cursor=set.has(today)?today:previousDay(today),streak=0;
 while(set.has(cursor)){streak++;cursor=previousDay(cursor)}return streak;
}
export function validateSettings(input:any){
 if(!input||![10,15,20,30,45,60].includes(input.goalMinutes)||typeof input.reminderEnabled!=='boolean'||!/^([01]\d|2[0-3]):[0-5]\d$/.test(input.reminderTime)||!Array.isArray(input.reminderDays)||!input.reminderDays.length||input.reminderDays.some((x:any)=>!Number.isInteger(x)||x<0||x>6)||!['normal','large'].includes(input.fontScale)||!['all','Intro','CS','AS','MS'].includes(input.defaultDifficulty))throw Error('请检查学习设置');
 return {goalMinutes:input.goalMinutes,reminderEnabled:input.reminderEnabled,reminderTime:input.reminderTime,reminderDays:[...new Set(input.reminderDays)] as number[],fontScale:input.fontScale,defaultDifficulty:input.defaultDifficulty};
}
export function validateVideo(input:any){
 if(typeof input?.title!=='string'||!input.title.trim()||input.title.length>120||typeof input.url!=='string'||input.url.length>1200)throw Error('请填写视频标题与链接');
 let url:URL;try{url=new URL(input.url)}catch{throw Error('请输入完整的视频链接')}
 const hosts=['bilibili.com','www.bilibili.com','m.bilibili.com','b23.tv','channels.weixin.qq.com','mp.weixin.qq.com','weixin.qq.com'];
 if(url.protocol!=='https:'||!hosts.includes(url.hostname)||url.username||url.password)throw Error('仅支持 B 站或微信的 HTTPS 原始链接');
 const topic=['viticulture','vinification','tasting','service','regions','grape_varieties'].includes(input.topic)?input.topic:'regions';
 return {ownership:input.ownership==='own'?'own':'external',title:input.title.trim(),url:url.href,topic,platform:url.hostname.includes('bili')||url.hostname==='b23.tv'?'Bilibili':'微信视频号 / 微信',creator:typeof input.creator==='string'?input.creator.slice(0,80):''};
}
export function reminderCalendar(settings:typeof defaultSettings,now=new Date()){
 const s=validateSettings(settings);let day=chinaDay(now);const time=s.reminderTime.replace(':','')+'00';
 for(let i=0;i<8;i++){
   const dt=new Date(day+'T'+s.reminderTime+':00+08:00');
   if(dt>now&&s.reminderDays.includes(new Date(day+'T12:00:00Z').getUTCDay()))break;
   day=new Date(Date.parse(day+'T00:00:00Z')+86400000).toISOString().slice(0,10);
 }
 const codes=['SU','MO','TU','WE','TH','FR','SA'];
 return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SOMM100//Learning Reminder//ZH','CALSCALE:GREGORIAN','BEGIN:VTIMEZONE','TZID:Asia/Shanghai','BEGIN:STANDARD','DTSTART:19700101T000000','TZOFFSETFROM:+0800','TZOFFSETTO:+0800','TZNAME:CST','END:STANDARD','END:VTIMEZONE','BEGIN:VEVENT','UID:somm100-study-reminder@somm100.local','DTSTAMP:'+now.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,''),'DTSTART;TZID=Asia/Shanghai:'+day.replace(/-/g,'')+'T'+time,'DURATION:PT'+s.goalMinutes+'M','RRULE:FREQ=WEEKLY;BYDAY='+s.reminderDays.map(d=>codes[d]).join(','),'SUMMARY:SOMM100 · 学习时间','DESCRIPTION:今天留一点时间学习葡萄酒。回到 SOMM100 阅读或练几道题。','BEGIN:VALARM','TRIGGER:PT0M','ACTION:DISPLAY','DESCRIPTION:SOMM100 学习提醒','END:VALARM','END:VEVENT','END:VCALENDAR',''].map(line=>{let folded='',length=0;for(const c of line){const size=new TextEncoder().encode(c).length;if(length+size>75){folded+='\r\n ';length=1}folded+=c;length+=size}return folded}).join('\r\n');
}
