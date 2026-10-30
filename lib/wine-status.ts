const wineStatusLabels:Record<string,string>={
 'source-reviewed':'资料已核对',
 'research-draft-english':'English · 首版资料，中文待补',
 'research-draft':'首版资料 · 持续补充',
 current:'现行系列',
 historic:'历史酒款／旧名称',
 'label-dependent':'产区标示依年份／批次',
 archive:'档案酒款 · 当前发行待复核',
 'historic-source-listed':'历史资料收录',
 'vintage-profile':'年份酒款资料',
 'archive-vintage':'历史年份资料',
 'source-listed':'来源资料收录',
 'source-conflict':'来源资料存在差异',
};

export function wineStatusLabel(status:string,lang='zh'){if(lang==='en'&&status==='source-reviewed')return 'Source reviewed';return wineStatusLabels[status]||status}
