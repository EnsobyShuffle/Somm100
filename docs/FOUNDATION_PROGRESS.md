# Foundation · 2026-11-15 · Day 1 从葡萄的种类开始

基线 `9223f4b1c34001fff9f6666ecdae61724095c952`，分支 `migration/tencent-somm100`。核对当前源码、迁移说明、前轮检查点与 Henry 对预习开头的修正。

- `app/FoundationDayOneGuide.tsx` 把「葡萄的种类」放到 Day 1 清单首位，原「葡萄的结构」接在第二项。以欧洲葡萄种、霞多丽、黑皮诺解释种与栽培品种，再用鲜食／酿酒、浅色／深色说明其他分类角度。首项有可展开自查和两篇既有公众号导读，复用原链接和推荐理由。直接进入 `#foundation-prep-grape-types` 会打开预习视图和首项，答案保持折叠。原 10 个知识点、课堂复习单元 ID、4／8 周和本机记录继续沿用。
- 依据 [D1–D2 清单](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd) 的 D1-01、[课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)，用 [勃艮第葡萄酒行业协会](https://www.bourgogne-wines.com/wine-and-terroir/our-grape-varietals-our-colors/pinot-noir-and-chardonnay-the-bourgogne-region-s-two-noble-grape-varietals,2475,9265.html) 核对霞多丽和黑皮诺示例。旧 Chapter 00 仍为已停用原型。招生信息沿用已核字段，未修改。
- D1 现有 11 个预习主题、10 节复习、25 题、9 案例。D2 现有 9 个品种、6 个法国专题、42 题、9 案例。D3 现有 13 节、30 题、10 案例。D4 现有 15 节、45 题、13 案例。D1–D4 是授课阶段，逐日分时和原课件仍待取得。D5 为考核，已核五城日期，分配与细则待确认。第22期无 D6 面授，游学另排。
- 457 文件的 CloudBase 构建及 87 项 Foundation 单测通过。整页检查覆盖首两项顺序、折叠自查、原文链接、本机记录；两个部署路径下的首项直达与原有 50 次入口检查、备份恢复通过。11 月 15 日正式专注页 HTML 哈希仍为 `331577fa5f9d657838c9360f36416098f6bc574eba2d7325ee45898e720641c1`，未取得上海 CloudBase 现有应用的授权发布通路或本版回执。手机实机、公众号内阅读和线上验收仍待。保留 `[skip netlify]` 与 `ignore = "exit 0"`。
- 下一断点：沿 Day 1 清单检查概念到自查和延伸阅读的连贯性及手机体验。取得正式课件后再核对具体面授时段。

---

# Foundation · 2026-11-15 · Day 1 知识清单与独立预习视图

基线 `cb92c25204c7aa9a8997ac10d098e2a5330cb209`，分支 `migration/tencent-somm100`。读取了当前源码、来源表、迁移说明及前轮检查点。最新要求为先显示 Day 1 知识清单，逐项带学员阅读和练习，预习页仅显示课前内容。

- `app/FoundationDayOneGuide.tsx` 复用 10 个既有 D1 单元，按稳定单元 ID 对接自查、查阅讲解、站内概念、7 篇公众号原文和 2 个已收入课程的官方视频。两个视频分别用于葡萄生长周期和比较果皮分离的时点。本轮读回官方视频页，未验证微信内播放或公众号原文。
- App 的课前预习按钮及课程首页原有 `#foundation-study-title` 都打开同一预习视图。班期、报名、课间复习和考核在课程总览可访问。4／8 周及其记录继续复用原逻辑，切换视图保留已挂载状态。
- 教学来源包括 [D1–D2 知识提要清单](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)、[课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)与[预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。复核蓝图与旧 Chapter 00 停用标记。Notion 检索「第22期 分时课表」仅取得模板等资料。报名资料延用现有已核实字段。按 Henry 最新口径，D1–D4 授课，D5 考核，第22期没有 D6 面授，游学另排。具体时段、考核分配与原课件仍待核。
- D1 现有 10 节／25 题／9 案例，另接预习知识清单。D2 现有 9 个品种＋6 个法国专题／42 题／9 案例。D3 现有 13 节／30 题／10 案例。D4 现有 15 节／45 题／13 案例。D2–D4 的数字为站内复习资料，不代表已核实当期教学时段。
- CloudBase 构建 457 个文件。Foundation 单测 87／87、整页交互、50 次相对路径入口定位、本机资料恢复、课程自测流程通过。全仓 113／118，5 个既有失败已在基线复现。桌面 DOM 检查通过，手机实机及正式站验收待做。11 月 15 日回读正式招生页仍为旧版本，未取得现有上海 CloudBase 的授权发布通路或回执。保留 `[skip netlify]` 和 `ignore = "exit 0"`。
- 下一断点：从 Day 1 清单检查每个展开项在手机的实际阅读体验，再依据可靠来源补齐 D2–D4 的知识点对应资料。发布后核对网页 App 和静态课程页两个入口。

---

# Foundation · 2026-11-14 · 团队酒单交接直达

基线 `d31413676150a27b2963d278764c62c54da7f71e`，分支 `migration/tencent-somm100`。已读当前源码、迁移说明、来源表和上轮检查点，远端基线一致。

- **交付**。`cloudbase/course.html` 和 `app/FoundationPage.tsx` 为既有团队酒单交接案例新增入口。打开时展开团队酒单和交接题两层，聚焦题目标题，参考答案仍折叠。原案例、复核入口和浏览器本机学习记录均保留。案例两张清单数量依据[第 22 期招生正文第 7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，重叠规则仍待确认。
- **课表**。复核产品蓝图、旧 Chapter 00 停用标记、现行课前框架、Guided Learning、D1–D2 清单、预习路径及 WPS／有道台账。D1 10 节／25 题／9 案例，D2 9 个品种＋6 个法国专题／42 题／9 案例，D3 13 节／30 题／10 案例，D4 15 节／45 题／13 案例。对应当期面授主题待逐日核对。D5 五城日期已核，分时课表、考核分配与讲师原课件待取得。第 22 期共五天面授，2027 年 3 月 14–17 日另排游学。
- **验证与发布**。CloudBase 构建、93 项回归、50 次入口定位、新入口两层展开和答案折叠通过。候选专注页 `foundation-DvHlKFpN.js`，共享模块 `FoundationPage-CkoMTLLt.js`。11 月 14 日正式站三个入口与上轮一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。仍待现有上海 CloudBase `somm100` 的 `/somm100` 授权通路或 WorkBuddy 回执，再验收正式站交互、手机实机及微信原文。

---

# Foundation · 2026-11-14 · 游学观察笔记示例

基线 `d926a1efa0bfb5cbca202066d4e730d4c25a62f9`，分支 `migration/tencent-somm100`。从权威分支读回源码、迁移说明、来源表和上轮检查点，远端基线一致。

- **交付**。`app/FoundationCohort.js` 在原游学观察练习下加入原创折叠示例。用模拟霞多丽参访记录示范如何分别记录葡萄园、酒窖、杯中观察，以及怎样请同伴核对已确认和待查项。沿用现有游学入口与记录。[第 22 期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)为日期和项目来源。
- **课表**。复核产品蓝图、旧 Chapter 00 停用标记、现行框架、Guided Learning、D1–D2 清单、预习路径及有道／WPS 台账。D1 10 节／25 题／9 案例，D2 9 个品种＋6 个法国专题／42 题／9 案例，D3 13 节／30 题／10 案例，D4 15 节／45 题／13 案例。上述复习与当期面授安排仍待对齐。D5 五城日期已核，分时课表、考核分配及讲师原件待取得。第 22 期共五天面授，2027 年 3 月 14–17 日另排四天游学。
- **验证与发布**。CloudBase 构建、93 项回归、48 次入口定位、游学示例折叠及本机记录检查通过。候选专注页 `foundation-CNdgA28U.js`，共享模块 `FoundationPage-BGt4hlxm.js`。正式站三个入口的哈希与本日上轮一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。仍待上海 CloudBase `somm100` 的 `/somm100` 已授权通路或 WorkBuddy 回执，正式站交互、手机实机与微信原文待验收。

---

# Foundation · 2026-11-14 · 团队酒单合并计数与交接

基线 `ab8f6f49dc81b2baad6ff7b99be87dbb1b52a5bb`，分支 `migration/tencent-somm100`。工作目录清理后从权威分支重新取得源码、迁移说明及上轮检查点，远端基线一致。

- **交付**。`app/FoundationPage.tsx` 的团队酒单自练新增折叠交接题。按模拟清单分别报告 12 款杯卖与 40 款主酒单，发现 3 款重叠后算出 49 款不同酒，再提示向课程方确认重叠规则。数量依据[第22期招生正文第 7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，重叠为原创教学设定。保留既有 ID 和本机学习记录。
- **课表**。复核产品蓝图、过时 Chapter 00、现行预习框架、Guided Learning、D1–D2 清单、预习路径及有道／WPS 台账。Notion 对第22期 1 月考核及分时课表的检索仅找到内部模板与历史资料等，未取得确认版安排。D1 10 节／25 题／9 案例，D2 9 个品种＋6 个法国专题／42 题／9 案例，D3 13 节／30 题／10 案例，D4 15 节／45 题／13 案例。前四组与本期面授主题待逐日对齐。D5 五城日期已核，缺逐日课表、考核分配与讲师原件。第22期无第六天面授，游学另排在 2027 年 3 月 14–17 日。
- **验证与发布**。CloudBase 构建、93 项回归及交接题与两份酒单答案独立折叠的 DOM 检查通过。候选专注页 `foundation-Dfi5iUFI.js`，共享模块 `FoundationPage-CJrUOrm1.js`。正式站三个入口哈希与本日早前核对一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。仍待上海 CloudBase `somm100` 的 `/somm100` 授权发布通路或 WorkBuddy 回执，线上交互、手机实机和微信原文待验收。

---

# Foundation · 2026-11-14 · 从准备度错题进入对应案例

基线 `24602388b98a0dd7f65c5b6e80bec69dfcc977e5`，分支 `migration/tencent-somm100`。已读取源码、部署说明、来源表和上轮检查点，远端基线一致。

- **交付**。`data/foundation-study.json` 将土壤、发酵、橡木桶及年份四道准备度题连到对应案例。`app/FoundationStudy.js` 在答错时提供「做一道相关案例」，展开题面并聚焦标题；通过 `app/FoundationPrecoursePracticeReturn.tsx` 回到刚才的题，换过学习周也可返回。案例和题目原有 ID、准备度首次／最近选择及勾选保留。沿用[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)及[预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。
- **课表**。复核产品蓝图、旧 Chapter 00 停用标记、Guided Learning、D1–D2 清单和 WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授、另排游学。D1 10 节／25 题／9 案例，D2 9 个品种＋6 个法国专题／42 题／9 案例，D3 13 节／30 题／10 案例，D4 15 节／45 题／13 案例。D1–D4 与本期面授主题待逐日核对。D5 五城日期已核，分时课表、考核分配与讲师课件待取得。D6 无第六天面授，游学另排 2027 年 3 月 14–17 日。
- **验证与发布**。CloudBase 构建、93 项回归、两种预习节奏共 8 次错题到案例往返、48 次入口定位通过。正式站三页文件与上轮逐字节一致。候选专注页 `foundation-CNuPoJN_.js`，共享模块 `FoundationPage-Cy86ZWZC.js`。保留 `[skip netlify]` 与 `ignore = "exit 0"`。待上海 CloudBase `somm100` 的 `/somm100` 授权发布或 WorkBuddy 回执。手机、正式站交互及微信原文待验收。

---

# Foundation · 2026-11-14 · 第 5、7 学习单元接入九道课前案例

基线 `782c8edebbdbeb2c1f0d1ed00f7d760bebb4de96`，分支 `migration/tencent-somm100`。已读当前源码、部署说明、来源表和上轮检查点，远端基线一致。

- **交付**。`data/foundation-study.json` 在第 5 学习单元接入三道风格案例，在第 7 单元接入三道产区与三道酒标案例。点击即展开题面并聚焦标题，答案仍折叠。四类案例统一用 `app/FoundationPrecoursePracticeReturn.tsx` 返回原周按钮。保留案例 ID、内容、学习记录及既有入口。与[课前预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)的第 5、7 单元内容核对。
- **课表**。复核产品蓝图、旧 Chapter 00、现行框架、Guided Learning、D1–D2 清单及 WPS／有道台账。[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授。D1 10 节／25 题／9 案例，D2 9 个品种＋6 个法国专题／42 题／9 案例，D3 13 节／30 题／10 案例，D4 15 节／45 题／13 案例。上述复习与本期面授主题仍待对齐。D5 五城日期已核，仍缺分时课表、考核分配和讲师原课件。D6 无第六天面授，2027 年 3 月 14–17 日另排游学。
- **验证与发布**。93 项回归、CloudBase 构建、48 次入口定位、两种预习节奏共 26 次案例往返通过。候选专注页 `foundation-Dfoa89aa.js`、共享模块 `FoundationPage-BfkFypBf.js`。11 月 14 日正式站三页与上轮逐字节一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。仍待上海 CloudBase `somm100` 的 `/somm100` 授权发布通路或 WorkBuddy 回执。正式站、实机、微信原文待验收。

---

# Foundation · 2026-11-14 · 概念正文返回原周阅读入口

基线 `9a2d97c983c54095ccd459901e2981487bef0edd`，分支 `migration/tencent-somm100`。已读部署说明、来源表、上轮检查点和当前预习源码，远端基线一致。

- **交付**。`app/FoundationStudy.js` 记录当前页面内打开概念的周与按钮。`app/FoundationConcepts.tsx` 可从正文返回原按钮，包含同一概念在相邻学习单元出现的情况。两种预习节奏共 22 次往返验证。原周不在当前视图时回到预习区标题，从准备度题、案例返回的入口及浏览器本机记录均保留。
- **来源与逐日状态**。已复核产品蓝图、旧 Chapter 00 停用标记、现行框架、Guided Learning、D1–D2 清单、[4／8 周路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)、有道历史 D1–D2 与 WPS／有道台账。[第22期正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认每城五天面授。D1 10 节／25 题／9 案例。D2 9 个品种＋6 个法国专题／42 题／9 案例。D3 13 节／30 题／10 案例。D4 15 节／45 题／13 案例。D1–D4 对应的当期面授主题待核。D5 五城日期已核，分时课表、考核分配和讲师原课件仍缺。D6 无第六天面授，游学另排 2027 年 3 月 14–17 日。
- **验证与发布**。CloudBase 构建、93 项回归、专项整页 DOM、48 次入口定位及 22 次双节奏阅读往返通过。专注页 `foundation-CFh4n0WZ.js`，共享模块 `FoundationPage-D9TlICGV.js`。正式站三个入口文件与上轮逐字节一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。待现有上海 CloudBase `somm100` 的 `/somm100` 授权通路或 WorkBuddy 回执，手机实机、正式站交互与微信原文待验收。

---

# Foundation · 2026-11-14 · 从课程首页进入五城课间复习

基线 `612fe509366117d618ca6bd67eebd9c2e8f180ef`，分支 `migration/tencent-somm100`。已读当前源码、迁移说明、来源表及上轮检查点，远端基线一致。

- **交付**。`cloudbase/course-home-content.mjs` 为五城班期卡新增对应课间复习链接。`app/FoundationFocus.tsx` 依据现有城市标识定位专注页的课间复习，`app/FoundationPage.tsx` 将城市用于已有的两段复习窗口与课前选项。未知城市仍落到可手动选择的复习入口。保留日历下载、讲师、课程图片和本机学习记录。班期卡操作支持窄屏换行和 44px 点按区域。
- **来源与逐日状态**。已复核产品蓝图、现行课前框架、Guided Learning、D1–D2 清单、预习路径、旧 Chapter 00 停用标记及有道／WPS 台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授与另排游学。D1 10 节／25 题／9 案例。D2 9 个品种＋6 个法国专题／42 题／9 案例。D3 13 节／30 题／10 案例。D4 15 节／45 题／13 案例。D1–D4 的面授主题对应待核。D5 五城日期已核，本期分时课表、考核分配与讲师原课件仍缺。D6 无第六天面授，游学于 2027 年 3 月 14–17 日另排。
- **验证与发布**。CloudBase 构建、93 项回归、53 节渲染、41 个案例、71 次正文往返、两种根路径共 48 次入口定位通过。五城两段窗口日期与选择状态、未知城市回退、本机作答均通过 DOM 检查。候选专注页 `foundation-CT6WZqEZ.js`，共享模块 `FoundationPage-D3zyBja6.js`。11 月 14 日正式站三页 HTML 与上轮逐字节一致。保留 `[skip netlify]` 与 `ignore = "exit 0"`。待上海 CloudBase `somm100` 的 `/somm100` 已授权发布通路或 WorkBuddy 回执，再验收正式站、手机与微信原文。

---

# Foundation · 2026-11-14 · D2 霞多丽工艺与红葡萄品种盲品复盘

基线 `88a41a1ce14e5669b028485724b1e821c881df3c`，分支 `migration/tencent-somm100`。已读当前源码、迁移说明、来源表及前轮检查点，远端基线一致。

- **交付**。`app/FoundationD1D2Recaps.js` 在 D2 综合复盘末尾添加两道原创案例。霞多丽案例用同批葡萄对照苹果酸乳酸转化，红葡萄案例用颜色、单宁与酒体检查黑皮诺和西拉的盲品推测。两题均有折叠答案、两条正文回看与回原题入口。沿用已有案例 ID、作答和勾选。来源为[现行 D1–D2 知识提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和站内 D2 第 1、2、5、7 节。
- **课表与缺口**。复核产品蓝图、现行课前框架和 Guided Learning、旧 Chapter 00 停用标记、预习路径、WPS／有道台账及有道迁移线索。[课程研发 Brief](https://app.notion.com/p/40617d16de4c8119996fdc9fa87bd657)将 D5 品鉴、餐配等及 D6 服务、销售、酒单等标为待原件校准的草案。[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认各城五天面授，游学于 2027 年 3 月 14–17 日另排。仍缺本期分时课表、讲师课件与逐日考核分配。
- **逐日状态**。D1 10 节／25 题／9 案例。D2 9 个品种＋6 个法国专题／42 题／9 案例。D3 13 节／30 题／10 案例。D4 15 节／45 题／13 案例。D1–D4 的面授主题对应待核。D5 五城日期已核，细分时段待核。D6 无第六天面授。
- **验证与发布**。93 项回归、53 节渲染、41 个案例、71 次正文往返、38 次入口定位及 CloudBase 构建通过。构建专注页 `foundation-T5yz8WhK.js`，共享模块 `FoundationPage-BswEXnan.js`。11 月 14 日正式站三页 HTML 与上一轮逐字节一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。待上海 CloudBase `somm100` 的 `/somm100` 授权发布通路或 WorkBuddy 回执，再核对三入口、手机实机与微信原文。

---

# Foundation · 2026-11-14 · D1 冠层与发酵记录复盘

基线 `b4bcc3e356b388338bc5d561c02138e86cf88241`，分支 `migration/tencent-somm100`。已读现有 Foundation 入口、迁移说明、来源表、前轮检查点并检查远端基线。

- **交付**。`app/FoundationD1D2Recaps.js` 在 D1 综合复盘末尾添加两道原创案例。学员分别比较潮湿、暴晒两种葡萄园的冠层管理目标，以及判断两罐发酵记录能否支持糖分继续下降。每题有折叠答案、两条正文回看及原题返回入口，保留现有案例 ID、答题和勾选。依据 Notion [D1-04 冠层管理](https://app.notion.com/p/40717d16de4c8143b199fb57a899a5f5)、[D1-06 发酵](https://app.notion.com/p/40717d16de4c814c93b7c56d250d1aea) 与站内正文；日志和题目为原创。
- **来源边界**。复核产品蓝图、旧 Chapter 00 停用标记、现行课前框架、Guided Learning、D1–D2 知识清单、预习路径及有道的历史 D1–D2 阅读笔记。复查 Notion 单期开班模板，D5/D6 仍是待填字段。检索到的两份第 22 期招生资料确认五城各五天面授及考核类别，仍缺正式课表、教学／考核时段及 WPS／有道原课件。游学于 2027 年 3 月 14–17 日另排。
- **逐日状态**。D1 10 节／25 道自测／9 个案例。D2 9 个品种＋6 个法国专题／42 道自测／7 个案例。D3 13 节／30 道自测／10 个案例。D4 15 节／45 道自测／13 个案例。D1–D4 对应面授的具体课题待核。D5 日期已核，分时安排待核。D6 无第六天面授。
- **验证与发布**。93 项回归、53 节、39 个案例、67 次正文往返、整页 DOM、两种路径共 38 次入口定位及 CloudBase 构建均通过。专注页 `foundation-f-hlLEvt.js`、共享模块 `FoundationPage-B6vbi2q1.js`。11 月 14 日正式站三页 HTML 与上一轮逐字节一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。上海 CloudBase `somm100` 的 `/somm100` 待已授权通路或 WorkBuddy 回执，手机实机、线上交互及微信原文待验收。

---

# Foundation · 2026-11-14 · 文章导读接站内概念和口头自查

基线 `ff7cc113589e1f311abe2d42f66265ea4ed8e4f6`，分支 `migration/tencent-somm100`。已读迁移说明、来源表、上轮检查点及现有课程入口，远端未见并发提交。

- **交付**。`cloudbase/course-home-content.mjs` 从现有概念 ID 生成 5 个导读组的站内入口。展开课程首页的导读后，可进入对应中文概念、口头自查及折叠参考答案。沿用 17 篇公众号原文链接、标题及阅读理由，保持现有课程卡片、讲师、图片与学习记录。复核产品蓝图、旧 Chapter 00 停用标记、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。
- **逐日状态**。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授。D1 10 节／25 道自测／7 个案例。D2 9 个品种＋6 个法国专题／42 道自测／7 个案例。D3 13 节／30 道自测／10 个案例。D4 15 节／45 道自测／13 个案例。D1–D4 面授对应仍待核。D5 日期已核，待确认版逐日课表、教学与考核分配及 WPS／有道原课件。D6 无第六天面授，2027 年 3 月 14–17 日另排游学。
- **验证**。CloudBase 构建、93 项回归、整页 DOM、两种托管路径的 38 次入口定位及 10 次导读目标答案展开通过。Chromium 进程在运行环境报 `socket() failed: Operation not permitted (1)`，手机浏览器和实机未验收。上轮 17 条原文请求只读到代理占位页，本轮没有新的微信正文证据。
- **正式站差异**。三页哈希与上轮一致。按最新仓库案例标题逐项对照正式站当前资源，37 个案例中主 App 缺 22 个，专注页缺 14 个，专注页缺的 14 个在主 App 也缺。正式课程首页未检出候选包中的 5 组导读及 5 个站内链接。主酒单复核也未检出。这是静态内容对照，正式部署提交号及交互验收仍待确认。
- **发布断点**。保留 `[skip netlify]` 和 `ignore = "exit 0"`。在现有上海 CloudBase `somm100` 的 `/somm100` 发布经核验的候选包，待已授权通路或 WorkBuddy 回执。随后核对三入口、划词、手机及微信内文章正文。教学先核 D5 分时课表。

---

# Foundation · 2026-11-14 · 公众号导读链接改用 HTTPS

基线 `b9fc5e55ff937b3b846e98c08d1bc3d0984aaf8d`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表和上轮检查点，远端未见并发提交。

- **交付**。`data/foundation-concepts.json` 和 `data/foundation-source-map.json` 中对应的 10 条旧公众号链接改用 HTTPS，原地址的域名、路径、参数和片段保留。学生继续按概念、文章标题及阅读理由打开原文，课程首页和 App 共用相同导读。复核现行课前框架、Guided Learning、旧 Chapter 00 的停用标记及 D1–D2 知识清单。
- **可访问性**。11 月 14 日逐条请求全部 17 条 HTTPS 原文，均返回 HTTP 200，但正文是执行环境的 `Site Unavailable / Unable to access this site`，未读到文章。保留来源表里的待验证状态，未认定文章失效。整页和专注入口测试验证 17 个原文入口都使用 HTTPS、标题和导读保留。
- **逐日状态**。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授。D1 10 节／25 道自测／7 个案例。D2 9 个品种＋6 个法国专题／42 道自测／7 个案例。D3 13 节／30 道自测／10 个案例。D4 15 节／45 道自测／13 个案例。D1–D4 与面授对应待核。D5 日期已核，仍缺确认版逐日课表、考核分配及 WPS／有道原课件。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证与发布**。93 项回归、整页 DOM、两种路径 28 次入口定位和 CloudBase 构建通过。候选专注页 `foundation-C6U4-Jpo.js`、共享模块 `FoundationPage-BMA-vSoo.js`。正式站三页文件哈希与上轮一致，未部署。保留 `[skip netlify]` 和 `ignore = "exit 0"`。待上海 CloudBase `somm100` 的 `/somm100` 授权发布通路或 WorkBuddy 回执，再验证正式站、手机及微信内文章正文。

---

# Foundation · 2026-11-14 · 马德拉与加拿大冰酒复盘

基线 `13d2949ef6c6a1732bd0cd5f50cb0480e8c9f0b4`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表与上轮检查点。

- **交付**。`app/FoundationD4Recap.js` 追加两道原创案例。学员用模拟酒窖记录区分马德拉的两种熟成工艺，并判断加拿大冰酒葡萄的冻结发生在哪里。分别链接 D4 第 8、10 节并可返回原题。既有案例 ID 和本机记录保留。
- **来源**。现有 D4 第 8、10 节及[马德拉官方酿造与熟成说明](https://vinhomadeira.com/o-vinho-madeira/vinificacao-e-envelhecimento)、[加拿大食品检验局冰酒标准](https://inspection.canada.ca/en/about-cfia/acts-and-regulations/list-acts-and-regulations/documents-incorporated-reference/canadian-standards-identity-volume-8)。复核产品蓝图、旧 Chapter 00、现行框架、Guided Learning、D1–D2 清单及课前路径。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授和另排游学。D1 10 节／25 道自测／7 个案例。D2 9 个品种＋6 个法国专题／42 道自测／7 个案例。D3 13 节／30 道自测／10 个案例。D4 15 节／45 道自测／13 个案例。D1–D4 面授主题待核。D5 五城日期已核，仍缺教学与考核分配及 WPS／有道原课件。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、53 节渲染、37 个案例及 63 次正文往返、两种托管路径共 28 次入口定位、本机记录及 CloudBase 构建通过。专注页 `foundation-B3cfV-rH.js`，共享模块 `FoundationPage-C4yPojRO.js`。
- **发布断点**。11 月 14 日正式站三个入口的文件哈希与上轮一致。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署，待上海 CloudBase `somm100` 的 `/somm100` 已授权发布通路或 WorkBuddy 回执。届时核对正式站入口、划词和手机实机。教学优先核 D5。

---

# Foundation · 2026-11-13 · 主酒单复核直达

基线 `7bc132d8808f2c6a990756fe5cc35e518bd5dcd0`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表与上轮检查点，远端未见并发提交。

- **交付**。`cloudbase/course.html` 在学习入口新增主酒单复核直达。打开专注页时，`app/FoundationPage.tsx` 先展开目标所在的折叠层，再定位到原有练习的新标题 ID。两层题面自动展开，参考答案仍折叠。沿用既有练习、记录和其他入口。
- **来源与逐日状态**。复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授及 40 款主酒单任务。D1 10 节／25 道自测／7 个案例。D2 9 个品种＋6 个法国专题／42 道自测／7 个案例。D3 13 节／30 道自测／10 个案例。D4 15 节／45 道自测／11 个案例。D1–D4 面授主题待核。D5 五城日期已核，分时课表、考核分配和原课件待取得。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。`scripts/check-foundation-focus.mjs` 验证根路径与 `/somm100/` 共 28 次入口定位、两层折叠、答案闭合及本机作答保留。93 项回归、整页 DOM 及 CloudBase 构建通过。候选主 App `app-Bm9iFZ5y.js`，专注页 `foundation-X2StZqwS.js`，共享模块 `FoundationPage-BSmTedQV.js`。
- **发布断点**。11 月 13 日正式站三个入口的文件哈希与上轮一致。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署，待上海 CloudBase `somm100` 的 `/somm100` 已授权发布通路或 WorkBuddy 回执。届时核对正式站入口、划词和手机实机。教学优先核 D5。

---

# Foundation · 2026-11-13 · 40 款主酒单复核练习

基线 `6a035ff39c2b68a8e543a2e3a8a24c2790da5ff8`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表与上轮检查点，远端未见并发提交。

- **交付**。`app/FoundationPage.tsx` 在团队酒单自练加入独立折叠的主酒单复核。模拟 40 行草案，用重复译名、年份不符和缺货练习逐项核实，得出 37 款已确认及补足三款的后续动作。考核索引新增团队酒单入口，沿用原有区块 ID 和本机记录。
- **来源与逐日状态**。已复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授及 12 款杯卖、40 款主酒单任务，案例内容为原创。D1 10 节／25 道自测／7 个案例。D2 9 个品种＋6 个法国专题／42 道自测／7 个案例。D3 13 节／30 道自测／10 个案例。D4 15 节／45 道自测／11 个案例。D1–D4 面授主题待核。D5 五城日期已核，逐日课表、考核分配及 WPS／有道原课件待取得。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、整页 DOM、主酒单独立折叠和答案、入口焦点、本机记录、26 次入口定位及 CloudBase 构建通过。主 App `app-DIJe6s9s.js`，专注页 `foundation-daK1zHmg.js`，共享模块 `FoundationPage-D1YvpZhW.js`。
- **发布断点**。11 月 13 日正式站三个入口的文件哈希与上轮一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。未部署，待上海 CloudBase `somm100` 的 `/somm100` 已授权发布通路或 WorkBuddy 回执。随后核对三入口、划词和手机实机。教学优先核第 5 天。

---

# Foundation · 2026-11-13 · 按班期阶段衔接复习

基线 `464e394889e86bf9b8c62fa0887674214318d7c1`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表与上轮检查点，远端未见并发提交。

- **交付**。`app/FoundationPrepByCity.js` 从第 22 期已公布的各城面授日期判断复习入口。首日之后可进课间复习，第二阶段末日之后直达综合复盘，最后一次面授日期过后直达考核范围与复习索引。沿用共享城市、4／8 周计划、短自查与现有记录。日期以北京时间自然日计算。
- **来源与逐日状态**。复核产品蓝图、过时 Chapter 00、现行课前框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授、三个阶段及另排游学。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、10 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 面授主题待核。D5 日期已核，分时课表、考核分配及原课件待取得。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、整页 DOM 验证、广州两处北京时间跨午夜边界、五城 10 个课间窗口、共享城市、本机记录、26 次入口定位及 CloudBase 构建通过。主 App `app-ChviOb3t.js`，专注页 `foundation--me1ojHD.js`，共享模块 `FoundationPage-DHrhUXx8.js`。
- **发布断点**。11 月 13 日正式站三个入口的文件哈希与上轮一致。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署，待已授权的上海 CloudBase `somm100` 的 `/somm100` 发布通路或 WorkBuddy 回执。届时核对三入口、划词和手机实机。教学优先核 D5。

---

# Foundation · 2026-11-13 · 最后一次面授前的复盘示例

基线 `63514fd2285744304bc1542258645c75f2fe6c78`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表与上轮检查点，远端未见并发提交。

- **交付**。`app/FoundationBridge.js` 在末次面授前自选复盘加入可折叠的知识、服务与酒单笔记示例，并连到已有起泡酒综合、点单变更和杯卖库存练习。沿用稳定入口和现有记录。`scripts/check-foundation-page.mjs` 验证示例独立折叠、三个入口焦点及展开状态和本机记录保留。
- **来源与逐日状态**。已复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。原创示例取自站内模拟练习，范围对照[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、10 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 面授主题待核。D5 五城日期已核，分时课表、考核分配及原课件待取得。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、53 节渲染、35 个案例及 61 次正文往返、26 次入口定位、三个复盘跳转及 CloudBase 构建通过。主 App `app-CroKB-gf.js`，专注页 `foundation-Dh6c-qX3.js`，共享模块 `FoundationPage-Cpl7Fnn4.js`。
- **发布断点**。11 月 13 日直接读取正式站三个页面，哈希与上轮一致。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署，待已授权的上海 CloudBase `somm100` 的 `/somm100` 发布通路或 WorkBuddy 回执。随后核对正式站三入口和手机实机。教学优先核 D5。

---

# Foundation · 2026-11-13 · 课前与课间共用上课城市

基线 `b589bbe53be4c1f38bb516bfab356870e1246254`，分支 `migration/tencent-somm100`。已读源码、迁移说明、来源表与上轮检查点，远端未见并发提交。

- **交付**。在 `app/FoundationPage.tsx` 共用当前页面的城市选择，经 `app/FoundationStudy.js` 接入 `app/FoundationPrepByCity.js`。从五城班期进入课间复习、在课前选择城市或在课间换城，两个区域均显示对应日期。开课后从预习跳到课间复习会带入同一城市。保留现有 ID 和本机记录。更新独立组件预览及整页回归检查。
- **来源与逐日状态**。复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径和 WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、10 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 面授主题待核。D5 日期已核，教学、考核分配和原课件待取得。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、五城首日及 10 个课间窗口、双向联动、开课后跳转、本机记录、53 节渲染、35 个案例及 61 次往返、26 次入口定位和 CloudBase 构建通过。主 App `app-BNdDa0ln.js`，专注页 `foundation-CVEV8s8N.js`，共享模块 `FoundationPage-BUfKGgIr.js`。
- **发布断点**。11 月 13 日正式站三页哈希与上轮一致。未部署，待已授权的上海 CloudBase `somm100` 的 `/somm100` 发布通路或 WorkBuddy 回执，届时验收正式站和手机实机。保留 `[skip netlify]` 与 `ignore = "exit 0"`。教学优先取得 D5 分时课表及原课件。

---

# Foundation · 2026-11-13 · 从五城班期直接进入课间复习

基线 `dbe8148ff5109f48a801df0ac113030e370defcb`，分支 `migration/tencent-somm100`。已读当前源码、迁移说明、来源表及上轮检查点，远端未见并发提交。

- **交付**。`app/FoundationCohort.js` 为五城各加课间复习按钮。`app/FoundationPage.tsx` 与 `app/FoundationBridge.js` 共享当前选择，点击后跳到原课间复习标题、预选该城市、同时显示两段日期。复习区仍可手动换城。城市选择仅用于当前页面，原有学习日、勾选、作答和稳定入口 ID 沿用。
- **来源与逐日状态**。复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城各五天面授及游学另排。D1 10 节／25 道自测／7 个案例，D2 9 个品种＋6 个法国专题／42 道自测／7 个案例，D3 13 节／30 道自测／10 个案例，D4 15 节／45 道自测／11 个案例。D1–D4 面授主题待核。D5 五城日期已核，逐日授课、考核分配及 WPS／有道原课件未取得。D6 无第六天面授，游学为 2027 年 3 月 14–17 日。
- **验证**。`scripts/check-foundation-page.mjs` 实测五城按钮的焦点、预选、10 个窗口与手动换城、本机学习记录。93 项回归、53 节渲染、35 个案例 61 次往返、26 次入口检查及 CloudBase 构建通过。候选主 App `app-BZ4m2KNC.js`，专注页 `foundation-DVuXkYT3.js`，共享模块 `FoundationPage-B9IYOJ-v.js`。
- **发布断点**。11 月 13 日正式站三页哈希与上轮一致。保留 `[skip netlify]` 和 `ignore = "exit 0"`。未部署，待已授权的上海 CloudBase `somm100` 的 `/somm100` 发布通路或 WorkBuddy 回执。收到回执后核三页、划词和手机实机。教学优先核第 5 天。

---

# Foundation · 2026-11-13 · 最后一次面授前复盘

基线 `99a33a83fe918c07777ad0102de5dbe5b37365cd`，分支 `migration/tencent-somm100`。已读当前源码、迁移说明、来源表和上轮检查点，远端未见并发提交。

- **交付**。`app/FoundationBridge.js` 在「第二阶段后｜综合复盘」加入可折叠的最后一次面授前自选练习，按知识、服务、酒单三条记录整理一页笔记。复用五城课间日期和现有自练，不写入本机记录。稳定入口为 `foundation-final-class-prep-title`。
- **来源与逐日状态**。复核产品蓝图、过时 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要、课前路径、WPS／有道台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城五天面授及知识、服务和团队酒单的考核范围。本轮练习为原创自选复盘。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、10 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 与本期面授日次的主题对应待核。D5 五城日期已核，逐日授课、考核分配和 WPS／有道原课件仍待取得。D6 无第六个面授日，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、53 节渲染、35 个案例共 61 次正文往返、五城 10 个课间窗口、三条复盘的折叠、26 次入口定位、本机记录及 CloudBase 构建通过。候选主 App `app-Ldq24Rji.js`，专注页 `foundation-FrUeXUPt.js`，共享模块 `FoundationPage-Cb4Uvawk.js`。
- **发布断点**。11 月 13 日重新读取正式站三个入口，三页哈希与上轮一致，主 App 仍为 `app-C7ABxmed.js`。保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署，待现有上海 CloudBase `somm100` 的 `/somm100` 授权发布通路或 WorkBuddy 回执。收到回执后复核正式站版本、两页划词和手机实机。

---

# Foundation · 2026-11-13 · 正式站差异盘点与两个自练入口

基线 `96a222c85295e6cf47642c3ced3e135689072f92`，分支 `migration/tencent-somm100`。核对源码、迁移说明、现行课前来源表、上轮检查点和并发分支头。

- **交付**。`cloudbase/course.html` 的「学习入口」新增起泡酒综合自练和点单实操自练，直接定位专注页的既有练习。既有杯卖库存直达、讲师、课程图片和本机学习记录沿用。`scripts/check-foundation-focus.mjs` 验证这两个链接在根路径及 `/somm100/` 均能定位标题和设置焦点。
- **正式站对照**。11 月 13 日重新读取 `www.somm100.cn` 的 `index.html`、`course.html`、`foundation.html` 及主 App 实际引用的 `FoundationPage-CiZC60Ci.js`。以当前源码 35 个案例的完整标题逐项匹配，主 App 缺 20 个（D1 4、D2 4、D3 6、D4 6），专注页缺 12 个（D1 2、D2 2、D3 4、D4 4），其中 12 个两边都缺。两边也未检出风格、产地各 3 道练习、葡萄园和酿造 4 道证据练习、3 道临近开课自查、2 道口试追问、3 项综合或实操练习（起泡酒、杯卖、点单），以及课前待复习题直达和返回本周练习入口。D1–D4 作答统计及下一道待复习题、五城课间日数的标记两边均存在。餐配对照、服务实操和盲品橡木复盘在专注页已检出，主 App 未检出。课程首页尚缺三个自练直达。此处按实际返回资源计数，未执行正式站交互，线上部署 SHA 仍未知。
- **来源与逐日状态**。复读产品蓝图、已过时的旧 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径、WPS／有道台账和开班模板。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五城每城五天面授，游学另排。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、10 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 面授主题对应待核。D5 日期已核，教学、考核分配和原课件待核。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。文件检索未取得确认版逐日课表或发布回执。
- **验证与续跑**。93 项回归、53 节渲染、35 个案例及 61 次往返、26 次入口焦点定位与本机记录保留通过。CloudBase 构建通过，继续用发布包保留正式站两页的划词资源及 `/api/wine-explain`。提交保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署，待现有上海 CloudBase `somm100` 的 `/somm100` 已授权发布通路或 WorkBuddy 回执。收到回执后核对三个入口和手机实机。教学优先取得本期逐日表并核 D5。

---

# Foundation · 2026-11-13 · D3 摩泽尔坡地与瓦豪酒标复盘

基线 `9973a2908a945c7d9cbc9489479b585a7ad2ab96`，分支 `migration/tencent-somm100`。已核对源码、迁移说明、来源表、上轮检查点及并发分支头。

- **交付**。`app/FoundationD3Recap.js` 追加两道原创案例。摩泽尔题从河流、坡向、高差入手，写出待验证的成熟假设。瓦豪题从葡萄园名称和年份入手，对照两个品种的葡萄来源、酿造条件与品鉴观察。分别连回 D3 第 10、12 节并支持返回原题，既有案例、ID 和本机学习记录保留。
- **来源**。依据 D3 第 10、12 节、[德国葡萄酒协会的摩泽尔产区资料](https://www.ch.deutscheweine.de/regionen/anbaugebiet/72/mosel)和[瓦豪葡萄园地图](https://www.vinea-wachau.at/en/mywachau/vineyards)。复核产品蓝图、过时 Chapter 00、现行课前框架、Guided Learning、D1–D2 清单、课前路径与开班模板。[第22期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)第 6–7 页确认五天面授、五城日期和另排游学。Notion 与文件检索仍未找到当期确认版逐日课表、D5 教学考核分配或原课件。
- **逐日状态**。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、10 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 与本期面授逐日主题的对应待核。D5 五城日期已核，教学与考核分配待核。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、53 节 SSR／DOM 渲染、35 个案例共 61 次正文往返、本机记录保留、CloudBase 构建和根路径及 `/somm100/` 入口检查通过。主 App `app-Bb7_2GgZ.js`，专注页 `foundation-uhnXfgcg.js`，共享模块 `FoundationPage-BVlazzvz.js`。
- **发布断点**。正式课程首页仍有划词入口，未检出杯卖库存自练直达。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署或线上手机验收，待现有上海 CloudBase `somm100` 的 `/somm100` 授权发布通路或 WorkBuddy 回执。教学优先核第 5 天。

---

# Foundation · 2026-11-13 · D1 发酵后检测与酒标查证

基线 `fe9c0ff63552fb9fe53cf80614c4f30362d4b55c`，分支 `migration/tencent-somm100`。已核对源码、迁移说明、来源表、上轮检查点及并发分支头。

- **交付**。`app/FoundationD1D2Recaps.js` 在 D1 综合复盘追加两道原创案例。酒窖题对照苹果酸和乳酸的变化，用后续检测核实转化进度。酒标题区分品种与地理标志，按完整产区名查适用规则。新题分别链接 D1 第 8 节和第 9、10 节，可返回原题。既有案例顺序、ID、作答及勾选记录保留。
- **来源**。依据现有 D1 第 8–10 节，查证[澳大利亚葡萄酒研究所的苹果酸乳酸转化资料](https://www.awri.com.au/wp-content/uploads/2011/06/Malolactic-fermentation.pdf)与[法国原产地与质量管理局的 AOP/AOC 说明](https://www.inao.gouv.fr/aop-appellation-origine-protegee)。本轮还读到[有道迁入的 2024 年 D1–D2 笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)，其内容是种植酿造、法规酒标和法国的复习页码索引。复核现行框架、Guided Learning、D1–D2 清单及课前路径。[第22期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)第 6–7 页能确认五天面授与另排游学。D5 教学考核分配和原课件仍未检出。
- **逐日状态**。D1 10 节、25 道自测、7 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 对应面授日次待核。D5 五城日期已核，教学与考核待核。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、53 节渲染、33 个案例共 59 次正文往返、本机记录保留、CloudBase 构建和两种托管路径入口检查通过。
- **发布断点**。正式课程首页只读核对仍有划词入口，未检出杯卖自练直达。划词公开资源继续通过固定哈希校验。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署或线上实机验收，待现有上海 CloudBase `somm100` 的 `/somm100` 授权通路或 WorkBuddy 回执。教学优先核 D5。

---

# Foundation · 2026-11-13 · D2 雷司令与赤霞珠复盘

基线 `e0461477a190073915e2cf9ac28367e1c1352c61`，分支 `migration/tencent-somm100`。已核对源码、迁移说明、来源映射、上轮检查点及并发分支头。

- **交付**。`app/FoundationD1D2Recaps.js` 为 D2 综合复盘追加两道原创模拟案例。雷司令题把残糖、总酸和实际甜感分开记录，并统一复尝条件。赤霞珠题用同批葡萄的两份酒窖记录查浸渍差异及可能混杂的操作。分别链接 D2 第 4、6 节，支持正文回原题。原有案例、答题和勾选记录保留。
- **来源**。依据现有 D2 第 4、6 节并对照 [Wine Australia 雷司令教学资料](https://www.wineaustralia.com/getmedia/6331b966-f1e6-405f-b404-ff881a603b6b/AWD_Riesling_FacilitatorGuide_1.pdf?ext=.pdf)和[澳大利亚葡萄酒研究所浸渍资料](https://www.awri.com.au/industry_support/winemaking_resources/winemaking-practices/winemaking-treatment-extended-post-fermentation-maceration/)。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。[第22期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)第 6–7 页确认五天面授、游学和考核范围。检索未取得确认版逐日课表、D5 教学考核分配或原课件。
- **逐日状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、7 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 对应面授日次待核。D5 五城日期已核，教学和考核分配待核。D6 无第六个面授日，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、53 节 SSR／DOM 渲染、31 个案例共 56 次复习往返、本机记录保留及 CloudBase 构建通过。主 App `app-CdP5McU3.js`、专注页 `foundation-C_A1B5_2.js`、共享模块 `FoundationPage-CGVbim2K.js`。
- **发布断点**。正式课程首页仍有划词入口，未检出杯卖自练直达。两份划词公开资源按固定哈希校验。保留 `[skip netlify]` 与 `ignore = "exit 0"`。未部署、未线上或手机实机验收。待已授权的上海 CloudBase `somm100`、`/somm100` 发布通路或 WorkBuddy 回执。教学优先核 D5。

---

# Foundation · 2026-11-13 · D4 波特与雪莉复盘

基线 `5819a446a64d471a3acf29c52eb6f7e92eb86cb8`，分支 `migration/tencent-somm100`。已核对源码、迁移说明、来源表、上轮检查点及并发分支头。

- **交付**。`app/FoundationD4Recap.js` 追加两道原创模拟案例。波特题用两张 LBV 酒标和过滤资料决定优先检查沉淀的酒瓶。雪莉题区分 Solera 的分级取酒与补充、Amontillado 的两段熟成及 Oloroso 的氧化熟成。两题独立折叠并分别链接第 6、7 节，学完可返回原案例。现有案例顺序和 ID 保留，答题与勾选记录保留。
- **来源**。对照现有 D4 第 6、7 节及[杜罗和波特酒协会](https://www.ivdp.pt/pt/vinhos/vinhos-do-porto/categorias-especiais/)与[赫雷斯产区委员会](https://www.sherry.wine/news/oloroso-vs-amontillado-whats-the-difference)。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径和 WPS／有道台账。[第22期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)第 6–7 页仅能确认五天面授、游学与考核范围。检索仍未取得逐日课表、D5 考核分配或原课件。
- **逐日状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、11 个案例。D1–D4 对应面授日次待核。D5 五城日期已核，教学和考核分配待核。D6 无第六个面授日，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归，53 节 SSR／DOM 渲染，29 个案例共 54 次复习跳转及返回、本机作答保存、CloudBase 构建和两个托管路径入口通过。主 App `app-g3dlORrA.js`，专注页 `foundation-CxJrpHNN.js`，共享模块 `FoundationPage-YgYlbgfr.js`。
- **发布断点**。正式课程首页返回现有划词入口，尚未检出杯卖自练直达。候选 ZIP 保留两页的公开划词资源。保留 `[skip netlify]` 和 `ignore = "exit 0"`。未部署、未验收线上和手机实机，待现有上海 CloudBase `somm100`、`/somm100` 的已授权发布通路或 WorkBuddy 回执。教学优先核 D5。

---

# Foundation · 2026-11-12 · 点单变更与交接自练

基线 `95b503e7b948618bf56bec6198de252135dcc77f`，分支 `migration/tencent-somm100`。已核对当前源码、迁移说明、来源表、上轮检查点和并发分支头。

- **交付**。`app/FoundationAssessmentPractice.tsx` 新增两轮原创服务情境。先核对客人要求的干型和每杯预算，复述酒款、杯数、价格，再练习把两杯干白改为一杯干白加一份气泡水，核价并向同事交接。题面与参考话术独立折叠。考核索引直达，完整 App 和专注页共用。练习位于正式课后的复习区，保留现有学习记录。
- **来源**。复读产品蓝图、旧 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及 WPS／有道台账。以[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授与侍酒服务考核范围。题面、虚构价格和话术为原创。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍将 D5/D6 日期与时段标为待填。检索未取得确认版逐日课表或 WPS／有道原课件。
- **逐日状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、9 个案例。D1–D4 的面授日次待核。D5 五城日期已核，教学与考核分配待核。D6 无第六天面授，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、点单入口焦点、两轮独立折叠、参考话术和本机记录对照通过。CloudBase 构建及两种托管路径的入口测试通过。主 App `app-MF8YATEe.js`，专注页 `foundation-DDJikLsg.js`，共享模块 `FoundationPage-CsouQ4h7.js`。
- **发布断点**。正式课程首页仍有划词、未检出上轮杯卖自练直达。两份公开划词资源通过已固定 SHA-256 校验，候选 ZIP 保留该接入。保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署或线上验收。待现有上海 CloudBase `somm100` 的 `/somm100` 授权通路或 WorkBuddy 发布回执，保留现有划词接口，并验证线上与手机。教学优先核 D5。

---

# Foundation · 2026-11-12 · 临近开课三道短自查

基线 `28efc3223db90c53d1b99ad3380432633e8c1c74`，分支 `migration/tencent-somm100`。已核对当前源码、迁移说明、发布检查点及并发分支头。

- **交付**。`app/FoundationPrepByCity.js` 为距离首日不足四周及当天开课的学员提供三道原创短自查，分别核对采收在流程中的位置、风格记录分栏、虚构酒标的产地查证。三题各自展开参考判断，回看按钮定位到现有三个概念，完整 App 和专注页共用。4 周／8 周计划、已过首日的课间入口、浏览器学习记录保持原有行为。
- **来源**。复核[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[课前预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)、产品蓝图、已过时 Chapter 00、Guided Learning、D1–D2 清单及 WPS／有道索引。开课日期依据[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。Notion 与文件搜索未取得第22期分时逐日课表、教学考核分配或原课件。
- **逐日状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、9 个案例。D1–D4 对应面授日次待核。D5 五城日期已核，教学与考核分配待核。D6 本期无第六个面授日，2027 年 3 月 14–17 日游学另排。
- **验证**。93 项回归、三道题独立折叠、三个正文定位、当天及开课前后窗口、本机记录对照与 CloudBase 构建通过。主 App `app-DUVmTImm.js`，专注页 `foundation-BkIMko5V.js`，共享模块 `FoundationPage-CVgXXYSR.js`。
- **发布断点**。正式课程首页只读复核仍有划词脚本、无杯卖自练直达。两份线上划词资源通过上轮固定校验值，新候选 ZIP 含 458 个公开文件及两页划词接入。保留 `[skip netlify]` 和 `ignore = "exit 0"`。未部署，仍待现有上海 CloudBase `somm100`、`/somm100` 授权发布或 WorkBuddy 回执。线上、手机实机验收待做。教学优先核 D5。

---

# Foundation · 2026-11-12 · 保留正式站划词与杯卖直达

基线 `af6cd3b4339cf000005ded70421645d24ce736a6`，分支 `migration/tencent-somm100`。已核对源码、迁移说明、上轮检查点、来源表与并发分支头。

- **学员页**。课程首页「学习入口」新增「杯卖库存自练」，直达专注页模拟盘点与交接题。既有正式课区段、报名、讲师、图片和本机记录机制继续沿用。
- **发布候选**。正式 [课程首页](https://www.somm100.cn/course.html) 和 [专注页](https://www.somm100.cn/foundation.html) 均使用同一套已发布的划词 JS 和 CSS。打包脚本新增 `--course-lookup-assets DIR`。目录提供正式站 `/assets/static-word-lookup/` 中的 `static-word-lookup-Cg57t2VV.js` 和 `static-word-lookup-PZF57Ufx.css`，分别按脚本固定 SHA-256 校验。保留字节及既有 `/api/wine-explain` 约定，ZIP 内使用相对资源路径，只增强两页，不改基础构建或主 App。若官方资源版本变化，应重核两页引用与字节后再更新校验值。
- **来源与课表**。复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、课前路径、D1–D2 清单、开班模板及有道／WPS 归档台账。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授与团队酒单任务。Notion 与文件检索仍未取得本期逐日教学、考核分配或 WPS／有道原课件。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、9 个案例。D1–D4 面授对应待核。D5 五城日期已核，教学与考核分配待核。D6 本期无第六个面授日，游学另排。
- **验证**。93 项回归、页面交互、课程首页在根路径和 `/somm100/` 下共 22 次入口定位、CloudBase 构建通过。两个正式资源有损改动会被打包校验拒绝，已实测脚本篡改拒绝。候选 ZIP 含 458 个公开文件，两个页面执行包内划词脚本时通过本地模拟 API 收发。未调用正式 API，未完成线上交互或手机实机验收。
- **发布断点**。保留 `[skip netlify]` 与 `ignore = "exit 0"`。将带划词资源的候选 ZIP 交 WorkBuddy，沿用已授权的上海 CloudBase `somm100` 和 `/somm100`，保留现有 `/api/wine-explain` 路由与相关配置。回收部署回执后验收三入口，核对杯卖直达及两个划词入口。主 App 预期脚本 `app-55XNnkXq.js`，专注页 `foundation-BPWez1Jq.js`，共享 `FoundationPage-Bqq5vqm2.js`。教学优先取得第22期确认版逐日表并核 D5。

---

# Foundation · 2026-11-12 · 杯卖库存自练与正式站对照

基线 `d37a01de3e069ca0f0e4509663e2c7cde7e15ab8`，分支 `migration/tencent-somm100`。已核对当前源码、来源表、迁移说明、上轮检查点和并发分支头。

- **交付**。正式课后续考核复习区新增「杯卖酒单自练｜开餐前还能卖几杯？」。同一组模拟数据分成开餐盘点与缺货更新两步，练习扣除预留、重算可售杯数并向同事及客人交接。题面与参考答案分别折叠。课间综合复盘新增直达入口，完整 App 与专注页复用。浏览器学习记录保留。
- **来源**。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认团队酒单作业为 12 款杯卖酒及 40 款主酒单、五城各五天面授。[运营框架与实施建议](https://chatgpt.com/library?file_id=libfile_075fac1511208191a68dd62a5caeb3b5&account_id=personal)提供酒单服务可行性与小组演练方向，杯量、库存、预留及对话由本项目原创。[资料归档台账](https://app.notion.com/p/40717d16de4c81e580cacdad4d6991e3)仅列 WPS 酒单和学习框架索引，WPS 运营框架公开读取返回 URL 不可访问。已复核产品蓝图、过时 Chapter 00、现行框架、Guided Learning、课前路径、D1–D2 清单和开班模板。仍缺第22期分时教学及考核表与 WPS／有道原课件，优先核 D5。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、9 个案例。D1–D4 专题与当期面授日次待核。D5 五城日期已核实，教学及考核分配待核。D6 本期未列第六个面授日，游学另排。
- **构建验证**。93 项回归、双题折叠、答案为 8／2 杯、课间入口焦点定位及本机记录保留通过。CloudBase 构建、主入口和专注页检查通过，456 个公开文件。候选主入口 `./assets/app-55XNnkXq.js`、专注页 `./assets/foundation-BPWez1Jq.js`、共享模块 `./assets/FoundationPage-Bqq5vqm2.js`。Chromium 启动报 `socket() failed: Operation not permitted`，手机实机待验。
- **正式站实查（11 月 12 日）**。三个入口 HTTP 200。主 App 加载 `/assets/app-C7ABxmed.js` 和 `/assets/FoundationPage-CiZC60Ci.js`。主 App 模块与专注页内联模块均含课间完整日历日，均未检出起泡酒综合自练、杯卖库存自练、两道口试追问、课前风格与产地练习及本周练习返回入口。专注页已有餐配对照、服务实操和盲品橡木复盘，主 App 模块未检出。上述为实际返回资源检查，未执行线上交互。
- **发布断点**。课程首页与专注页正式站均加载额外的 `/assets/static-word-lookup/static-word-lookup-Cg57t2VV.js`，权威分支本次构建的两份 HTML 均未引用该脚本。直接覆盖可能移除现有划词入口。部署前需把该功能与获准源实现对齐，再用现有上海 CloudBase `somm100` 的 `/somm100` 发布并回收回执。上轮 ZIP 为 `d37a01d`，本轮保存本地构建，未覆盖正式站，未做线上交互验收。保留 `[skip netlify]` 和 `ignore = "exit 0"`。

---

# Foundation · 2026-11-12 · 起泡酒自练回看正文与发布包

基线 `e19ba8082f97eaaa86b472c95c016097f2653bc9`，分支 `migration/tencent-somm100`。核对源码、迁移说明、上轮检查点和来源表。

- **交付**。起泡酒综合自练接入两个学习入口，分别定位到 D4-03「瓶中二次发酵与补液」和 D4-04「瓶式与罐式工艺」。点击后键盘焦点到正文，模拟记录和已展开答案保留，已有勾选和作答保留。两个入口均由完整 App 和专注页复用。
- **来源**。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径与开班模板。新增入口对照[D4-03 传统法](https://app.notion.com/p/40717d16de4c81e0b72be94950521689)和[D4-04 起泡酒风格比较](https://app.notion.com/p/40717d16de4c8180bb3ed067f5e4373a)。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认每城五天面授。Notion 检索只找到相关模板、产品说明及历史班期，仍缺当期逐日教学与考核分配。
- **逐日状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、9 个案例。D1–D4 对应当期面授日次待核。D5 五城日期核实，教学及考核分配待核。D6 第22期无第六个面授日，游学另排。
- **验证**。93 项回归通过；页面交互核对两个 D4 目标、焦点与滚动、已展开内容和本机记录，除复习单元位置外记录一致。CloudBase 构建、主 App 与专注页检查通过，456 个公开文件。主 App `./assets/app-BO81ofqJ.js`，专注页 `./assets/foundation-0cwgIIZ8.js`，共享课程模块 `./assets/FoundationPage-RHWFq_jV.js`。手机实机待验。
- **发布断点**。保留 `[skip netlify]` 与 `ignore = "exit 0"`。正式站主入口和专注页的公开读取均返回 URL 不可访问。目标仍为现有上海 CloudBase 应用 `somm100` 的 `/somm100`，发布待已授权通路或 WorkBuddy 回执。拿到回执后核对 `/course.html`、`/foundation.html`、`/#foundation` 和上述入口脚本。课程侧继续核对第22期逐日表及 WPS／有道原课件，优先 D5。

---

# Foundation · 2026-11-12 · 起泡酒课间综合自练

基线 `213b0887faf01cd94be02c5194d249646f0e0a8d`，分支 `migration/tencent-somm100`。已核对源码、迁移说明、上轮检查点和来源表。

- **交付**。第二阶段后的综合复盘新增「起泡酒综合自练」入口，定位到考核复习区。学员用同一组虚构样本练盲品观察、笔试核对工艺记录和口试解释。模拟记录及三项参考判断独立折叠，不改变本机记录。页面明确正式题目、时段与评分以课程方通知为准。
- **来源**。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径及开班模板。三项考核形式见[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，工艺依据[D4-03 传统法](https://app.notion.com/p/40717d16de4c81e0b72be94950521689)与[D4-04 起泡酒风格比较](https://app.notion.com/p/40717d16de4c8180bb3ed067f5e4373a)原创改写。Notion 检索未找到当期分时课表及讲师原课件。
- **逐日状态**。D1 10 节、25 道自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道自测、5 个复盘。D3 13 节、30 道自测、8 个复盘。D4 15 节、45 道自测、9 个复盘。D1–D4 对应当期面授日次待核。D5 五城日期已核实，教学及考核分配待核。D6 第22期只列五天面授，游学另排。
- **验证**。93 项回归通过，React/jsdom 验证三项自练、模拟记录与答案独立展开、课间入口定位和本机记录保留。CloudBase 构建及主 App、专注入口检查通过，456 个公开文件。主入口 `./assets/app-DJ1HYkM3.js`，专注页 `./assets/foundation-CcebEXFg.js`。手机实机未验。
- **接续**。保留 `[skip netlify]` 和 `ignore = "exit 0"`。本轮未部署，正式站课程首页公开读取返回 URL 不可访问。最近持久保存的 WorkBuddy ZIP 对应 `721430a`，上线前须以新提交重新构建打包。发布仍待已授权 CloudBase 通路或 WorkBuddy 回执。教学仍缺第22期确认版逐日课表与 WPS／有道原课件，先核 D5。

---

# Foundation · 2026-11-12 · 五城课间日期与复习节奏

基线 `721430ae6afa170db3f3e25d80dd8b68d89d774f`，分支 `migration/tencent-somm100`。已读权威源码、迁移说明和上轮检查点。

- **交付**。五城课间复习区在选择城市后显示两次课间的上一阶段末日、下一阶段首日和完整间隔。第一段五城均为 12 个完整日历日，第二段为 30–33 日。第一段按开班模板表述为「约两周复习与预习」。21 天自选复习资源保留原学习日和本机记录。移除课前页将三周写作固定桥接周期的提示。
- **来源**。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单及课前路径。日期逐城对照[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，约两周节奏见[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)。Notion 检索未取得本期确认版逐日课表。
- **逐日状态**。D1 10 节、25 道自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道自测、5 个复盘。D3 13 节、30 道自测、8 个复盘。D4 15 节、45 道自测、9 个复盘。D1–D4 对应本期日次待核。D5 五城日期已核实，教学与考核分配待核。D6 本期未列第六个面授日，游学另排。
- **验证**。93 项回归，5 城共 10 段课间边界和日数、城市切换后自选学习日和本机记录保留、App 与专注入口、CloudBase 构建通过。456 个公开文件，主入口 `./assets/app-DmY7fISF.js`，专注页 `./assets/foundation-hAAY_IQ9.js`。手机实机未验。
- **接续**。保留 `[skip netlify]` 和 `ignore = "exit 0"`。本轮未部署，正式站课程首页公开读取返回 URL 不可访问。上轮 WorkBuddy ZIP 为 `721430a`。线上仍待已授权的 CloudBase 通路或 WorkBuddy 回执。教学先核 D5，仍需第22期确认版逐日课表和 WPS／有道原始课件。

---

# Foundation · 2026-11-12 · 从案例回到本周练习

基线 `b0675894ddc60090afe384587bfdafb8072478a7`，分支 `migration/tencent-somm100`。已核对部署分支、迁移说明、上轮检查点、页面和来源表。

- **交付**。从周次入口打开四道葡萄园与酒窖练习后，题内新增「返回本周练习入口」，回到刚才的按钮并恢复键盘焦点。题面与参考判断保持展开状态，浏览器记录不变。原周次离开当前预习视图时隐藏返回入口。完整 App 与专注页共用此路径。
- **来源**。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单、[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)和[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)。第22期招生正文第 6–7 页确认五城面授为五天。Notion 未找到当期逐日主题和考核分配。
- **逐日状态**。D1 10 节、25 道自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道自测、5 个复盘。D3 13 节、30 道自测、8 个复盘。D4 15 节、45 道自测、9 个复盘。D1–D4 对应本期面授日次待核。D5 五城日期已核实，教学及考核分配待核。D6 本期未列第六个面授日，游学另排。
- **验证**。93 项回归、4 周与 8 周共八次案例往返、键盘焦点及本机记录保留通过。CloudBase 生产构建和两个入口的离线检查通过，456 个公开文件，主入口 `./assets/app-wp1yteOZ.js`，专注页入口 `./assets/foundation-C6yW_2EV.js`。手机实机未验。
- **接续**。保留 `[skip netlify]` 和 `ignore = "exit 0"`。本轮未部署。正式站课程首页公开读取返回 URL 不可访问。发布仍待已授权 CloudBase 通路或 WorkBuddy 部署回执。教学仍需第22期确认版逐日课表及 WPS／有道原课件，先核 D5。

---

# Foundation · 2026-11-12 · 从预习周次直达四道练习

基线 `cceed53411f4d132c36ae0a79fd53e1a223a5f67`，分支 `migration/tencent-somm100`。已读迁移说明、上轮检查点、权威分支源码与来源表。恢复本地完整工作副本并按锁文件安装依赖。

- **交付**。4 周和 8 周预习均可从对应学习单元直接打开四道课前练习。原第 3 周连接雨后积水和叶幕管理，原第 4 周连接发酵记录，原第 5 周连接熟成容器。点击后滚动并聚焦题目标题，保留参考判断的折叠状态。沿用既有 ID 与本机记录结构。17 篇公众号导读、讲师、既有图片和五城日历继续保留。
- **来源**。复读产品蓝图、过时 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、D1–D2 清单、[预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)与[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)。预习第 3–5 周对应环境与成熟、酿造、发酵后工艺。第22期招生正文第 6–7 页重新核对。Notion 和公开检索未找到当期确认版逐日教学安排。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘。D3 13 节、30 道综合自测、8 个复盘。D4 15 节、45 道综合自测、9 个复盘。D1–D4 对应面授日次待核。D5 五城面授日期已核实，教学及考核分配待填。D6：第22期招生正文只列五天面授，另有四天游学。
- **验证**。93 项回归通过，真实 React 和 jsdom 验证四道题、两个节奏共八次定位、答题记录保留、62 次准备度错题往返。CloudBase 构建和入口检查通过，共 456 个公开文件，主入口 `./assets/app-mBRh_gvs.js`，专注页 `./assets/foundation-DbbiadL3.js`。Chromium 启动报告 `socket() failed: Operation not permitted (1)`，手机实机未验。
- **接续**。保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署。正式站课程首页公开读取返回 URL 不可访问，发布待已授权 CloudBase 通路或 WorkBuddy 部署回执。教学优先核 D5，仍缺第22期确认版逐日课表及 WPS／有道原始课件。

---

# Foundation · 2026-11-12 · 葡萄园与酒窖证据自查

基线 `f1de25a09e143147a87b84af82910bef7d7c99c3`，分支 `migration/tencent-somm100`。已读权威分支的迁移说明、上轮检查点、课程入口、课前路径与来源表。

- **交付**。在完整 App 与专注页共用的「葡萄与葡萄园」和「葡萄怎么变成酒」各加两道原创练习，共四道。案例分别核对雨后积水、叶幕遮阴、发酵气泡与检测记录、熟成容器与木香。学生先从虚构记录写出能确认的观察，再展开参考判断。沿用原概念 ID、预习跳转和本机学习记录，既有 17 篇公众号导读继续保留。
- **来源**。复读产品蓝图、标为过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、D1–D2 清单和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。案例据[D1-03 环境与成熟](https://app.notion.com/p/40717d16de4c81b581a8d85b7ff77709)、[D1-04 葡萄园选择](https://app.notion.com/p/40717d16de4c8143b199fb57a899a5f5)、[D1-06 发酵](https://app.notion.com/p/40717d16de4c814c93b7c56d250d1aea)及[D1-08 发酵之后](https://app.notion.com/p/40717d16de4c81bca48fff8dbdb56587)原创编写。归档台账只提供历史材料，WPS 运营框架链接的公开读取仍返回 URL 不可访问。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘。D3 13 节、30 道综合自测、8 个复盘。D4 15 节、45 道综合自测、9 个复盘。D1–D4 主题对应本期面授日次待核。D5 五城日期已核实，教学与考核分配待填。D6 本期招生正文列五天面授，四天游学另排。[招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal) · [开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)
- **验证**。从同一 GitHub 提交恢复需要的源文件，核对 Git blob。7 项 Foundation 预习回归通过。使用组件函数和模拟 React 元素验证 2 个节点、4 道题的折叠结构及 17 篇导读；完整页面回归脚本已加覆盖并通过语法检查。此前工作副本及依赖已被清理，当前只恢复了范围内文件，本轮未运行完整构建、真实 React 页面及手机验收。
- **接续**。保留 `[skip netlify]` 及 `ignore = "exit 0"`。本轮未部署，正式站课程首页的公开读取返回 URL 不可访问。上轮可用 WorkBuddy ZIP 对应 `f1de25a`，包括五城日历。要纳入本轮四道题，需从新提交完整构建并重新打包。仍需第22期确认版逐日课表及 WPS／有道原始课件，先核 D5；发布待已授权 CloudBase 通路或 WorkBuddy 回执。

---

# Foundation · 2026-11-12 · 第22期五城面授日历

基线 `4b2061c90cce11776505e91cf141a92d09aadb82`，分支 `migration/tencent-somm100`。已读上轮检查点、迁移说明、课前来源表、当前源码并核对远端。

- **交付**。第22期五城班期卡在课程首页、完整 App 和 Foundation 专注页增加城市面授日历下载。CloudBase 构建从现有班期资料生成五个 `.ics`，每城五条，共 25 条。日期按阶段先后，时间为 09:00–16:30（北京时间），使用稳定事件 ID。下载包含已核实面授日期和时间。考核、教室和游学行程仍由课程方另行通知。页面保留讲师、既有课程入口、报名和资料，日历无需登录或写入学习记录。
- **证据**。复读[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，逐城复核三阶段日期及统一时间。复读产品蓝图、过时 Chapter 00、现行框架、Guided Learning、D1–D2 清单和课前路径。Notion 检索、[全流程总控](https://app.notion.com/p/40717d16de4c81ef9be0e1d6579a9592)、[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)与[归档台账](https://app.notion.com/p/40717d16de4c81e580cacdad4d6991e3)仍只有历史恢复材料和工作草案。台账中的 WPS《Somm 100 运营框架》原始链接公开读取返回 URL 不可访问，D1–D6 现行 PPT 仍无可读原件。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘。D3 13 节、30 道综合自测、8 个复盘。D4 15 节、45 道综合自测、9 个复盘。D1–D4 专题对应当期日次待核。D5 五城日期已核实，教学与考核分配待核。D6：第22期为五天面授，另有四天游学。
- **验证**。93 项回归和 React／jsdom 页面验证通过。CloudBase 构建含 456 个公开文件。验证五份日历的 25 个不同事件、北京时间到 UTC 转换、根路径及 `/somm100/` 下的下载链接，课程首页保持静态。主入口 `./assets/app-CAQxTGMR.js`，专注页入口 `./assets/foundation-DPQI97Pg.js`。Chromium 启动报告 `socket() failed: Operation not permitted (1)`，手机日历实机导入待验。
- **接续**。保留 `[skip netlify]` 及 `ignore = "exit 0"`。未部署，正式站课程首页公开读取返回 URL 不可访问，未发现 WorkBuddy 发布回执。现有 WorkBuddy ZIP 对应 `3cfeefe`，发布新增练习及日历应从本轮提交重新构建。继续取得已授权腾讯发布通路或回执，再测线上下载及手机导入；教学仍需第22期确认版逐日课表和 WPS／有道原始课件，先核 D5。

---

# Foundation · 2026-11-12 · 法国产地入门自查

基线 `3cfeefe2977161b429f319928db4dc39dbcfd188`，分支 `migration/tencent-somm100`。已核对远端、迁移说明、现行源码与上轮发布记录。

- **交付**。完整 App 与专注页共用的「葡萄酒来自哪里」新增三道原创练习。学生按法国、卢瓦尔河谷、桑塞尔区分地理层级，对照波尔多和南罗讷河谷的成熟季线索，并用虚构标签练习从产地或品种切入阅读。题干和参考判断可分别折叠，复用现有概念锚点与错题返回。展开练习不写入学习记录。
- **来源**。复读产品蓝图、过时 Chapter 00、现行课前框架、Guided Learning、D1–D2 清单及课前路径。练习据[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)与[F-01 法国入门](https://app.notion.com/p/40717d16de4c812a91a9e646c9e10af3)原创编写。地理与气候交叉核对 [INAO 桑塞尔](https://www.inao.gouv.fr/node/7648)、[波尔多葡萄酒行业协会](https://www.bordeaux.com/en/designations/)及[罗讷河谷葡萄酒行业协会](https://www.vins-rhone.com/en/aoc-cotes-du-rhone-villages)。重读[有道归档《如何学习一个产区》](https://app.notion.com/p/3fb17d16de4c81f4bf93e60f947ec524)，归档的来源链接字段为空，正文未找到本篇公众号地址，学员页导读共 17 篇。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘。D3 13 节、30 道综合自测、8 个复盘。D4 15 节、45 道综合自测、9 个复盘。D1–D4 对应当期日次待核。D5 五城日期已核实，教学及考核分配待核。复读[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，第 22 期为五天面授，游学另排。课表检索未找到确认版，[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)的教师分配及 D5/D6 时段待填。
- **验证**。93 项回归通过。React 与 jsdom 验证三道题及其答案独立展开、原预习记录保留、62 次错题往返及 17 篇导读。CloudBase 构建及三个入口检查通过，共 451 个公开文件。主 App `./assets/app-EHGXLWu_.js`，专注页 `./assets/foundation-fY9YrRn0.js`。构建仍有大于 500 kB 的分包提示，手机实机待验。
- **接续**。保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署，正式站首页与专注页的公开读取均返回 URL 不可访问。未找到 WorkBuddy 部署回执。上轮 ZIP 对应 `3cfeefe`，本轮三题需从新提交重建后随 CloudBase 发布。取得已授权通路或回执后核对线上脚本。教学先核 D5，仍缺第 22 期确认版课表和 WPS／有道原课件。

---

# Foundation · 2026-11-11 · 品酒导读与三组风格词练习

基线 `ba9317af25b3149571ee4fab04823f9c2dc6dfc6`，分支 `migration/tencent-somm100`。已核对迁移说明、上轮检查点和远端。

- **交付**。「为什么葡萄酒喝起来不一样」新增《为什么学习品酒》的公众号导读，完整 App、专注页和课程首页共用，课前合计 17 篇。完整 App 与专注页新增三组虚构观察，练习把果香与甜度、酸度与单宁、酒体与酒精度分栏记录。答案独立折叠，展开无本机记录写入。
- **来源**。复读产品蓝图、过时 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、D1–D2 知识点及课前路径。由 Guided Learning 定位[有道归档](https://app.notion.com/p/3fb17d16de4c814991dfe13fe63b4975)，核对文章标题及公众号地址，仅保留文章识别参数。公开网页读取工具返回空内容及错误，微信端待实开。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘。D3 13 节、30 道综合自测、8 个复盘。D4 15 节、45 道综合自测、9 个复盘。D1–D4 对应当期日次待核。D5 五城日期已核实，教学及考核分配待核。第 22 期招生正文列五天面授，游学另排。[第 22 期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)
- **验证**。93 项回归通过。真实 React 与 jsdom 验证 17 篇链接、3 组新题及本机记录保留、专注页与课程首页、46 道原题及收藏回读。CloudBase 构建通过，451 个公开文件。主 App 入口 `./assets/app-kvJZjaYo.js`，专注页入口 `./assets/foundation-DIr4wRuK.js`。构建仍提示大于 500 kB 的分包。手机实机及线上待验收。
- **接续**。保留 `[skip netlify]` 和 `ignore = "exit 0"`。本轮未部署。待取得已授权 CloudBase 发布通路或 WorkBuddy 部署回执，核对三个正式入口实际加载的版本。Notion 搜索第 22 期逐日课表仅找到历史班期和开班模板，模板 D5／D6 待填。仍需第 22 期确认版逐日课表和 WPS／有道原始课件，先核 D5。

---

# Foundation · 2026-11-11 · 口头自练题目列表

基线 `ca8d0515351de28b5d68946d78aceb0a5d60b7f9`，分支 `migration/tencent-somm100`。核对迁移说明、上轮检查点及远端。CloudBase 配置仍指向现有上海 `somm100` 应用、`/somm100`。

- **本轮交付**。Foundation 的「课程口头自练」直达完整 App 内的 `#foundation-recall`。已收录的 46 道 SOMM100 原始短答题按酿造、种植连续编号，题干展开答案和来源，☆／★ 单独控制收藏。仅有「全部题目」及「收藏（数量）」两种练习视图。题号在收藏视图保留。刷新后按既有学习记录恢复收藏，答案回到默认折叠。保存失败时星标与计数回退并提示。复用既有题目 ID 与学习保存接口。现有选择题及其他课程入口保持原流程。
- **来源**。[测验界面交接 v2](https://chatgpt.com/library?file_id=libfile_fde3_f-b274d2c259e4819196f0e82abf1b3653_b2ddb2a4048481919ef2b16c1d3ebd23&account_id=personal)的 Markdown 与文本两版均已读。题目来自当前 `data/curriculum.json` 的 SOMM100 短答原题，题干、答案与来源不改。复读产品蓝图、旧 Chapter 00、现行框架、Guided Learning、D1–D2 清单、课前路径和开班模板。D5/D6 仍待填写。
- **专题状态**。D1 10 节、25 道综合自测、5 个复盘案例。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘案例。D3 13 节、30 道综合自测、8 个复盘案例。D4 15 节、45 道综合自测、9 个复盘案例。D1–D4 对应面授日次待核。D5 五城日期已核实，教学与考核分配待核。第 22 期招生资料未列第六天面授，游学另排。
- **验证**。93 项 Foundation、题库及学习存储回归通过。真实 React 与 jsdom 验证 46 道现有题、100 道合成题、答案与收藏独立、重挂载恢复、清空收藏视图和写入失败回退。新组件独立类型检查通过。全库类型检查仍在既有的 `FoundationBackup` 属性推断与缺失 `.openai/hosting.json` 处报错。CloudBase 构建 451 个公开文件，主入口 `./assets/app-5PkSUzSD.js`，专注页入口检查通过。Chromium 启动失败并报告 `socket() failed: Operation not permitted (1)`，桌面浏览器、手机尺寸视觉和实机待验收。
- **接续**。保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署或线上验收，CloudBase 访客收藏保存在浏览器。发布待已授权通路或 WorkBuddy 回执。逐日课程仍缺第 22 期确认版课表及 WPS／有道原始课件，先核 D5，再核 D1–D4。

---

# Foundation · 2026-11-11 · 课前三组酒标核对练习

基线 `dec65fb29b9d8c91c8d8733d865ebd8b776ca4a8`，分支 `migration/tencent-somm100`。已读迁移说明、上轮检查点和当前代码，开工前核对远端。

- **本轮交付**。「怎么读懂一瓶酒」新增三个虚构案例。对照瓶身与不同年份的网页，区分品牌、装瓶方和生产者，判断何时将品种或干甜留待核实。每题有两条资料、一道自查和可独立展开的参考判断。共用课前页接入，既有锚点、错题返回和浏览器进度保留。
- **来源与缺口**。复读[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 清单](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)与[D1-10 酒标](https://app.notion.com/p/40717d16de4c81108c65e16da8465979)。已读有道迁移的《了解一瓶酒的信息》归档正文，页尾链接属于其他文章，未找到本篇公众号直链。练习为原创，学员页没有使用归档文字、图或链接。复读产品蓝图，旧 Chapter 00 仍标为过时。检索「第22期 教学安排」未见确认版逐日课表，[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)的 D5/D6 仍待填。
- **专题状态**。D1 10 节、25 道综合自测、5 个复盘案例。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘案例。D3 13 节、30 道综合自测、8 个复盘案例。D4 15 节、45 道综合自测、9 个复盘案例。对应本期面授日次待核。D5 五城日期已核实，教学与考核分配待核。第 22 期招生资料未列第六天面授，游学另排。
- **验证与接续**。87 项回归、三题的题面与答案分别展开、62 次准备度错题往返及本机记录保留通过。CloudBase 构建通过，共 451 个公开文件，入口 `./assets/app-DkJ178H7.js`，主入口、专注页检查通过。构建仍提示大于 500 kB 的分包。保留 `[skip netlify]` 与 `ignore = "exit 0"`。本轮未部署，线上及手机实机待验收。发布仍待已授权的 CloudBase 通路或 WorkBuddy 回执。逐日课程仍缺第 22 期确认版课表及 WPS／有道原始课件，先核 D5 教学与考核安排。

---

# Foundation · 2026-11-11 · 六个核心品种学习卡

基线 `00f0e6efc6bc01432f423574654e3a41b9845726`，分支 `migration/tencent-somm100`。核对远端分支、现有代码和上轮检查点。

- **本轮交付**。课前「核心葡萄品种」加入霞多丽、长相思、雷司令、黑皮诺、赤霞珠和西拉六张折叠卡。每张按结构、气候与成熟度、酿造选择、经典产区编排，并有一个口头自查问题。六篇公众号原文各配原创阅读理由，课程首页的导读同步从 10 篇增至 16 篇。共用概念页保留 `foundation-5`、错题返回入口、原有记录和其他章节锚点。
- **来源与取舍**。重读[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[课前路径第六周](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)、[D1–D2 清单](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)及既有 D2-02 至 D2-07 主题。六条标题与原文链接来自 [Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3) 指向的历史资料，逐条登记于 `data/foundation-source-map.json`，学员端链接指向公众号。公开网页读取六条原文时工具返回 `isError:true` 且 `content:[]`，微信内可达性待验。卡片内容为原创概括。产品蓝图和旧 Chapter 00 已复读，后者仍属过时原型。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘案例。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘案例。D3 13 节、30 道综合自测、8 个复盘案例。D4 15 节、45 道综合自测、9 个复盘案例。D1–D4 对应当期面授日次仍待核对。D5 五城日期已核实，教学与考核分配待确认。第 22 期招生资料未列 D6 面授，游学另排。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)的 D5/D6 仍待填。
- **验证**。87 项回归通过。完整页面检查覆盖六卡折叠、四个学习字段、16 条导读与来源对应、62 次错题往返及本机记录保留。CloudBase 构建及主入口、专注页检查通过，共 451 个公开文件，主入口 `./assets/app-cage9wo1.js`。构建提示有超过 500 kB 的分包。保留 `[skip netlify]` 和 `ignore = "exit 0"`。
- **接续**。本轮未部署。线上及手机实机待验收，微信原文待实际打开。发布仍待已授权的现有 CloudBase 通路或 WorkBuddy 发布回执。逐日课程仍缺第 22 期确认版课表及 WPS／有道课件，先核 D5 教学与考核分配，再核 D1–D4。

---

# Foundation · 2026-11-11 · 准备度错题回看与返回原题

基线 `0514a523778672721a2e8efe607cd588107daa91`，分支 `migration/tencent-somm100`。已核对本地和远端、迁移说明与上一轮检查点。

- **本轮交付**。前 25 道准备度题依据题意关联到现有课前概念，答错可直达相应概念及其原有延伸阅读。最后 6 道世界产区及酒类预览题回到已覆盖考点的第 8 组知识提要。31 道题均可由知识提要返回原题。概念页也提供返回按钮，重开对应题组并定位原题。两种预习节奏共用题目、概念及浏览器本机作答记录。回看位置只在当前页面保留。保留已有题号、概念锚点和记录键。
- **来源与边界**。依据[准备度检测的错题处理](https://app.notion.com/p/40717d16de4c81a4bd1df5ceede99a46)和[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)，重读产品蓝图、旧 Chapter 00、Guided Learning、D1–D2 清单和课前预习路径。25 项概念对应是根据现行题意和现有章节做的编辑关联。第 8 组仍为预览。检索「第22期 讲师日程」未取得正式课表，开班模板 D5/D6 仍待填。班期依据此前已核读的[第22期招生正文](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘案例。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘案例。D3 13 节、30 道综合自测、8 个复盘案例。D4 15 节、45 道综合自测、9 个复盘案例。D1–D4 对应当期日次仍待核实。D5 五城日期已核实，教学与考核分配待确认。第22期招生资料未列第六天面授，游学另排。
- **验证**。87 项回归通过，完整页面脚本验证 4 周与 8 周各 31 次错题回看往返，包含回看时切换节奏和跨周返回、题目焦点、改答及首次答案保留。CloudBase 生产构建通过，451 个公开文件，入口 `./assets/app-BKikOXbz.js`，根路径、`/somm100/` 与专注页检查通过。构建仍提示大于 500 kB 的分包。手机实机与线上待验收。
- **接续**。保留 `[skip netlify]` 和 `ignore = "exit 0"`。本轮未部署。取得第22期确认版逐日课表、WPS／有道课件后先核 D5，再核对 D1–D4。发布仍待现有 CloudBase 已授权通路或 WorkBuddy 回执，先核对三个线上入口实际加载的版本。

---

# Foundation · 2026-11-11 · 三道课后笔试案例

基线 `2f6ff5916aaf7c49699d60b5c304adbf7f25ea05`，分支 `migration/tencent-somm100`。复核现行 Foundation 框架、Guided Learning、D1–D2 清单、课前路径与上轮检查点。旧 Chapter 00 仍标为早期原型。

- **新增**。完整 App 和专注页共用的「考核范围与复习索引 → 笔试案例自练」增加三道原创案例，每道含两张虚构资料卡、三问、折叠参考答案和对应章节回看入口。霞多丽案例区分苹果酸乳酸转化与细酒泥接触，圣托里尼与托卡伊案例练习把地名、品种与干甜证据分栏，加强酒案例比较中途加强与发酵后加强再调配。原笔试案例及其 ID 保留。展开案例和答案不会写入浏览器记录。跳转沿用现有的单元定位，只更新该专题当前单元。
- **来源**。题目依据[霞多丽知识提要](https://app.notion.com/p/40717d16de4c81dfa152f98ad58b5f82)、[希腊与匈牙利知识提要](https://app.notion.com/p/40717d16de4c81e38fcadf0fca5a0cf7)和[加强酒工艺提要](https://app.notion.com/p/40717d16de4c81c0aee5ed55c07ee9bc)。课后自练属于独立复习区。沿用此前已读的[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认的笔试范围与五天面授安排。
- **课表缺口**。Notion 检索「第22期 课表」「SOMM100 D5」并读回候选。开班模板 D5/D6 待填，11 月月度计划是员工训练模板，研发简报的六日顺序等待 WPS 原始 PPT 校准。历史有道入口仍缺第22期确认版逐日课表及课件。本次未按研发草案分配面授内容。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60) · [研发简报](https://app.notion.com/p/40617d16de4c8119996fdc9fa87bd657)
- **逐日状态**。D1 10 节、25 道综合自测、5 个复盘案例。D2 9 个品种、6 个法国专题、42 道综合自测、5 个复盘案例。D3 13 节、30 道综合自测、8 个复盘案例。D4 15 节、45 道综合自测、9 个复盘案例。D1–D4 对应第22期日次仍待确认。D5 五城日期已核实，教学及考核分配待核。第22期招生资料未列 D6 面授，游学另排。
- **验证与发布**。87 项回归通过。完整页面验证 12 道笔试子题（原 3 道及新增 9 道）、3 个新章节跳转、答案折叠及本机作答记录保留。CloudBase 构建 451 个公开文件，入口 `./assets/app-B4KqROXg.js`，根路径、`/somm100/` 与专注页检查通过。保留 `[skip netlify]` 和 `ignore = "exit 0"`。构建仍提示大于 500 kB 的分包。未执行腾讯发布、手机视觉验收和线上验收。
- **下一断点**。获取第22期确认版逐日课表和 WPS／有道原始课件，优先核对 D5 教学与考核。取得已授权的 CloudBase 发布通路或 WorkBuddy 发布回执后，复核当前正式域名所用版本，再验收新练习和本机记录。已交接的 WorkBuddy ZIP 仍对应 `0ec1ebe`，本轮功能使用本分支的新提交重新构建。

---

# Foundation · 2026-11-11 · 从知识点返回刚才复盘案例

基线 `0ec1ebe49a264ee893212622860edbcdcb508dc7`，分支 `migration/tencent-somm100`。开工和提交前均核对远端并发更新。

- **实际改动**。D1–D4 的 27 个综合复盘案例新增可聚焦标题。点击任一「回看第 N 节」，相邻知识单元的返回按钮显示「返回刚才案例」，打开复盘并定位到该案例。当前单元和跨单元均可返回，参考答案的展开状态保留。课程导览的「案例」仍打开整体目录。定位只随当前页面保留，学习进度、首次与最近答案沿用既有本机记录。原章节与记录 ID 保留。改动覆盖完整 App 和共用 Foundation 专注页。
- **来源与缺口**。重读产品蓝图、过时 Chapter 00、现行课前框架、Guided Learning、D1–D2 清单、课前路径及开班模板。中文理解、自查和回到知识点的要求继续适用。开班模板的 D1–D6 教师与主题仍待填。此前实际读取的第22期招生正文确认五天面授与另排游学；本轮未引入新的招生事实。确认版逐日教学课表和原始课件仍缺。
- **逐日状态**。D1 10 节、25 道综合自测、5 个案例。D2 9 个品种、6 个法国专题、42 道综合自测、5 个案例。D3 13 节、30 道综合自测、8 个案例。D4 15 节、45 道综合自测、9 个案例。以上专题与本期面授日次对应待核。D5 已有五城日期，教学和考核分配待核。第22期未列 D6 面授，游学另排 2027 年 3 月 14–17 日。
- **验证**。87 项回归、53 单元真实 React 渲染、27 案例的全部 54 次往返、折叠重开、焦点与滚动目标、自查与首次／最近答案保留均通过。同步更新此前渲染脚本遗漏的 D4 第九案例覆盖。页面、专注入口、根路径与 `/somm100/` 检查和 CloudBase 生产构建通过。详情见 `docs/qa/foundation-recap-return-20261111.json`。构建仍有大于 500 kB 的分包提示。真实浏览器布局、手机及线上验收待做。
- **交付边界**。本轮保存并提交源码，未部署。本轮没有改写已交付的 `SOMM100_CloudBase_0ec1ebe.zip`，该包继续对应 `0ec1ebe`。本次返回定位需采用更新提交重新构建后发布。当前仍缺可用的已授权腾讯发布通路及 WorkBuddy 发布回执。保留 `[skip netlify]` 与 `ignore = "exit 0"`。
- **下一断点**。WorkBuddy 若已发布，先取得回执并核对 `/course.html`、`/foundation.html` 与 `/#foundation` 实际脚本，再验收新版案例往返与本机记录。继续查确认版逐日课表，优先核 D5 教学／考核，再核 D1–D4 专题对应。

---

# Foundation · 2026-11-11 · 线上差异与 WorkBuddy 发布包

基线 `327da5961a783a28cdcd06e956708d74e1978100`，分支 `migration/tencent-somm100`。

- **线上复查**。11 月 11 日北京时间上午实开正式站三个入口，课程首页、主 App 和专注页均可打开。主 App 加载 `./assets/app-B9s619t1.js`，D1–D4 案例分别为 3、3、4、5。专注页为 5、5、6、7。部署分支为 5、5、8、9，合计 27。主 App 待补 12 个案例，专注页待补 4 个，后者为前者的子集。142 道综合自测已在线可见。本轮两个线上学习入口都未显示课前待复习题直达、D1–D4 导览作答统计及继续入口，也未显示酒精度与残糖、白诗南品种与干甜的两道口试追问。主 App 另缺两道餐配对照、一组服务实操和盲品橡木证据复盘。
- **发布前合并**。正式课程首页已有直达报名、招生原文、五城讲师简介和六个本地资料入口。已将这些入口与主 App 侧栏的课程首页链接合回权威分支。报名表和原文沿用 `data/foundation-cohort22.json`，六个资料路径在 CloudBase 构建中均存在。新版课程首页仍保留 10 篇公众号导读和 10 个 Foundation 章节入口。
- **发布验收**。本地 CloudBase 构建 451 个公开文件，主 App 入口 `./assets/app-DNYJdWjr.js`，专注页入口 `./assets/foundation-p-er6Zj6.js`。两个托管路径的报名地址、课程链接、班期和浏览器记录回读通过。交接目标是现有上海 CloudBase 应用 `somm100` 的 `/somm100`，同域保留已有服务和资源。需回收腾讯部署记录并按上述入口对照。保留 `[skip netlify]` 和 `ignore = "exit 0"`。
- **课程缺口**。第 22 期按招生资料安排五天面授。D1–D4 专题与本期日次对应、D5 教学及考核分配仍需确认版课表及原始课件。第六天面授未安排，游学另列为 2027 年 3 月 14–17 日。

---

# Foundation · 2026-11-11 · D3–D4 四个证据复盘案例

基线 `89da5dafb2dda3f043c82667fadc268936fa19ef`，分支 `migration/tencent-somm100`。

- **交付**。`app/FoundationD3Recap.js` 新增浅色红酒的结构观察、发酵前风干与发酵中果皮接触两题。`app/FoundationD4Recap.js` 新增传统法两次加液及北美酒庄地址与葡萄来源两题。四题均用模拟记录，有可展开参考答案和两个章节入口。课程导览的「案例」直接打开综合复盘。修正 D3 复盘导语的旧案例数量，标题继续显示实际数量。
- **来源**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、旧 Chapter 00、[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)与[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。四题依据[皮埃蒙特](https://app.notion.com/p/40717d16de4c81ad8293cb31b5750566)、[威尼托](https://app.notion.com/p/40717d16de4c8185b523dc664e1cd618)、[托斯卡纳](https://app.notion.com/p/40717d16de4c81b089c0d6b8912a13ff)、[香槟基酒](https://app.notion.com/p/40717d16de4c8154ba99f2c3911a2370)、[传统法](https://app.notion.com/p/40717d16de4c81e0b72be94950521689)、[世界产区比较](https://app.notion.com/p/40717d16de4c81d4aaa0f7e7522eb3c8)和[北美](https://app.notion.com/p/40717d16de4c81988e3ec639a461cb1b)知识点原创编写，归入专题复习。
- **课表缺口**。核读[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)、[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)、[历史有道笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)及[运营框架建议](https://chatgpt.com/library?file_id=libfile_075fac1511208191a68dd62a5caeb3b5&account_id=personal)。招生正文列出五天面授日期，开班模板逐日主题待填，运营建议援引现行课表但未附课表。当前仍缺确认版逐日教学课表与 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、8 个案例。D4 15 节、45 道自测、9 个案例。D1–D4 专题与当期面授日次的对应待核对。D5 五城第五天日期已核实，教学与考核分配待确认。第 22 期无 D6 面授，2027 年 3 月 14–17 日产区游学另排。
- **验证与接续**。87 项 Foundation 回归、53 个单元渲染、四个新答案展开和八个新章节跳转通过，本机勾选及答案保留。CloudBase 构建 451 个文件，App 入口 `./assets/app-DMrAV7Hc.js`，专注入口 `./assets/foundation-p-er6Zj6.js`。本轮正式站 `/course.html` 公开读取返回 `URL is not accessible via this tool`。腾讯发布仍缺可用的已授权通路，线上及手机待验收。保留 `[skip netlify]` 和 `ignore = "exit 0"`。

---

# Foundation · 2026-11-11 · 导览自测进度与待复习题直达

基线 `6fa6e2db70f5f11c9f61b7f791d1635233d04592`，分支 `migration/tencent-somm100`。已核对当前源码、来源映射、迁移说明、上轮检查点和远端分支。

- **本轮交付**。`app/FoundationDirectory.tsx` 的 D1–D4 专题卡显示综合自测的已答题数与待复习题数，点「复习第 N 题」可进入该组第一道待复习题，没有待复习题则继续上次停留的题。共用 `app/FoundationQuiz.js` 向导览提供当前题组状态，复用既有返回题目事件和版本化记录；答题后计数更新，首次和最近答案保留。记录异常在导览提示，可继续本次练习，旧记录沿用原保护机制。页面注明统计来自当前浏览器。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、旧 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)，按复习检查与回到知识点的学习循环完善现有导航。复核[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)、[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)、[2024 年有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)及 Library 检索，仍缺当期确认版逐日教学课表和 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、6 个案例。D4 15 节、45 道自测、7 个案例。D1–D4 专题与当期面授日次的对应仍待核对。D5 五城第五天日期已核实，教学与考核分配待确认。第22期无 D6 面授，2027 年 3 月 14–17 日产区游学另排。
- **验证**。87 项 Foundation 回归通过。真实 React／jsdom 的 142 道题、143 次题目与知识单元往返、四组导览继续、改答后计数及首次答案保留通过；损坏 JSON 和未来版本记录的原文保留通过。修正该整合检查脚本中过时的标题聚焦断言，使其检查当前题目及单元的实际焦点。页面、备份恢复、静态首页与专注入口检查通过。CloudBase 构建 451 个文件，App 入口 `./assets/app-C0FuE_Nj.js`，SHA256 `54a66564eb417f18c6d07420483594fa4174c9415348d921800de31d90499aac`；专注入口 `./assets/foundation-hJwijfqs.js`。以上属于本机构建及 DOM 验证，手机实机和线上待验收。
- **部署与接续**。本轮未部署。当前仍缺可用的已授权腾讯发布通路，最近一次正式课程首页浏览器实测为 11 月 11 日 03:39 CST 的 `404 NoSuchKey`。发布后核对课程首页、专注阅读及完整 App，再实机验证导览统计、待复习题跳转和本机记录。内容接续需确认版逐日教学课表，先核 D5 分配，再核 D1–D4 对应；保留 `[skip netlify]` 和 `ignore = "exit 0"`。

---

# Foundation · 2026-11-11 · 静态首页班期与文章导读

基线 `4fefbfb029111f6c195e2306130db58d99c67fe2`，分支 `migration/tencent-somm100`。已核对当前分支、入口、来源映射、迁移说明及上轮检查点。

- **本轮交付**。课程首页的课程介绍新增可展开的五城日期、主讲老师／班主任、每日上课时段与两档学费。文章导读新增三个可展开的概念组，列出 10 篇文章的标题、阅读理由与公众号原文。Vite 构建从 `data/foundation-cohort22.json` 与 `data/foundation-concepts.json` 渲染静态 HTML，首页可直接查看，无需加载 App 或脚本。保留 10 个已有 Foundation 入口，完整讲师介绍、原图片、报名和付款说明沿用 App 班期页。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、旧 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。10 个原文 URL 与 Guided Learning 逐条一致。核读[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)并核对当前源码。复查[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)、[2024 年有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)及 Notion、Library 检索，仍缺第22期确认版逐日教学课表与 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、6 个案例。D4 15 节、45 道自测、7 个案例。D1–D4 与第22期面授日次的对应待核。D5 五城日期已核实，教学及考核分配待确认。第22期无 D6 面授，产区游学另排于 2027 年 3 月 14–17 日。
- **验证**。87 项 Foundation 回归与页面、53 单元、备份恢复、专注入口、CloudBase 构建检查通过。根路径及 `/somm100/` 的 jsdom 检查覆盖原生折叠、25 个日期、5 位讲师、2 档学费、10 条原文及阅读理由、20 次入口定位和本机记录保留。构建 451 个文件，静态首页 14285 字节，SHA256 `3e9f28045f8c74a86334d6ad1568832f4190a91e94d36b132c2665764f4ffaba`。每组抽一条公众号链接公开读取均返回 `cannot be opened (non-retryable error)`，微信内打开和手机布局待验收。
- **部署与接续**。本轮公开读取正式 `/course.html` 与 `/foundation.html` 均返回 `URL is not accessible via this tool`，最近实测课程首页为 11 月 11 日 03:39 CST 的 `404 NoSuchKey`。没有可用已授权腾讯发布通路，本轮未部署、未线上验收。取得通路后在现有 `somm100` 静态托管应用发布本分支，再核对课程首页、专注页、完整 App、手机和微信原文。保持 `[skip netlify]` 和 `ignore = "exit 0"`。

---

# Foundation · 2026-11-11 · 课程首页与学习直达

基线 `ea57790bc1fa11a3b285646a296963c04324c46c`，分支 `migration/tencent-somm100`。已读当前入口、来源映射、迁移说明与上一版检查点。

- **本轮交付**。新增 `cloudbase/course.html`，沿用课程预告、课程介绍、文章导读、学习入口四段及 SOMM100 品牌。首页为静态 HTML，正文无需 JavaScript。10 个链接分别进入五城班期、面授、游学、三个带公众号导读的概念、概念目录、课前预习、课间复习、考核与结课。完整 App 与专注阅读均可返回课程首页。导读目标、讲师、报名、课程图片和本机存储沿用现有内容及 ID。所有变更进入原 CloudBase 构建。
- **来源与取舍**。读取[发布增量包](https://chatgpt.com/library?file_id=libfile_e68a53ede6808191a1f3eba6ecc93489&account_id=personal)，校验通过，只有 `course.html` 和未被该 HTML 引用的 11.8 MB 编译脚本。原稿仅列深圳，导读和学习卡片只指向本页标题。保留四段设计，课程详情以部署分支现有五城数据为准，编译脚本不入库。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)、[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)及[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。旧 Chapter 00 仍标过时，有道记录属历史，Notion 当期课表模板待填，WPS／有道正式课件本轮未取得。
- **日次状态**。D1 有 10 节、25 道自测、5 个案例。D2 有 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 有 13 节、30 道自测、6 个案例。D4 有 15 节、45 道自测、7 个案例。D1–D4 均已有复习内容，与正式逐日课表的对应待确认。D5 五城日期已核实，教学与考核分配待确认。第22期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证**。87 项回归及页面、53 个单元渲染、备份恢复、专注入口与本机记录检查通过。jsdom 在根路径和 `/somm100/` 各检查 10 个链接，目标聚焦、滚动调用及记录保留通过。CloudBase 构建 451 个文件。首页 SHA256 `eace9a76a94bf08ea31b83289cbb55872da76b0679652a635539a9ecca4fef30`，App 入口 `./assets/app-BfpjGQl7.js`。本地无头 Chromium 启动报 `socket() failed: Operation not permitted`，共享 Chrome 访问本地预览端口报 `ERR_CONNECTION_REFUSED`，真实布局和手机实机待验收。
- **部署与接续**。11 月 11 日 03:39 CST 实开[正式课程首页](https://www.somm100.cn/course.html)，返回 `404 NoSuchKey`，腾讯控制台仍停在登录页。尚未部署或线上验收。下次在已授权的现有 `somm100` CloudBase 静态托管应用构建并发布本分支，核对 `/course.html`、`/foundation.html`、完整 App 及手机端跳转。补齐官方逐日课表和 D5 教学及考核分配后再发布逐日课程内容。保留 `[skip netlify]` 与 `ignore = "exit 0"`。

---

# Foundation · 2026-11-11 · 课前待复习题直达

基线 `b9765c3cf955ced305431a46ac0f2d4c2cc8c5b9`，分支 `migration/tencent-somm100`。已核对当前入口、来源映射、迁移说明、第 34 版检查点和远端分支。

- **本轮交付**。`app/FoundationStudy.js` 在开课前准备度总览加入「待复习题」。从现有 31 道题里汇集最近答错的题，显示题组、知识点和题干。点题可切到对应 4 周或 8 周进度、展开题组并定位到该题。改对后移出清单，保留首次和最近作答、既有勾选及本机存储结构。题目沿用现有 ID。`app/FoundationReviewRecap.js` 复用展开与聚焦行为。`app/foundation-study.css` 为窄屏保留整行可点和自然换行。
- **来源与缺口**。依据[课前准备度方案](https://app.notion.com/p/40717d16de4c81a4bd1df5ceede99a46)和[现行预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)的复习自查定位。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)和[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)。复核[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。Notion 开班模板待填，有道迁移笔记为历史资料，本轮未取得第 22 期确认版逐日课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、6 个案例。D4 15 节、45 道自测、7 个案例。D5 五城第五天日期已核实，教学与考核分配待确认。第 22 期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项回归、53 个单元渲染、两种节奏的跨周跳转、合并周内定位、改答移出清单、首次答案和备份恢复均通过。CloudBase 构建 450 个文件，App 入口 `./assets/app-QznMR6f6.js`，SHA256 `043360ac01c18bc9608a909957197921e7bed87da97b2eacde9c0d414e502e12`，专注入口 `./assets/foundation-Do50SsX_.js`。[第 35 版独立预览](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 762685 字节，文件 URL 与模拟 HTTPS 的 DOM 验证通过。
- **部署与接续**。本轮未部署，仍缺可用的已授权腾讯发布通路。11 月 10 日最近一次线上实测显示旧 Foundation 与专注入口 `404 NoSuchKey`，新版线上及手机实机待验收。发布接续点为在现有 CloudBase 静态托管应用构建本分支，再对照以上产物。课程接续仍需取得确认版逐日课表及课件，核对 D5 分配与 D1–D4 专题对应。保留 `[skip netlify]` 与 `ignore = "exit 0"`。

---

# Foundation · 2026-11-10 · 口试证据练习与正式域名验收

基线 `be07ab587f2200f39104e1b7611669d2adaa404d`，分支 `migration/tencent-somm100`。已核对入口、来源映射、迁移说明、第 33 版检查点和远端分支。

- **本轮交付**。`app/FoundationPage.tsx` 新增「口试证据练习」直达入口及两道原创同伴追问。练习用虚构资料卡区分标示酒精度和成酒残糖，以及葡萄品种和干甜风格。两道追问均有折叠示范，练习按判断、证据和下一项核实内容作答。放在课后考核区，保留原有 ID、品牌、讲师、图片及本机记录。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)与[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第 22 期招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认口试属于考核范围。Notion 和文件检索仍未取得本期确认版逐日课表；开班模板待填，有道迁移记录为历史资料，WPS／有道原始课件未取得。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、6 个案例。D4 15 节、45 道自测、7 个案例。D5 五城第五天日期已核实，教学与考核分配待确认。第 22 期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项回归、53 个单元渲染、口试入口焦点、两题答案分层展开、旧学习记录及备份恢复、专注入口均通过。CloudBase 构建 450 个文件，App 入口 `./assets/app-FnK4S59t.js`，SHA256 `417bf5668a9c4049ec35b1354fc5184b59a96dafd04bed1347bcf70c5cd32912`。[第 34 版独立预览](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 761906 字节，文件 URL 与模拟 HTTPS 的 DOM 通过。预览的完整 App 入口改为已验证能打开的正式站。
- **部署与接续**。11 月 10 日浏览器实测 [正式站课程入口](https://www.somm100.cn/#foundation) 可用，仍显示旧「六天，是开始」和 Chapter 00，App 加载 `/assets/index-ByL68l2x.js`；同域 `/foundation.html` 返回 `404 NoSuchKey`。当前腾讯控制台浏览器仍停在登录页，无可用的已授权发布会话。未部署，手机实机及最新线上验收待完成。发布接续点见迁移说明；课程接续先取得确认版逐日课表及课件，核对 D5 分配与 D1–D4 对应。保留 `[skip netlify]` 与 `ignore = "exit 0"`。

---

# Foundation · 2026-11-10 · 盲品证据复盘与窄屏考核索引

基线 `ae38e8c5b98ff7cb8dcad0b38f3f736dfe27379f`，分支 `migration/tencent-somm100`。已核对当前入口、来源映射、迁移说明、第 32 版检查点及远端分支。

- **本轮交付**。`app/FoundationPage.tsx` 的考核索引新增「盲品证据复盘」直达入口。保留既有盲品练习，新增两个虚构样本对照，依次记录杯中观察、推测，再展开模拟酿造记录和参考答案，区分新桶熟成与橡木片接触。`app/foundation-study.css` 将考核索引在 600px 及以下排成两列，沿用按钮高度和自然换行。保留稳定 ID、品牌、讲师、既有图片和本机记录。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第 22 期招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)列有盲品考核，新增案例为课后原创练习，未指定面授日次。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填写，[运营总控](https://app.notion.com/p/40717d16de4c81ef9be0e1d6579a9592)为内部母版，[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)为历史资料。Notion 和文件检索未找到第 22 期确认版逐日课表及 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、5 个案例。D2 9 个品种、6 个法国专题、42 道自测、5 个案例。D3 13 节、30 道自测、6 个案例。D4 15 节、45 道自测、7 个案例。D5 五城第五天日期已核实，教学与考核分配待确认。第 22 期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项回归、53 个单元渲染、盲品直达焦点、记录与答案分层展开、本机记录保留、备份恢复及专注入口均通过。CloudBase 构建 450 个文件，入口 `./assets/app-EL83htUI.js`，SHA256 `96b2d02200d79f006a05c2cb4d0e9dea15e50d1d3e6df827c74ab50dafa296ee`。[第 33 版独立预览](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 760039 字节，文件 URL 和模拟 HTTPS 的 DOM 测试、窄屏 CSS 规则检查通过，手机实机待验收。
- **部署与接续**。11 月 10 日最新控制台截图可见证书状态正常、CNAME 栏橙色图标。另一张 `www.somm100.cn` 路由弹窗的资源类型是云托管，实例尚未选定。根据[腾讯静态托管官方说明](https://docs.cloudbase.net/service/access-static-hosting)，接续时先在现有 SOMM100 静态托管实例核对自定义域名实际关联及控制台给出的 CNAME，再用公开 HTTPS 对照 Foundation 页面及构建资源。公开检查根域、www 和测试域名均返回 `URL is not accessible via this tool`，未取得线上内容、最新发布回执或可用的已授权发布通路。本轮未部署。保留 `[skip netlify]` 与 `ignore = "exit 0"`。课程接续先取得确认版逐日课表及原始课件，核对 D5 教学与考核分配，再对照 D1–D4 专题。

---

# Foundation · 2026-11-10 · 侍酒服务异常复核

基线 `20385fd9279ae64c6edf6839a75a32b3a193d72c`，分支 `migration/tencent-somm100`。已核对当前入口、来源映射、迁移说明、第 31 版检查点与远端分支。

- **本轮交付**。`app/FoundationAssessmentPractice.tsx` 增加「客人觉得酒不对」双情境练习。换杯后异味消失，练习确认客人意愿及恢复服务。换杯后异味仍在，练习保留原瓶、记录观察并交接复核。情境及参考做法可分别展开，另有同伴自查。`app/FoundationPage.tsx` 的考核索引新增直达按钮。原创练习位于正式课后复习区，未分配到任何面授日。保留品牌、讲师、已有图片、原有稳定 ID 与本机学习记录。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第 22 期招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认侍酒服务实操属于考核范围，五城为五天面授，另行游学。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填写，[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)为历史资料。Notion 与文件检索未获得第 22 期确认版逐日课表及 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、5 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、5 个案例。D3 13 节、30 道独立自测、6 个案例。D4 15 节、45 道独立自测、7 个案例。D5 五城第五天日期已核实，教学与考核分配待确认。第 22 期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项回归、53 个单元渲染、新入口焦点、两情境分层展开、本机记录保留、备份恢复和专注入口通过。CloudBase 构建 450 个文件，入口 `./assets/app-C2D39XPA.js`，SHA256 `6b850ac611ac8951d922c56e73cd9f2b9c30026d4ac614c90296be80c197181d`。[第 32 版独立预览](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 758356 字节，文件 URL 与模拟 HTTPS 的 DOM 检查通过。Chromium 窄屏测试启动报 `socket() failed: Operation not permitted`，真机布局仍待验收。
- **部署与接续**。当前缺已授权的腾讯发布通路，既有 CLI 阻塞为 `tcb-api.cloud.tencent.com:443` 被网络策略拒绝。未部署，腾讯线上验收待完成。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。取得第 22 期确认版逐日课表与原始课件后，先核对 D5 教学和考核分配，再核对 D1–D4 专题与面授安排。

---

# Foundation · 2026-11-10 · 餐酒搭配对照练习

基线 `30e63015c63a76c793d8a9fbb3ad41a28e5ba41e`，分支 `migration/tencent-somm100`。已对照远端分支、当前入口、来源映射、腾讯迁移说明及第 30 版检查点。

- **本轮交付**。`app/FoundationAssessmentPractice.tsx` 增加两道原创文字练习。菌菇酱牛排比较单宁与客人偏好，柠檬挞比较甜度、酸感和果味，并要求换配方后重新试配。两题先给菜品和备选酒款，分别折叠模拟试配记录和参考判断。`app/FoundationPage.tsx` 在考核索引增加直达入口。练习位于正式课后复习区，沿用现有路由和稳定 ID，不计分或写入本机记录。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。复核[第22期招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，其中列有餐酒搭配考核、五天面授和单独游学。案例的菜品、酒款与试配结果为模拟内容，未分配到任一面授日。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填写，[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)为历史资料。文件检索未获得第22期逐日教学课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、5 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、5 个案例。D3 13 节、30 道独立自测、6 个案例。D4 15 节、45 道独立自测、7 个案例。D5 五城第五天日期已核实，教学与考核分配待确认。第22期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项 Node 回归、53 个单元渲染、考核索引跳转、两题逐层展开、路由和本机记录保留、备份恢复、专注入口均通过。CloudBase 构建 450 个文件，入口 `./assets/app-BWTRKjhm.js`，SHA256 `e9f24590b109b208b8674d6834a4b45157df099429494749d5664448c1be5a51`。[独立预览第 31 版](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 756099 字节，文件 URL 和模拟 HTTPS 的 DOM 检查通过。品牌、已有图片与师资源数据未改动。
- **部署与接续**。缺可用的已授权腾讯发布会话，未部署。手机实机和线上验收待完成。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得第22期确认版逐日课表及原始课件后，先核对 D5 教学和考核分配，再核对 D1–D4 的专题与面授对应。

---

# Foundation · 2026-11-10 · D1–D4 专题导览

基线 `135ebf5aa74ba92ba685d00ddb6c4f9082abed31`，分支 `migration/tencent-somm100`。已核对入口、来源映射、迁移说明及第 29 版检查点。

- **本轮交付**。`app/FoundationDirectory.tsx` 把 D1–D4 整理为四张专题卡，每组并列提要、自测与案例三个入口。点击案例直接展开对应复盘并聚焦标题，参考答案仍按学员选择展开。保留 21 天课间路径、法国专题与起泡酒练习入口。`app/foundation-study.css` 使用窄屏可换行的短按钮布局。课程内容、班期、已有目标 ID 和本机记录均沿用。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。专题名称沿用 Foundation 已有内容。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授和单独游学。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填，[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)为 2024 年资料。Notion 与文件检索未取得第22期确认版逐日教学课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、5 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、5 个案例。D3 13 节、30 道独立自测、6 个案例。D4 15 节、45 道独立自测、7 个案例。D5 五城第五天日期已核实，教学与考核分配待确认。第22期无 D6 面授，游学另排。
- **验证与保存**。87 项 Node 回归、53 个复习单元渲染、四张专题卡的 12 个入口和四组案例展开均通过。跳转保持 `#foundation` 路由和本机记录，备份恢复与专注入口通过。CloudBase 整站构建 450 个文件，入口 `./assets/app-DR9w-Ska.js`，SHA256 `adae3ca165c4c6a44dc81494769275f81861161a2689f92574697da43482f4f6`。[第 30 版独立预览](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 753054 字节，文件 URL 和模拟 HTTPS 的 DOM 检查通过。
- **部署与接续**。仍缺可用的已授权腾讯发布会话，未部署。手机实机与线上验收待完成。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得第22期确认版课表及原始课件后核对 D5 教学和考核分配，以及 D1–D4 专题对应的面授安排。

---

# Foundation · 2026-11-10 · D1／D2 葡萄园与品种证据复盘

基线 `e837754eda0b82e7d316cf379cebf5bc6e55f485`，分支 `migration/tencent-somm100`。已核对当前入口、来源映射、迁移说明及第 28 版检查点。

- **本轮交付**。`app/FoundationD1D2Recaps.js` 为 D1／D2 各新增两个原创案例。D1 根据葡萄园日志判断萌芽、开花和转色阶段，区分嫁接苗的接穗、砧木与园地条件。D2 用模拟白诗南酒标判断干甜还缺哪些证据，再把红葡萄混酿的品种组成、比例及口感分栏。四份可折叠答案与八处回看入口沿用现有复盘界面和单元 ID。展开答案不写入本机记录，跳转沿用当前单元字段并保留作答、勾选。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。案例依据现有 D1 第 2／3／4／5 节及 D2 第 1／7／8／9 节原创编写，供专题复习。实际读取[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，确认五天面授和另行游学。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填，[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)为 2024 年资料。检索未取得本期确认版逐日教学课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、5 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、5 个案例。D3 13 节、30 道独立自测、6 个案例。D4 15 节、45 道独立自测、7 个案例。D5 五城日期已核实，教学与考核分配待确认。第22期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项 Node 回归、53 个单元渲染、D1–D4 共八个新增案例答案折叠与 16 处对应焦点跳转、本机记录和备份恢复、专注入口均通过。CloudBase 整站构建 450 个文件，入口 `./assets/app-BhjvB5Qd.js`，SHA256 `ceee14ca0585fd6a12423c14606c21d548f5bfefb5ac0da1a3078a082252f486`。[独立预览第 29 版](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 752097 字节，文件 URL 和模拟 HTTPS 的 DOM 检查通过。
- **部署与接续**。当前缺可用的已授权腾讯发布会话，未部署。腾讯线上和手机实机待验收。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得第22期确认版逐日课表及原始课件后核对 D5 教学、考核分配及 D1–D4 的面授对应。

---

# Foundation · 2026-11-10 · 第22期五城面授日期与报名付款节点

基线 `09b55e6a140bb6cd6849034cd1affd9870fd0909`，分支 `migration/tencent-somm100`。已核对当前 Foundation 入口、来源映射、迁移说明及第 27 版检查点。

- **本轮交付**。`app/FoundationCohort.js` 按三个阶段逐行显示五城各五个面授日，保留完整年份和日期。课程介绍补入已核实的葡萄种植、酿造、品鉴、酒水与侍酒服务范围。`data/foundation-cohort22.json` 补入招生正文所列的报名先付人民币 3,000 元、考试日前结清余款和游学在结清费用后安排。已保留原学费、师资、图片、报名入口、稳定 ID 和本机记录。日期编号仅表示面授先后。
- **来源与缺口**。实际读取[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，逐项核对五城 25 个日期、每日 09:00–16:30、三阶段和付款节点。公众号原文复核返回 `cannot be opened (non-retryable error)`，Microsoft Forms 返回 `is not accessible via this tool`。报名表 URL 与文档一致，表单当前可用性、收款渠道、退款条款、考试及教室安排待课程方确认。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填，[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)为 2024 年资料。未检索到本期确认版逐日教学课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、3 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、3 个案例。D3 13 节、30 道独立自测、6 个案例。D4 15 节、45 道独立自测、7 个案例。D5 五城第五天面授日期已核实，教学与考核分配待确认。第22期无 D6 面授，2027 年 3 月 14–17 日游学另排。
- **验证与保存**。87 项 Node 回归、53 个复习单元、25 个面授日期与每城 2＋2＋1 结构、付款文案、报名焦点跳转、备份恢复与专注入口均通过。CloudBase 整站构建 450 个公开文件，入口 `./assets/app-WuYtWLpR.js`，SHA256 `150debca31b2703baa5c13940e003f69c2a998ed06a91d0fbb0757fab39545dd`。[独立预览第 28 版](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 749687 字节，文件 URL 和模拟 HTTPS 的 DOM 检查通过。
- **部署与接续**。仍缺可用的已授权腾讯发布会话，未部署。手机实机、报名表实际可用性和腾讯线上版本待验收。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得第22期逐日教学课表及原始课件后核对 D5 与考核分配及 D1–D4 对应关系。

---

# Foundation · 2026-11-10 · D3／D4 产区证据复盘

基线 `2f84f99506de4b74a09980ab18bf1c45b2356d96`，分支 `migration/tencent-somm100`。已核对当前入口、来源映射、迁移说明及第 26 版检查点。

- **本轮交付**。`app/FoundationD3Recap.js` 与 `app/FoundationD4Recap.js` 各增两个原创复盘案例。D3 比较西班牙两份技术卡的品种及熟成信息，拆分德国与奥地利酒标的产地、品种和干甜证据。D4 用澳新酒标比较同品种并核对酒精度，用智利海岸和阿根廷山地的对照练习选择种植证据及比较酸度。四份答案可展开，八个回看入口沿用单元稳定 ID。折叠开关不写入本机记录，跳转仅沿用当前单元字段。
- **来源与缺口**。重读[蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)、[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)及[D3–D4 提要](https://app.notion.com/p/40717d16de4c817aaad6f3433f55df22)。原创案例依据现有 D3 第 6／7／11／12 节及 D4 第 9／11／12 节，不推断面授分配。实际读取[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，确认五天面授和另行游学。[有道迁移笔记](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)创建于 2024 年，仅作历史线索。[开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填。Notion 与文件检索未取得第22期确认版逐日课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、3 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、3 个案例。D3 13 节、30 道独立自测、6 个案例。D4 15 节、45 道独立自测、7 个案例。D5 五城面授日期已核实，教学与考核分配待确认。第22期无 D6 面授，游学另排。
- **验证与保存**。87 项 Node 回归、53 个复习单元、四份答案折叠、八处焦点跳转、作答及勾选保留、备份恢复与专注入口均通过。CloudBase 整站构建 450 个文件，入口 `./assets/app-DVbYUe-W.js`，SHA256 `c8f96954a8dc1a40730da0f16237c1724eda87a2eeb5ec62cabbb967ef0ad828`。[第 27 版独立预览](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 748957 字节，文件 URL 和模拟 HTTPS 均通过 DOM 验证。
- **部署与接续**。当前缺可用的已授权腾讯发布会话，未部署，手机实机与线上验收待完成。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得第22期正式逐日课表及原始课件后，再核对 D5 教学与考核分配及 D1–D4 的正式面授对应。

---

# Foundation · 2026-11-10 · 开课前准备度总览

基线 `2d3bd11c621b454e763385a30cfb756701c77cce`，分支 `migration/tencent-somm100`。已核对当前 Foundation 入口、来源映射、迁移说明及第 25 版检查点。

- **本轮交付**。`app/FoundationStudy.js` 的课前路径新增「开课前准备度总览」。用现有 31 道题显示八组的未答数、待复习数和已准备好的组。点击进入题组时，自动定位对应的 8 周或 4 周进度，展开题目并聚焦。题组可返回总览，答对后实时更新。题目、题号、选项顺序规则、勾选状态、首次与最近答案沿用现有数据。导航沿用本机当前周字段，无新增存储键或计分规则。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。实际读取[准备度方案](https://app.notion.com/p/40717d16de4c81a4bd1df5ceede99a46)，核实八组、31 题、回到相应单元和保留首次答案的要求。沿用原题。再次读回[招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授和单独游学。[单期开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍待填。Notion 与文件检索未取得本期确认版课表或 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道独立自测、3 个案例。D2 9 个品种、6 个法国专题、42 道独立自测、3 个案例。D3 13 节、30 道独立自测、4 个案例。D4 15 节、45 道独立自测、5 个案例。D5 五城日期已核实，教学和考核分配待确认。第22期无 D6 面授，游学单独安排。
- **验证与保存**。87 项 Node 回归、53 个复习单元、两种节奏的题组跳转及同周切换、未答与待复习状态、重答保留首次答案、备份恢复、专注入口均通过。CloudBase 整站构建 450 个公开文件，入口 `./assets/app-B-ia8VO2.js`，SHA256 `820e896209e3033188c66e7375c983931ac4b051ae86943b5fe49453bb3d4ca5`。[独立预览第 26 版](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 746250 字节，文件 URL 和模拟 HTTPS 的 DOM 检查通过。
- **部署与接续**。当前缺可用的已授权腾讯发布会话，未部署，手机实机与线上验收待完成。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得第22期逐日课表及原始课件后核对 D5 教学、考核分配和 D1–D4 对应关系。

---

# Foundation · 2026-11-10 · 笔试案例练习

基线 `9222b85c267cff8796af436fa97d9521cd12912c`，分支 `migration/tencent-somm100`。已核对当前 Foundation 入口、来源映射、迁移说明及第 24 版检查点。

- **本轮交付**。在 `app/FoundationPage.tsx` 的第22期考核复习索引新增「笔试案例自练」。同一地块和品种分两次采收的虚构案例，三问分别核对采收糖度和成酒残糖、解释发酵消耗的糖、区分背标酒精度与批次检测。答案折叠，练习不计分。新增稳定锚点 `foundation-assessment-written-title`，沿用既有焦点跳转。未改原题、班期、讲师、报名或本机学习记录。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认三阶段五天面授与笔试范围。案例为原创补充，可结合已有 D1 发酵、酒标单元；未归入任何面授日或正式题库。[单期开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)仍标待填，Notion 与文件检索未取得第22期确认版课表和 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。D5 五城日期已核实，教学和考核分配待确认。第22期无 D6 面授，游学单独安排。
- **验证与保存**。87 项 Node 回归、53 个复习单元、38 个焦点跳转、三问答案展开和本机记录不变、备份恢复与专注入口检查通过。CloudBase 整站构建 450 个公开文件，入口 `./assets/app-coG1nMEm.js`，SHA256 `41e0fa1f8b8c74919cbfc2af3ec9ad4965e860ac984389d928650f5c9d9dc7bc`。[独立预览第 25 版](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)经文件 URL 与模拟 HTTPS 的 DOM 验证。Chromium 启动时报 `socket() failed: Operation not permitted (1)`，手机布局及实机待验收。
- **部署与接续**。当前仍缺已授权腾讯发布会话。沿用既有上海环境与 `/somm100`，未部署、未取得线上版本或正式域名回执。保留 `[skip netlify]` 及 `netlify.toml` 的 `ignore = "exit 0"`。下一断点是用确认版逐日课表及课件核对 D5；现有腾讯通路恢复后验收部署版本和手机交互。

---

# Foundation · 2026-11-10 · 产区游学与 CloudBase 发布准备

基线 `9396a5e2027a6d4ce3098453b5d57d4d23cd7e77`，分支 `migration/tencent-somm100`。已核对当前 Foundation 源码、来源映射、第 23 版检查点及迁移说明。

- **本轮交付**。`app/FoundationCohort.js` 的班期页新增产区游学直达入口、已核实的食宿和交通说明，以及三步可折叠的现场观察练习。练习由学员分别记录葡萄园、酒庄工艺和杯中证据，区分现场所见与自己的推断。班期、师资、图片、报名入口与本机记录沿用原实现。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认三阶段共五天面授，2027 年 3 月 14–17 日另有四天产区游学。校方提供三晚住宿与餐食，学员承担往返交通。观察练习为原创补充。已检索的 Notion 与历史有道导入仍缺本期批准的逐日课表、WPS／有道原始课件以及 D5 考核分配。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。D5 五城面授日期已核实，教学和考核分配待确认。第22期无 D6 面授，游学单独安排。
- **验证与保存**。87 项 Node 回归、53 个复习单元渲染、游学跳转聚焦、三步折叠、练习不写入本机记录、备份恢复通过。CloudBase 整站与专注入口构建通过，450 个公开文件，整站入口 `./assets/app-B9s619t1.js`，SHA256 `799ccf64fc1d77ff3f702a4bc879d48db0f147ce799f55c9404009a8c27c4065`。静态 ZIP 含同一组 450 个文件，解压校验通过。[独立预览第 24 版](https://chatgpt.com/library?file_id=libfile_6329ce1ee0d4819193ab936d55f879b4&account_id=personal)共 742664 字节，已用文件 URL 和模拟 HTTPS 验证。
- **部署与接续**。`docs.cloudbase.net/skill.md` 的读取结果为 `(400) Timeout fetching`。CloudBase 官方文档可读，确认现有应用支持按指定 Git 分支构建。继续沿用 `cloudbaserc.json` 中的上海环境、`/somm100` 路径及 `dist-cloudbase` 产物。当前缺可用的已授权腾讯发布会话，正式域名绑定与证书未取得回执。腾讯发布、线上版本复核与手机实机验收待完成。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-10 · 团队酒单复核与域名核查

基线 `c829611b61901f570bf975459efdd984cc649d30`，分支 `migration/tencent-somm100`。已核对当前源码、上轮检查点、迁移说明及来源映射。

- **本轮交付**。`app/FoundationPage.tsx` 的「团队酒单自练」新增一份原创虚构复核案例。学员从 12 行杯卖草案中识别同款异译、缺货和年份待查，并得出 9 款已确认可售。参考解答将主酒单单独核对，跨清单重叠规则留待课程方确认。保留原卡片、品牌、稳定 ID、本机记录和已有练习。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授，以及 12 款杯卖、40 款主酒单的作业要求。虚构案例不安排在任何面授日。Notion 与文件检索仍缺当期逐日课表、WPS／有道原始课件及考核细则。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。D5 五城面授日期已核实，教学及考核分配待确认。第22期无 D6 面授。
- **验证与保存**。87 项 Node 回归、53 个单元渲染、酒单草案与参考答案折叠、打开后本机记录不变、备份恢复通过。CloudBase 整站和专注入口构建通过，共 450 文件，整站入口 `./assets/app-a-2VZzev.js`，SHA256 `173aa1a28c2c7329935a124b9b97f4e1bc92bc5dc01220f7697b56de136946ce`。独立预览第 23 版，741477 字节，文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **域名与部署**。Henry 于 2026-11-10 提到网站审核通过，未取得该审核的官方类型或关联域名、腾讯绑定、证书及部署回执。公开网页检查对 `somm100.cn`、`www.somm100.cn` 和腾讯临时入口均返回 `URL … is not accessible via this tool`，无法据此判断站点或 DNS 状态。本轮未部署，仍需可用的已授权腾讯通路、线上版本及手机实机验收。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 四类酒水辨析

基线 `a24d8e8eb110c2f2bc95b1f1d58724aa7927b05a`，分支 `migration/tencent-somm100`。先核对当前源码、上轮检查点、迁移说明及来源映射。

- **本轮交付**。在 `app/FoundationAssessmentPractice.tsx` 新增威士忌、橙味利口酒、日本清酒和白酒四张虚构资料卡，以及三道原创自查。练习分别比较生产过程、分开酒精度和干甜判断、识别确认白酒香型所需资料。`app/FoundationPage.tsx` 的考核复习区新增直达按钮，卡片在窄屏可换行，答案可展开。保留原有练习、题目 ID、品牌、讲师、图片和浏览器学习记录。此模块作为课后练习，不指定为 D5 教学或考试题。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)和[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授和四类酒水在考核范围内。资料卡的工艺线索参考[欧盟蒸馏酒分类附件](https://eur-lex.europa.eu/eli/reg/2019/787/oj/eng)、[日本国税厅清酒技术资料](https://www.nta.go.jp/english/taxes/liquor_administration/02_2.htm)及[中国市场监管总局白酒生产资料](https://www.samr.gov.cn/spscs/tzgg/art/2023/art_c7f0624fa4fe46daa509549b5ba85ab3.html)。[2024 年教师会议提纲](https://app.notion.com/p/3fb17d16de4c8104bc1dec3c935e26e1)是历史会议材料。检索仍未找到第22期正式逐日课表和 WPS／有道原件。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。D5 各城面授日期已核实，教学与考核分配待确认。第22期无 D6 面授。
- **验证与保存**。87 项 Node 回归、53 个单元渲染、36 个焦点跳转、四卡三题与答案折叠、课后练习不写入记录及本机备份恢复通过。CloudBase 整站和专注入口构建通过，共 450 文件，入口 `./assets/app-BrWGrD06.js`，SHA256 `f31f5f5080f7ad0e580aeb237b7fd228e03fd99b1707393fcb34e55f5ad34532`。独立预览第 22 版，739633 字节，文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **部署与接续**。本轮未部署，仍缺可用的已授权腾讯发布通路。手机实机和线上验收待完成。下一断点是取得本期正式课表与原始课件，核对 D5 教学和考核分配。保留 `[skip netlify]` 及 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · D1–D4 待复习清单

基线 `c103f5e4bbb6b0dab37367a50dcb3382c88ca250`，分支 `migration/tencent-somm100`。先核对当前源码、上轮检查点、迁移说明及来源映射。

- **本轮交付**。D1–D4 共用的 `app/FoundationQuiz.js` 增加折叠式待复习清单，按题号显示最近一次答错的题，列出原题标题与主题，点击回到原题。学员先回忆自己上次的判断，再读解析、跳到对应章节核对、重答。未作答及最近一次答对的题不会进入清单。重答正确后退出清单，首次答案保留。沿用题目 ID、答案索引、复习往返及本机存储，无新增存储键或改变题库。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)及[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。清单使用现有选择题，复习提示为本轮原创。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授和考核范围。[单期开班模板与验收清单](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)的 D5/D6 日期和时段标为待填，未提供批准的逐日课表或原始课件。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。D1–D4 均新增待复习清单。D5 各城面授日期已确认，教学内容和考核分配待核。第22期无 D6 面授。
- **验证与保存**。87 项 Node 回归、53 个 React 单元、四份清单的待复习筛选、原题聚焦、章节往返、重答和首次答案保留、备份恢复通过。CloudBase 整站及专注入口构建通过，共 450 文件，整站入口 `./assets/app-DFYAorvN.js`，SHA256 `7b2361186a40649cfd732112afba6f7cd726134a665a945b57b480969955aebe`。独立预览第 21 版，737214 字节，文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **部署与接续**。本轮未部署。沿用迁移检查点所载腾讯控制台会话及网络访问阻塞，当前缺可用的已授权发布通路。手机实机和线上验收待完成。课程下一断点为取得第22期确认版课表和 WPS／有道原始课件后核对 D5 的教学和考核分配。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 第二阶段后综合复盘

基线 `57c4bc198b2030af9c5f246f6ac906708a90c8c2`，分支 `migration/tencent-somm100`。先核对当前源码、上轮检查点、迁移说明及来源映射。

- **本轮交付**。在 `app/FoundationBridge.js` 用现有五城日期和日历逻辑，增加第二阶段末日后至第三阶段首日前的复盘窗口。北京、上海、成都、深圳、广州分别有 33、31、30、31、30 个完整日历日。一个城市选择同步更新两次课间。新增两段原创练习及六个复习入口。先比较两款酒的产地、工艺与风格证据，再与同伴练盲品或口头表达、服务与团队酒单复核。两段日期为学习建议。保留既有第一段课间、21 天资源、稳定 ID、本机记录与备份兼容。
- **来源与核对**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)及[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)确认五天面授及考核范围。[招生宣传与报名执行包](https://app.notion.com/p/40717d16de4c81b8a82cd16e3fba40a6)提到六天，同时标为未发布内部模板并要求以批准的班期为准。2024 年有道导入笔记只支持历史阅读范围。仍缺第22期批准的逐日课表和 WPS／有道原始课件。
- **日次状态**。D1 10 节专题、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。D5 日期见已核验的各城第三阶段安排，教学内容和考核分配待确认。第22期无 D6 面授。
- **验证与保存**。87 项 Node 回归、53 个单元 React 渲染、五城跨年日期、新增六个跳转和原 21 天本机进度及备份恢复通过。CloudBase 整站及专注入口构建通过，共 450 文件，整站入口 `./assets/app-D7EFlHbZ.js`，SHA256 `eae71802dc69499d3d3a43cef08cb4244125af089fb9d81742c83a4952ebb1d6`。独立预览第 20 版，736331 字节，文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **部署和接续**。本轮未部署。上一轮记录的腾讯测试域公开检查返回 `URL ... is not accessible via this tool`，当前仍无可用的已授权腾讯发布通路，手机实机和线上验收待完成。下一断点为核对 D5 教学和考核分配。保留 `[skip netlify]` 及 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 按五城开课日期安排预习

基线 `95f5ff40422fa2ee54c4bd5476c38dc2d9e088e4`，分支 `migration/tencent-somm100`。已核对迁移说明、上轮检查点、当前 Foundation 源码和来源映射。

- **本轮交付**。课前页可选第22期五城，按北京时间显示首日面授和剩余日数。按现行预习路径建议 8 周或 4 周。少于 28 天时可跳到葡萄到酒、风格与酒标三个基础概念，开课后可跳到课间复习。三个概念是本轮精简建议。城市选择及导航不改预习节奏、当前周、首次／最近答案或本机进度。保留原有八个概念、公众号链接、品牌、师资、图片与数据。
- **来源与缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)及[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。五城首日以[第22期招生正文第 6 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)及现有数据为准。实际读取[2024 年有道导入笔记《侍酒师 100 D1-D2》](https://app.notion.com/p/3fb17d16de4c818f8639c5ca169787e7)，其种植酿造、法规酒标、法国产区的书目提示属于历史复习线索，未明确本期逐日安排。Notion 与文件检索仍缺第22期确认版课表及 WPS／有道原始课件。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。以上为现有专题复习。D5 教学与考核分配待确认。第22期确认五天面授，无第六天面授。
- **验证与保存**。86 项 Node 回归、53 个 React 单元、五城切换、北京时间跨日和节奏边界、三条概念跳转、开课当日／已开课分支及本机进度和备份恢复通过。CloudBase 整站与专注入口构建通过，共 450 文件，入口 `./assets/app-Dj4FD0KQ.js`，SHA256 `8782eba912218a5767b8a8b2d99d05a12ff0351d9bbd1f4644910f70758158de`。独立预览第 19 版，734715 字节，文件 URL 和模拟 HTTPS 的 jsdom 检查通过。
- **部署和接续**。本轮未部署。上轮腾讯测试域公开检查返回 `URL ... is not accessible via this tool`，本轮未获得可用的已授权腾讯发布通路或新的线上验证。手机实机和线上验收待完成。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。取得当期课表和课件后核对 D5 的教学与考核分配。

---

# Foundation · 2026-11-09 · 课程导览与结课说明

基线 `ce6f20a29d78dc7a18cbab65e2eaf6c44dccd1c1`，分支 `migration/tencent-somm100`。先核对远端分支、迁移说明、上轮检查点、Foundation 实际入口及来源映射。

- **页面与内容**。新增 `app/FoundationDirectory.tsx`，页首提供课前预习、五城课间复习、考核与结课、五城班期与报名四个入口。21 天学习路径、D1–D4 复习与自测、法国专题和起泡酒练习共 11 个入口集中在默认收起的专题目录。窄屏网格按容器宽度换列，入口和折叠控件至少 44px。沿用既有目标 ID、路由、品牌、图片及本机进度。正式课程复习区补上初级、见习证书及申请转换的说明，具体条件和办理方式仍由课程方确认。
- **来源**。重读 [产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已标记过时的 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 知识提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)、[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)及[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。招生正文明确初级、见习证书适用路径和五天面授。Notion 和文件检索未找到当期确认版逐日课表或原始课件，相关运营模板只可作为线索。
- **日次状态**。D1 10 节、25 道自测、3 个案例。D2 9 个品种、6 个法国专题、42 道自测、3 个案例。D3 13 节、30 道自测、4 个案例。D4 15 节、45 道自测、5 个案例。以上为已有专题复习。D5 教学和考核分配待确认。第22期无 D6 面授。
- **验证与保存**。85 项 Node 回归、53 个 React 单元、15 个课程导览入口、25 个焦点定位、本机记录及备份恢复通过。CloudBase 整站及专注入口构建通过，共 450 个文件，入口 `./assets/app-DPpJl0Er.js`，SHA256 `f5189da14614081c2ed908e3d714a9663eff646ea458711ea91841e8b4cf54a0`。独立预览第 18 版，732462 字节，文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **部署和接续**。本轮未部署。读取腾讯测试域的公开网页检查返回 `URL ... is not accessible via this tool`，无法确认远端当前构建。仍缺可用的已授权腾讯发布通路，手机实机及线上待验收。课程内容接续需第22期确认版逐日课表、WPS 或有道原件，重点核对 D5 和证书的具体条件。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 第22期餐厅情境自练

基线 `540faf2b5756598908ed92538c21d69069bec5b8`，分支 `migration/tencent-somm100`。读回迁移说明、上一轮检查点、当前 Foundation 源码及来源映射。

- **本轮交付**。从「查看考核范围与复习索引」进入「餐厅情境自练」。三道原创自练分别处理年份不一致时的核对和交接、两种烤鸡酱汁的搭配选择、其他酒水标签的事实与待查字段。每题有任务、折叠参考和复盘问题。新增 `app/FoundationAssessmentPractice.tsx`，稳定 ID 为 `foundation-assessment-practice-title`、`foundation-assessment-service-check`、`foundation-assessment-pairing`、`foundation-assessment-other-drinks`。练习位于正式课后的复习区，不写本机学习记录。
- **来源和缺口**。重读[产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、标记过时的旧 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 知识提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)及[课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)支持五天面授及服务、餐酒搭配、其他酒水纳入考核范围，未给逐日教学分配或评分方法。三题是补充自练，未分配到具体日次。仍缺当期确认课表、WPS 原始课件与可核对的有道原件。
- **日次状态**。D1 10 节／25 道综合自测及 3 个书面案例。D2 9 个品种、6 个法国专题／42 道及 3 个书面案例。D3 13 节／30 道及 4 个书面案例。D4 15 节／45 道及 5 个书面案例。以上为专题复习。D5 当日教学及考核分配待确认。第22期五天面授，无 D6 面授。
- **验证与保存**。85 项 Node 回归、53 个单元 React 渲染、22 个焦点入口、三题独立折叠及本机记录不变、D1–D4 答题恢复和备份恢复通过。CloudBase 整站和专注入口构建通过，共 450 个文件，整站入口 `./assets/app-CSHH9FIZ.js`，SHA256 `22477886e76060deee49f58f04bc40fb363d652c8065ef83d2a185e963f96b2b`。独立预览第 17 版，730931 字节，文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **部署和接续**。本轮构建待通过可用的已授权腾讯发布通路部署，线上和手机实机待验收。下一轮核对确认版课表及原件，并核验测试域实际构建。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · D1 与 D2 跨单元综合复盘

基线 `f77adb92a43366a3a19aec3a9f78fc6d60877d6d`，分支 `migration/tencent-somm100`。核对腾讯迁移说明、上一轮检查点、当前源码及来源映射。

- **本轮内容与页面**。D1 新增分批采收、果皮接触与发酵、酒标与熟成证据三题。D2 新增霞多丽与长相思、黑皮诺与赤霞珠、雷司令干甜和西拉同义名三题。六题附可展开参考答案及 12 个原单元入口。D1–D4 共用复盘交互，可在专题页打开复盘，再回到发起复习的自测原题。查看答案不计分或写入进度。保留原题 ID、各存储键、原有单元、课前、课间与报名资料。
- **来源与边界**。重读 [产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、已过时的 Chapter 00、[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[课前预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)、[D1–D2 知识提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)及[D3–D4 知识提要](https://app.notion.com/p/40717d16de4c817aaad6f3433f55df22)。六题是基于现有专题的原创复盘。重读[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，确认五天面授。原有公众号链接保留，微信内可用性沿用检查点所列待验状态。
- **课程状态**。D1 10 节／25 道综合自测＋3 个书面案例；D2 9 品种＋6 法国专题／42 道＋3 个书面案例；D3 13 节／30 道＋4 个书面案例；D4 15 节／45 道＋5 个书面案例。以上是专题复习。D5 当日教学与考核分配待确认；第22期无 D6 面授。逐日内容仍缺当期确认课表、WPS 原始课件和可核对的有道原件。
- **验证与保存**。85 项 Node 回归、53 个单元 React 渲染、D1／D2 全部 12 个回看入口、D1–D4 自测原题往返、本机答题与备份恢复通过。CloudBase 整站与专注入口构建通过，共 450 个文件，入口 `./assets/app-BbbCCtUa.js`，SHA256 `56511cc70a875d3e8c3e2c4f3f95436fcf138eefd11393461b8f3c0a31c7cdfc`。独立预览第 16 版 727523 字节，在文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **下一断点**。本轮未部署，仍待可用的已授权腾讯部署通路、线上及手机实机验收。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 第22期五城课间复习建议

基线 `8266d125e9538d5db684737fa04d3b24f8457119`，分支 `migration/tencent-somm100`。已核对迁移说明、上轮检查点、来源映射和现有课堂间学习路径。

- **本轮交付**。由第22期五城既有面授日期推算第一阶段末日到第二阶段首日之间的完整日历日，排除两端面授日。五城均为 12 天，分为两个建议学习段。学员可从五城课程安排或页面导航进入，选城市后看日期、D1–D2 复习、自测、D3–D4 预习与两道口头自查；七个入口直接定位既有专题及自测。城市只保留在当前页面，原 21 天资源、学习日 ID、本机保存和备份兼容均保留。
- **日期与来源**。重读[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，并对照[单期开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)、[三周桥接计划](https://app.notion.com/p/40717d16de4c810cbdc9d2aca7262900)、[运营总控](https://app.notion.com/p/40717d16de4c81ef9be0e1d6579a9592)。两段学习顺序和日期划分是本轮学习建议；面授日沿用招生日期，考试、作业和逐日教学仍以课程方通知为准。已重读产品蓝图、已标记过时的 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要及课前路径。10 条公众号原文沿用上轮核对结果，微信内可用性待验。
- **课程状态**。D1 10 节／25 道综合自测；D2 9 品种＋6 法国专题／42 道；D3 13 节／30 道＋4 个书面案例；D4 15 节／45 道＋5 个书面案例。以上是专题复习与预习。D5 当日教学及考核分配待确认；第22期为五天面授，无 D6 面授。逐日内容仍缺当期确认课表、WPS 原始课件及可核对的有道原件。
- **验证与保存**。85 项 Node 回归、53 单元 React 渲染、五城日期与跨年边界、两城市 DOM 切换、七个焦点入口、原 21 天进度与备份恢复均通过。CloudBase 整站与专注入口构建通过，共 450 个文件，入口 `./assets/app-DCsAc198.js`，SHA256 `750ef801a309722c723c12b674d1b1c8acbd68b52b11b8cc8f94785ea2b9e736`。独立预览第 15 版 724106 字节，在文件 URL 和模拟 HTTPS 的 jsdom 验证通过。
- **下一断点**。本轮未部署；仍待可用的已授权腾讯部署通路以及新版线上和手机实机验收。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 八个课前概念与口头自查

基线 `e3ee75a39ac04ed06cca44f138708aea4fcb0322`，分支 `migration/tencent-somm100`。核对当前源码、腾讯迁移记录、来源映射和上轮检查点，并在提交前复查分支头。

- **课前内容与页面**。八个概念各补一段原创例子、一题口头自查及可展开参考答案。从「本周要完成什么」按概念标题进入，在概念页可直接回到本周预习。目录、概念正文和练习由 `FoundationConcepts.tsx` 读取 `data/foundation-concepts.json`。保留八个既有概念 ID、十条公众号原始链接、现有班期／师资／报名、课前 4 周与 8 周路径以及学习记录。口头自查不写入进度。
- **来源与链接实测**。重读 [产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、历史 Chapter 00、[现行课前框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)及 [D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)。八题为原创课堂前练习，不含服务、销售、餐配或酒单任务。十条文章的 HTTPS 探测均收到 HTTP 200，但实际 HTML 标题为 `Site Unavailable`；不能据此确认原文正文可读或链接失效，保留源链接待微信客户端核验。未使用后台 Notion 归档代替学员外链。
- **课表核对**。重读[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，确认五天面授。Notion 课表检索命中的[单期开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)及[运营总控](https://app.notion.com/p/40717d16de4c81ef9be0e1d6579a9592)是计划文件，未提供第22期确认版逐日安排。两份文件对课堂间桥接有两周和三周两种口径；现有 21 天页面作为自选学习资源，后续用当期安排核对展示。D1 10 节／25 道综合自测；D2 9 品种＋6 法国专题／42 道；D3 13 节／30 道＋4 个书面案例；D4 15 节／45 道＋5 个书面案例；D5 教学及考核分配待确认；第22期无 D6 面授。
- **验证与保存**。84 项 Node 回归、53 单元 React 渲染、八节答案折叠与预习往返、链接逐条与来源映射核对、原有进度完整性检查通过。CloudBase 整站与专注入口构建通过，共 450 个文件，入口 `./assets/app-BK0WUGtm.js`，SHA256 `698ae63aec560602e63ae5fc1bd72bad534c899d1766a8d55bec8ee0e16085db`。独立预览第 14 版 721267 字节，在文件 URL 及模拟 HTTPS 的 jsdom 通过内容和导航检查。
- **下一断点**。本轮未部署。腾讯仍待已授权的可用部署通路，手机实机及新版线上尚待验收；逐日内容待当期确认课表、WPS 原始课件和可核对的有道原件。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 第22期师资与报名入口

基线 `67078c0f78ec63f47318a664bd7d8c7ba57a62c9`，分支 `migration/tencent-somm100`。读回迁移记录、上轮检查点、现有 Foundation 页面和来源映射，复查分支并发更新。

- **学生页面**。复用原五城卡片，在班期旁加入主讲老师／班主任和各一条赛事履历。新增课程适合对象、授课语言、课程设计与顾问。补齐两档人民币学费（五天面授 6,800 元，含四天产区游学 7,800 元）和第22期报名入口。手机窄屏使用原卡片布局，学费行可换行，报名链接最小高度 44px。学费区内跳转保留应用路由。现有课前／复习、课程图片、品牌、稳定 ID 与本机记录沿用。
- **招生证据**。核对 [第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)和[讲师介绍补全版第 6–11 页](https://chatgpt.com/library?file_id=libfile_ae6faf4682748191aca9747251a22b2a&account_id=personal)。[招生资料所列报名表](https://forms.cloud.microsoft/r/hR8HQT3gXc?origin=lprLink) HTTP 200，Chrome 渲染显示主办机构、第二十二期（11月）选项、五个招生城市和两档一致学费。只读核验，未填写或提交。页面保留已有公众号来源；独立网页查询返回不可打开，未确认其直开状态。收款、退款、余位及付款安排未独立核验，页面仅引导向课程方确认。
- **课程证据与缺口**。重读产品蓝图、已过时的 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要、预习路径与[课程研发记录](https://app.notion.com/p/40617d16de4c8119996fdc9fa87bd657)。研发记录中 D5／D6 是待 WPS 校准的工作草案。现有资料支持第22期五天面授，Library 课表检索未找到可核验的当期逐日安排或原始课件。D1 10 节／25 道综合自测；D2 9 品种＋6 法国专题／42 道；D3 13 节／30 道＋4 个书面案例；D4 15 节／45 道＋5 个书面案例；D5 教学和考核分配待确认；当期无 D6 面授。
- **验证与保存**。84 项 Node 回归、53 单元 React 渲染、完整 Foundation 页面 DOM 回归通过。覆盖五城教师与 25 个面授日期、两档费用、外链安全属性、页内焦点和原有自测记录。CloudBase 整站及专注入口构建通过，共 450 个文件，入口 `./assets/app-Z1hKjQ6O.js`，SHA256 `f51b621003b509ffe7bdf0222131289717dfb8241ec13294b6833e6772088725`。独立预览第 13 版 720378 字节，文件 URL 与模拟 HTTPS 的 jsdom 检查通过。
- **下一断点**。未部署本轮构建。腾讯仍待可用的已授权部署通路，最新站点和手机实机验收未完成。课堂开发待课程方确认课表、WPS 原始课件及可核对的有道原件。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · D3 欧洲产区综合复盘

基线 `a5848b62e765e0969f5fb149fa4373b3c69da6ec`，分支 `migration/tencent-somm100`。已检查分支更新，重读迁移检查点、上轮记录、课前来源映射及 Foundation 入口。

- **学生页面**。D3 新增四个原创书面案例，分别用意大利酒标辨认产地和品种、对照 Prosecco 与 Cava 的工艺资料、区分 Albariño 与 Alvarinho 的品种同名和产地证据、从 Douro 与 Tokaji 追查成酒类型或风格。四题各有折叠参考答案，八个回看按钮指向六个已有单元。D3、D4 共用复盘界面和焦点逻辑，保留 D4 五个案例、稳定 ID、题目、答案索引、本机存储键、课程图片与品牌。展开答案和回到复盘均不计分，也不更改作答记录。
- **内容来源**。重读 [产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、历史 Chapter 00、[现行框架](https://app.notion.com/p/40717d16de4c813b90b7d6a1bb17131e)、[Guided Learning](https://app.notion.com/p/40717d16de4c812fa096fb12992546e3)、[D1–D2 提要](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd)、[预习路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)及 [D3–D4 提要](https://app.notion.com/p/40717d16de4c817aaad6f3433f55df22)。D3 练习连接既有章节与公开资料，包括 [Brunello 协会](https://www.consorziobrunellodimontalcino.it/en/583/wines)、[Chianti Classico 协会](https://www.chianticlassico.com/en/wine/characteristics/)、[Prosecco DOC 协会](https://www.prosecco.wine/en/prosecco/discover/winemaking/)、[Cava 管理委员会](https://www.cava.wine/en/origin-cava/winemaking/)、[葡萄牙葡萄酒推广机构](https://winesofportugal.com/documents/141/WOP_BOOK_-_Prowein-2022_web.pdf)、[IVDP](https://www.ivdp.pt/en/wines/the-wines/)与 [Disznókő](https://www.disznoko.hu/en/elaboration/the-aszu-winemaking)。本轮未重刊私有教材。
- **课程状态**。D1 10 节／25 道综合自测，D2 9 品种＋6 法国专题／42 道综合自测，D3 13 节／30 道综合自测＋4 个书面案例，D4 15 节／45 道综合自测＋5 个书面案例。均为按主题组织的复习模块。重读[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，确认五天面授。D5 逐日内容及考核分配待确认，当期无 D6 面授。仍缺课程方确认的逐日课表、可核对的原 WPS PPT 和有道原件。
- **本地验证**。84/84 Node 回归、53 单元 React SSR/jsdom、D3 八个回看按钮与 D3/D4 自测原题往返通过。CloudBase 整站与专注入口构建检查通过，450 个文件、159 个学习指引字段，入口 `./assets/app-DdBWT9rM.js` SHA256 `b5bc5d944039725502928d5105b81178bdc144a6627941f01f3c565e106b13a3`。独立预览第 12 版 718098 字节，在文件 URL 与模拟 HTTPS 的 jsdom 中通过品牌图、四题、答案、章节定位和返回检查。
- **线上状态与接续**。Chrome 实测腾讯测试域 `/#foundation` 显示「六天，是开始」旧课程页，入口脚本 `/assets/index-ByL68l2x.js`，没有本轮 D3。未部署本轮构建。云浏览器访问执行器本地预览报 `ERR_CONNECTION_REFUSED`，本地文件协议也被浏览器策略禁止。物理手机、实际窄屏和线上新版本均待验收。下一断点是在已授权的腾讯部署通路上核对远端构建版本后发布并验证，或用独立预览在实机核对窄屏；课程内容等待确认课表和原件。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。

---

# Foundation · 2026-11-09 · 完整构建恢复与 D4 复盘往返

基线 `de1ffd1449f816fcf2cb9432e21183831b0daebb`，分支 `migration/tencent-somm100`。已读迁移检查点、上轮记录、来源映射与现有 Foundation 源码，复查分支头。通过现有网络通路完整检出权威分支，`pnpm 11.25.0 install --frozen-lockfile` 成功。上轮部分工作副本缺少的 Vite 与 `data/question-source-policy.json` 已在完整副本中恢复。

- **D4 正文到复盘的往返**。正文前加入「回到 D4 综合复盘」。按下后打开既有复盘并定位到标题，学习者可选另一节，再返回发起复习的原题。打开复盘不写学习记录。既有题目、单元 ID、存储键、课程图片及品牌继续沿用。
- **实际验证**。84/84 Node 回归、53 单元 React SSR/jsdom 渲染、D4 原题→章节→复盘→第 10 节→原题通过。断言展开复盘不改变复习记录，题目首次／最近答案保留。CloudBase 整站构建及专注入口检查通过，构建 450 个文件、159 个学习指引字段，入口 `./assets/app-BYJbdHM5.js` 的 SHA256 为 `5b11b1923b3adec03d428d107853356fa1b470570a81eeed8a789686f01d76fa`。更新的独立 HTML 预览已构建并在文件 URL 与模拟 HTTPS 中通过同一路径及内嵌品牌图检查。Chromium 启动报 `socket() failed: Operation not permitted`，物理手机、实际视口与线上验收仍待完成。
- 重读 [产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、历史 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要与预习路径，以及[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 道选择题＋5 道书面复盘。D1–D4 为复习模块。D5 教学和考核分配待核对。第 22 期五天面授，当期无 D6 面授。逐日课堂内容仍缺确认课表、原 WPS PPT 及可核对的有道原件。
- 腾讯本轮未部署，待可用的已授权部署通路。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点为在受支持的浏览器和物理手机验证窄屏焦点与原题往返，并在有可用腾讯部署通路后核对远端版本。以当期确认课表为准继续课堂对照。

---

# Foundation · 2026-11-08 · 自测与错题回看精准定位

基线 `ea80ef05b587c13b273e6a514ecd0af4b411905f`，分支 `migration/tencent-somm100`。核对迁移检查点、上轮记录、来源映射、Foundation 入口及自测与复习源码。已复查分支头。手机样式以分支 CSS 为基线，只增加题块滚动间距的选择器。

- **自测和原章节之间的往返**。从自测回看时，D1 及共用的地区复习组件等章节渲染后直接聚焦对应正文，已经打开该章时也能重新定位。返回自测时按既有题目 ID 找到原题并聚焦题块。下一题、上一题及待复习题也直接定位题块。返回按钮移到正文前并保持在可切换的章节之外，D4 通过综合复盘切到另一节后仍可回到原题。复用既有窄屏样式和滚动间距。原题库、稳定 ID、课前路径、讲师和课程图片继续沿用。学习记录仍为浏览器本机记录。
- 重读 [产品蓝图](https://app.notion.com/p/3ff17d16de4c81e5aef9e194b17f8738)、历史 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要和预习路径，以及[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。D1 基础复习 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 欧洲产区 13 单元／30 题，D4 工艺及世界产区 15 单元／45 道选择题＋5 道书面复盘。D1–D4 为复习模块。D5 的教学与考核分配待核对，第 22 期五天面授，当期无 D6 面授。逐日内容仍缺当期确认课表、原 WPS PPT 与可核对的有道原件。
- **本轮验证**。84/84 Node 回归和语法检查通过。轻量组件模拟覆盖 D1–D4 与法国专题直接定位，以及 D4 原题 → 对应章节 → 综合复盘中的另一节 → 原题，首次／最近答案及已有自查保留。扩展了真实 React/jsdom 脚本覆盖 D4 往返，但执行时缺 Vite，报 `ERR_MODULE_NOT_FOUND`。`npm run build:cloudbase` 在部分工作副本读取 `data/question-source-policy.json` 时报 `ENOENT`。真机与线上未验收，独立预览仍为第 10 版。
- 腾讯未部署，仍缺可用的已授权部署通路。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点是从完整分支检出及锁定依赖重跑真实渲染、CloudBase 构建及手机往返，再更新独立预览。课堂材料继续等已确认逐日课表。

---

# Foundation · 2026-11-08 · D4 综合复盘入口

基线 `a3ada441743f72640e813bdff9b34ef94f9b2926`，分支 `migration/tencent-somm100`。已读迁移检查点、上轮记录、当前 Foundation 入口、来源映射和 D4 内容，并复查分支头。

- **D4 综合复盘**。在 D4 既有复习区加入 5 道原创书面案例和 8 个回看按钮。分别练习罐内与瓶内二次发酵的先后、甜型波特与冰酒的残糖线索、Fino 与马德拉的熟成条件、同年份同产区白诗南的工艺差异、滇西北多地块与云南／宁夏跨区混酿。案例复用第 4、6、7、8、10、13、14、15 节及其技术表。参考答案默认折叠。打开答案不写学习记录，回看只切换原复习位置。D4 既有 15 单元、45 道选择题、稳定 ID 和存储键保持原样。按钮沿用既有窄屏纵排样式。
- 复核 [D3–D4 知识提要](https://app.notion.com/p/40717d16de4c817aaad6f3433f55df22)、[Prosecco DOC 协会](https://www.prosecco.wine/en/prosecco/discover/winemaking/)、[Cava 管理委员会](https://www.cava.wine/en/news-articles/cava-aging-the-cava-production-process/)、[IVDP 波特工艺](https://ivdp.pt/en/wines/port-wines/introduction/)、[雪莉委员会熟成说明](https://www.sherry.wine/sherry-wine/production/ageing)、[马德拉协会酿造说明](https://vinhomadeira.com/o-vinho-madeira/vinificacao-e-envelhecimento)及已有酒庄资料。Duke of Clarence 原厂直链本轮抓取失败，采用可读的[同份技术表副本](https://cdn.bottlebooks.me/570fa916b7edb7e055619771/Blandy_s_Duke_of_Clarence_Rich-Blandy_Duke_of_Clarence-1175.pdf)交叉核对，原单元来源仍可回查。
- 重读产品蓝图、历史 Chapter 00、现行课前框架及 Guided Learning、D1–D2 提要和预习路径。重读[第 22 期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，确认五天面授。D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题和 5 道书面复盘。D1–D4 是复习模块，D5 教学和考核的逐日安排待核对，当期无 D6 面授。Notion 和 Library 检索未取得当期确认课表、原 WPS PPT 或可核对的有道原件。
- 84/84 Node 回归及定向组件结构和动作检查通过。定向检查用轻量 React 替身验证 5 道折叠答案、8 个合法回看动作、当前单元聚焦及旧作答保留。已扩展真实 React/jsdom 检查，但本轮运行报 `ERR_MODULE_NOT_FOUND`（Vite）。部分工作副本仍缺 `data/question-source-policy.json`。整站构建、真机与线上未验收，独立预览仍为第 10 版。
- 腾讯未部署，仍缺可用的已授权部署通路。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点为 D1–D4 错题回看和综合复盘入口的实际手机流程验证。恢复完整检出及锁定依赖后，重跑整站构建和浏览器检查，再更新独立预览。逐日课堂内容仍等确认课表和原 WPS PPT。

---

# Foundation · 2026-11-08 · 南非读标与中国葡萄酒三节复习

基线 `c7cc2d168e46211ab95fe72fd7a173575920cc9d`，分支 `migration/tencent-somm100`。已核对迁移检查点、Foundation 入口、来源映射及 8 个工作副本文件，并复查分支头。

- **D4-13 南非读标**。并列 Swartland Winery 与 KWV 的两款 Swartland 白诗南 2023，比较不锈钢罐发酵与桶中发酵，再用 Kanonkop Pinotage 2022 定位 Stellenbosch 的 Simonsberg。依据 [Notion 教学页](https://app.notion.com/p/40717d16de4c81459d06c16cfd370b38)、[Swartland Winery 技术表](https://www.swartlandwinery.co.za/wp-content/uploads/2019/08/Swartland-Winemakers-Collection-Chenin-Blanc-2023.pdf)、[KWV 技术表](https://kwv.co.za/wp-content/uploads/2025/09/DB21023_The-Mentors_Factsheet_Chenin-Blanc_2023_R1.pdf)、[Kanonkop 技术表](https://kanonkop.co.za/wp-content/uploads/2024/11/Pinotage-2022.pdf)。
- **D4-14 中国产区定位**。加入宁夏贺兰山东麓、山东胶东半岛与滇西北三个定位练习，分别查越冬措施、海洋与降雨、葡萄园海拔。新图聚焦三处，原正文仍覆盖六个区域。依据 [Notion 教学页](https://app.notion.com/p/40717d16de4c814ab561dcaf2ffb89b2)、[CHANDON 宁夏酒庄资料](https://www.chandon.com/en-us/about-chandon-our-wineries.html)、[烟台主管部门胶东资料](https://ptjj.yantai.gov.cn/art/2020/12/17/art_1595_2879839.html)、[LVMH 敖云葡萄园资料](https://www.lvmh.com/en/our-maisons/wines-spirits/ao-yun)。宁夏水利厅备用页读取超时 400，宁夏工信厅备用页返回 405，实际采用可读的酒庄资料。
- **D4-15 中国酒款查证**。对照敖云 2017 的多地块原料与奔富 CWT 521 2022 的跨区混酿。后者技术表列云南香格里拉赤霞珠 77%、宁夏马瑟兰 23%。选择基准酒款时先明确比较问题。依据 [Notion 教学页](https://app.notion.com/p/40717d16de4c8137896bd236453a996e)、[LVMH 敖云年份资料](https://www.lvmh.com/en/our-maisons/wines-spirits/ao-yun)、[奔富原厂技术表](https://www.penfolds.com/on/demandware.static/-/Sites-twe-master-catalog/default/dw52365610/tasting-notes/Penfolds/Penfolds%202024/2022%20CWT%20521%20Cabernet%20Sauvignon%20Tasting%20Notes.pdf)。
- 重读产品蓝图、历史 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要和预习路径。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)列明五天面授。D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题，均为复习模块。D5 教学及考核逐日分配待核实，当期无 D6 面授。仍缺确认课表、原 WPS PPT 与可核对的有道原件。
- 复用原单元 ID、学习记录键及图解布局。84/84 Node 回归与定向渲染结构检查通过，覆盖 37 张图解的总数、本轮三道默认折叠答案及 8 个来源入口（7 个不同 HTTPS 链接）。当前部分工作副本仍缺 `data/question-source-policy.json` 与 Vite、React、jsdom。整站构建、真机和线上待验收，独立预览仍为第 10 版。
- 腾讯未部署，仍缺可用的已授权部署通路。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点为 D4 综合复习串联酒标证据、工艺和产区，优先补可验证的复盘入口。恢复完整检出与锁定依赖后重跑整站构建和浏览器检查，再更新预览。逐日课堂对应等确认课表及原 WPS PPT。

---

# Foundation · 2026-11-08 · 澳新与南美读标

基线 `5987ce975ad94d9242deb26a93b42bfc62fb236a`，分支 `migration/tencent-somm100`。已核对迁移检查点、Foundation 入口、来源映射及 8 个工作副本文件。上轮续跑记录将南美误写为 D4-11，本轮按源码和 Notion 教学页更正。D4-11 为澳大利亚与新西兰，D4-12 为智利与阿根廷。

- **D4-11 澳新读标**。比较 Yalumba Barossa Shiraz 2022 和 Dog Point Sauvignon Blanc 2024，先区分产地、品种、系列，再从技术表查熟成容器及时间。案例同时存在品种、产地和年份差异，不能单独推出容器造成的感官差异。依据 [Notion 教学页](https://app.notion.com/p/40717d16de4c81bfb56bd2567d84b3ad)、[Yalumba 技术表](https://web-assets-prod.yalumba.com/2022-Yalumba-Samuels-Collection-Shiraz.pdf)、[Dog Point 技术表（经销商托管）](https://redwhitecellar.co.nz/wp-content/uploads/2024/12/TN-Dog-Point-Sauvignon-Blanc-2024.pdf)。
- **D4-12 智利与阿根廷读标**。并列上迈坡谷、卡萨布兰卡谷和优克谷案例。Don Melchor 2022 自查题拆开 95% 成酒赤霞珠与 93% 葡萄园赤霞珠种植面积。Casas del Bosque 采用酒庄系列说明并提示复核年份。Catena 2022 提供 Paraje Altamira 和 100% 马尔贝克的对应。依据 [Notion 教学页](https://app.notion.com/p/40717d16de4c812e8595e90956d6121f)、[Don Melchor 技术表](https://donmelchor.com/wp-content/uploads/2025/01/TS-Don-Melchor-2022-ENG.pdf)、[Casas del Bosque 系列页](https://casasdelbosque.cl/en/content/80-pequenas)、[Catena 技术资料](https://catenazapata.com/appellation-paraje-altamira-2022/)。
- 重读产品蓝图、历史 Chapter 00、现行课前框架、Guided Learning、D1–D2 提要和预习路径。[第22期招生正文第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)列明五天面授。D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题，为复习模块。D5 教学及考核逐日分配待核实，当期无 D6 面授。仍未取得当期确认课表、原 WPS PPT 或可核对的有道原件。
- 复用原单元 ID 与图解组件，未改学习记录键。84/84 Node 回归及定向检查通过，覆盖现有章节对应、34 张图解的总数、两组案例的五条 HTTPS 来源和两个默认折叠答案。部分工作副本可读取远端 question-source-policy.json，完整检出及 Vite、React、jsdom 依赖仍缺，本轮未完成 React 渲染和整站构建。独立预览仍为第 10 版。手机真机与线上待验收。
- 腾讯本轮未部署，仍缺已授权的部署通路。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点为 D4-13 南非读标。恢复完整分支工作副本和锁定依赖后，重跑整站构建、React 渲染与浏览器检查，再更新预览。

---

# Foundation · 2026-11-08 · 北美读标与盲品自练

基线 `5cc3068821dd55206a0594704d6184ab27d42634`，分支 `migration/tencent-somm100`。已读迁移检查点、上轮记录、当前 Foundation 入口及来源映射，并在写入前复查分支头。

- **D4-10 北美读标**。原单元增加三款酒的对照图与折叠自查。纳帕 ARTEMIS 2022 区分酒标品种与技术表混酿比例，俄勒冈 Origine 35 2022 区分酒款名数字、采收年份和嵌套产地，安大略 Vidal Icewine 2023 区分产地、品种与藤上自然冻结的工艺。依据 [Notion 教学定位](https://app.notion.com/p/40717d16de4c81988e3ec639a461cb1b)、[ARTEMIS 原厂 PDF](https://www.stagsleapwinecellars.com/wp-content/uploads/2023/11/Stags_Leap_Factsheet__ARTEMIS_2022_FINAL.pdf)、[Origine 35 原厂 PDF](https://domainedrouhin.com/wp-content/uploads/2024/02/2022-Pinot-Noir-Origine-35.pdf)、[Vidal Icewine 酒庄技术表 PDF（经销商托管）](https://decante-vinhos.pt/wp-content/uploads/2025/10/2023-INN-NIA-NE-Vidal-Icewine.pdf)。Inniskillin 商品页跳转后无可读正文，Great Estates 镜像跳转返回 500，实际采用已读通的对应年份技术表。
- **盲品自练**。在正式课程考核索引加原生折叠练习，按记观察、给判断、揭标复盘推进，提供可直接做的匿名文字题与折叠参考分析。示例比较冰酒和贵腐甜酒，要求用工艺资料复核判断。第22期招生资料第 7 页确认盲品列入考核，题例和步骤为原创自练。正式酒款、题型与评分待确认。复用原 D4 单元 ID，练习没有学习存储写入。
- 重读产品蓝图、旧 Chapter 00、现行课前框架及 Guided Learning、D1–D2 知识提要和预习路径、Notion 开班模板与 [第22期招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。旧章为历史原型，开班模板为草稿。第22期招生正文确认五天面授。D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题。D1–D4 是复习模块，D5 教学及考核逐日分配待核实，第22期无 D6 面授。逐日对应仍缺当期确认课表、原 WPS PPT，当前来源未取得可核对的有道原件。
- 本轮按 GitHub 当前提交恢复 Foundation 相关源码。84/84 Node 回归通过。定向检查通过，覆盖现有单元路由、32 张图解的总数、新图三组和三条 HTTPS 链接、答案默认折叠、盲品区位置及无存储写入。React/jsdom 脚本启动报 `ERR_MODULE_NOT_FOUND`（缺 Vite），整站构建预检报 `ENOENT`（局部检出的 `data/question-source-policy.json` 缺失），Chromium 启动报 `socket() failed: Operation not permitted`。现有独立预览仍为第 10 版。整站构建、手机真机和线上验收待做。
- 腾讯本轮未部署。上一份迁移记录显示控制台会话未登录、CLI 网络政策限制，待可用的已授权腾讯部署通路。保留 `[skip netlify]` 与 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点为恢复完整分支工作副本与锁定构建依赖，重跑渲染和构建，更新独立预览。内容可继续 D4-11 南美读标，逐日课程按确认课表再落位。

---

# Foundation · 2026-11-08 · 希腊与匈牙利读标及团队酒单自练

基线 `520280489b08ee0b5329add49bae2db68d3090fc`，分支 `migration/tencent-somm100`。核对工作副本与分支的 9 个关键文件，提交前复查分支头。

- **D3-13 希腊与匈牙利读标**。原单元接入三款酒的对照图及折叠答案。SantoWines Santorini Assyrtiko 2025 用于区分圣托里尼产地、阿西尔提科品种与篮式整枝。Disznókő 同庄的 Tokaji Dry Furmint 2025 和 Tokaji Aszú 5 Puttonyos 2019 用于区分产地、干甜与酿造线索。Aszú 技术表区分贵腐果粒和基酒的品种。两份酒庄产品页可能滚动到新年份，练习提示先核对瓶身年份。干型 Furmint 的独立技术表链接经跳转返回读取错误 500，采用可访问的酒庄正文。依据 [Notion 教学定位](https://app.notion.com/p/40717d16de4c81e38fcadf0fca5a0cf7)、[SantoWines 酒庄资料](https://usa.santowines.gr/products/santorini-assyrtiko)、[Disznókő 干型 Furmint](https://www.disznoko.hu/en/vin/34/disznok-tokaji-dry-furmint)、[Disznókő Aszú 技术表](https://www.disznoko.hu/pdf/vin/en/disznok-tokaji-aszu-5-puttonyos-2019-93.pdf)。
- **团队酒单自练**。在正式课程考核索引增加可折叠练习，分开起草两份清单，逐款核实信息，再交换复核。12 款杯卖酒及 40 款主酒单来自 [第22期招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)。记录字段和复核步骤为原创练习建议，正式提交与评分要求待课程方确认。沿用既有 ID 和本机记录键。
- 重读产品蓝图、旧 Chapter 00、D1–D2 提要、课前路径和开班模板。旧章为历史原型，开班模板为草稿。第22期招生正文确认五天面授。D1 为 10 单元／25 题，D2 为 9 品种＋6 法国专题／42 题，D3 为 13 单元／30 题，D4 为 15 单元／45 题，以上为复习模块。D5 的逐日教学及考核分配待核实，第22期无 D6 面授。
- 84/84 Foundation 回归、53 个 React/jsdom 单元、31 张图解、CloudBase 构建及专注入口检查通过。新增图解已补齐通用图解所需的年份说明。独立 HTML 在文件地址及模拟 HTTPS 通过班期跳转、酒单展开、D3-13 焦点、三条外链及答案展开检查。模拟 HTTPS 使用预置记录验证展开酒单保留本机进度。手机真机和线上验收待做。
- 构建共 450 文件、159 个学习指引字段。主入口 `./assets/app-C0E4T4VW.js`，SHA256 `32d033060d1b238032caea82b90d1ed966e0be48405f035ee450fce08e0d2a46`，专注入口 JS 未压缩 538844 字节。腾讯未部署，仍缺可用的已授权部署通路。提交保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。
- 下一断点为 D4-10 真实酒款读标与正式课程区盲品自练。逐日课程对应仍需当期确认课表和原 WPS PPT。

---

# Foundation · 2026-11-08 · 瓦豪读标与德奥雷司令口试自练

基线 `d85e6699aa62fced6c5933e4b6037f2d32b4b919`，分支 `migration/tencent-somm100`。

- **D3-12 瓦豪读标**。在 `lib/foundation-diagrams.mjs` 用 Domäne Wachau 同为 2025 年的 Grüner Veltliner Federspiel Terrassen 和 Riesling Smaragd Terrassen 对照。两款均为干型，均在不锈钢罐中发酵和熟成。练习区分品种、梯田来源、协会风格词与 Wachau DAC 产地制度。两款葡萄不同，不能用这一对案例把香气差异单独归因于风格标示。来源为 [Notion 教学定位](https://app.notion.com/p/40717d16de4c81aeb4c0dbc72a52e737)、[绿维特利纳技术表](https://www.domaene-wachau.at/wp-content/uploads/factsheets/71171/DW-GV-Federspiel-Terrassen-2025-dt.pdf)、[雷司令技术表](https://www.domaene-wachau.at/wp-content/uploads/factsheets/81491/DW-Riesling-Smaragd-Terrassen-2025-dt.pdf)、[Vinea Wachau](https://www.vinea-wachau.at/index.php?L=1&id=26)、[Wachau DAC](https://www.austrianwine.com/fileadmin/user_upload/PDF/PTs/Wachau_now_a_DAC_region.pdf)。
- **考核复习索引**。`app/FoundationPage.tsx` 在正式课程区接入原创口试自练，结合原有 D3-11 的 Gauer 2024 Spätlese trocken 和本轮 D3-12 的瓦豪 Riesling，练习用约一分钟分别说明品种、产地与干甜线索，再展开参考回答。时间是练习提示，正式题型、时限和评分规则仍待通知。依据 [第22期招生资料](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal) 第 6–7 页确认口试列入范围和每城五天面授。保留课前边界、课程图片、讲师介绍、既有单元 ID 和本机学习记录键。
- 重读产品蓝图、旧 Chapter 00、D1–D2 清单、课前路径、D3-12 教学页与 Notion [开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)。旧章仍为历史原型，模板为草稿。D1–D4 为知识模块。D5 的逐日教学和考核分配仍缺原 WPS PPT 与当期确认安排。第22期无 D6 面授。
- 84/84 Foundation 回归、53 个 React/jsdom 单元、30 张图解及 CloudBase 构建通过。独立 HTML 通过文件地址、模拟 HTTPS 下的班期跳转、口试展开、D3-12 四条公开来源、焦点和答案展开检查。模拟 HTTPS 以预置 D3 记录验证查看答案保持进度。初轮烟雾检查误假定文件地址和空白预览都已有存储，按环境与测试数据修正后通过。手机真机与线上未验收。
- 生产构建 450 文件、159 个学习指引字段，主入口 `./assets/app-CogqXCZd.js`，SHA256 `6ff042dfda28f0e73a14acf142a0649d5e583ccfb65dcf0ef211a539f643fcb1`，专注入口 JS 未压缩 535493 字节。腾讯本轮未部署，待可用已授权通路。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。
- D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题。下一断点可补独立的团队酒单准备练习与 D3-13 希腊及匈牙利读标。正式逐日对应需原 WPS PPT 和当期确认课表。

---

# Foundation · 2026-11-08 · 葡萄牙读标与第22期考核复习索引

基线 `beeafcf11e2be5bcf7c34f0fa2978abdf1a81061`，分支 `migration/tencent-somm100`。

- **D3-09 葡萄牙读标**。在 `lib/foundation-diagrams.mjs` 接入 Soalheiro Alvarinho Clássico 2024 与 Quinta do Crasto Crasto Tinto 2021 的对照，另用 IVDP 解释 Douro、Porto 两个原产地名称。Crasto 的 85% 与 15% 指熟成容器分配，技术表未给出葡萄比例。复用窄屏单列样式、稳定单元 ID 和折叠答案。来源为 [Notion 教学页](https://app.notion.com/p/40717d16de4c81d8b274fef925c61e78)、[Soalheiro 技术表](https://soalheiro.com/wp-content/uploads/2024/12/Techsheet-Soalheiro-Alvarinho-Classico-2024-1.pdf)、[Crasto 技术表](https://quintadocrasto.pt/wp-content/uploads/2016/02/Crasto_Tinto_2021_PT.pdf)、[IVDP 产地说明](https://www.ivdp.pt/en/wines/the-wines/)。
- **第22期考核范围与复习索引**。依据重读的 [Yichel 招生资料第 6–7 页](https://chatgpt.com/library?file_id=libfile_cd46e6582a888191b7565100f9e61611&account_id=personal)，在 `app/FoundationPage.tsx` 正式课程区列出笔试、盲品、口试、餐酒搭配、侍酒实操及四类其他酒水，并独立列出 12 款杯卖酒与 40 款主酒单酒款的团队作业。四个入口跳至 D1–D4 的已有复习模块。`app/FoundationCohort.js` 提供班期到索引的跳转。索引按主题组织，具体日期、评分和提交方式待课程方通知。保留课程品牌、讲师、图片、自测与本机记录键。
- 重读产品蓝图、已标为历史原型的 Chapter 00、D1–D2 提要及课前路径。第22期原 WPS PPT 与逐日安排仍未获得。[Notion 开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60) 仍为草稿；招生资料仅确认每城五天面授与考核范围。D1–D4 为知识模块。D5 的具体教学及考核分配待核对，第22期无 D6 面授。
- 84/84 Foundation 回归、53 个 React/jsdom 单元、29 张图解与 CloudBase 构建通过。独立 HTML 在文件地址、模拟 HTTPS 均通过班期→考核索引→D1–D4 焦点导航和 D3-09 来源／折叠检查。原独立烟雾脚本曾在下拉未启用时提前检查，调整为等待可交互后两种模式均通过。真机、线上验收待做。
- 生产构建 450 文件、159 个学习指引字段。主入口 `./assets/app-gQGopReO.js`，SHA256 `f1dc90eb90978c2017f1c3ef5cf6fef29b78cc8cc0382dbc6e00efedaff8060c`。专注入口 JS 未压缩 532280 字节。腾讯未部署，仍缺可用的已授权部署通路。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。
- 当前 D1 10 单元／25 题、D2 9 品种＋6 法国专题／42 题、D3 13 单元／30 题、D4 15 单元／45 题。下一断点可从 D3-12 奥地利读标补真实酒款，继续按已经确认的考核项目整理练习材料。逐日课堂对应仍需原 WPS PPT 及当期确认课表。

---

# Foundation · 2026-11-08 · 西班牙读标与 Madeira 熟成

基线 `e41d7038a81137e2937e1c4d7e8bce3ac342ecf8`，分支 `migration/tencent-somm100`。两节既有课堂复习新增真实酒款图解、书面练习与折叠答案。

| 单元 | 新增内容 | 来源 |
| --- | --- | --- |
| D3-07 西班牙三产区 | 并列 Rioja 的 Marqués de Riscal Reserva 2020、Ribera del Duero 的 Emilio Moro Malleolus 2021 与 Priorat 的 Mas Martinet Camí Pesseroles，按品种、容器和已知时长读资料。Malleolus 技术表未列桶陈月数。Mas Martinet 的单品 URL 年份与页面标题不同，采用酒庄总目录支持的无年份工艺说明。 | [Notion 教学页](https://app.notion.com/p/40717d16de4c81de84f2c8a98135343f)、[Riscal 技术表](https://www.marquesderiscal.com/public/Attachment/2025/3/marqusderiscalreserva2020_eng.pdf)、[Malleolus 技术表](https://www.emiliomoro.com/wp-content/uploads/2025/02/TASTING_NOTES_BEM_ENG_MALLEOLUS-2021.pdf)、[Emilio Moro 术语](https://www.emiliomoro.com/en/frequently-asked-questions/)、[Mas Martinet](https://www.masmartinet.com/vins/) |
| D4-08 Madeira | 对照 Blandy’s Duke of Clarence 的 Estufagem 与 5 Year Old Sercial 的 Canteiro。练习区分受控罐加热与温暖酒窖桶陈。两款都使用木桶，甜度各以原厂标示记录。 | [Notion 教学页](https://app.notion.com/p/40717d16de4c81b59baed7a52c76df94)、[Duke of Clarence 技术表](https://blandys.com/wp-content/uploads/2025/02/BLANDYS-3YO_DUKE-OF-CLARENCE.pdf)、[Sercial 技术表](https://blandys.com/wp-content/uploads/2025/02/Blandys-5YO-Sercial.pdf)、[IVBAM 工艺](https://vinhomadeira.com/o-vinho-madeira/vinificacao-e-envelhecimento) |

- `lib/foundation-diagrams.mjs` 按原有单元 ID 接入两张原创图，复用折叠练习与窄屏单列样式。学员端显示 7 条公开来源链接。原课程、自测及本机学习记录键保留。
- 重读蓝图、历史 Chapter 00、D1–D2 知识点清单、课前路径及两节教学页。重读第 22 期 Yichel 报名资料的第 6、7 页，每城五天面授。Library 检索未找到该期原 WPS PPT 或逐日教案。Notion [开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60) 仍标草稿。D1–D4 继续作为知识模块，D5 具体教学与考核分配待确认，当期无 D6 面授。
- 84/84 Foundation 测试、53 单元 React/jsdom 渲染、28 张图解通过。`scripts/check-foundation-rendering.mjs` 验证七条公开链接及两题折叠答案，展开时保持进度。独立 HTML 在文件地址和模拟 HTTPS 通过章节切换、焦点与折叠验证。真机和线上未验收。
- CloudBase 构建及专注入口检查通过。主入口 `./assets/app-DfRo3OMl.js`，SHA256 `9e38f36d00c23a53d2132921a06d7618dc9906a4e5cd63aabebf25862f658a12`，450 文件、159 个学习指引字段，专注入口 JS 未压缩 528457 字节。保留 `[skip netlify]` 和 `netlify.toml` 的 `ignore = "exit 0"`。
- 内容状态 D1 10 单元／25 题，D2 9 个品种单元＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题。下一断点可补 D3-09 葡萄牙产区读标，并把第 22 期已公布的考核范围单列为复习索引。逐日对应需当期确认课表及原 WPS PPT。腾讯本轮未部署，仍缺可用的已授权通路。

---

# Foundation · 2026-11-08 · 德国酒标与波特酒工艺练习

基线 `c98571aff8554936d1ae4bf8eb2baf19b56599d0`，分支 `migration/tencent-somm100`。两个既有课堂复习单元新增真实酒款对照与可折叠答案。

| 单元 | 新增教学 | 来源 |
| --- | --- | --- |
| D3-11 德国静止酒酒标 | Gauer 2024 Spätlese trocken 与 Schloss Johannisberg 2023 Grünlack Spätlese 分别提供干型标示和残糖证据。遮住两种证据后练习区分 Prädikat 和成酒甜度。Gauer 产品页未列残糖，Grünlack 技术表列 76.2 克／升。 | [Notion 单元](https://app.notion.com/p/40717d16de4c815985c2ca3ef6f63160)、[Gauer](https://www.weingut-gauer.de/shop/riesling-sp%C3%A4tlese-trocken)、[Grünlack 技术表](https://schloss-johannisberg.de/app/uploads/Gruenlack-Spaetlese-2023-de.pdf)、[DWI](https://www.winesofgermany.com/our-wine/quality-standards/quality-standard/449/pr%C3%A4dikate) |
| D4-06 Port | 拆开加强时点和熟成路线。对照 Vintage、LBV 与 Taylor’s 10 Year Old Tawny，练习辨认采收年份和酒龄标示。 | [Notion 单元](https://app.notion.com/p/40717d16de4c81a4a01ef2e9c543b3ae)、[IVDP 工艺与风格](https://ivdp.pt/en/wines/port-wines/introduction/)、[IVDP 分类](https://www.ivdp.pt/en/wines/port-wines/special-categories)、[Taylor’s](https://www.taylor.pt/en/port-wine/10-year-old/10-year-old-tawny) |

- `lib/foundation-diagrams.mjs` 通过原单元 ID 接入两张原创图。复用既有窄屏单列样式，增加可选的原生折叠练习。前端展示 6 条公开来源，Notion 作为后台追溯。稳定 ID、既有自测与浏览器学习记录键保留。
- 重新读取产品蓝图、旧 Chapter 00、两节 Notion 教学来源及开班模板。Chapter 00 仍按历史原型处理，学员课前沿用 4 周／8 周导学。重读 Yichel 第 22 期报名文档的课程与报名页，确认每城五天面授。Notion 开班模板仍为草稿，缺原 WPS PPT 与当期确认课表。报名页继续采用既有资料。
- 84/84 Foundation 回归、53 单元 React/jsdom、26 张图解及两个折叠答案通过。展开答案不改变本机进度。独立 HTML 预览在文件地址和模拟 HTTPS 下通过新单元切换、焦点、来源链接和折叠交互。上轮 Chromium 环境错误为 `socket() failed: Operation not permitted`，手机真机与线上验收待完成。
- CloudBase 构建和专注入口检查通过，共 450 文件、159 个指引字段。主入口 `./assets/app-DHCKFNe0.js`，SHA256 `0360d0af6fc52c49a7c32d1341cb77bf088aa6f4c802a1bccfe3b9816eb36e06`。专注入口 JS 未压缩 524400 字节。腾讯本轮未部署。保留 `netlify.toml` 的 `ignore = "exit 0"` 和 `[skip netlify]`。
- 课程状态为 D1 10 单元／25 题，D2 9 个品种单元＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题。D1–D4 按知识模块呈现。D5 当期教学与考核分配待核实。第 22 期无第六天面授。
- 下一断点可从 D3-07 西班牙三产区读标及 D4-08 Madeira 熟成路径继续。逐日内容需原 WPS PPT 与确认课表，腾讯测试站更新需可用的已授权部署通路。

---

# Foundation · 2026-11-08 · D3/D4 产区与工艺对照

基线 `14974dace0309f91f16209b67bb92eb8b2bc95f3`，分支 `migration/tencent-somm100`。本轮为四个既有复习单元接入原创图解与公开来源。

| 单元 | 图解和复习任务 | 教学定位与公开来源 |
| --- | --- | --- |
| D3-04 威尼托 | 比较 Tommasi Amarone 与 Albino Armani Recioto Classico 的风干、压榨和发酵，指出两种酒的甜度分歧在发酵结果。 | [Notion](https://app.notion.com/p/40717d16de4c8185b523dc664e1cd618)、[Tommasi](https://tommasiwine.it/amarone-appassimento/?lang=en)、[Albino Armani 技术资料](https://www.albinoarmani.com/wp-content/uploads/2022/11/Recioto-della-Valpolicella-DOCG-Classico_en.pdf) |
| D3-05 托斯卡纳 | 从 Chianti Classico 三种类型和 Brunello di Montalcino 的名称分别追溯产地与桑娇维塞要求，区分法定比例下限和实际配比。 | [Notion](https://app.notion.com/p/40717d16de4c81b089c0d6b8912a13ff)、[Chianti Classico 协会](https://www.chianticlassico.com/en/wine/types/)、[Brunello 协会](https://www.consorziobrunellodimontalcino.it/en/583/wines) |
| D4-04 起泡酒 | 对比 Prosecco DOC Spumante、Cava、Franciacorta 的装瓶顺序、二次发酵容器与对应类别的熟成要求。 | [Notion](https://app.notion.com/p/40717d16de4c8180bb3ed067f5e4373a)、[Prosecco DOC](https://www.prosecco.wine/en/prosecco/discover/winemaking/)、[Cava](https://www.cava.wine/en/news-articles/cava-aging-the-cava-production-process/)、[Franciacorta](https://franciacorta.wine/en/consortium/regulations/) |
| D4-07 雪莉 | 对照 Fino、Amontillado、Oloroso 的熟成路径，再追踪 Solera 取酒和逐级补酒。 | [Notion](https://app.notion.com/p/40717d16de4c81ff8503f56b42a11ad1)、[Fino](https://cdn.sherry.wine/sherry-wine/dry-sherry-wines/fino)、[Oloroso 与 Amontillado](https://wwv.sherry.wine/news/oloroso-vs-amontillado-whats-the-difference)、[熟成与 Solera](https://www.sherry.wine/sherry-wine/production/ageing) |

- `lib/foundation-diagrams.mjs` 由现有复习组件按稳定 ID 加载四张图。学员页只显示 10 条公开链接，后台 Notion 教学页在此记录。现有课程图片、师资、自测、练习记录键保留。两列、三列内容复用现有窄屏单栏规则。
- 本轮重读产品蓝图、旧 Chapter 00、当前课前框架与 Guided Learning、D1–D2 清单和课前路径。旧 Chapter 00 继续作为历史原型。两条 Valpolicella 产区协会产品页返回 `TimeoutError`，风干图改用已读取的两家生产者技术资料。
- 重新读取第22期 Yichel 报名文档（Library `libfile_cd46e6582a888191b7565100f9e61611` 版本1，共7页）。每城五天面授，另列四天游学。未获得逐日课件。Notion [单期开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60) 仍为草稿，待原 WPS PPT 核对教学与考核日分配。报名页沿用已核实资料。
- 84/84 Foundation 回归、53 单元 React/jsdom 渲染、24 张图解验证通过。检查原浏览器记录、图解文字、键盘焦点和 10 条公开来源的挂载。独立预览在文件地址及模拟 HTTPS 可切换全部四节。390 像素视口 Chromium 尝试在启动时报 `socket() failed: Operation not permitted`，手机布局和真机验收待补。
- CloudBase 生产构建与专注入口检查通过，共 450 文件、159 个指引字段。主入口 `./assets/app-CmG4akgO.js`，SHA256 `f8dac5b689fefd9d581f9b9d5476fb9c94e115fff10175047b03e917c946365e`。专注入口 JS 未压缩 520279 字节。腾讯本轮未部署，线上验收待做。保留 `netlify.toml` 的 `ignore = "exit 0"` 和提交标签 `[skip netlify]`。
- 内容状态 D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题。D1–D4 为知识模块。D5 教学与考核分配待核实，第22期无第六天面授。
- 下一断点可从 D3-11 德国静止酒酒标、D4-06 Port 工艺与类型继续。确认逐日安排仍需原 WPS PPT 和当期确认版本，发布仍需可用的已授权腾讯部署通路。

---

# Foundation · 2026-11-08 · 补齐 D2 品种对照图

基线 `80a6aca6f2ef36748f5b3fdfef9a91addda3efad`，分支 `migration/tencent-somm100`。

| 单元 | 学员页面新增内容 | 来源 |
| --- | --- | --- |
| D2-03 长相思 | 对照 Sancerre 和 Marlborough 两款酒的共同柑橘线索、不同果香描述及工艺资料。Les Baronnes 技术页未指定年份。 | [Notion 教学页](https://app.notion.com/p/40717d16de4c8184af60d7e196274050)、[Henri Bourgeois 技术页](https://famillebourgeois-sancerre.com/wp-content/uploads/2021/06/Les-Baronnes-Sancerre-Blanc-EN.pdf)、[Cloudy Bay 2025](https://www.cloudybay.com/en-ww/our-wines/sauvignon-blanc-2025) |
| D2-04 雷司令 | 对照 Dr. Loosen 同为 2024 年的两款酒，分别记录甜度和酸度。资料未提供两款可直接比较的残糖或总酸数字。 | [Notion 教学页](https://app.notion.com/p/40717d16de4c81adb621f27bf23fbf7e)、[Graacher trocken](https://drloosen.de/en/products/2024-graacher-riesling-trocken)、[Wehlener Sonnenuhr Kabinett](https://drloosen.de/en/products/dr-loosen-wehlener-sonnenurh-riesling-kabinett) |
| D2-08 其他白葡萄 | 按品种整理代表产区与酒标别名，区分穆斯卡特品种家族和混酿关系。 | [Notion 教学页](https://app.notion.com/p/40717d16de4c818f8996f928d2485e4e) |
| D2-09 其他红葡萄 | 按品种整理法国与其他产区的代表例，帮助区分品种、别名和地名。 | [Notion 教学页](https://app.notion.com/p/40717d16de4c81c8afd3e10a2584fed4) |

- `lib/foundation-diagrams.mjs` 按原 ID 接入四张原创中文图解，D2 的 9 个品种单元均有图解。两组酒款案例展示四条公开原文链接。沿用窄屏单栏样式，`app/foundation-study.css` 增加来源链接样式。稳定 ID、练习及其本机记录键、讲师与课程图片保留。
- 重新读取 [D1–D2 知识点清单](https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd) 与 [课前路径](https://app.notion.com/p/40717d16de4c814ba288fa4ab63f2746)。检索第22期逐日课表仍只有 [待确认的开班模板](https://app.notion.com/p/40717d16de4c810aae7af56c0cb87a60)。原 WPS PPT 与确认的教学、考核日分配仍缺。本轮采用已有报名资料核实的五天面授安排。
- 84/84 Foundation 回归通过。`scripts/check-foundation-rendering.mjs` 核对 53 个 React/jsdom 单元、20 张图解、D2 9/9 及四条来源链接，原浏览器记录通过回归。CloudBase 构建和入口检查通过。450 个文件、159 个指引字段，主入口 `./assets/app-BIkYG57K.js`，SHA256 `9729353e7722ee0363927facf6533d839d99c1547ead5762d30dde75fefd3afb`。专注入口 JS 514674 字节（未压缩）。独立 HTML 在文件地址及模拟 HTTPS 下完成四个新单元切换和链接检查。手机真机及线上验收待做。
- 当前内容 D1 10 单元／25 题，D2 9 品种＋6 法国专题／42 题，D3 13 单元／30 题，D4 15 单元／45 题。D1–D4 为知识模块，待与当期逐日课件对应。D5 的教学与考核日分配待核实。第22期无 D6 面授。
- 下一断点为 D3/D4 课堂复习中可公开核验的产区和工艺对照，以及第22期原 WPS PPT 和逐日对应。腾讯部署仍需可用的已授权通路。保留 `netlify.toml` 的 `ignore = "exit 0"` 和提交标签 `[skip netlify]`。

---

# Foundation · 2026-11-08 · D1-08 酒庄工艺对照练习

基线 `ceb20f19126c302c1597bad7beea9a02b0ad32d0`，分支 `migration/tencent-somm100`。

- `app/FoundationCellarStudy.js` 在既有 D1-08 单元接入三款霞多丽的工艺资料、三道原创判断题和折叠答案。学员分开记录苹果酸乳酸转化、容器和酒泥接触。资料未写明的字段标「未说明」，尤其不能把带酒泥熟成等同于搅动酒泥。不同酒款的风格差异不能仅归因于一个变量。沿用原单元 ID、学习记录、课程品牌与图片。
- [Louis Michel & Fils Chablis](https://www.louismicheletfils.com/en/chablis-et-petit-chablis)：自发苹果酸乳酸转化，不锈钢罐熟成 6–10 个月。[Ridge 2023 Estate Chardonnay](https://www.ridgewine.com/wines/2023-estate-chardonnay/)：桶内发酵、完成转化、带酒泥熟成 9 个月。[Melka 2023 Mekerra Chardonnay](https://www.melkaestates.com/wines/10_chardonnay)：桶内发酵、不做转化、中性法国橡木桶熟成 19 个月。Melka 页面同时收录旧年份，本练习仅采用 2023 段落。学生页只使用事实摘要和酒庄原文链接。
- 重新核对产品蓝图、旧 Chapter 00、D1–D2 知识点清单、课前路径、资源矩阵及 D1-08 Notion 教学页（40717d16de4c81bca48fff8dbdb56587）。Chapter 00 仍标为早期原型。上轮乳酸发酵与橡木桶旧视频短链无法核实，保留为待查来源。未将技术资料标为已核实视频。
- 第22期逐日教案在可访问 Library 检索中未找到。Notion 候选「单期开班模板与验收清单」40717d16de4c810aae7af56c0cb87a60 明确为草稿，讲师与 D1–D6 仍待确认，且原 WPS PPT 校准未完成。保留既有第22期每城五天面授及招生信息，以已有报名资料版本为依据。
- 验证：84/84 Foundation 回归、53 单元 React/jsdom、CloudBase 构建与入口检查通过。新案例只出现在 D1-08，三个酒庄链接及折叠答案可用，展开不改进度。独立预览在文件 URL 和模拟 HTTPS 两种模式通过。生产构建 450 文件，159 指引字段，主入口 `./assets/app-Bfj8BZuo.js`，SHA256 `80a9df700b05d362f298d09fd6097ce2fd25e2ce614329320bd9eb5d009d9d17`。专注入口 JS 509258 字节。实际手机及线上验收待做。
- 当前内容：D1 10 单元／25 题，新增三款案例。D2 9 品种＋6 法国专题／42 题。D3 13 单元／30 题。D4 15 单元／45 题。D5 教学与考核待当期分配。D6 当期无第六天面授。D1–D4 为知识模块，仍需逐日课件对应。
- 下一断点：梳理 D2 尚未覆盖的葡萄品种图解与对照案例，继续核对第22期原 WPS PPT 和逐日安排。腾讯发布仍需可用的已授权部署通路，原 `netlify.toml` 的 `ignore = "exit 0"` 和提交标签 `[skip netlify]` 保留。

---

# Foundation · 2026-11-07 · 三节复习接入官方视频观察

基线 `41a1a461093fc778620484d563f9a23e47d97a03`，分支 `migration/tencent-somm100`。

| 单元 | 官方视频页 | 图文备选 |
| --- | --- | --- |
| D1-02 葡萄藤生长周期 | [BIVB 冬剪至采收前](https://www.bourgogne-wines.com/our-resources/media,3181,14293.html?args=Y29tcF9pZD0yMzA5JmFjdGlvbj1maWNoZV9tZWRpYSZpZD0zMTEmfA%3D%3D) | [葡萄藤年度周期](https://www.bourgogne-wines.com/winegrowers-and-expertise/bourgogne-vines/a-sup_the-lifecycle-of-the-vine/a-journey-through-time-the-lifecycle-of-the-vine,2525,9395.html) |
| D1-07 果皮接触 | [香槟委员会采收与压榨](https://www.champagne.fr/en/find-out-more/mediaroom/champagne-multimedia-library/educational-clips-champagne-harvest-and-grape) | [香槟压榨图文](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/pressing) |
| D4-03 传统法 | [香槟委员会酿造视频](https://www.champagne.fr/en/find-out-more/mediaroom/champagne-multimedia-library/educational-clips-champagne-production) | [装瓶与二次发酵图文](https://www.champagne.fr/en/about-champagne/how-champagne-is-made/bottling-and-second-fermentation) |

- `app/FoundationVideoStudy.js` 按原单元 ID 映射三组外链、原创中文观察任务与折叠答案。已有正文、自查、题目、品牌、讲师和课程照片保留。只加载本地页面文字和链接，媒体在原站播放。打开答案不计分，不更改本机进度。
- 本轮重读 Notion D1–D2 清单（40717d16de4c810c811dd8a1324066cd）、课前路径（40717d16de4c814ba288fa4ab63f2746）和资源矩阵（40717d16de4c81c2910decdcecc94d7d）。矩阵中的四个历史 B 站短链（ZvypVHl、dInEREY、WRR1Qmp、5jdEnA7）均返回 URL not accessible via this tool。保留为待核来源。BIVB 官方媒体页明确有同株延时视频，直达 YouTube 返回 Error fetching，香槟委员会两页均可读取播放器入口，官方媒体目录有对应 MP4 条目。完整播放、字幕、手机和大陆可达性仍待核验。本轮未复制视频、私有教材或图像。
- 84/84 Foundation 回归和 53 单元 React/jsdom 渲染通过。验证三个卡片的唯一归属、链接、图文备选、折叠及记录保持。CloudBase 构建和入口检查通过，共 450 文件、159 个学习指引字段。主入口 `./assets/app-DyL5k1BA.js`，SHA256 `bcd5adc48d4e0bbdcb21fbe730f0e6aaf80d4fa98a4be2f19386e52e86810179`。独立 HTML 以文件地址和模拟 HTTPS 启动均通过，核对新三节与已有 D1-10 酒标。原快速预览脚本曾在数据加载结束前选择单元，改为等待选择器可用后复核通过。
- 课程状态：D1 10 单元／25 题，新增两组视频观察。D2 9 品种＋6 法国专题／42 题。D3 13 单元／30 题。D4 15 单元／45 题，新增一组视频观察。D5 教学与考核日分配待确认。D6 第22期无第六天面授。D1–D4 是知识模块，逐日课件仍需当期源 PPT 对应。
- 下一断点：查证 D1-08 乳酸发酵与橡木桶的可公开来源，继续做视频手机实测及腾讯版本验收。腾讯上次访问仍见旧 Chapter 00，当前发布待可用部署通路。保留 `netlify.toml` 的 `ignore = "exit 0"` 和提交标签 `[skip netlify]`。

---

# Foundation · 2026-11-07 · D1-10 公开酒标对照练习

基线 `ca346a227039fbdf61f4fa6d0aca1f21435a1288`，分支 `migration/tencent-somm100`。

- `app/FoundationLabelPractice.js` 在 D1-10 加入夏布利官方读标图与 Cloudy Bay Sauvignon Blanc 2025 酒庄产品页。原有两张虚构卡保留。新练习让学员区分正背标直接可读信息、官方资料确认的信息和仍不确定的字段。折叠答案单独注明 13.5% 来自酒庄产品页，不能把网页字段当作已经从瓶图读到的文字。原单元、题目、进度键与讲师及课程照片保留。
- 重读 Notion D1-10（40717d16de4c81108c65e16da8465979）、D1–D2 清单（40717d16de4c810c811dd8a1324066cd）、资源矩阵（40717d16de4c81c2910decdcecc94d7d）、课前路径（40717d16de4c814ba288fa4ab63f2746）和产品蓝图。旧 Chapter 00 仍明确过时。D1-10 引用的有道历史文章（Notion 3fe17d16de4c81aeadbfe12703b59cf0）正文注明分组可见。保留内部来源记录，学生页使用公开官方链接，图片由原站展示。
- 公开原站本轮已读取：<https://www.chablis-wines.com/tasting/the-art-of-tasting/how-to-read-a-label/how-to-read-a-label,1838,7685.html>、<https://www.chablis-wines.com/discover/a-unique-territory-and-terroir/four-appellations-and-one-varietal/four-appellations-and-one-varietal,1807,7644.html>、<https://www.cloudybay.com/en-us/our-wines/sauvignon-blanc-2025>。酒庄旧 2023 URL 实际重定向至 2025，因此使用已读回的 2025 地址及对应事实。学生端手机跳转与图片加载仍待实测。
- 重读第22期 Yichel 报名资料 DOCX 全7页（libfile_cd46e6582a888191b7565100f9e61611，版本1）。现有五城日期、09:00–16:30、2＋2＋1 天面授及四天游学与文档一致。文档列有师资、费用和报名入口，未给出逐日课件对应或退款条款。本轮未变更招生信息。
- 验证：84/84 Foundation 回归，53单元 React/jsdom 渲染通过。D1-10 核对两例、3个官方链接、展开答案、进度保持。CloudBase 全量构建与专注入口依赖检查通过，共450文件，159个学习指引字段。主入口 `./assets/app-BCUF2n7r.js`，SHA256 `dbac290c9ec2c2ba2f6413c824a3fcd1191796b196385dd9aa38642ca6ffb4fd`。专注页 JS 504164 字节。独立 HTML 本地加载、D1 导航及新酒标练习通过 jsdom。腾讯部署和手机真机验收待完成。
- 课程状态：D1 10单元／25题，9张图解及新读标对照。D2 9品种＋6法国专题／42题。D3 13单元／30题。D4 15单元／45题。D5 教学与考核日分配待确认。D6 当期无第六天面授。D1–D4 知识分类仍待对应当期课表。
- 下一断点：从源 PPT 核对课堂日分配，继续筛选可直接外链的课内视频并做手机实测。腾讯上次访问仍见旧 Chapter 00，当前版本待已授权部署通路。保留 `netlify.toml` 的 `ignore = "exit 0"` 和提交标签 `[skip netlify]`。

---

# Foundation · 2026-11-07 · 葡萄园管理与酒泥图解、全站验证恢复

基线 e510f8aadf3a4d45379e4c60e13c3dac074f959d；分支 migration/tencent-somm100。先读迁移说明、最新检查点和来源映射，提交前复核远端并发更新。

- 重新读取 D1-04 葡萄园管理（40717d16de4c8143b199fb57a899a5f5）与 D1-08 酿造选择（40717d16de4c81bca48fff8dbdb56587）正文。新增两张原创语义 HTML 教学图解：六项葡萄园管理选择；苹果酸乳酸转化、酒泥接触/选择性搅动、容器/时间分组。明确非必经流水线，避免低产/有机=品质、接触酒泥=必须搅桶等误解。未搬运私有正文或图片。
- lib/foundation-diagrams.mjs 通过既有 FoundationD1Review 按稳定单元 ID 自动接入。原14张图解逐对象一致，现16张；D1有9张。讲师、图片、教材数据、题目、记录键、其他课程不变。
- 扩充 tests/foundation-d1-visuals.test.mjs；scripts/check-foundation-rendering.mjs 在真实 React DOM 中逐字检查全部16张图解、图题与 aria 标签，覆盖53个复习单元、导航焦点、原记录保留和重挂载。
- 成功恢复本提交完整源码，992个文件逐一验证 Git blob SHA，无差异。安装聚焦验证依赖（React19.2.6/jsdom26.1.0/Vite8.0.13等），不是全量冻结锁文件安装。首轮定向恢复缺5个测试证据文件，已补齐；测试扩展的括号替换错误已修复。
- 本轮通过84/84回归、53单元真实 React/jsdom、全部16图解、CloudBase完整生产构建、专注入口完整依赖与产物哈希检查。450构建文件，159指导字段，37标记。主入口 ./assets/app-0yd1pHhc.js，11818853字节，SHA256 33e69c9ab44dd4810031fd8cc0ac00aa61203584aacbe339e3f9ba03e535989f。专注入口完整JS依赖502156字节（未压缩，不含CSS/图片，不代表实测速度）。全App大包警告仍存在。
- 证据 docs/qa/foundation-d1-management-lees-20261107.json。代码与检查点已保存，准备受保护提交并读回；未部署、未手机/真实浏览器验收、未获Henry验收。学习记录仍仅在本机浏览器。netlify.toml ignore="exit 0"保留，提交含[skip netlify]；没有旧Netlify、收费、授权、备案或域名操作。

| 分类 | 当前内容 |
| --- | --- |
| D1 | 10复习单元、25独立自测、9张图解及原酒标练习 |
| D2／法国 | 9+6复习单元、42独立自测 |
| D3 | 13复习单元、30独立自测 |
| D4 | 15复习单元、45独立自测 |
| D5 | 本期教学/考核分配待核 |
| D6 | 第22期五天面授，不增造第六天 |

D1–D4仍是知识分类，逐日课表待正式来源确认。下一断点：核对真实酒标/媒体素材与使用权，继续资源缺口；具备浏览器能力后实测手机排版/焦点，具备腾讯通路后核实部署版本。精确阻塞：本期源PPT与课堂日分配；此前Chromium socket() failed: Operation not permitted (1)，无能力变化，本轮不重试；腾讯最后状态为需登录/CLI策略拒绝。本轮有实质增量，不满足连续两轮完全无进展的暂停条件。

复跑：node --test tests/foundation*.test.mjs；node scripts/check-foundation-rendering.mjs；npm run build:cloudbase；node scripts/check-foundation-entry.mjs。

---

# Foundation · 2026-11-07 · D1前三单元原创图解与资源缺口核对

基线 a5030bc6def15bc58f840cb12215bdd2af82913f；migration/tencent-somm100。已读取当前迁移说明、最新恢复备份检查点和来源映射，核对远端没有并发更新。没有回退旧main或旧Sites。

- 重新读取Notion资源矩阵40717d16de4c81c2910decdcecc94d7d及D1-01/02/03三篇正式知识提要。另查八篇历史图文来源，正文有分组可见说明；不搬运其全文或图片，不把Notion归档验证当公开使用权或学生可访问证明。
- 新增三张原创语义HTML教学示意，自动由现有FoundationD1Review→FoundationDiagram入口显示：葡萄四部分与酿造线索；休眠至采收七阶段；环境与成熟六组因素。沿用现有布局、稳定单元ID、已有正文/题目/图片/记录。所有原11张图解逐对象比对未变，现共14张。功能关系图不冒充植物解剖图；顺序图不指定月份，环境图不采用土壤=固定香气等公式。
- 新增tests/foundation-d1-visuals.test.mjs：图解ID匹配、语义标签/全部文字可达、生长顺序、限制说明、无外部图像iframe/链接、现有组件接入。连同权威分支原D1记录测试，本轮10/10通过。数据与渲染函数在Node真实执行，但元素树使用注入构造器，不称React DOM或浏览器验收。
- 证据及逐项D1缺口：docs/qa/foundation-d1-resources-20261107.json。D1-04葡萄园管理、D1-08酒泥/搅桶图解仍缺；酒标练习不等于真实酒标素材验收，视频播放/授权未确认。没有增加或承诺视频与外链可用。
- 环境变化：原somm100-validation目录已不存在，首次exec返回No such file or directory。从/执行成功，Node24.22.1可用；在foundation-resource-review隔离目录从本轮远端原文件恢复必要依赖，未用旧foundation-source作为权威源码。完整源码与依赖未恢复，本轮未重跑生产构建、79项全量回归或手机测试，不能继承上轮通过状态称本轮已构建。
- 已保存并准备受保护提交/读回；未部署、未获Henry验收。提交保留[skip netlify]，netlify.toml ignore exit0未改。没有旧Netlify、收费、授权或域名操作。

| 分类 | 当前内容 |
| --- | --- |
| D1 | 10单元、25独立自测；本轮补前三节示意 |
| D2／法国 | 9+6单元、42独立自测 |
| D3 | 13单元、30独立自测 |
| D4 | 15单元、45独立自测 |
| D5 | 当前教学/考核分配待核 |
| D6 | 第22期五天面授，不增造第六天 |

D1–D4仍是知识分类，逐日课表未经确认。下一断点先恢复完整当前源码/构建依赖并跑图解整页渲染，再补D1-04/08等资源缺口。外部阻塞为当期源PPT与逐日分配、可用真实浏览器/手机、已授权腾讯部署通路。上一轮Chromium socket权限错误，本轮未重试。当前有实质内容与代码增量，不满足完全阻塞暂停条件。

复跑 node --test tests/foundation-d1-visuals.test.mjs tests/foundation-d1.test.mjs；环境恢复后 npm run build:cloudbase 及 scripts/check-foundation-rendering.mjs。

---

# Foundation · 2026-11-07 · 恢复备份后立即重读课程记录

基线 c5476da612e55868132b872514529e3602610020，分支 migration/tencent-somm100。先读 migration、上轮检查点与 source map，修改前逐字比较远端 FoundationPage、FoundationBackup、检查点，三者一致。本轮只改 Foundation 恢复流程。

- 实际复现：显式替换备份已写入 localStorage，但已挂载 D1 自测仍显示旧选项；断言“restored answer must be visible immediately”失败。旧状态继续切题存在写回覆盖风险。最初测试先做默认恢复后无法再次上传，是旧 Backup 成功后锁定上传导致；改为先测显式替换后，复现上述独立问题。
- 修复：FoundationBackup 仅成功恢复后回调父页面；FoundationPage 用新 key 重新挂载完整课程内容，让11组本机记录重新读取。成功提示留在外层并获得焦点。失败、旧预览冲突不重新挂载；独立使用 Backup 时保留手动刷新入口。未改记录键、题目ID、教材正文、讲师、图片或其他课程。
- 新增 scripts/check-foundation-restore.mjs，真实 React/jsdom 上传事件覆盖：无效JSON不写入；预览不写入；默认保留冲突；显式替换后四套自测、六处自查和桥接学习日立即更新；继续切题不写回旧答案；预览后答题需重新确认；模拟第二组写入失败后回滚且不重新挂载；成功提示焦点。全部11组导入样本读回一致。原读取器挂载时会省略 false 自查项，未勾选含义不变；测试不把这种既有规范化误称记录丢失。
- 本轮重新读取 Notion D1–D2清单40717d16de4c810c811dd8a1324066cd、预习路径40717d16de4c814ba288fa4ab63f2746及运营总控40717d16de4c81ef9be0e1d6579a9592。法国专题仍未精确归属课堂日；预习保留4/8周与31题。运营草稿仍有旧六天占位并明确要求原PPT/正式排期核实，不覆盖已记录第22期五天面授资料。未复制私有教材正文，也未新增未经核实的班期/费用/报名承诺。
- 验证通过：79项单元测试、53复习单元渲染、142题/143复习往返、完整页面8概念/10原文链接/20焦点入口、专注页及加载失败恢复、新增备份UI测试、CloudBase生产构建及独立入口依赖/哈希检查。450文件；主入口 ./assets/app-cZkE6yVP.js，11818853字节，SHA256 a21eaa0a6fc6cb03da935a23a325285251feaf4443bb3c6aa38d32d1a5eed97e。专注页完整JS依赖496637字节（未压缩、不含CSS/图片，不代表实测速度）；159学习指导字段、37标记通过。
- 证据 docs/qa/foundation-restore-ui-20261107.json。下载发起被测试桩替代，不能称真实文件已下载；jsdom不等于手机/真实浏览器验收。沿用本地聚焦依赖环境，不是完整冻结锁文件安装。
- 已保存，准备受保护提交并读回；未部署，未获Henry验收。netlify.toml ignore = "exit 0"保留；无Netlify、收费、授权、域名或备案操作。当前学习记录仍只在本浏览器。

| 范围 | 当前内容状态 |
| --- | --- |
| D1 | 10复习单元、25道独立自测 |
| D2 | 9品种单元、42道独立自测；另6法国专题单元 |
| D3 | 13复习单元、30道独立自测 |
| D4 | 15复习单元、45道独立自测 |
| D5 | 当前班期教学/考核分配待核 |
| D6 | 第22期已有资料为五天面授，不虚构第六天 |

D1–D4是知识分类，不是已核实的逐日安排。下一断点：结合来源缺口继续素材/课程阅读体验；有可用环境后实测恢复文件下载、手机焦点/布局及腾讯部署版本。精确外部阻塞：本期源PPT与逐日模块分配；上轮Chromium socket() failed: Operation not permitted (1)且无能力变化，本轮不重复启动；腾讯通路最后为控制台需登录/CLI策略拒绝，未重新授权或绕过。本轮有实质代码进展，不满足“连续两轮完全无进展”的暂停条件。

复跑：node scripts/check-foundation-restore.mjs；node --test tests/foundation*.test.mjs；现有page/rendering/quiz-flow/focus/loading脚本；npm run build:cloudbase；node scripts/check-foundation-entry.mjs。

---

# Foundation · 2026-11-07 · Complete page navigation and motion preference

Base a8394a4329d1e0a656ae853f51053c37bf596886 on migration/tencent-somm100. Read migration/latest checkpoint/source map and current code; compared changed files against remote before commit. No new teaching-source or daily-schedule claims.

- Replaced20 remaining direct scrollIntoView handlers in FoundationPage:12 section buttons and8 concept-directory links now reuse focusFoundationTarget. Destination focus moves with the requested scroll; concept links still preserve #foundation routing. Stable target IDs, article links, text, images, question data and records unchanged.
- Corrected shared Foundation reduced-motion behavior from auto to instant. Global html CSS uses scroll-behavior:smooth; auto inherits that style and does not reliably mean immediate scrolling. Normal preference retains smooth. Tests assert instant explicitly and preserve tab order. This helper is only Foundation navigation; no paused course implementation altered.
- Extended full-page integration assertions:all20 destinations receive actual DOM focus and explicit instant/start scroll requests under reduced motion. Existing53-unit integration now checks instant. Four quiz records still restore after complete-page remount.
- Browser attempt: installed Playwright resolved through CommonJS (ESM bare-package resolution initially returned ERR_MODULE_NOT_FOUND). Chromium launch with default Playwright options failed before any page opened: process_singleton_posix.cc:297 socket() failed: Operation not permitted (1), secondary ptrace Operation not permitted. No environment permission escalation, profile/network bypass or repeat launch attempted. Real phone layout/scroll and cross-page browser acceptance remain blocked; jsdom is not browser acceptance.
- PASS79 unit tests,53review units,142questions/143round trips,full-page8concepts/10links/20focus destinations,loading and focus-shell tests,CloudBase build159guidance fields/37markers,focus-entry dependency/hash checks.450files; full app entry ./assets/app-DSR1W_pk.js11818853bytes,SHA256758d61edb0bf2f849d827821af6c7be60d49b0a2ea40e564a3751ff3d8ea5e61. Focus complete JS closure496095bytes uncompressed,excludes CSS/images; no speed claim.
- Evidence docs/qa/foundation-navigation-20261107.json. Runtime0.2 skill successfully read this round; environment_status tool not exposed. Netlify ignore exit0 preserved. No network/auth/billing/deploy action. Saved for guarded commit/readback; not deployed or browser/mobile accepted.

| Area | Current content status |
| --- | --- |
| D1 | 10review units +25independent questions |
| D2 / France | 9+6units +42independent questions |
| D3 | 13units +30independent questions |
| D4 | 15units +45independent questions |
| D5 | Teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth day |

D1–D4 remain topic labels, not official daily assignments. Next: continue independently testable keyboard/record recovery work or refresh course-source gaps; retry browser only when environment capability changes. Exact blockers: current five-day source PPT/day mapping, current Chromium socket permission failure, usable Tencent session/deploy route (last login-required/CLI policy denial). This round made substantive code progress, so not fully blocked.

Reproduce node --test tests/foundation*.test.mjs; node scripts/check-foundation-page.mjs; node scripts/check-foundation-rendering.mjs; node scripts/check-foundation-quiz-flow.mjs; node scripts/check-foundation-focus.mjs; node scripts/check-foundation-loading.mjs; npm run build:cloudbase; node scripts/check-foundation-entry.mjs. Focused dependency environment retained, not full frozen pnpm install.

---

# Foundation · 2026-11-07 · Same-origin focus entry

Base326fb969db1f2600df8b5e8f8cbb876d7be79dd1 on migration/tencent-somm100. Read current migration/checkpoint/source map; verified remote originals before changes and concurrency before commit.

- Added cloudbase/foundation.html and foundation-main.tsx, reusing unchanged FoundationPage and existing load boundary in FoundationFocus. Approved BrandMark retained. Chinese local-record notice; full-app return link; same-origin/mount navigation helper for courses/service/practice/home/account. No account/cloud-sync claims, no duplicate data or keys, no content/instructor/image changes.
- CloudBase-only multi-page build retains index.html and adds foundation.html; bundler extracts common runtime rather than Foundation importing the giant app chunk. All static and dynamic Foundation JS dependencies total497552bytes (uncompressed): entry1357,shared runtime193471,course302724. Excludes CSS/images; not a speed measurement. Dependency checker excludes LearningApp/curriculum/producers/CMS/wine-library and enforces <1MB JS budget.
- Full App Foundation page now offers 打开课程专注阅读 link only in CloudBase/local-only build. Built-link verification initially caught boolean true versus string 'true' mismatch in environment guard; normalized via String and rebuilt. Final artifact contains link; checker now guards it. No student content was changed to fix this.
- Root / and /somm100/ relative paths checked. Same-origin local-record behavior tested by rendering existing page, saving D1 answer, switching to focus shell, and returning to existing page. This is React/jsdom, not actual browser navigation or remote hosting acceptance. Full page tests also cover four quiz records. Existing deployment config remains unchanged and target origin determines whether existing local records are available.
- PASS79unit tests,53review units,142questions/143round trips,full-page8concepts/10links/12targets,loading-error checks,focus shell tests,production build159guidance fields/37markers,all focus dependency file hashes read back from written dist.450build files. Full app entry assets/app-uUyr3K4k.js,bytes11818853,SHA2569e3b23e270df895a395926b4949b01a852415665296304534342c87b913617d0; full App remains large. Audit script updated to select index.html entry explicitly in multi-entry builds.
- Evidence docs/qa/foundation-focus-entry-20261107.json. Reproduce npm run build:cloudbase then node scripts/check-foundation-entry.mjs; node scripts/check-foundation-focus.mjs; existing page/render/quiz/loading scripts; node --test tests/foundation*.test.mjs. Focused Node24/React19/jsdom/Vite8 dependencies, not full frozen-lockfile install.
- Runtime skill refresh returned exact error: skill package is not available. Prior read instructions retained; no network policy or auth readiness inferred. No deployment/network/billing/auth actions attempted. Netlify ignore exit0 preserved. No new curriculum-source retrieval/claims; current source map and cohort data retained.

| Area | Current content status |
| --- | --- |
| D1 | 10review units +25independent questions |
| D2 / France | 9+6units +42independent questions |
| D3 | 13units +30independent questions |
| D4 | 15units +45independent questions |
| D5 | Teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth day |

D1–D4 remain topic labels, not official daily assignments. Saved for guarded commit/readback; not deployed or browser/mobile accepted. Focus page is a prepared build path, not a claimed live URL. Does not register a new service worker or promise offline availability.

Next breakpoint: real browser/mobile checks for focus entry and same-origin page transitions; verify actual host serving foundation.html when deployment route becomes available. Continue course-source reconciliation. Exact blockers: current five-day source PPT/day mapping, browser environment last socket Operation not permitted, usable Tencent session/deploy route last login-required/CLI policy denial. Do not bypass or reauthorize. A future separate-origin deployment would NOT share records automatically; retain backup/restore.

---

# Foundation · 2026-11-07 · Extracted page and consolidated lazy module

Base cb56f6260584d1f630874ec0aecc44894665bd2a on migration/tencent-somm100. Read migration,latest checkpoint,source map; fetched and compared LearningApp/checkpoint/test-loader originals with remote before edits. No new curriculum-source claim this engineering round.

- Extracted the exact9678-character Foundation JSX body into app/FoundationPage.tsx; existing14 course children now static imports inside this lazy page. LearningApp keeps its original shell/account/navigation/hooks and FoundationLoadBoundary, with one lazy FoundationPage. No source/body/link/ID/quiz/record/instructor/image deletions or edits; preserved PageTitle markup and go callbacks. All other paused sections unchanged.
- Full course becomes available together, preserving cross-review event destinations. Boundary still catches page load errors. This is a component isolation step, NOT a new URL, standalone boot, offline course or cloud sync.
- New scripts/check-foundation-page.mjs mounts the complete page:8 concepts,10 original WeChat links,12 top destinations,concept links keeping #foundation,three parent route callbacks,cohort/backup presence,and four quiz records after page unmount/remount. Actual React/jsdom; scroll requests stubbed; no visual/network acceptance.
- Test-only loader now uses installed Vite/Oxc for TS/TSX and resolves existing relative js/tsx/ts/mjs files. First full-page check failed because the old loader assumed every component was.js; FoundationSparklingPractice is.tsx. Corrected test loader, reran successfully; no product workaround introduced.
- PASS77 unit tests,53 review units,142 questions/143 round trips,loading-error tests,new full-page test,CloudBase build,159 guidance fields and37 markers. Original page-body exact-match assertion passed. Evidence docs/qa/foundation-page-split-20261107.json.
- Build445files,entry assets/index-B59aV_4c.js,12012344bytes,SHA25620562079089215bf4966b59e61fbaa1c55434b4e23d9d1302a9a505fa6cfa57a. Previous12028433bytes: reduction16089bytes (about0.13%). FoundationPage-DhGaHdig.js302722bytes,14 separate child imports consolidated. Fewer emitted files do not establish browser request counts or faster loading.
- Standalone limitation explicitly verified: generated FoundationPage imports shared React/runtime bindings from the main index chunk. A direct Foundation boot still requires a deliberately separated runtime/shell entry; this commit does not bypass the12MB shared entry. No timing or significant performance gain claimed.
- Netlify ignore exit0 preserved; no deployment,network/auth/billing actions. Runtime skill read; environment_status unavailable. Saved for guarded commit/readback; not deployed or online/mobile accepted. Node24/React19.2.6/jsdom26.1.0 and focused Vite8 dependency setup, not a frozen full-lockfile install.

| Area | Content status |
| --- | --- |
| D1 | 10 review units +25 independent questions |
| D2 / France | 9+6 units +42 independent questions |
| D3 | 13 units +30 independent questions |
| D4 | 15 units +45 independent questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth day |

D1–D4 are topic labels, not verified daily assignments. Next: evaluate explicit standalone Foundation bootstrap/shared runtime separation with full-shell return and same-origin records preserved. Do not blindly split paused modules. Blockers: current five-day source PPT/day mapping; browser/mobile validation (last socket Operation not permitted); usable Tencent session/deploy route (last login required/CLI policy denial). No repeated auth or bypass attempted.

Reproduce: node scripts/check-foundation-page.mjs; node --test tests/foundation*.test.mjs; node scripts/check-foundation-rendering.mjs; node scripts/check-foundation-quiz-flow.mjs; node scripts/check-foundation-loading.mjs; npm run build:cloudbase. Optional write:false audit must match written entry hash.

---

# Foundation · 2026-11-07 · Entry clarity and bundle diagnosis

Base 4d8c0a1544afe2f200477f37fae10326015cf27c on migration/tencent-somm100. Read current migration/checkpoint/source map/cohort data and compared modified source/checkpoint with remote; no concurrent head change at start.

- Updated the live Programs Foundation card in app/Platform.tsx: names the available Chinese precourse path, topic review and quizzes; explicitly states cohort22 five classroom days and pending daily teaching allocation. Existing route ID/click action retained; CMS cards unchanged.
- Removed stale six-day and Chapter00 claims from retained BrandHome/CourseLibrary/PlatformHome components. Important correction: these exports are NOT currently rendered by LearningApp (home uses Discover, courses uses Programs); their initial copy corrections alone did not change the build. Do not report them as a reproduced live homepage defect. Images and all other content retained.
- Added scripts/audit-cloudbase-entry.mjs: offline Vite build with write:false, emits entry hash/bytes, direct imports and largest module renderedLength metadata. No upload, deployment or build config change. A first broad Foundation filter also matched the external dependency directory name; narrowed to repository app/lib/data paths and reran.
- Diagnosis: largest entry modules include data/curriculum.json (renderedLength8391074),producers.json(1596980),knowledge-dictionary.json(618158),cms-learning.json(600793),grape-wine-index.json(476150). These are bundler metadata lengths, NOT minified byte shares or network transfer sizes. Shared static imports outside Foundation dominate; no paused course/data edits or unsafe mass splitting undertaken. FoundationLoadBoundary is1496 in this metric; other Foundation components remain dynamic chunks and are not part of this entry-only list.
- PASS:77 Foundation unit tests; CloudBase production build;159 guidance fields/37 markers. Report entry hash exactly matched separately written build. Live card text verified present in built entry; stale six-day/Chapter00 promotional phrases absent. No new DOM/browser/mobile tests claimed this copy/diagnostic round; prior integration results are not relabeled as this run.
- Build473files,entry ./assets/index-Bts6gIkj.js,12028433bytes,SHA256 4be67ff20b5ccd9553c3f55d162a3597f02d708aeb5fc2012125c38f3b3de355. No size reduction/performance improvement claimed. Evidence docs/qa/foundation-entry-audit-20261107.json.
- Source basis: existing foundation-cohort22.json (teachingDays5, sourceLabel2026-11-04, sourceUrl https://mp.weixin.qq.com/s/ry29Vvs8tSHyR3xgekgySg), latest source map and actual code. No new source-body retrieval/publication, no changes to dates/fees/registration. Runtime environment_status still not exposed; no auth/network/billing actions. Netlify ignore exit0 retained.

| Area | Current status |
| --- | --- |
| D1 | 10 review units +25 independent questions |
| D2 / France | 9+6 units +42 independent questions |
| D3 | 13 units +30 independent questions |
| D4 | 15 units +45 independent questions |
| D5 | Teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days; no invented sixth day |

D1–D4 remain topic labels, not confirmed daily assignments. Saved for guarded commit/readback; not deployed or online/mobile accepted. Records remain browser-local.

Next breakpoint: evaluate a Foundation-specific entry boundary that avoids shared curriculum/library preload, with preserved navigation/account/record behavior and rollback evidence before changing shared routing. Continue source reconciliation if current five-day source PPT becomes available. Exact outstanding blockers: official day-to-material mapping, real browser/mobile validation (last socket Operation not permitted), usable Tencent deployment/auth route (last console login required, CLI policy-denied). Not all work is blocked; no automation change.

Reproduce diagnostic: `node scripts/audit-cloudbase-entry.mjs > /tmp/entry-audit.json`, then `npm run build:cloudbase`; compare entrySha256 against the emitted asset. Existing focused dependency environment applies; not a full frozen pnpm install. Audit uses write:false and does not replace dist-cloudbase.

---

# Foundation · 2026-11-07 · Loading failure recovery

Checked 2026-11-07T05:36:44+08:00. Base 39489d7618cac495957a4c3f773f4b9a515ab136 on migration/tencent-somm100; fresh branch head unchanged. Read migration/latest checkpoint/source map; app and checkpoint/QA/Netlify originals compared with remote before edits.

- Added FoundationLoadBoundary around the existing whole-course Suspense boundary. Pending state now offers return to courses. A rendering/import failure presents Chinese recovery feedback, focused error heading, explicit page reload and return controls. React.lazy caches rejected imports, so resetting only the boundary is not represented as retrying the download. No automatic reload loop or storage clearing.
- Preserved all course children, instructor/images, original content, questions, stable IDs and record keys. No new curriculum-source claims. This code-only increment does not reread or republish private teaching bodies.
- New actual React/jsdom integration passes deferred success, lazy rejection, pending/error return controls, heading focus, explicit reload action, unchanged stored record and healthy remount. Reload is stubbed; no actual browser/network/mobile/online acceptance claimed.
- PASS: 77 unit tests,53 review units,142 questions/143 review round trips,CloudBase build,159 guidance fields and37 markers. Build473 files; entry ./assets/index-C2uMa4Rg.js;12028285 bytes;SHA256 52eb61ec3215758edf5ef736668acb450e74fd046381d33c73e18fa5121f7ec2. Large-chunk warning remains: this improves failure handling, not loading size/speed.
- Evidence: docs/qa/foundation-loading-20261107.json; reproduction: docs/qa/FOUNDATION_RENDER_CHECK.md. Netlify ignore guard retained. Saved for guarded commit/readback; not deployed or online accepted.

| Area | Content status |
| --- | --- |
| D1 | 10 review units +25 independent questions; day placement unverified |
| D2 / France | 9+6 review units +42 independent questions; day placement unverified |
| D3 | 13 review units +30 independent questions; day placement unverified |
| D4 | 15 review units +45 independent questions; day placement unverified |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth day |

Next breakpoint: inspect large-entry import graph and isolate Foundation-safe loading improvements, preserving other paused modules. Still blocked: verified day-by-day five-day teaching allocation/source PPT; real phone/browser validation; currently usable Tencent deployment/auth route. Existing browser environment had socket Operation not permitted; Tencent console last required login and CLI was policy-denied. No auth, network bypass or deployment attempted this round.

---

# Foundation · 2026-11-07 · Actual quiz/review round trips

Checked 2026-11-07T03:38:10+08:00. Base dad29bb70d58de4ec120694e768ae1ce9bb37ce4 on migration/tencent-somm100, fresh head unchanged. Read migration/latest progress/source map; compared quiz, loader and source-map files with remote before edits.

- Improved FoundationQuiz question navigation: selecting a question, previous/next or next pending question requests focus only after the new question is committed. Initial load does not steal focus; current-question selection is a no-op. Existing reduced-motion helper reused. No answers, storage IDs, source content, instructor/image or question mapping changes.
- Added scripts/check-foundation-quiz-flow.mjs: mounts actual quiz wrappers and review components, including France for D2; exercises142 questions and all143 mapped round trips (D3 question10 has two review destinations). Each question receives two different choices; first/latest answers survive moving away and returning to the original question. Opening review does not complete checks or answer questions. Invalid return IDs ignored. Previous/next/pending-question focus verified.
- Real React hooks and DOM events; no replacement of app logic. Test-only Node loader now resolves extensionless local JS imports. RAF callbacks drained explicitly after commit, scrolling stubbed: no real scroll geometry, browser/phone layout, screen-reader or lazy-network timing claim.
- Initial harness failure on D3 q10's second target came from a detached button reference after changing questions; querying live DOM fixed the harness. All143 routes then passed; no mapping change was needed.
- PASS: 77 Foundation unit tests,53 review-unit DOM interactions,142-question/143-route integration check,CloudBase build and159 built guidance fields/37 markers. Output473 files,entry ./assets/index-C3mqF0cd.js,12027203 bytes,SHA256 bd3908d1fef0a443a445dd06f8ea7dd719565f101c29e729d0a9bf9fce28ba3e. Main entry loading concern remains; no performance improvement claimed.
- Evidence docs/qa/foundation-quiz-flow-20261107.json; reproduction docs/qa/FOUNDATION_RENDER_CHECK.md. No new teaching-source or cohort claims this code-only round. Runtime skill read, environment_status tool not exposed; no cloud network/auth changes attempted. Netlify guard preserved. Saved for guarded commit/readback; not deployed or online accepted.

| Area | Content status |
| --- | --- |
| D1 | 10 review units +25 independent questions |
| D2 / France | 9+6 review units +42 independent questions |
| D3 | 13 review units +30 independent questions |
| D4 | 15 review units +45 independent questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth day |

All53 units have objectives/preparation/practice; D1–D4 remain knowledge labels, not a confirmed daily schedule. Next: investigate Foundation lazy-loading readiness and reduce initial loading cost while preserving other modules. Exact blockers remain current five-day PPT/day mapping; authorized Tencent deployment and deployed source SHA; actual mobile/browser acceptance. This integration check covers already-mounted components, not delayed chunk loading.

---

# Foundation · 2026-11-07 · D3 objectives and preparation completed

Checked 2026-11-07T01:41:08+08:00. Base 56b8b7eff1050b21184af77af2b52250b38478b4 on migration/tencent-somm100, fresh head unchanged. Read latest checkpoint, migration document and source map. Four implementation/data files matched remote byte-for-byte before editing.

- Re-read all 13 canonical D3 Notion teaching bodies, not only their inventory titles. All remain unverified, with unchanged October28 edit times; truncation and unknown-block metadata not supplied. These are knowledge-topic sources, not confirmed current classroom-day assignments.
- Added 13 original Chinese learning objectives and 13 preparation activities in data/foundation-d3.json. Topics: country-learning method; Italy geography; Piedmont structure; Veneto wine styles; Tuscany grape/place relationships; Spain overview and reds; Rías Baixas/Cava; Portugal; Germany geography and label reading; Austria; Greece/Hungary. Existing FoundationRegionalReview automatically renders the fields; no new student Notion entry, service/sales/pairing mainline, or legal thresholds added.
- Removing only the 26 added fields leaves the entire original D3 dataset deep-equal: 72 checks,39 in-unit questions/answers,13 written practices and all IDs retained. Independent30-question quiz unchanged. No instructor/image/storage changes.
- Removed the D3 missing-field exception from the real React DOM and built-content validators. All 53 review units must now render objective/preparation/practice. Five initial-unit SSR renders,53-unit DOM interactions and77/77 unit tests PASS. CloudBase build PASS;159 guidance fields +37 feature markers verified,473 files. Entry ./assets/index-BnE9Xa95.js,12027203 bytes,SHA256 4989e97af5e7114f274eca19473e1b0b8e367003a70cd6d54acfb4c06b6fd069.
- Evidence docs/qa/foundation-d3-learning-20261107.json; all13 source URLs and metadata recorded there. No private source-body dump committed. Dependency setup remains the previously documented focused build environment, not a full frozen-lockfile install.
- Saved for guarded commit/readback. Not deployed, not phone/browser visual tested, not online accepted; local progress is not account cloud sync. No Netlify service access, billing/auth/DNS/ICP actions or paused-task work.

| Area | Current status |
| --- | --- |
| D1 | 10 review units +25 independent questions; full learning guidance |
| D2 / France | 9+6 review units +42 independent questions; full learning guidance |
| D3 | 13 review units +30 independent questions; this round closes all13 objective/preparation gaps |
| D4 | 15 review units +45 independent questions; full learning guidance |
| D5 | Current classroom teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth schedule |

D1–D4 remain knowledge labels, not current daily placement. Next: address Foundation mobile loading and actual quiz-to-review return integration checks, without touching paused course content. Exact blockers: current five-day source PPT/day mapping; Tencent deployed SHA and authorized deployment path; real mobile layout/scroll acceptance. Main entry remains ~12 MB. No claim that Foundation is the complete current classroom course.

---

# Foundation · 2026-11-06 · All review interactions and unit navigation

Checked 2026-11-06T23:41:33+08:00. Base 4bb891076c5c98fe75dfdc70d75c4e9aa8921788 on migration/tencent-somm100; fresh head unchanged. Compared six source/map files byte-for-byte with remote, read migration and latest checkpoint. No AGENTS.md in checkout. Existing Netlify ignore guard retained.

- Fixed previous/next and select navigation in D1Review, FranceReview and RegionalReview: a user-request ref triggers focusFoundationTarget only after the new article is committed. Initial record loading does not steal focus; selecting the current unit is a no-op. Existing reduced-motion handling and scroll margin are reused. Covers all five review areas, no storage-format or teaching-data changes.
- Extended reusable actual React DOM check from 25 to 53 units: D3's 13 and D4's 15 now included. Checks render content, preserve original checks/first/latest answers during navigation, click actual checkbox/radio controls, remount persisted state, and leave malformed original records untouched while displaying an alert.
- Verified actual DOM focus after select/previous/next, with no React warnings/errors. jsdom does not provide layout: scrollIntoView is a recording stub, reduced-motion auto-scroll request verified; this does not prove phone scroll position, real browser layout or screen-reader behavior.
- Found and explicitly recorded D3 gap: all 13 units contain written practice but no learningObjective/preparation fields. Test reports this known gap rather than pretending completeness or inventing course material. D4 has all three guidance fields.
- Extended offline artifact verification to 133 existing guidance/practice fields and 37 feature markers. 77/77 Foundation unit tests PASS; 53-unit DOM check PASS; five initial-unit SSR renders PASS; CloudBase build PASS, 473 files, entry ./assets/index-B8TTZico.js, SHA256 1dd3f55f20d4794a21a47f306b32b42b6d87eea2b2df992390a53ae1619f21a9. Main entry remains 12027203 bytes; mobile performance unresolved.
- Evidence: docs/qa/foundation-all-review-interactions-20261106.json; reproduction docs/qa/FOUNDATION_RENDER_CHECK.md. No new Notion/Library content retrieved this code-validation round; canonical content sources unchanged. No deployment, online acceptance, purchases/auth/DNS/ICP or paused-task work. Saved for guarded commit/readback.

| Area | Content / validation status |
| --- | --- |
| D1 | 10 reviews + 25 independent questions; DOM interaction verified |
| D2 / France | 9 + 6 reviews + 42 independent questions; DOM interaction verified |
| D3 | 13 reviews + 30 independent questions; DOM interaction verified, 13 objectives/preparation pairs missing |
| D4 | 15 reviews + 45 independent questions; DOM interaction verified |
| D5 | Current classroom teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no invented sixth day |

D1–D4 are knowledge labels, not confirmed daily placements. Next: read canonical D3 sources and add original objectives/preparation coherently; continue Foundation mobile loading work. Exact external blockers: current five-day source PPT/day mapping and authorized Tencent deployed-version/real-phone acceptance. Existing 12 MB main entry remains a measured loading concern. Not deployed or Henry-accepted.

---

# Foundation · 2026-11-06 · Real React rendering and CloudBase validation recovered

Checked 2026-11-06T21:44:40+08:00. Base dbda8c116cfd108bd7269efdab896ea691772291 on migration/tencent-somm100. Fresh head unchanged; restored full archive at that exact commit, read migration/source-map/progress checkpoints. Netlify ignore guard retained.

- Added scripts/check-foundation-rendering.mjs and a CSS/JSON-only Node loader. Real React SSR covers each area's initial unit; actual React DOM/effects in jsdom cover all 25 D1/D2/France units via real select events. No application source rewriting or mocked React hooks.
- All 75 objective/preparation/practice fields render. Seeded original checks and first/latest answers survive navigation. Actual checkbox/radio interactions persist in isolated localStorage; unmount/remount restores them. No React warnings/errors. This is not CSS/phone/browser visual validation or cloud synchronization.
- Fixed a student-facing omission: FoundationRegionalReview now explicitly says written exercises use personal notes and are not saved, automatically graded or marked complete, matching D1 and France. Stable IDs, existing records, instructors, images and course data untouched.
- Strengthened check-cloudbase-foundation.mjs to verify all 75 source guidance fields in built lazy chunks, in addition to 37 existing Foundation markers. This detects stale teaching chunks that the earlier marker-only check could miss.
- 77/77 Foundation tests PASS. CloudBase production build PASS: 473 files; entry ./assets/index-Rp-3fJty.js, 12027203 bytes, SHA256 6ea42d2a8ef11a98e621f6fe69d9b6a6907c15a1baf5af7e5ace70c0b63056ac. Root and /somm100/ mount checks PASS. Entry ~12 MB remains a measured performance concern.
- Initial build failed with missing @tailwindcss/postcss; restored declared 4.2.1 externally and reran successfully. Focused dependency restoration is not a complete frozen-lockfile pnpm install. No package/lockfile edits. Reproduction instructions in docs/qa/FOUNDATION_RENDER_CHECK.md; evidence in docs/qa/foundation-react-rendering-20261106.json.
- No new Notion/Library text read or curriculum claims this verification round. Previously recorded canonical source mapping retained. No deployment, online acceptance, billing/DNS/ICP/auth changes or paused-task work.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews + 25 independent questions; all 10 guidance units now real-DOM/build verified |
| D2 / France | 9 + 6 reviews + 42 independent questions; all 15 guidance units now real-DOM/build verified |
| D3 | 13 reviews + 30 independent questions; regression suite/build covered, not included in this new DOM interaction check |
| D4 | 15 reviews + 45 independent questions; regression suite/build covered, not included in this new DOM interaction check |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort 22 has five classroom days; no sixth schedule |

D1–D4 remain knowledge labels, not confirmed day assignments. Next: extend real-DOM verification to D3/D4 and review mobile loading within Foundation; obtain current five-day teaching PPT/day mapping and authorized Tencent source-version/real-phone acceptance. Saved for guarded commit and exact readback. Not deployed or Henry-accepted.

---

# Foundation · 2026-11-06 · Complete D2 learning guidance and recover regression tests

Checked 2026-11-06T19:36:34+08:00; base 2263b49816d9c595339e92082c47669f7b47ac0a on migration/tencent-somm100. Read remote source, current progress/migration/source map and Netlify ignore guard; branch unchanged at start.

- Re-read five canonical Notion teaching bodies for D2 units01/03/04/08/09. Metadata unverified, unchanged October28 edits; connector did not supply truncation/unknown-block counts. Existing sources are topic guides, not proof of current daily classroom placement.
- Added five objectives, five preparation prompts and five original written practices: learning grape structure, Sauvignon Blanc, Riesling, secondary white grapes, secondary red grapes. All nine D2 units now have learning guidance through the existing FoundationRegionalReview renderer; no component modification needed.
- Removing only15 added fields leaves complete old D2 data identical, including64 checks,27 in-unit questions/answers and earlier four comparison packages. Independent42-question quiz, all storage IDs, instructors and images unchanged.
- Executor recovered, but old scratch checkout/dependencies had been cleared. Restored current Foundation source/test subset via GitHub. Initial test attempt reported missing staging and source-inventory fixtures; restored five required files and reran:77/77 Foundation tests PASS. This covers previous D1 content changes as well as current D2 data.
- Node syntax checks pass for D1Review and RegionalReview. Nine mocked React element-tree checks pass, covering learning guidance inclusion. These are NOT actual React SSR or browser/phone checks.
- Real React SSR and production build remain UNRUN: react/react-dom not present in runtime dependency path; full source/build dependencies not restored. Prior15:40 build evidence applies to2f90c39 only, not current changes.
- Evidence docs/qa/foundation-d2-learning-20261106.json. Saved for guarded commit/readback. No deployment, online acceptance, cloud billing/DNS/ICP/auth or paused-task changes.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions; previous learning guidance now covered by77 regression tests; build/SSR pending |
| D2/France | 9+6 reviews,42 independent questions; all nine D2 units and six France units have learning guidance |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 five classroom days; no sixth schedule |

D1–D4 are knowledge labels, not confirmed current day assignments. Next: restore full authoritative checkout/build dependencies and run actual D1/D2 React SSR plus build:cloudbase; obtain five-day source PPT/day mapping; authorized Tencent source-version and phone acceptance. Existing main bundle ~12MB remains an earlier measured performance concern, not remeasured this run.

---

# Foundation · 2026-11-06 · D1 learning objectives and written practice

Base 2f90c392c6f83753bd8e69e62abd722925eee683 on migration/tencent-somm100. Read current source, migration/progress/source-map checkpoints and Netlify ignore guard. Ten Notion teaching bodies re-read; same October28 edit times, metadata unverified. No day allocation inferred.

- Added ten learning objectives, ten preparation prompts and ten original written exercises to data/foundation-d1.json; rendered via app/FoundationD1Review.js. Covers grape anatomy, annual cycle, environment, vineyard management, grafting, fermentation, skin contact, maturation, appellation concepts and label reading.
- Existing data deep-equal after removing three new fields:71 checks,30 in-unit questions, all answers/IDs/text retained. Independent25-question D1 quiz unchanged. No storage/instructor/image changes. Written exercises use student's own notes; not saved, scored or automatically completed.
- V8 syntax compilation and10 mocked React element-tree checks passed; each checks added content inclusion and absence of student Notion links. This is NOT real React SSR, hook/effect validation, DOM/browser testing or production build.
- Local executor could not create any process: exec-server rejected request (-32603): No such file or directory (os error 2). No attempt to bypass. Consequently this commit's77-test suite, real SSR and CloudBase build remain UNRUN. Parent commit's successful checks cannot be attributed to this code.
- Evidence docs/qa/foundation-d1-learning-20261106.json. Source prepared for guarded commit/readback. Not deployed or online-verified. Tencent deployment SHA unavailable; no billing/DNS/ICP/auth or paused-task changes.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions; ten learning/practice packages added, build pending |
| D2/France | 9+6 reviews,42 independent questions |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days; no sixth schedule |

D1–D4 are knowledge labels, not confirmed current daily allocations. Next: restore normal executor and run Foundation suite, ten-unit real React SSR and build:cloudbase before deployment; complete remaining D2 guidance independently; obtain actual five-day PPT/day mapping and authorized real phone/browser/Tencent acceptance.

---

# Foundation · 2026-11-06 · France learning objectives and written practice

Checked 2026-11-06T15:40:04+08:00. Base 7e945b3a169a4003afc8bf7caaca4bd252cf5715 on migration/tencent-somm100. Four target files matched remote before edits; read current migration/progress/source map.

- Re-read all six canonical Notion France topic pages (source map franceReview.sources); all remain unverified with unchanged October28 edit times. Connector did not supply truncation/unknown-block metadata. Combined tool display truncated; F-01 displayed separately. No current day allocation inferred.
- Added six learning objectives, six preparation prompts and six original written practices to data/foundation-france.json and rendered them in app/FoundationFranceReview.js. Topics: French geography, Bordeaux banks/blending, Burgundy geography/classification, Loire grape/place pairs, north/south Rhône, Alsace label inference. Each practice includes a check against the existing lesson; students use their own notes. No save/grade/completion claims for written tasks.
- Entire old data remains deep-equal after removing the three new fields: existing summaries,38 checks,18 questions/answers/IDs unchanged. No new storage or unrelated course/instructor/image modifications.
- 77/77 Foundation tests PASS; six isolated server-render checks PASS using temporary Node loader to select each unit. Initial esbuild helper was unavailable (ERR_MODULE_NOT_FOUND), resolved using existing Node/React without installation. SSR is not browser/phone acceptance.
- CloudBase build PASS473 files,37 markers, mounts / and /somm100/. Entry ./assets/index-Ca1aNNck.js SHA256 b0184547446b3575153fa847f908567630ea721da527ad366b7eab2237eb9774. Pinned build-only dependencies; full frozen-lockfile install unverified; existing ~12MB entry still a performance limitation.
- Evidence docs/qa/foundation-france-learning-20261106.json. Saved for guarded commit and readback. Not deployed, no online/mobile acceptance. Prior Chromium socket permission blocker remains; no retry/bypass. No cloud resource, DNS, ICP, billing or paused-task changes.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions |
| D2/France | 9+6 reviews,42 independent questions; six France learning/practice packages added |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days; no sixth schedule |

D1–D4 are knowledge labels, not current daily allocations. Next: add supported learning guidance to D1/remaining D2; obtain actual five-day source PPT/day mapping; complete phone/focus/backup acceptance using an authorized browser and verify Tencent source version.

---

# Foundation · 2026-11-06 · Accessible learning navigation

Checked 2026-11-06T13:37:10.763555+08:00. Base1587fd6de33737570cb526c9c5d83e01aba53a8c on migration/tencent-somm100. Read current migration/progress/source map. Eight target files matched remote before edits.

- Rechecked Notion search for current cohort22 timetable, opened Somm100.cn index and operational center. Index has no timetable; visible operations draft explicitly lists source PPT pending and retains historical six-day framing. Neither establishes current five-day allocation. Metadata unverified, edited2026-11-04; operations tool display truncated, no full-audit claim. No private source text published.
- Fixed scroll-only navigation across six Foundation components: requested navigation now transfers keyboard focus to target heading/article without adding it to normal Tab order. Shared helper respects reduced motion, preserves existing tabindex, and safely ignores missing targets. Expanded heading/article scroll margin to5rem. No answer, check, storage ID, instructor, image or curriculum changes.
- Foundation77/77 tests pass, including3 new mock-DOM behavioral tests. Build PASS473 files,37 markers, mounts / and /somm100/. Entry ./assets/index-BRdLBMZS.js, SHA256 4fc56aaa75cf26b491cd5a848ef1b22d259cc05e5984e39f288c646b6bd82779. Full frozen-lockfile install not verified; existing approximately12MB entry remains a performance concern.
- Evidence docs/qa/foundation-navigation-focus-20261106.json. Saved for guarded commit/readback. Not deployed or online-verified. Real keyboard, screen-reader, mobile scroll/visibility and backup/download behavior remain untested after prior Chromium socket permission denial. No retry/bypass, billing, DNS, ICP or paused-task actions.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions |
| D2/France | 9+6 reviews,42 independent questions |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current teaching/assessment placement pending |
| D6 | Cohort22 five classroom days; no sixth schedule |

D1–D4 are knowledge labels, not current daily allocation. Next: obtain actual five-day source PPT/day mapping; supported browser phone/focus/navigation/backup checks; independently verify Tencent source version. Neither curriculum nor deployment complete.

---

# Foundation · 2026-11-06 · Return from review to originating quiz

Checked 2026-11-06T11:37:20.153277+08:00. Base2db62dfc62c41da3ac8d6156e91badb8d4e4478d on migration/tencent-somm100. Read migration/progress/source-map checkpoints and existing quiz/review navigation;8 existing files matched GitHub exactly before changes. This work uses current source and introduces no new lesson facts or schedule claims.

- Added shared FoundationQuizReturn component to D1, France and regional D2/D3/D4 reviews. Opening a review from a quiz carries its stable question ID and source quiz; the return button selects that question again, focuses the quiz heading and scrolls with reduced-motion support. All142 question IDs covered. Existing answers/checks/storage IDs unchanged, and opening review never grants completion.
- Return navigation is transient. Refresh discards return button state while existing selected-question and answers retain existing browser persistence. Opening a review from the bridge without quiz origin clears that review's old return target. Unknown question IDs or other quiz prefixes cannot select a question.
- Foundation74/74 tests pass;2 new regression cases cover all142 question mappings, wrong prefix, unknown IDs, invalid payload and current-number resolution. Build PASS472 files,37 markers; mounts / and /somm100/. Entry ./assets/index-BROgl5Gu.js, SHA256 ae7cc8a5d41089a41e779db0c36f932ba12298e58a67e6f24af871711549d77f. Pinned build-only dependencies; full frozen-lockfile install unverified. Existing approximately12MB main bundle remains a performance limitation.
- Evidence docs/qa/foundation-quiz-return-20261106.json. Saved for guarded source commit/readback, not deployed or online-verified. Browser focus/scroll/phone interactions remain untested after earlier socket permission denial; no blocked retries or bypass. No billing, DNS, ICP, old Netlify or paused-task actions.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions; return navigation added |
| D2/France | 9+6 reviews,42 independent questions; return navigation added |
| D3 | 13 reviews,30 independent questions; return navigation added |
| D4 | 15 reviews,45 independent questions; return navigation added |
| D5 | Current teaching/assessment placement pending |
| D6 | Cohort22 five classroom days; no sixth schedule |

D1–D4 remain knowledge labels, not verified current daily teaching allocations. Next: actual five-day source PPT/day mapping; supported browser phone/return-navigation/backup acceptance and independent Tencent deployment verification. Course and deployment not complete.

---

# Foundation · 2026-11-06 · Stale backup preview protection

Checked 2026-11-06T09:40:01.200612+08:00. Authoritative base e1393055bfbbb8bc21f1b9fdb3fac7b9503ef015 on migration/tencent-somm100. Read migration/progress/source-map checkpoints and current backup implementation. Four editable existing files matched remote exactly; release-check script also read at base. No new curriculum source or public teaching claims introduced.

- Found that restore preview could become stale while another tab saves new progress, yet the previous replacement selection remained active. Added a raw snapshot of all11 Foundation stores to preview, checked before recovery download and again at restore entry. Changes stop restore before writes, refresh the preview and reset replacement consent. Default preservation, stable storage IDs, partial backup semantics and rollback remain unchanged.
- Three regression tests added: changed progress with zero writes; new/deleted course records versus unrelated records; unchanged/incomplete snapshots. Foundation72/72 tests pass. Build passes472 public files,36 markers, mounts / and /somm100/. Artifact entry ./assets/index-C3dO1ZVz.js, SHA256 8170099e8c690d4a84448bca12749754df0718d7e7ea58b44852ba34ae1d5646. New error marker verified in emitted chunks. Existing approximately12MB main entry still needs performance work; full frozen-lockfile installation not verified.
- This is stale-preview protection, not an atomic cross-tab transaction. Writers during/after restore and actual browser download/reload acceptance remain pending. Prior Chromium socket permission denial unchanged; no blocked launch repeated or bypassed. Source saved for guarded commit/readback; not deployed, not online-verified. Netlify stop-build setting retained. No fees, DNS, ICP or paused-task actions.
- Evidence: docs/qa/foundation-backup-preview-20261106.json. No course data, questions, teacher profiles or images modified.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions |
| D2/France | 9+6 reviews,42 independent questions |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current classroom teaching/assessment placement pending |
| D6 | Cohort22 five classroom days; no sixth schedule |

D1–D4 remain knowledge-library labels, not verified current classroom allocations. Next: actual five-day PPT/day mapping; supported browser restoration/navigation/mobile acceptance and independent Tencent deployment verification. Course is not complete.

---

# Foundation · 2026-11-06 · France overview location guide

Checked 2026-11-06T07:40:51.193880+08:00. Authoritative base aeb7cff5e3be12c897e685a7e04d1c9d1798f54e on migration/tencent-somm100. Read current migration/progress checkpoints and France curriculum; five existing target files exactly matched remote before edits. Remote head rechecked unchanged before commit preparation.

- Added app/FoundationFranceMapGuide.js to France01: eight bilingual place-name anchors, three original location tasks and expandable checking guidance. Explicitly distinguishes spelling cards from a geographical map. Uses an external independent Vinatlas introduction/map entry; no map asset copied or rehosted. Existing review checks/questions/IDs/storage, instructors and images preserved. Tasks do not capture responses or auto-credit skills.
- Refetched full canonical Notion France01 (40717d16de4c812a91a9e646c9e10af3; source metadata unverified). Actually opened Vinatlas introduction and data.gouv.fr reuse listing. The reuse listing does not make the atlas official or endorsed. No current regulatory totals published. Exact source evidence and two rejected candidate fetch errors recorded in docs/qa/foundation-france-map-20261106.json.
- Foundation tests69/69 passed. SSR checked8 anchors,3 tasks, labelled heading and safe external link. Clean CloudBase build PASS:472 public files,35 markers, mounts / and /somm100/. Entry ./assets/index-CnikZC3D.js, SHA256 8385664acefc6a2d2f02ebbf21d3527d6daaaf7375b0070004b6c92381c8d8c1. Pinned build-only dependency subset used; full frozen-lockfile install remains unverified. Existing approximately12MB main entry remains a performance limitation.
- Saved for guarded source commit/readback. Not deployed or live-verified. Actual atlas interaction and mainland/mobile access untested. Prior Chromium socket permission error unresolved; no repeat or bypass. No billing, DNS, ICP, legacy Netlify or paused-task action.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions |
| D2/France | 9+6 reviews,42 independent questions; NEW France overview8 anchors and3 map tasks |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current classroom teaching/assessment placement pending |
| D6 | Cohort22 five classroom days; no sixth schedule |

D1–D4 are knowledge-library labels, not verified current cohort daily allocations. Next: obtain actual cohort22 five-day PPT/day mapping, address remaining regional location aids, and complete supported browser phone/bridge/backup checks plus independent Tencent version acceptance. Do not describe the course or launch as complete.

---

# Foundation · 2026-11-06 · Burgundy map-reading guide

Checked 2026-11-06T05:40:07.138447+08:00. Base cda0bbc9972e812162bc80919a69638c4adfa563 on migration/tencent-somm100. Read current migration/progress checkpoints and France curriculum. Five key local files exactly matched remote before editing.

- Added app/FoundationBurgundyMapGuide.js to existing France03. Three original tasks cover five north-south anchors, relative location of the Côtes, and reading commune/appellation/vineyard names in the official atlas. Two BIVB official resource links, expandable check guidance and offline fallback explanation. External resources open in a new window. No map asset rehosted.
- Added an original five-anchor semantic sequence to existing diagram renderer. Eleven course diagrams total. Explicitly not to scale or a complete geographical boundary map. Existing narrow-screen semantic layout reused, actual browser layout unverified. Existing France checks, questions, IDs, storage, instructors and images unchanged. Map tasks do not capture responses or imply completed map skills.
- Refetched full Notion France01 and France03 teaching pages. Opened BIVB five-region map resource and interactive-map introduction. Source and rights observations recorded in docs/qa/foundation-burgundy-map-20261106.json. Official map-use text excludes commercial use, so only links plus original summaries used. Map resource dated2018; no current regulatory or numeric appellation claims added. Official atlas interaction not tested.
- Foundation tests69/69 passed. SSR verified three tasks, two safe external links, accessible heading and five diagram anchors. Clean CloudBase build passed472 public files and34 markers, mounts / and /somm100/. Entry ./assets/index-B1lysuAl.js, SHA256 6c8e40d0d26201267d1a7614bd9b81cbd45f320572f09ed3719661e43c00c7a9. Pinned build-only dependency subset reused; full frozen-lockfile installation remains unverified. Existing12MB main entry remains a performance concern.
- Saved for guarded source commit/readback. No deployment/live verification this run. Prior Chromium socket permission rejection remains unresolved, no repeat/bypass. No billing, DNS, ICP, legacy Netlify or paused-task actions.

| Area | Current code status |
| --- | --- |
| D1 | 10 reviews,25 independent questions |
| D2/France | 9+6 reviews,42 independent questions; NEW Burgundy sequence and3 map tasks |
| D3 | 13 reviews,30 independent questions |
| D4 | 15 reviews,45 independent questions |
| D5 | Current classroom teaching/assessment placement pending |
| D6 | Cohort22 five classroom days, no sixth schedule |

Next: France overview map F01 and remaining regional map gaps. Actual cohort22 five-day PPT/day allocation still missing. Complete supported browser phone/bridge/backup checks and independent Tencent version verification when available. No overall completion claim.

---

# Foundation · 2026-11-06 · D2 comparison diagrams and written observation activities

Checked 2026-11-06T03:39:57.183843+08:00. Authoritative base e6747e3ad76d56d30bab13f071961bd2f5fb46cd, migration/tencent-somm100. Six key local blobs matched remote tree before edits. Read migration and Foundation checkpoints. Preserved instructors, images, brands, all other course modules and Netlify stop-build protection.

- Added four original semantic HTML comparison figures to existing D2 units02,05,06,07. Topics are Chardonnay climate versus winemaking, Pinot Noir versus Cabernet Sauvignon structure, left-bank Bordeaux versus Napa Cabernet, northern Rhône versus Barossa Syrah. Reused existing diagram renderer. Ten diagrams in total. Two columns become one below700px via CSS; layout not browser-verified.
- Added a learning objective, preparation and written observation exercise to each of those four units. Existing regional-review component already renders those fields, so all are integrated. Students can work with existing producer descriptions or course notes, without buying wine. Exercises separate observations, hypotheses and unknown production information; no new graded examination or submission endpoint. Written responses are not captured in the app.
- Refetched full four canonical Notion D2 pages. Metadata remains unverified and content was available through closing content tag, with no reported truncation metadata. Scope and read evidence in docs/qa/foundation-d2-comparisons-20261106.json. Original condensed teaching only, no linked historical textbook copied and no backend Notion links exposed in student figures.
- Searched Library and Notion for current cohort22 PPT/day allocation. Actually read operations proposal libfile_075fac1511208191a68dd62a5caeb3b5 and Notion SOMM100 App40e17d16de4c81bfbac8c221323ff0e3. Proposal leaves complete timetable and commitments for team confirmation. App page points to existing knowledge library/blueprint. Neither resolves current five-day classroom placement. Proposal pre-course service suggestions do not override Henry's explicit pre-course exclusions.
- Verified all existing D2 fields, including all checks/questions/answers/stable IDs, match base exactly after removing three new optional fields. Storage code unchanged. Four figures SSR-rendered with accessible labelled headings and two groups. Existing Foundation suite69/69 passed. No redundant tests added for static prose.
- Clean CloudBase build passed472 public files,32 feature markers including all four new figure titles, mounts/ and /somm100/. Entry ./assets/index-BE-0yv4G.js SHA256 a26006633da0e3f18c531c88bf33a2228d4ae07a44559f3786b72f95deaf2fc9. Build-only pinned subset reused, full frozen-lockfile install not verified. Existing12MB main entry remains a performance concern.
- Saved for guarded commit/readback. No deployment or live URL verified. Browser phone layout/interaction remains pending after prior Chromium socket() failed: Operation not permitted (1). No repeated blocked launch or network bypass. No billing, DNS, ICP, other paused tasks or old Netlify actions.

| Area | Current source implementation |
| --- | --- |
| D1 | 10 reviews,25 standalone questions |
| D2/France | 9+6 reviews,42 standalone questions; NEW4 diagrams and4 written activities |
| D3 | 13 reviews,30 standalone questions |
| D4 | 15 reviews,45 standalone questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days, no sixth schedule |

Next: current five-day PPT/day mapping still unresolved. Continue with France location/reading aids from verified and permitted resources, and supported browser acceptance for phone layout, bridge navigation and backup/restore. Verify Tencent deployed version independently when supported. Do not turn the operations proposal or old six-day metadata into an official timetable.

---

# Foundation · 2026-11-06 · 21-day study path and preview cards

Checked 2026-11-06T01:42:33.187068+08:00. Base 755c26b47cc707c34cae61425426984fb44bee24, migration/tencent-somm100. Nine key local blobs matched the authoritative tree. Read current migration and Foundation checkpoints, V0.2 reconciliation, current Foundation navigation and backup code. Read full midterm and preview pack plus all eight linked preview pages.

- Added data/foundation-bridge.json and app/FoundationBridge.js to the existing Foundation page. Twenty-one numbered study days follow the detailed V0.2, with a week-grouped selector, previous/next, daily goals, and direct links to existing review or quiz sections. D1 quiz day10, D2 quiz day15. The sequence is a study guide. Current cohort dates and classroom placement remain to be confirmed.
- Day16 offers D1/D2 error review while midterm is pending. Source midterm V0.1 actually has35 questions,35 answers,22 mapping ranges covering all35. The source calls for difficulty balancing and student trials before final rules. Assessment questions and answer keys were not added to the student bundle. Evidence and precise gaps are in docs/qa/foundation-bridge-release-20261106.json.
- Days17–20 contain eight original concise preview cards from the eight retrieved source pages, each with a self-check prompt and an existing extended review destination. Covered Italy, Spain/Portugal, Germany/Austria, Greece/Hungary, sparkling, fortified, world regions and China. Used introductory relationships supported by existing reviews. Day21 asks students to identify uncertain topics and bring three questions to class. No full preview quiz or notes capture added.
- Reused scoped review navigation, existing quiz headings, and the version1 local record parser. Selected day stored at somm100.foundation.bridge.v1, included in Foundation backup allowlist as record11. Older backup files with no bridge key preserve current day. The saved day represents position only. Existing lesson and quiz schemas preserved.
- Actual Foundation suite69/69 passed. Tests cover all day and review targets, V0.2 milestone ordering, persistence of day21 through older backup restore and all11 record round-trip. New component syntax passed.
- Clean CloudBase build passed 472 public files,28 markers, root and /somm100/ asset/PWA checks. Entry ./assets/index-C42GQtzd.js, SHA256 f7a0250e50e8a717b8911dd102fdc6cd756d2f739249ab0c51f5702268d1a1d0. Pinned build-only subset reused. Full frozen-lockfile install and main entry size optimization remain pending.
- Browser phone layout, file dialogs, refresh and scroll/navigation remain unverified. Prior Chromium launch denied socket() failed: Operation not permitted (1). No repeated blocked launch or bypass. No Tencent deployment or newly verified live URL. Saved for source commit/readback. Preserve [skip netlify] and ignore="exit 0".

| Area | Source implementation |
| --- | --- |
| D1 | 10 reviews and25-question self-check, linked by bridge days1–10 |
| D2/France | 9+6 reviews and42-question self-check, linked by days11–16 |
| D3 | 13 reviews and30-question self-check, four new guide cards on days17–18 |
| D4 | 15 reviews and45-question self-check, four new guide cards on days19–20 |
| D5 | Current teaching and assessment placement pending |
| D6 | Cohort22 has five classroom days. No sixth-day schedule |

Next: confirm actual five-day course PPT/day placement and authorized label/map/video assets. Validate midterm release rules and difficulty before integrating formal assessment. Use supported browser access to test phone layout, target navigation, day reload and backup. Independently verify Tencent version and live pages. Foundation development continues.

---

# Foundation · 2026-11-05 · Dedicated progress backup/restore and source reconciliation

Checked 2026-11-05T23:42:52.200406+08:00. Base e594d60380e7ee0efdfc3abb55aca6eaf31b4b54, migration/tencent-somm100. Fresh branch and6 key blobs matched GitHub tree. Read current migration/Foundation checkpoints, source map, main export implementation and all Foundation storage helpers.

- Actual gap: LearningApp's existing “导出我的记录” only downloads the main learning state; separate Foundation pre-course/review/quiz stores are absent. No matching restore UI found. Added an independent Foundation backup block within the existing Foundation page; main exporter and unrelated module records are unchanged.
- app/FoundationBackup.js + lib/foundation-backup.mjs cover10 allowlisted stores: precourse, D1/D2/France/D3/D4 reviews, D1–D4 standalone quizzes. Version1 format retains exact stored strings including first/latest answers and unit/pace. Preview does not write. Default restores only missing stores; checkbox explicitly enables replacement of differing stores. Absent file keys never delete local data; identical stores are skipped.
- Validate format/version, exact allowlist, basic record structure and2MiB size before mutations. Future/corrupt local records block creation/restore rather than being overwritten. Before restoring, UI initiates a separate current-state backup download; restored UI requires a refresh. Storage failure triggers reverse rollback; failure of rollback is reported separately. Download completion and cross-origin restore are not proven by these code paths. Existing whole-app export format is rejected clearly because it lacks Foundation records; partial valid Foundation v1 backups are accepted.
- Added8 integration tests: all10 stores transfer with exact final units and first/latest answers; partial/backfill keeps conflicts/absent/unrelated data; explicit replacement snapshot; corrupt/future/foreign/legacy formats cause zero changes; blocked reads; quota second-write rollback; rollback-failure reporting; size limit and identical-data no-write. Actual Foundation suite67/67 passed, new component syntax passed.
- Clean build:cloudbase passed 470 public files,26 markers, root and /somm100/ asset/PWA checks. Entry ./assets/index-K3-VuG86.js, SHA256 2983df3a3fc07b1af9225b293fd080bd2d4d09e5fbcd7f1c238cce2166087b3c. Pinned subset dependencies reused; full frozen-lockfile install unverified. Existing about12MB entry remains a performance concern.
- Read actual bridge parent40717d16de4c810cbdc9d2aca7262900, linked detailed V0.2 40717d16de4c8121aabad53088101cef and resource matrix40717d16de4c81c2910decdcecc94d7d. Detailed V0.2 differs from parent overview: D1 quiz day10, D2 quiz15, midterm16, previews17–20. Prefer detailed V0.2 for future assembly, never treat it as confirmed current five-day cohort calendar. Sources remain unverified. Full source/reconciliation audit saved in docs/qa/foundation-bridge-audit-20261105.json. No21-day UI or midterm claimed.
- Existing original diagrams already cover D1-05/06/07/09,D2-01; fictional label practice does not close the real-label gap. France map remains pending. F05 has comparison plus external Inter Rhône PDF, not verified phone/mainland playback. No new images/video, private originals or unknown-license assets published.
- Browser file-picker/download/reload, phone layout and cross-origin migration remain unverified. Prior supported Chromium launch denied socket() failed: Operation not permitted (1); no repeat/bypass. No Tencent deployment/version/live checks performed. Saved for atomic commit/readback; [skip netlify] and ignore="exit 0" preserved. No other paused tasks or cloud/billing/DNS/ICP actions.

| Area | Source implementation |
| --- | --- |
| Pre-course | Existing4/8week path; NEW backup coverage |
| D1 | 10 reviews,25 standalone questions; NEW backup coverage |
| D2/France | 9+6 reviews,42 standalone questions; NEW backup coverage |
| D3 | 13 reviews,30 standalone questions; NEW backup coverage |
| D4 | 15 reviews,45 standalone questions; NEW backup coverage |
| D5 | Teaching/assessment placement pending |
| D6 | Current cohort22 has five classroom days; no sixth schedule |

Next: assemble source-guided bridge V0.2 after reading actual midterm40717d16de4c81ea88ece1f3a91ee34c and preview pack40717d16de4c815689a3c95154f6f16b plus linked children. Reuse existing review/quiz data without inventing official day placement; focus on a clear next action rather than more question volume. Finish browser backup/refresh and phone checks when supported, current five-day PPT/media audit and independent Tencent release verification. Overall Foundation remains in progress; no pause/completion claim.

---

# Foundation · 2026-11-05 · D2 standalone42 quiz and cross-section review navigation

Checked 2026-11-05T21:37:41.614011+08:00. Base 96638136fa73798adc24f7b30f7753dec76f32d3, migration/tencent-somm100. Fresh head and12 key local blobs matched authoritative GitHub tree. Read current Foundation/CloudBase checkpoints, source map, current D2/France/shared quiz components and full canonical D2 quiz.

- Source 40717d16de4c81d69c3ad85f6456e618, edited2026-10-28T19:59:41.843Z, verification unverified. Parsed42 questions and42 actual answer rows. Preserved all answer indices and option meanings/order; translated country names into Chinese. Added42 original explanations grounded in existing D2/France review content. Explicitly avoid automatic aging/quality guarantees or uniform regional style claims. No private historical textbook copied.
- New data/foundation-d2-quiz.json and app/FoundationD2Quiz.js integrated in existing Foundation menu/page. Question1–27 target9 grape units;28–42 target6 shared-France units. Mapping is editorial from source detection labels; the source has no stable unit-ID column. Exact record in docs/qa/foundation-d2-quiz-source-20261105.json. Shared-France inclusion does not establish current classroom-day placement.
- Separate local key somm100.foundation.d2-quiz.v1. First/latest answers, explanations, review queue and navigation reuse existing quiz component. The wrapper combines review metadata with explicit per-unit prefixes. quizReviewTargets resolves the correct title/unit/prefix; shared component dispatches that target. D1/D3/D4 retain their default destinations. France review now accepts scoped known-unit events and scrolls to its heading; listener cleaned up, existing lesson data/state/diagram/map activity retained.
- Actual Foundation Node suite59/59 passed. Tests cover question42 restore, source answers/mappings, correct-after-wrong history, corrupt/future safety, isolation of all four quiz keys, all42 routed targets and existing quiz target defaults. Shared quiz, D2 wrapper and France review syntax checks passed.
- Clean build:cloudbase passed 467 public files,24 Foundation markers and root plus /somm100/ resource/PWA checks. Entry ./assets/index-D2IGxsiS.js; SHA256 0e945fecfb2d70419caf32d9773e95e2b6611d5e32c04fc96f58eabf9320c04a. Pinned build-only subset reused; full frozen-lockfile install not verified. Existing about12MB main entry remains a performance limitation.
- Browser UI event/scroll, phone layout and refresh are still unverified. Previous Chromium launch denied socket() failed: Operation not permitted (1); no repeated launch/download/bypass attempted. Tencent release access remains unresolved; no deployment or newly verified live URL this run. Node routing tests are not browser acceptance.
- Saved source/provenance/checkpoint for atomic commit and readback. Keep [skip netlify] and netlify.toml ignore="exit 0". Foundation only; no billing/DNS/ICP/Netlify or unrelated paused-task actions.

| Area | Content in source |
| --- | --- |
| D1 | 10 reviews/71 checks/30 inline plus25 standalone self-check questions |
| D2 | 9 reviews/64 checks/27 inline, shared France6/38/18, NEW42 standalone questions |
| D3 | 13 reviews/72 checks/39 inline plus30 standalone questions |
| D4 | 15 reviews/93 checks/45 inline plus45 standalone questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days; no sixth day invented |

Next: standalone quiz integration for D1–D4 is now complete in source, but full course is not. Read current bridge source 40717d16de4c810cbdc9d2aca7262900 and resource-gap matrix 40717d16de4c81c2910decdcecc94d7d, reconcile source-guided progression and current five-day PPT/media gaps. Inspect existing export/import implementation for Foundation quiz key coverage before claiming backup protection. Finish supported browser phone/reload/navigation checks and Tencent version verification. Continue task; no overall completion/pause claim.

---

# Foundation · 2026-11-05 · D1 standalone 25-question self-check

Checked 2026-11-05T19:41:35.085317+08:00. Base 31ca66b02d640cc7cdf99f53063975eac9fadc67, migration/tencent-somm100. Fresh branch head matched the previous D4 release;11 key local source blobs matched the authoritative GitHub tree before editing. Read migration/progress checkpoints, source map, current D1/quiz code, canonical D1–D2 inventory and the full linked D1 quiz source.

- Full D1 quiz 40717d16de4c81c1960fc82fab19f045 (edited2026-10-28T19:59:40.081Z, unverified) contains25 questions and25 answer rows. Preserved prompts/options/answer indices; added25 original Chinese explanations grounded in existing D1 reviews. No private historical textbook excerpts. Source core-detection labels were editorially mapped to the ten existing D1 unit IDs; the source itself does not supply unit-ID mappings. Exact inventory in docs/qa/foundation-d1-quiz-source-20261105.json.
- Added data/foundation-d1-quiz.json and app/FoundationD1Quiz.js; reused existing FoundationQuiz component. New D1 menu and section support three topic groups, question selection, previous/next, wrong-answer queue, first/latest answers, explanations and mapped lesson navigation. Independent key somm100.foundation.d1-quiz.v1. Existing D1 lesson, pre-course, D3/D4 progress retained. Local browser only; no passing-grade, attendance or account-sync claim.
- D1 review now handles scoped foundation-open-review events, validates the exact prefix and known unit before selecting it, then scrolls to its heading. New mappedReviewUnit helper is tested for foreign prefix, unknown unit and missing detail. Listener cleaned up. D1 existing body, diagram/label activities and answer data preserved.
- Actual Node Foundation suite54/54 passed. Tests cover D1 final-question25 restore, first/latest correction, wrong-answer queue, corrupt/future record protection, all three standalone key isolation and D1 lesson save/reload preserving existing checks/answers during mapped unit changes. D1 wrapper/review syntax checks passed.
- Clean production build:cloudbase passed 464 public files,22 Foundation markers and root plus /somm100/ asset/PWA checks. Entry ./assets/index-C3K5zK45.js, SHA256 b9b5016a115c2a564df7e7da288dfa6bb99ec5ee711fb88bf864343f70ff17c9. Build-only pinned dependency subset reused, full frozen-lockfile install still unverified. Existing about12MB main entry remains a performance limitation.
- Browser event/scroll, phone layout and UI refresh remain unverified after prior supported Chromium launch denied socket() failed: Operation not permitted (1). No repeated launch/download or bypass attempted. No Tencent deployment or fresh public URL verified. Existing migration access blocker remains; code work continues independently.
- Source/checkpoint saved for atomic commit and changed-file readback. Preserve [skip netlify] and netlify.toml ignore="exit 0". No unrelated paused modules, cloud/billing/DNS/ICP actions.

| Area | Content in source |
| --- | --- |
| D1 | 10 reviews/71 checks/30 inline plus NEW25 standalone self-check questions |
| D2 | 9 reviews/64 checks/27 inline, shared France6/38/18; standalone42 pending |
| D3 | 13 reviews/72 checks/39 inline plus30 standalone self-check questions |
| D4 | 15 reviews/93 checks/45 inline plus45 standalone self-check questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days; no sixth schedule invented |

Next: read D2 standalone42 canonical source 40717d16de4c81d69c3ad85f6456e618; map grape and shared-France targets carefully because they use different review components/prefixes. Preserve progress and use verified topic mapping rather than assume classroom allocation. Continue current five-day PPT alignment/permitted media, supported browser tests and independent Tencent release verification. Overall Foundation is still in progress; no task pause/completion claim.

---

# Foundation · 2026-11-05 · D4 standalone 45-question self-check

Checked 2026-11-05T18:29:39.212984+08:00. Base f03df8e913b2dd2883a2b4d4b8e1eedc1ec5814f, migration/tencent-somm100. Fresh branch head and local source blobs matched for nine key files. Read latest Foundation/CloudBase checkpoints, source map, quiz inventory and full canonical D4 quiz. No concurrent branch change observed at start; use expected-head update at publication.

- Read all45 questions/options and45 answer rows from Notion 40717d16de4c81d49a25ccf54a780b3c (edited2026-10-28T20:11:46.220Z; unverified source metadata). All45 answer indices/IDs/unit mappings match prior inventory. Correct-option wording matches previously reviewed inline content after country translation/whitespace normalization. Reused45 original, previously fact-checked D4 explanations. Historical inventory remains historical; current delivery flags live in foundation-source-map.json.
- Added data/foundation-d4-quiz.json and app/FoundationD4Quiz.js; integrated D4 self-check menu and section into existing Foundation. Three groups, one question at a time, first/latest answer feedback, previous/next, next-needs-review and15 mapped review destinations. Question3 explicitly scopes the bottle/tank comparison, Cava question11 uses definite method wording, question13 scopes the fortification definition to this group. Country names/Producer use Chinese; variety/region terms retained.
- Extracted existing D3 workflow to app/FoundationQuiz.js. Both wrappers pass separate fixed data, prefix and storage keys. D3 data and old key unchanged. D4 uses somm100.foundation.d4-quiz.v1; existing review/pre-course records untouched. No account sync, passing grade or attendance completion claim. Brand, instructors and images preserved.
- Actual Node suite49/49 passed; syntax checks for shared/D3/D4 components passed. Tests include final-question45 restore, wrong-to-correct first/latest history, review queue, corrupt/future protection and D3/D4 saved-state isolation. IDs/answers checked against source inventory for both sets.
- Clean build:cloudbase passed: 461 public files,20 Foundation markers, root and /somm100/ asset/PWA checks. Entry ./assets/index-2G_FbFlg.js, SHA256 58a027b1618299394895f944324c7c47374329f3209e660d0c54a3476527c5b8. Pinned build-only dependency subset reused; not a full frozen-lockfile install. Existing main entry about12MB remains a performance issue.
- Browser/mobile rendering, UI reload and mapped selection/scroll remain unverified. Prior supported Chromium launch denied socket() failed: Operation not permitted (1); no repeat or bypass this run. Environment status tool not exposed; /etc/codex/network-policy.json absent. These facts do not establish Tencent API availability. No Tencent deployment or current live URL verified.
- Prepared atomic commit and all changed-file readback. Preserve [skip netlify] and netlify.toml ignore="exit 0". No unrelated tasks, paid services, DNS, ICP or Netlify actions.

| Area | Content in source |
| --- | --- |
| D1 | 10 reviews/71 checks/30 inline questions; independent25-question quiz pending |
| D2 | 9 reviews/64 checks/27 inline; shared France6/38/18 |
| D3 | 13 reviews/72 checks/39 inline plus30 independent self-check questions |
| D4 | 15 reviews/93 checks/45 inline plus NEW45 independent self-check questions |
| D5 | Current teaching/assessment allocation pending |
| D6 | Cohort22 has five classroom days; no invented sixth day |

Next: read canonical D1 standalone25 quiz source from inventory before integrating with isolated storage and review mapping; do not infer source from filename. Continue current five-day PPT/day alignment and permitted media. When supported browser execution is available, verify both quizzes at phone width, saved answers after reload and quiz-to-review navigation. Then independently verify Tencent deployment SHA and live pages. Foundation work is not fully complete; no pause/completion claim.

---

# Foundation · 2026-11-05 evening · D3 standalone self-check integration

Base 0762804c2b86d4dc198622409ba6a9726be8d8ab on migration/tencent-somm100. Fresh branch, migration/progress checkpoint, source inventory/map and current Foundation review/navigation/helper read. Netlify stop-build guard preserved.

- Fetched full canonical D3 standalone30 quiz page 40717d16de4c819bac12f69bbba8442c, edited2026-10-28T20:11:46.220Z, still unverified. Extracted30 prompts/options,30 actual answer-table rows and compared all with saved mapping. No private linked historical textbook reproduced. Cava option now says uses traditional method, retaining same answer index. Added30 original explanations grounded in existing reviewed D3 content.
- Added data/foundation-d3-quiz.json, app/FoundationD3Quiz.js and lib/foundation-quiz.mjs. Existing Foundation has lazy-loaded D3 self-check menu and section. One question at a time, grouped selection, previous/next and next-needs-review navigation, feedback, first/latest answer display and counts. No failing label, grading cutoff or cohort attendance claim.
- Separate browser key somm100.foundation.d3-quiz.v1, reused versioned record parsing/write protection through question-to-navigation-unit adapter. Old pre-course and lesson review keys untouched. Corrupt/future records are not overwritten. Local browser records only.
- Related-review buttons dispatch a scoped event carrying the mapped D3 unit ID. FoundationRegionalReview selects that unit and scrolls to the review heading rather than assuming a hidden unit is already rendered. Only matching prefix/known IDs handled; listeners cleaned up. The dual-mapped Rioja question retains both review targets. Existing teaching datasets are unchanged.
- Added4 meaningful tests. Actual complete Node Foundation suite44/44 passed, syntax checks passed. Tests cover source ID/answer/mapping integrity and valid review targets, question30 restore and first/latest attempts, separate review storage, corrected-answer review list and corrupt/future/unknown data.
- Clean production build passed458 public files. Entry ./assets/index-CZKbz8B3.js, SHA256 0779b0eea7ad158e0fa0bdca216214bf473651c228bd1a051bf74f5d4da708f2. Root and /somm100/ PWA/asset checks and18 Foundation markers passed. Pinned dependency subset reused, not full frozen-lockfile install. Existing about12MB main entry warning remains.
- Browser UI including quiz-to-review selection, 375px layout and refresh has NOT been verified. Prior Chromium launch was denied with socket() failed: Operation not permitted (1); did not repeat blocked launch or bypass policy. No Tencent redeployment, live version or new public URL verified.
- Saved for atomic commit and changed-file readback. Keep [skip netlify] and ignore="exit 0"; no other paused modules or cloud account actions.

| Area | Implemented content |
| --- | --- |
| D1 | 10 reviews/71 checks/30 inline questions; standalone25 pending |
| D2 | 9 reviews/64 checks/27 inline, shared France6/38/18 |
| D3 | 13 reviews/72 checks/39 inline plus NEW30 standalone self-check questions |
| D4 | 15 reviews/93 checks/45 inline, separate45-question quiz mapped only |
| D5 | Current teaching/assessment placement pending |
| D6 | Current cohort22 has five classroom days; no sixth schedule |

Next: integrate D4 standalone45 after fetching its full actual source and reviewing answer/mapping/explanation scope. Reuse the quiz workflow with isolated keys while preserving D3 progress. Add explicit browser checks for mapped review selection and return navigation when supported UI execution is available. Continue current cohort PPT alignment and permitted media, then verify Tencent deployment. No overall completion/pause claim.

---

# Foundation · 2026-11-05 afternoon · D4 final three review units

Base 6d05899272b38fda77b2d519e946f83c52bb608b on migration/tencent-somm100. Read current branch, migration/progress checkpoints, source map, runtime component/data and draft before editing. Re-fetched all three canonical Notion pages; timestamps agree with staging, verification metadata remains unverified.

- Integrated units13–15 covering South Africa and two China topics. Added18 checks and9 questions with individual explanations. Complete condensed D4 review set is now15 units/93 checks/45 questions. Three new units each include objective, preparation, three original Chinese explanatory sections and a practical task. Previous12 units are identical. Source IDs and answer indices retained.
- South Africa includes Cape/Stellenbosch, Chenin Blanc and Pinotage's Pinot Noir × Cinsault parentage. China review distinguishes dry inland conditions, Shandong coast and northwestern Yunnan mountain sites, places Hebei/Shanxi on the learning map, and teaches a source-based benchmark selection method. Does not appoint classroom wines, publish private textbook text or infer a uniform national style. Cabernet Gernischt naming/identity is left for evidence-based follow-up rather than making unsupported synonym claims.
- Fact checks use WOSA, Ningxia/Xinjiang government material, Yantai wine bureau and LVMH's Ao Yun estate description. Extracted only relevant geographic/variety facts, not promotional claims, statistics or source maps. Exact source records are in docs/qa/foundation-d4-complete-20261105.json.
- Added12-to-15 release migration regression. Saves old wrong/correct first/latest answers and self-check state, restores with final dataset, then answers final Chinese benchmark unit and reloads. Same D4 storage key; browser-local only.
- Actual Node Foundation suite40/40 passed. Clean CloudBase build passed455 public files, entry ./assets/index-DA2bof9x.js, SHA256 86ce194dc53decac5d03d4c3afb9b5e8817ced821b689493e5f3cf76e6ebfffe. Root and /somm100/ PWA/assets plus15 Foundation markers passed. Pinned build dependency subset reused; full frozen-lockfile install remains untested. Existing main entry still about12MB.
- Browser checks remain pending after the previous supported Chromium launch failed with socket() failed: Operation not permitted (1). Did not repeat the blocked launch, install browsers or bypass policy. No Tencent deployment or current live verification; no new verified public URL.
- Saved for atomic source commit/readback. Preserve [skip netlify] and netlify.toml ignore="exit 0". Other paused projects and cloud configuration not acted on.

| Area | Content implemented |
| --- | --- |
| D1 | 10 review units/71 checks/30 questions |
| D2 | 9/64/27, shared France6/38/18 |
| D3 | 13/72/39 |
| D4 | All15 condensed reviews/93 checks/45 questions |
| D5 | Teaching/assessment placement pending |
| D6 | Current cohort22 has five classroom days; no sixth-day schedule |

Next: D3 standalone30/D4 standalone45 quizzes are still mapped, not student UI. Read their canonical inventory/source before integrating an actual assessment workflow and preserve unit-level records. Continue identifying actual current five-day PPT allocation and permitted map/media; condensed reviews are not the full classroom curriculum. Use supported browser access to finish phone/desktop navigation and refresh tests, then verify Tencent deployment SHA and pages. Do not stop the overall Foundation task merely because D4 condensed reviews are complete.

---

# Foundation · 2026-11-05 13:35 CST run · D4 country review units 9–12

Base 35c9909de3b027517336b8eb47449d73fa666ac6, migration/tencent-somm100. Read latest branch, migration/progress checkpoints, source map and runtime D4 UI/data. Re-fetched the four canonical Notion pages; timestamps match staging, source verification remains unverified. No confirmed cohort day allocation inferred.

- Integrated units09–12, the regional-learning framework, North America, Australia/New Zealand and Chile/Argentina. Added25 self-checks and12 MCQs. Runtime D4 now12 units/75 checks/36 questions. Each new unit has an objective, preparation activity, three original explanatory sections, practice and specific answer explanations. Earlier eight objects are identical; stable IDs/answers/storage key retained.
- Added the geographic vocabulary required by checks, including California/Oregon, Ontario/British Columbia, Hawke's Bay and Carmenère. Avoided sweeping Napa-vs-Bordeaux ripeness claims. Central Otago now explicitly describes internal climatic differences rather than treating the whole region as uniformly cool. Icewine describes naturally frozen-on-vine grapes pressed frozen without copying regulatory thresholds. No private textbook text/maps reproduced.
- Checked against Napa Valley Vintners, Oregon Wine Board, Ontario wine association, Wine Australia, New Zealand Winegrowers, Wines of Chile and Wines of Argentina. Exact source URLs and actual checks in docs/qa/foundation-d4-country-20261105.json.
- Recovered exact source archive and installed pinned build-only dependency subset. Actual Node Foundation suite39/39 passed. New regression saves eight-unit Sherry first/latest answers and checks, restores with12 units, records Mendoza answer, then verifies old and new state together. Full frozen-lockfile installation remains untested.
- Clean production build passed455 public files. Entry ./assets/index-C6YpM8iT.js, SHA256 aeaf9ee3e6cf5e0e1bbf906d1a8340e5e7fe174284ded04711307d61a26ce799. Root and /somm100/ asset/PWA checks and15 Foundation feature/key markers passed. Main entry remains about12MB, existing unresolved size warning.
- Browser executable is now present at /usr/bin/chromium, but actual Playwright launch failed with socket() failed: Operation not permitted (1) in process_singleton_posix.cc:297. This replaces the earlier missing-executable diagnosis for this environment. No policy bypass or repeated browser installs attempted. Current narrow/desktop layout and UI refresh remain unverified.
- Saved for atomic commit/readback. No Tencent deployment, online acceptance or newly verified URL. Brand/instructors/images preserved. Keep [skip netlify] and netlify.toml ignore="exit 0". Foundation only.

| Area | Source implementation state |
| --- | --- |
| D1 | 10 units/71 checks/30 questions |
| D2 | 9/64/27, shared France6/38/18 |
| D3 | 13/72/39 |
| D4 | 12/75/36, units13–15 remain staged; standalone45 quiz mapped only |
| D5 | Teaching/assessment placement pending |
| D6 | Current cohort22 is five classroom days, no sixth day scheduled |

Next: read and fact-check remaining D4 units13–15 (South Africa and China), then integrate a coherent final batch preserving prior12 records. Use a supported browser environment for phone/desktop layout, selected-unit navigation and first/latest answer refresh, then independently verify Tencent deployment version. Current classroom PPT allocation, permitted media and standalone quizzes remain pending.

---

# Foundation · 2026-11-05 · D4 fortified wines, units 5–8

Base 3b46ecc27c67be1f4b87ad58343263373fe8f232 on migration/tencent-somm100. Fresh branch, current migration/progress/source-map and D4 draft read. Re-fetched all four Notion unit pages; source timestamps match the editorial draft and metadata remains unverified.

- Added four original review units to data/foundation-d4.json covering fortification timing, Port, Sherry and Madeira. Added 27 self-checks and 12 MCQs with specific explanations. Total student release now eight units, 50 checks, 24 questions. Every added unit has goal, preparation, three explanatory sections and a practical task. First four unit objects are unchanged. Stable IDs and answer indices retained.
- Filled missing teaching links including Port category/ageing orientation, Palomino and Flor, biological versus oxidative ageing, Solera circulation, Madeira Estufagem/Canteiro and grape names. Avoided numerical regulatory requirements and fixed storage duration claims. Did not reproduce private historical textbooks. Topic labels do not confirm current cohort classroom allocation.
- Cross-checked with IVDP, Sherry Regulatory Council and Madeira official sources listed in docs/qa/foundation-d4-fortified-20261105.json. Source wording that treats Port sweetness as uniform was qualified. The distinction between fortification timing, final sweetness and later ageing is explicit.
- Existing D4 entry now says sparkling and fortified wines. Same browser key somm100.foundation.d4-review.v1. Added a migration test that saves a four-unit record with wrong/correct first/latest answers, expands to eight units and saves/restores a Madeira answer while preserving prior records. Browser-local only.
- Actual Node suite 38/38 passed. CloudBase production build passed. Cleaned only generated dist-cloudbase before final build after observing stale assets from repeated builds. Clean result 455 public files, entry ./assets/index-ChFexjWH.js, SHA256 ef7e942b1b5faf0001308587e8f5c37721939686b6f11a78cd172857396145c7. Root and /somm100/ references/PWA and 15 Foundation markers checked. Reused prior pinned dependency subset, not a full frozen-lockfile install.
- Chromium cache still lacks executable; prior download failure remains. Did not repeat installation. No new visual/mobile/browser acceptance, Tencent deployment or live-version verification. Existing two-record sparkling exercise retained.
- Saved for atomic commit and full readback. Keep [skip netlify] and ignore="exit 0". Other paused tasks, cloud fees, auth and ICP untouched.

| Area | Current content |
| --- | --- |
| D1 | 10 units / 71 checks / 30 questions integrated |
| D2 | 9 / 64 / 27; shared France 6 / 38 / 18 integrated |
| D3 | 13 / 72 / 39 integrated |
| D4 | 8 / 50 / 24 integrated; units 9–15 staged; standalone45 quiz mapped only |
| D5 | Teaching/assessment placement pending |
| D6 | Current cohort22 has five classroom days; no sixth day scheduled |

Next: continue D4 country-learning units 9–15 with original Chinese reviews and primary-source checks. Restore supported browser for D3 units6/9/11/13 and D4 menu/all eight-unit navigation, mobile width, wrong/correct attempts and refresh persistence. Current cohort PPT alignment and Tencent deployed version remain unresolved. Do not report this source commit as online.

---

# Foundation · 2026-11-05 · D4 sparkling review first four units

Base ea1ef505879771a721a34c93bc30afca7c6f32a0 on migration/tencent-somm100. Read the current branch, CloudBase migration checkpoint, Foundation progress, source map, D4 draft and existing UI before editing. Current cohort22 remains five classroom days; D3/D4 source labels are topic IDs, not a confirmed daily timetable.

- Integrated D4 units 01–04 into the existing Foundation page through lazy-loaded FoundationD4Review and shared FoundationRegionalReview. New runtime data has four original condensed lessons, four objectives/preparation/practice activities, 23 checks and 12 MCQs with specific feedback. Subjects are CO2 retention, Champagne climate/grapes, traditional-method stages, and Prosecco/Cava/Franciacorta comparison.
- Re-fetched all four canonical Notion pages. Edit timestamps match the staged draft. Source pages remain marked unverified; no linked private textbook was reproduced. Independent fact checks use Comité Champagne and the Prosecco, Cava and Franciacorta consortia, recorded in docs/qa/foundation-d4-release-20261105.json. Corrected Cava “usually traditional method” to “uses traditional method”; limited the second-fermentation comparison question to this lesson's examples. Added the vocabulary required by the checklists and distinguished Tirage from Dosage. Stable question IDs and answer indices retained.
- D4 has its own browser key somm100.foundation.d4-review.v1. First/latest answers, checklist state and selected unit round-trip through existing validated helpers. Prior course records remain isolated. The existing two-record sparkling exercise remains unchanged and session-only.
- LearningApp changes are one lazy import, one menu button and one mount. Shared review adds optional objective/preparation display; earlier datasets do not have these fields. Existing brand, instructors, course images, other modules and learning IDs retained.
- Runtime restored. Downloaded exact GitHub head archive. Ran actual Node suite, 37 tests passed (including all D3 13-unit tests and three new D4 checks). Production build:cloudbase passed, 455 public files, entry ./assets/index-Cn3iKxrw.js, SHA256 7d9731d06cfe09529354ff107c858cba81e2dfeae409dd54cedb36347a2b56f2. Build checker now requires both D3/D4 route markers and storage keys. Root and /somm100/ asset/PWA checks passed. Reused pinned build dependencies from prior run, not a full frozen-lockfile install. Existing main entry remains about 12 MB.
- Browser launch failed because Chromium executable is absent. One standard Playwright installer invocation failed with “End of central directory record signature not found. Either not a zip file, or file is truncated.” Do not report new browser/375px/physical-phone results. No browser bypass or cloud network/auth changes.
- Saved code/data/source evidence and this continuation checkpoint for atomic commit/readback. No Tencent deployment, current live-version acceptance or new verified URL. Netlify ignore = "exit 0" retained; commit uses [skip netlify].

| Course area | Current code state |
| --- | --- |
| D1 | 10 units / 71 checks / 30 questions integrated |
| D2 | 9 units / 64 checks / 27 questions integrated; shared France 6 / 38 / 18 |
| D3 | All 13 / 72 / 39 integrated, current Node/build checks now passed |
| D4 | First four / 23 / 12 integrated; units 5–15 still staged; independent two-record exercise retained |
| D5 | Dates recorded, teaching/assessment placement pending |
| D6 | Absent from current five-day cohort; not invented |

Next breakpoint: restore supported browser and test D3 units 6,9,11,13 plus D4 all four at phone width, check navigation/wrong-to-correct attempts/refresh/isolation. Continue a coherent D4 remaining batch from the staged source, recheck facts and keep existing IDs. D3 standalone30 and D4 standalone45 quizzes are mapped only. Current cohort PPT/day alignment, permitted media and Tencent online verification remain outstanding. Continue Foundation only.

---

# Foundation · 2026-11-05 · D3 European regions, units 6–13

Base 69cf0fff4919b9556c16ac604203df8e7a712563 on migration/tencent-somm100. Continued from the five-unit student release and the 13-unit D3 editorial draft. Verified the current Foundation route and existing browser storage key. No schedule assigned to these review units.

- Added eight units in data/foundation-d3.json with individual practice tasks, 48 additional self-checks and 24 questions with feedback. Public total is 13 units, 72 checks and 39 questions. Kept the first five units identical and preserved question/check IDs, source answer positions and the local progress schema. Updated the existing D3 introduction and release tests. The separate 30-question course quiz remains in the source inventory.
- Specific edits include Tinto Fino as a regional name for Tempranillo, Garnatxa/Carinyena in Priorat, Albariño/Alvarinho in cross-border label reading, Cava's bottle secondary fermentation, dry versus fortified wines of the Douro, Spätlese and trocken as separate clues on German still-wine labels, Wachau on the Danube, and examples from Santorini and Tokaj. Kept detailed regulatory thresholds outside the material.

## Sources checked for the added units

- D3 06–08: [Rioja](https://riojawine.com/es/doca-rioja/variedades-de-uva/tempranillo/), [Ribera del Duero](https://www.riberadelduero.es/la-do-ribera-del-duero/variedades-de-uva), [Priorat](https://www.doqpriorat.org/en/varietals/), [Galician Wine Museum](https://museovinogalicia.xunta.gal/es/el-vino/uvas-y-vinos-de-galicia/albarino), [Cava Regulatory Board](https://www.cava.wine/en/news-articles/types-and-varieties-of-cava-differences-between-the-various-types-of-cava/).
- D3 09: [Vinho Verde](https://www.winesofportugal.com/pt/descobrir/regioes-vitivinicolas/vinho-verde/), [Alvarinho](https://winesofportugal.com/en/portuguese-wines/grape-varieties/alvarinho/), [IVDP wine guide](https://digital.ivdp.pt/en/consumer-e-protection/choose-and-enjoy/).
- D3 10–13: [German Wine Institute, Prädikate](https://www.winesofgermany.com/our-wine/quality-standards/quality-standard/449/pr%C3%A4dikate), [sweetness indications](https://www.winesofgermany.com/our-wine/wine-tasting/wine-tasting/195/geschmacksrichtungen), [Austrian Wine, Wachau section](https://www.austrianwine.com/fileadmin/user_upload/PDF/Broschueren/7_Elemente_DE_202405_web.pdf), [Wines of Greece](https://winesofgreece.org/pdo/pdo-santorini/), [Tokaj dry Furmint example](https://osakaexpo.winesofhungary.hu/wines/chateau-dereszla-furmint-dry-2023/).

## Verification and continuation

Ran the three release-test assertion bodies with the repository's actual progress and answer functions in V8 using equivalent assertions, including saving a record against the previous five-unit set, restoring it against the 13-unit set, saving a Portuguese-unit answer and restoring old and new answers together. Confirmed the first five unit objects are identical, every current question has four distinct choices and the runtime dataset excludes private source metadata. Node, CloudBase build and browser checks were not available this run. Exact executor message: “No usable execution environment is available. Wait for an environment to become available before using this tool.” The earlier 33 tests, full build and 375px browser check apply to the previous five-unit release only. Tencent deployment and public acceptance pending.

Next: run the Node Foundation suite and CloudBase production build, then reach units 6, 9, 11 and 13 from the menu at phone width and verify stored answers after reload. Review and integrate a coherent D4 batch using the same regional UI where suitable. D1/D2 existing review and shared France integrated; D3 complete review set in branch; D4 15 editorial units plus separate interactive sparkling exercise; D5 assignment pending; current cohort22 has five classroom days. No old Netlify actions or cloud configuration changes.

---

# Foundation — 2026-11-05 09:34 CST · Europe review, units 1–5

Based on 9742f53ae06f6601db743ed65b174d9571cdec00 on migration/tencent-somm100. Read current migration checkpoint, course checkpoint, source map and school draft. Netlify stop-build guard confirmed.

- Added the D3 Europe review entry to the existing Foundation route. Five units cover map/label reading, geographic orientation, Piedmont, Veneto and Tuscany. The student dataset has 24 self-checks, 15 questions, activity prompts and specific feedback. Reviewed facts include Moscato Bianco, Barolo/Barbaresco with Nebbiolo, Amarone drying before fermentation, Glera and the cross-regional scope of Prosecco DOC, and Sangiovese in Chianti Classico/Brunello. Stable draft IDs retained. The private editorial source URLs are excluded from the student dataset. These are topical review units; no cohort timetable assignment has been made.
- Content sources checked on 2026-11-05: [Barolo](https://www.langhevini.it/en/le-denominazioni-tutelate-dal-consorzio/barolo-docg/), [Barbaresco](https://www.langhevini.it/en/le-denominazioni-tutelate-dal-consorzio/barbaresco-docg/), [Asti DOCG](https://astidocg.it/asti-docg-denominazione/), [Amarone](https://www.consorziovalpolicella.it/en/types-of-wines/amarone-della-valpolicella-docg/), [Prosecco DOC](https://www.prosecco.wine/tutto-il-vitigno-glera-minuto-per-minuto/), [Chianti Classico](https://www.chianticlassico.com/en/wine/characteristics/), [Brunello](https://consorziobrunellodimontalcino.it/en/583/vini).
- D2 and D3 share the regional review presentation and validated progress functions. D2 retains the original key/default API. D3 uses its own key and retains first/latest answers and self-checks. Added tests for D2/D3 isolation, future records and release-to-draft ID alignment.
- All 33 Foundation tests passed. Full CloudBase production build passed (454 public files, entry index-CW7y9b2g.js, SHA256 314625c16f31a2e003c91f98e4955c7f715dfb013689f171d022b25520505e27). Reused prior fixed build dependencies; full frozen-lockfile install still unverified.
- Browser checked the actual built app in a 390px iframe: effective width 375px, scroll width 375px. Used D3 navigation, selected Piedmont, checked an item, answered wrong then corrected the Barolo question. After refresh, unit 3, 1/5 checks, 1/3 questions and first Cabernet Sauvignon/latest Nebbiolo were restored. Browser-only records. No physical-phone or Tencent deployment/online verification this round.

Next: review units 6–9 (Spain/Portugal) and continue unit-level integration. D1 ten, D2 nine, shared France six remain integrated. D3 five integrated/eight staged. D4 fifteen staged plus independent sparkling exercise. D5 material placement pending. Current cohort22 has five face-to-face days; D6 is not scheduled. Retain current PPT verification requirement, do not publish private materials, and leave other paused work alone.

---

# Foundation — 2026-11-05 07:31 CST · D4 draft and sparkling practice

Base b56f419111dced1593481db7b3b96c75014ede15, migration/tencent-somm100. Confirmed current migration/progress/source map, inventory, Foundation mount and Netlify stop-build guard.

- Read all 15 D4 source pages and compared edit times with the inventory. Staged 15 objectives, 15 individual prep activities, 30 original explanatory paragraphs, 93 source checks and 45 unit questions with source answers in docs/staging/foundation-d4-review.json. The separate 45-question course quiz remains mapped only. The complete draft still needs subject review and current cohort PPT alignment.
- Integrated an independent two-record exercise into Foundation through its own lazy-loaded component and course menu button. Learners can identify the second fermentation vessel, see feedback and correct their choice. Examples are original and cross-checked with Comité Champagne and Consorzio Tutela Prosecco DOC (links in the component). Session-only answers. No changes to progress keys. Private Notion links stay outside student content.
- Downloaded the exact GitHub head archive and restored CloudBase build dependencies at pinned versions (not a full frozen-lockfile install). npm run build:cloudbase passed with 452 files and 1,937 modules. Entry ./assets/index-BCSeoqGq.js, SHA256 e17d51bb901e9582029e65a768e186e7fe64b8311f366b58c103e47b5d3da543. Existing entry remains large (~12 MB). 29 existing Foundation tests and 2 new draft checks passed. The D3/D4 inventory validator also passed.
- Tested the actual production bundle on a 390px iframe (375px content). Course navigation reached the exercise, an incorrect answer produced a clue, correcting A and answering B produced independent correct feedback. Document scrollWidth and clientWidth were both 375px. This is a browser viewport test, not a physical phone or Tencent test.
- D1/D2 and shared France retain the last integrated state. D3 has 13 staged units. D4 has 15 staged units plus the separate interactive exercise in the student route. D5 materials pending. Cohort22 has five face-to-face days, no D6. Full D3/D4 lessons are not imported or day-aligned. Next: review candidate D3 facts and integrate reviewed units with scoped local record tests, then broaden D4. New Tencent deployment and online acceptance remain unverified.

---

# Foundation checkpoint — 2026-11-05 05:38 CST: complete D3 editorial data draft

Base: 86a95e9c85c80d0282549fbd0f4f2c50ff344971. Current migration/source/progress/inventory and Netlify guard read. No concurrent head change at start.

## Delivered
- Runtime recovered: pwd and Node tests executed successfully. Previous local checkout/dependencies absent after workspace maintenance; did not claim missing source or return to old main. Focused working directory /workspace/scratch/4b501e03edb8/somm100-d3, authoritative base files read through GitHub.
- Read all13 D3 child pages using saved inventory URLs; each text fetched before extraction. Added docs/staging/foundation-d3-review.json with13 stable unit IDs,26 original condensed Chinese teaching paragraphs,13 learning objectives/preparation prompts,72 source checks and39 source MCQs/answer keys. Source URLs/edit times retained as engineering provenance only.
- Teaching scope: country learning framework; Italy/Piedmont/Veneto/Tuscany; Spain/Rioja-Ribera-Priorat/Rías Baixas-Cava; Portugal; Germany/geographic and label entry; Austria; Greece/Hungary entry. No private linked textbook text/image reproduced. Source labels D3 do not establish the current five-day cohort's classroom allocation.
- This is a staged editorial draft under docs, not app data/public output. publicationReady,studentUiIntegrated,currentCohortDayConfirmed all false. No runtime UI/import/storage-key change, no lecture/instructor/photo deletion. Existing39 source questions retained; explanatory prompts refer back to the matching digest. Domain fact review still required before publication, especially Germany/Austria regulations and broad regional/production descriptions.
- Added tests/foundation-d3-draft.test.mjs. Actual Node run:5 passed,0 failed. Checks draft gates, all13 source mappings, unique stable IDs,72/39 counts, four distinct options and answer ranges, objectives/preparation/original digest shape. This verifies structure, not wine facts or UI.

## Status / next breakpoint
Saved and ready for atomic GitHub commit/readback. No production build or browser/mobile test this round; no Tencent deployment/live acceptance or new public URL. Last full build/desktop evidence remains the prior 0fe50af change, not this draft.
D1 ten units/D2 nine units/shared France six remain integrated. D3 now has a complete staged13-unit draft; D4 remains15-source-unit inventory with93 checks/45 inline questions/45 standalone quiz questions. Standalone D3 quiz30 remains mapped but not imported. D5 material allocation pending; D6 absent from verified five-day cohort22 source.
Next: fact-check D3 candidate, enrich answer explanations where useful, prepare equivalent D4 original digests, then restore current full workspace for UI integration and mobile testing. Do not repeat broad source discovery or overwrite live student UI with unreviewed draft. Runtime failure is resolved; full checkout/dependencies still need restoration for full build. Keep [skip netlify] and ignore='exit 0'; no unrelated task restart, cloud purchases/auth or ICP actions.

---

# Foundation checkpoint — 2026-11-05 03:34 CST: D3/D4 source inventory recovered

Base: 0fe50afd6eb7b9218f6f033f2232704c5bca47f4; authoritative branch migration/tencent-somm100. Read current migration/progress/source-map/Netlify guard; no concurrent update at start.

## Actual increment
- Read Notion D3/D4 inventory 40717d16de4c817aaad6f3433f55df22 and resource-gap matrix 40717d16de4c816888a7ca112c353d45. Followed and fetched every one of 28 unit pages plus two standalone quizzes. Sources are marked unverified, last edited 2026-10-28; source existence is not final course approval.
- D3: 13 units, 72 checks,39 inline questions; standalone quiz30. D4:15 units,93 checks,45 inline questions; standalone quiz45. Counted actual page bodies/answer sections, not filenames. All inline answer numbers match;75 standalone quiz mappings resolve to known units (including dual mapping for D3 quiz10).
- Added docs/qa/foundation-d34-source-inventory-20261105.json: stable proposed unit/quiz IDs, original URLs/edit dates, section headings, observed counts and all75 quiz-to-unit mappings. No private textbook body or image copied; Notion links are engineering provenance, not student UI links. This is inventory metadata, not published lesson content.
- Added scripts/check-foundation-d34-inventory.mjs for reproducible inventory integrity checks. Executed its pure validation function in the available JavaScript runtime:28 units/165 checks/84 inline questions/75 quiz entries valid. Three negative cases rejected (missing unit, false cohort confirmation, dangling quiz target). Node file invocation NOT run because execution host unavailable.
- Corrected stale foundation-source-map statuses: prior local full build/desktop verification succeeded; D3/D4 materials exist but await fact QA, current PPT mapping and UI work. Preserve existing nodes, articles, data, local-progress keys and five-day cohort distinction.

## Constraints and exact failures
Execution environment reported exec-server connection attempt failed: timed out waiting for exec-server initialize handshake after 10s. One pwd probe returned: No usable execution environment is available. Wait for an environment to become available before using this tool. Browser tools unavailable this round. No new production build, React test, mobile test or deployment performed; previous24 tests are not counted again. Not fully blocked: connected-source discovery and GitHub persistence succeeded. No automation changes needed for this transient host failure.

## Day status / next breakpoint
D1 10 and D2 9 integrated review units; shared France6. D3/D4 now inventoried in full, NOT student integrated and NOT confirmed current cohort day assignments. D5 dates known/material allocation pending; D6 absent from current five-day cohort. Follow inventory URLs to prepare condensed lessons and fact QA; no further broad rediscovery needed. Resource matrix prioritizes maps, traditional/tank fermentation comparison, fortification timing and Sherry aging visuals. Restore runtime before student UI integration/build/mobile acceptance. Continue only Foundation; no CMS/WSET/Into/Wine Library restart, Netlify connection, Tencent billing/auth/ICP actions.

Saved through GitHub atomic commit/readback; not deployed or live accepted. No new verified public URL.

---

# Foundation checkpoint — 2026-11-05 01:53 CST: full-app acceptance and route loading

Base: e2513bf018b5b31ba1bfe0ef3cb1b9b518c6c563 on migration/tencent-somm100. Head rechecked immediately before preparing this commit; no concurrent update found.

## Delivered
- app/LearningApp.tsx: moved five existing Foundation imports to module-scope React.lazy, with a route-scoped Suspense loading status. Existing course JSX, instructors/images, content, IDs and local-storage schemas are unchanged.
- First entry reduced by 103,221 bytes (12,126,898 → 12,023,677; gzip approximately 2,061.31 → 2,030.21 kB). Foundation code/CSS now use separate chunks. This is a modest reduction; the roughly 12 MB main entry remains unresolved.
- First rebuild contained old generated chunks (461 files). Moved the generated directory aside, rebuilt from an empty output directory, then replaced/restarted the managed static preview. Fresh result is 451 files, including eight additional Foundation assets. No source content removed; cause of stale output not established.
- npm run build:cloudbase passes, 1,936 modules; offline entry/PWA/resource checks pass for / and /somm100/. Entry index-B08pKafx.js SHA256 8ca8bdfe01793298d7369b373058334aa63cf3c07b2fe750c2e18d459200d0ae.
- All 24 existing Foundation tests pass.

## Full-app browser evidence
- Tested actual full CloudBase production build using managed preview, not the focused Foundation harness.
- Discover → Foundation shows loading status, then all five course components mount. Concept buttons and directory links retain #foundation and scroll to the matching content.
- D1 unit10 label exercise expands. Added a second self-check and answered the vintage question. Navigate to Discover and back, then reload: D1 unit10, 2/8 checks, 2/3 answers remain; prior first/latest answer pair remains; 4-week pace and France unit5 remain.
- Screenshot docs/qa/foundation-full-app-20261105.jpg; machine-readable evidence docs/qa/foundation-full-app-20261105.json. Desktop test only this round; root mount browser verified, subpath offline only. Browser-local test records are not account/cloud synchronization.

## Delivery status and remaining curriculum
Saved locally; GitHub atomic commit and readback follow. Production build and local full-app browser checks verified. NOT deployed to Tencent and NOT live accepted; no new live URL verified. Full frozen-lockfile dependency install remains unverified.
No new teaching text or day assignments this round. Current evidence remains: pre-course 8 weeks/4-week pace (30 checks,31 questions); D1 10 units/71 checks/30 questions; D2 9 units/64 checks/27 questions; France 6 units/38 checks/18 questions. D3 and D4 formal daily materials pending; D5 dates verified but material allocation pending; D6 absent from current five-day cohort22 source. Do not present this as six completed course days.

## Next breakpoint
Continue authoritative D3/D4 source mapping and mobile full-app validation; do not repeat the completed desktop checks or dependency restoration without a new reason. Main-entry bloat lies largely outside Foundation and is not solved by this scoped change. Tencent deployment remains unverified. Preserve Netlify ignore='exit 0' and [skip netlify]; no old-site/ICP/billing changes or paused task restarts.

---

# Foundation checkpoint — 2026-11-05 01:45 CST: full CloudBase build restored

Base: 047af4d9477d11da7c92af1148acaabbae26b0e1. No concurrent branch update found at start.

## Delivered
- Downloaded exact GitHub source archive via normal supported HTTPS. All 900 repository blobs match the Git tree SHA individually. Complete checkout: /workspace/scratch/4b501e03edb8/current-source. No AGENTS.md present.
- Read latest Foundation/source map/migration checkpoints and build configuration. Existing course content, instructors/images/IDs untouched.
- Actual npm run build:cloudbase passed: question-source gate, dictionary generation, 1936 modules. Existing local React/Vite packages plus fixed-version required build dependencies were used; this is NOT evidence of a frozen-lockfile installation.
- Added scripts/check-cloudbase-foundation.mjs and appended it to build:cloudbase. Checks local HTML/PWA assets, both mount paths, symlink/hidden/source-file exclusion, actual bundled Foundation modules and four stable local-storage keys; produces entry SHA256 and size evidence.
- Checker initially rejected generated-only media/grapes/.peloursin.jpg.nEos4O (not in verified tree/public). Removed that single output artifact and reran: PASS,443 files,11 markers. No source asset deleted. Cause not established.
- Full result: docs/qa/foundation-cloudbase-build-20261105.json. Existing Foundation 24 tests rerun, all pass.
- Entry index-DCGKFiB2.js is 12,126,898 bytes (~2.06 MB gzip). Significant loading-performance issue remains; no claim of ready-for-production speed.

## State
Saved locally; GitHub atomic commit/readback follow. Build verified offline; NOT deployed or live accepted. No new live URL verified.
Pre-course 8 weeks/4-week pace remains; D1 10 units/71 checks/30 questions + label practice; D2 9 units/64 checks/27 questions; France 6 units/38 checks/18 questions + Rhône guide. D3 and D4 formal daily material pending; D5 dates verified/material placement pending; D6 absent in current five-day cohort22 source. No course-content changes this round.

## Next breakpoint
Complete source is now available: do not repeat partial source restoration. Run full-app browser checks against dist-cloudbase, then address entry-bundle size within approved scope. Frozen-lockfile install is still unverified. Continue D3/D4 authoritative source mapping; missing formal timetable is not permission to invent lessons. Tencent deployment path/session remains unverified; no repeated auth, domain/ICP/billing actions or paused task changes. Netlify guard retained.

---

# Foundation checkpoint — 2026-11-05 (UTC+8): label practice and real React verification

Base: 413359df23db68c8410c736b987a63179d826afd on migration/tencent-somm100.
Verification window: 2026-11-04 16:30–16:36 UTC / 2026-11-05 00:30–00:36 UTC+8.

## Delivered increment
- Restored current Foundation components, data, helpers and tests from the authoritative GitHub head. Read LearningApp imports/mounts and previous checkpoints; no intervening head update at preparation.
- Added app/FoundationLabelPractice.js in D1 unit 10 only: two explicitly fictional information cards, three open questions with expandable answers, and a six-field task using the learner's own bottle/notes. No image upload, purchase, extra score, state key, question ID or schema change.
- Content follows the existing verified D1-10 fact/inference distinction. Read legacy Notion label source 3fe17d16de4c81aeadbfe12703b59cf0; its restricted audience/no-republication notice means private article text and 14 image attachments were not copied. Fictional cards are original teaching examples, not substitutes for verified real-label illustrations.
- Added reusable tests/foundation-ui entry/config/README using actual React components; QA output ignored and separate from cloudbase/public. Existing package.json/lockfile unchanged.
- Six previous diagrams, Rhône guide, cohort dates, instructor/images and unrelated modules retained.

## Verification
- Node 24.22.1; real React/ReactDOM 19.2.6 and Vite 8.0.13 restored via normal npm registry access. The old blanket missing-dependency block is no longer accurate for this focused component checkout.
- Existing 24 Node tests pass; rerun after the content and UI changes, all pass.
- Actual five-component React production bundle built successfully: 32 modules, JS 294.91 kB / gzip 92.60 kB. This is a focused Foundation bundle, NOT the complete CloudBase application.
- Browser: all five components mounted. Changed pace 8→4, D1 to unit10 and France to unit5. Expanded label answer guide. Checked D1 item, answered wrong then corrected first question. Reload retained pace, active units, check and both first/latest answer text.
- Narrow iframe: 390px outer /375px content. scrollWidth=clientWidth=375. Two label cards stack at x49, width277; no horizontal overflow. Desktop and narrow screenshots inspected; physical mobile not tested.
- Browser log sample contained extension metadata errors only; no app failure observed. This is not a clean-log assertion for the entire app.
- Screenshot: docs/qa/foundation-label-react-20261104.jpg (focused component QA, not live product).

## Course state
- Pre-course: 8 learning weeks /4-week pace, 30 checks,31 MCQs.
- D1:10 units,71 checks,30 MCQs,4 existing diagrams; NEW unit10 label practice.
- D2:9 units,64 checks,27 MCQs,1 diagram.
- France:6 units,38 checks,18 MCQs,Rhône comparison and map tasks.
- D3:pre-course preview only; formal daily materials pending.
- D4:pre-course preview only; formal daily materials pending.
- D5:cohort dates verified; material/assessment allocation pending.
- D6:not in current cohort22 source (5 classroom days/3 stages); do not invent a sixth day.
All day-content allocation still needs authoritative confirmation.

## Status / next breakpoint
Saved locally; atomic GitHub commit/readback follow. Tencent deployment and live acceptance NOT verified.
No new verified live URL. Existing temporary domain remains only historical test evidence.
Full LearningApp/CloudBase build, production integration, physical phone/mainland-network QA remain outstanding.
Next: restore remaining full build dependencies/source, then run build:cloudbase; continue current D3/D4 source discovery and approved real-label/France-map assets. Do not let private image permissions block original teaching work.
Preserve [skip netlify] / ignore="exit 0"; no Netlify, ICP/domain, billing or paused automation actions.

---

# Foundation checkpoint — 2026-11-04 Rhône comparison and map guide

Base: 10d540769d95edd5c812fa080236222ec98b7ccf on migration/tencent-somm100.

## Delivered increment
- Fresh branch/checkpoint/source map/France component and data/diagram renderer/CSS/Netlify guard read. No intervening branch update at start.
- Read resource matrix 40717d16de4c81c2910decdcecc94d7d and both linked candidates.
- France candidate 3fe17d16de4c81368988dbaf72730fdd is SOMM-095 WORLD wine map, 553x311; metadata does not establish a suitable France-region map. Its pixels were not inspected; not published.
- Rhône candidate 3fb17d16de4c8161b60ff956897c6334 contains advanced historical CMS notes and two attached images. Image identity/clarity/rights remain unverified; no private note text or images copied to student UI.
- Added original Rhône north/south conceptual comparison using existing Foundation France-05 summary. Clearly NOT geographic map, boundaries or relative distances.
- Added app/FoundationRhoneMapGuide.js with attributed external official Inter Rhône map (2025 edition), three location tasks, native expandable answer guide and official resource-page fallback.
- Official resource page https://www.vins-rhone.com/en/wine-school/educational-resources and PDF https://www.vins-rhone.com/sites/vignoble/files/documentation/2025-04/CARTE-VVDR-A3-2025-sans%20villes.pdf fetched through web search on 2026-11-04. PDF text contains all cities and appellations used in exercise. External link only; no map rehosted or blanket reuse licence inferred.
- Mounted existing diagram wrapper and new guide only in France review (guide only unit 05). No record schema, ID, score, instructor, image, cohort date or unrelated module changes.
- Updated provenance with inspected metadata, suitability decisions and exact limits. Six teaching diagrams total now.

## Course state
D1: 10 units / 71 checks / 30 MCQs, four diagrams.
D2: 9 units / 64 checks / 27 MCQs, one diagram.
France: 6 units / 38 checks / 18 MCQs, NEW Rhône comparison and three unscored map tasks.
D3 and D4: pre-course preview only, formal daily material pending.
D5: current cohort dates recorded; material/assessment placement pending.
Historical D6: not present in current five-day cohort source; no sixth day invented.
All actual day-content allocation remains to be verified.

## Verification / status
- node --check passed for France review, new guide and diagram renderer.
- Isolated static preview generated from the same renderer, guide function and CSS, NOT full React application. Desktop screenshot inspected; native details answer expansion verified.
- Narrow iframe 390px outer / 375px content: both comparison columns stack at equal x; document scrollWidth 375 equals clientWidth 375; screenshot inspected.
- Existing progress code/data unchanged; prior 24-test pass remains prior evidence, not rerun this round.
- Complete checkout/React/Vite dependencies not restored. No production build, full app interaction test, physical phone or mainland network QA. Official PDF web fetch does not establish student browser availability.
- Saved source/checkpoint changes; atomic GitHub commit and readback follow. Tencent deployment/live acceptance NOT verified. No newly verified live domain.
- Preserve [skip netlify] and ignore = "exit 0". No Netlify, billing, ICP/domain or paused task action.

## Next breakpoint
1. Find a genuine France overview map with verified content/use scope; world-map candidate is not a substitute. Embedded Rhône geographic map remains open despite external guide.
2. Read real wine-label sources for D1-10 before creating annotation; retain existing images/instructor text.
3. Confirm actual five-day teaching allocation; no invented D3–D6.
4. Restore full build workspace from authoritative branch, build:cloudbase, then verify deployed SHA and full Foundation UI.
5. Continue Foundation only; substantive work delivered, no dependency-only stall.

---

# Foundation checkpoint — 2026-11-04 teaching diagrams

Base: 0faa53d739ae79098fb7a12fc09ac9fd60a92dde on migration/tencent-somm100. Preserve the cohort 22 five-classroom-day correction.

## Actual increment
- Read current remote HEAD, Foundation/CloudBase checkpoints, source map, D1/D2 lesson data/components, CSS and Netlify guard; HEAD rechecked before commit.
- Added lib/foundation-diagrams.mjs and app/FoundationDiagram.js: FIVE original semantic HTML diagrams, integrated immediately after the matching review unit prose.
- D1-05 graft/rootstock functional structure; D1-06 fermentation inputs/process/concurrent outputs; D1-07 typical red/white/one rosé pathway comparison; D1-09 origin/rules/label reading framework; D2-01 variety/climate/structure/style/region learning path.
- All text adapted from existing source-mapped condensed lessons. Added teachingDiagrams provenance in data/foundation-source-map.json, retaining source verification limitations. No third-party image or private textbook reproduced.
- Explicit caveats retain process exceptions, distinction between potential/actual alcohol, varied rosé methods, and no origin/colour quality ranking. No numerical regulations or fabricated official day allocation.
- Semantic figures/lists expose all labels as selectable readable text; steps have visual connectors; graft layers show distinct roles; fermentation outputs are parallel rather than sequential. Scoped styles stack comparison columns below 700px.
- Removed remaining stale six-day wording in D1/D2 introductory copy. Existing IDs, checklist/question counts, local storage, lecturers, images and unrelated modules unchanged.

## Current course content status
| Item | Status |
| --- | --- |
| D1 | 10 reviews / 71 checks / 30 MCQs; four new diagrams; actual cohort day allocation pending |
| D2 | 9 grape reviews / 64 checks / 27 MCQs; one new learning-framework diagram; day allocation pending |
| France | 6 shared reviews / 38 checks / 18 MCQs; maps and day allocation pending |
| D3 | Pre-course preview only; formal daily material pending |
| D4 | Pre-course preview only; formal daily material pending |
| D5 | Latest cohort date exists; teaching/assessment allocation pending |
| Historical D6 | Not in current five-day source; no sixth day invented |

## Validation and delivery
- node --check: renderer, wrapper and both modified review components passed.
- Existing tests rerun in france-work: 24/24 passed (pre-course/D1/D2/France, first/latest answers, storage isolation, corrupt/future data and review completion).
- Isolated static QA uses the EXACT renderer with an HTML serializer and the same CSS, not the full React app. Preview served through supported sites-preview and inspected in cloud browser.
- Desktop viewport 1363px: all five figures present, no horizontal overflow; screenshot inspected grafting and three-column wine process.
- Narrow QA iframe: 390px outer width / 375px content width with scrollbar; all five figures present, scrollWidth equals clientWidth, no horizontal overflow; screenshot inspected readable grafting layout. This is narrow browser layout QA, NOT physical phone testing.
- Runtime wrapper/build integration not verified: complete authoritative checkout and React/Vite dependencies still absent in this focused workspace. Isolated preview and Node syntax tests are NOT a production build.
- Saved seven source/checkpoint files; atomic GitHub commit and remote readback follow checkpoint creation. Tencent deployment and online acceptance unverified; no newly verified live URL.
- Commit retains [skip netlify], unchanged netlify.toml ignore = "exit 0". No old Netlify, charges, domain/ICP or paused-task actions. Preview/QA harness is scratch-only and excluded from GitHub commit.

## Next breakpoint
1. Read resource matrix map sources for France overview and Rhône north/south; verify actual asset content and use scope. Current diagrams do not fill those geography gaps.
2. Prepare a genuine wine-label annotation using a verified permitted image; do not call origin/rules concept diagram a real label illustration.
3. Locate confirmed five-day classroom teaching allocation and retain original instructor bios/images. Historical D3–D6 remains non-authoritative.
4. Restore supported full build workspace on the latest deployment branch, run build:cloudbase, full Foundation UI/record restore checks, then verify Tencent deployment SHA and live pages.
5. Continue Foundation only; substantive increment delivered, other paused tasks remain paused.

---

# Foundation checkpoint — 2026-11-04 cohort 22 source reconciliation

Base: f0948edac9f0fac79c071a9a78145ade5c22b27e on migration/tencent-somm100. Current source corrects the historical six-day assumption.

## Actual increment
- Freshly read branch HEAD, Foundation/CloudBase checkpoints, source map, LearningApp, D1/D2 components, styles, data and Netlify guard.
- Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d. It explicitly calls for diagrams, map/media and verified playability; no candidate asset is marked delivered.
- Read complete current Library HTML SOMM100_Yichel_公众号排版_讲师介绍补全版.html, libfile_73efd088c36c819184f2422d15af1764, version 3, modified 2026-11-04T11:51:36.800823Z, has_more false. Full source has instructor bios, embedded images, cohort schedule, fees and registration information.
- Material finding: cohort 22 has FIVE classroom days in THREE stages, plus FOUR field-trip days. Do not continue presenting historical six-day framework as current timetable.
- Added data/foundation-cohort22.json and app/FoundationCohort.js, mounted in existing Foundation. Five city cards show complete years, stages and daily time; responsive grid avoids wide schedule table on phone.
- Neutralized four stale six-day labels in LearningApp. Existing D1/D2/France review IDs and progress unchanged; content allocation remains unconfirmed.
- No instructor bios, images, prices, refund terms, payment or registration links changed. Do not shorten or rewrite original instructor material when subsequently integrating it.
- Source article: https://mp.weixin.qq.com/s/ry29Vvs8tSHyR3xgekgySg . Link copied from supplied source; live accessibility not tested. Current source schedule shown with instruction to confirm near course start.

## Current content status
| Item | Status |
| --- | --- |
| D1 | 10 review units, 71 checks, 30 MCQs; actual cohort day allocation pending |
| D2 | 9 grape review units, 64 checks, 27 MCQs; actual cohort day allocation pending |
| France | 6 shared review units, 38 checks, 18 MCQs; maps and day allocation pending |
| D3 | Pre-course preview only; formal daily material pending |
| D4 | Pre-course preview only; formal daily material pending |
| D5 | Class date exists for each city; teaching materials/assessment placement pending |
| Historical D6 | Not present in current five-day cohort source; do not fabricate a sixth date |

## Validation and status
- node --check app/FoundationCohort.js passed.
- Parsed source HTML schedule rows and compared all five city ranges with JSON. All 25 dates valid, unique per city, ascending; stage lengths 2+2+1; inclusive field-trip span 4 days (2027-03-14 to 2027-03-17).
- react/typescript/vite still NOT_INSTALLED in current workspace. Production build, browser/phone rendering, source link accessibility and Tencent deployment not verified.
- This is a display/content change; no learning-record writes added. Existing 24 logic tests passed in previous commit; not represented as rerun here.
- Saved files; atomic commit/readback follow checkpoint creation. No newly verified live URL.
- Preserve [skip netlify] and netlify.toml ignore = "exit 0"; no Netlify, cloud billing, domain, ICP or other paused-task action.

## Next breakpoint
1. Prioritize original code-native diagrams for D1-05 graft/rootstock, D1-06 fermentation, D1-07 red/white/rose, D1-09 origin/rules/label, D2-01 learning framework; validate against actual current lesson content.
2. Follow resource matrix map links; verify use scope and clarity before displaying third-party images. Do not call source availability deployment.
3. Keep original instructor bios and all existing images intact. If integrating enrollment section, use source version 3 or newer; no paraphrased replacement of user-approved text.
4. Find actual five-day cohort teaching allocation; old D3–D6 frame is not authority for latest class schedule.
5. Restore supported complete build workspace; run build:cloudbase and mobile/browser QA before claiming deployment/acceptance.

---

# Foundation checkpoint — 2026-11-04 France shared review

Base: 478b1da156e846be8271750ea5763ac2adc3b3a3 on migration/tencent-somm100. Supersedes previous France-pending status below.

## Delivered code/content
- Freshly read current branch source map, LearningApp, D2 review/helper, prior Foundation and CloudBase checkpoints and Netlify guard. Branch HEAD rechecked unchanged before commit.
- Read all six canonical F01–F06 Notion pages. Their original IDs, edit timestamps and unverified metadata are recorded in foundation-source-map.json under franceReview.sources.
- Added data/foundation-france.json: 6 original condensed summaries, 38 source-derived checklist items and 18 source MCQs with answer keys. Subjects: French geography/climate overview, Bordeaux, Burgundy, Loire, Rhône and Alsace.
- Added FoundationFranceReview.js and foundation-france.mjs; integrated separate navigation and review section into existing Foundation page. Separate browser-local storage somm100.foundation.france-review.v1 preserves pre-course, D1 and D2 data.
- Existing D2 explanatory copy now points to shared France review. No fixed day assignment inferred; no classroom completion claim.
- Retained lecturers, course images, brand, existing records and unrelated modules. No private linked textbook copied. No Notion backend links inserted into student navigation.
- No map asset yet: overview explicitly says text review does not establish map-location competence.

## Six-day state
| Day | Status |
| --- | --- |
| D1 | Existing 10 review units / 71 checks / 30 questions; standalone quiz, classroom schedule and media pending |
| D2 | Existing 9 grape units / 64 checks / 27 questions; shared France now independently integrated, exact day assignment still unconfirmed |
| D3 | Pre-course preview only; formal content and timetable pending |
| D4 | Pre-course preview only; formal content and timetable pending |
| D5 | Verified timetable and materials missing |
| D6 | Verified timetable and materials missing |

## Verification
- node --test tests/*.test.mjs in france-work: 24/24 passed after correcting France storage constant references discovered by round-trip test.
- node --check for new France component and updated D2 component: passed.
- Tests cover source counts/unique IDs, sixth-unit restore, self-check + correct-answer completion, first/latest attempts, isolation from all three prior modules, malformed/future records and unavailable storage. Previous 18 tests rerun successfully.
- Source extraction validated 3 questions, 4 options and actual answer keys for each of six sources.
- Current workspace was pruned; fetched needed files from authoritative GitHub commit. react/typescript/vite resolution: NOT_INSTALLED. No complete production build, browser rendering, phone QA or Tencent deployment verification this run. Syntax/unit tests do not substitute for those.
- Saved implementation; atomic Git commit and file readback follow checkpoint preparation. Deployment and live acceptance remain unverified, no new verified URL.
- Netlify ignore = "exit 0" retained; commit message includes [skip netlify]. No old Netlify access, charges, authorization changes or domain/ICP actions.

## Next breakpoint
1. Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d. Locate usable map/media and verified original article links without pretending current text is a map.
2. Read latest course/lecturer Library source (updated HTML libfile_73efd088c36c819184f2422d15af1764 or latest DOCX libfile_ae6faf4682748191aca9747251a22b2a) before using enrollment details; preserve original instructor descriptions and existing images.
3. Locate and verify D3–D6 and actual six-day timetable. Do not invent schedules or fees.
4. Restore complete supported build workspace for this branch, run build:cloudbase and browser/mobile tests, then independently verify Tencent deployed SHA and URL.
5. Continue Foundation only; substantive progress achieved, other paused tasks remain paused.

---

# Foundation latest checkpoint — 2026-11-04, D2 grape review integration

Base: b6bbfeaa54351a8b80e5cdf35562a1429b48f91d on migration/tencent-somm100.
All seven changed files belong to one atomic commit; previous D1 checkpoint is preserved below.

## Actual increment
- Read latest branch, LearningApp, D1 component/helper, pre-course helper, source map, Foundation and CloudBase checkpoints, and Netlify guard before editing. Rechecked HEAD before commit; no concurrent branch change observed.
- Read all nine canonical D2 digest pages from the D1–D2 inventory, including actual checklists, questions and answer keys.
- data/foundation-d2.json: nine original condensed summaries (two sections per unit), 64 source checklist items and 27 source MCQs. Covers learning method, six core grapes and second-level white/red grape relationships.
- app/FoundationD2Review.js and lib/foundation-d2.mjs: integrated into existing Foundation view with direct navigation. Unit selection, checklist, first/latest attempts, feedback, retry, return-to-body and progress display.
- Separate storage key somm100.foundation.d2-review.v1. Existing pre-course/D1 records and IDs retained. This is browser-local progress, not account sync or attendance.
- France is explicitly still pending. This package does not represent a complete D2 classroom day or verified six-day timetable.
- Existing brand, lecturers, images, CMS/WSET/other modules and public article links unchanged.
- No private linked historical textbook originals reproduced; student summaries are original. Source metadata remains unverified; extraction does not replace teaching QA.

## Evidence and sources
- Nine source URLs, last-edited timestamps and metadata recorded under d2Review.sources in data/foundation-source-map.json.
- Canonical inventory: https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd
- Question/checklist extraction: nine sources, three questions with four options and a valid source answer key per source.

## Six-day status
| Day | Actual code/content status |
| --- | --- |
| D1 | Existing 10 condensed reviews, 71 checks, 30 MCQs; classroom schedule/media and standalone 25-question quiz pending |
| D2 | NEW nine grape reviews, 64 checks, 27 MCQs; six France units and exact D1/D2 placement pending |
| D3 | Pre-course preview only; formal content/timetable unconfirmed |
| D4 | Pre-course preview only; formal content/timetable unconfirmed |
| D5 | Verified timetable/materials missing |
| D6 | Verified timetable/materials missing |

## Validation and delivery limits
- node --test tests/*.test.mjs in the focused workspace: 18/18 passed (six pre-course, six D1, six D2).
- node --check app/FoundationD2Review.js: passed.
- D2 tests include ninth-unit restore, review completion requiring all checks/correct answers, first/latest retry preservation, storage isolation from both prior modules, corrupted/future records and blocked/quota storage.
- LearningApp changes limited to one component import, one navigation button and one component mount.
- react, typescript and vite resolution checks: NOT_INSTALLED in this workspace. Complete production build and mobile/browser interaction QA have NOT run; pure logic/syntax checks do not prove rendering.
- Saved code and source provenance. Commit/readback performed separately after this checkpoint is prepared.
- Tencent deployment NOT verified. No newly verified live URL. No Netlify connection/check/publish, billing, DNS, domain or ICP actions. Keep ignore = "exit 0" and [skip netlify].

## Next breakpoint
1. Read France F01–F06: 40717d16de4c812a91a9e646c9e10af3, 40717d16de4c81df9eabe257fe06ffb5, 40717d16de4c81558f88ddcb1d61593e, 40717d16de4c8178ab75e37868eb8ee3, 40717d16de4c8172833dcff7d2cd3fca, 40717d16de4c817cba87daed923a5a5d. Keep shared placement explicitly unconfirmed until evidence.
2. Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d and current Library course/lecturer document before using enrollment details. Do not invent D3–D6 or fees/dates.
3. Restore complete supported build workspace for the same GitHub branch and dependencies, run build:cloudbase, browser/mobile QA and independently verify actual Tencent deployment.
4. This run made substantive progress; continue the Foundation task only. Do not reactivate unrelated paused tasks.

---

# Foundation latest checkpoint — 2026-11-04, D1 review integration

Base: a765ffa312cf564036a96d6a831550dd71db1431 on migration/tencent-somm100.
This checkpoint and all D1 code/data ship together in one atomic commit.

## Actual changes

- Read current LearningApp, FoundationStudy, progress helper, source map, Foundation and CloudBase checkpoints, and Netlify guard. Latest branch initially remained a765ffa.
- Read all 10 canonical D1 student digest pages linked by the inventory, including checklist, extension questions and answer explanations.
- Added data/foundation-d1.json: 10 short original teaching summaries (3 sections each), 71 source-derived checklist items, 30 source-derived multiple-choice questions and answer feedback. This is condensed review, not a full textbook or classroom delivery.
- Added app/FoundationD1Review.js and lib/foundation-d1.mjs. Existing Foundation view now offers direct pre-course / D1 review navigation; review is labeled classroom follow-up, separate from pre-course.
- Reused existing option-shuffle/answer tracking functions and scoped mobile styles. Separate storage key somm100.foundation.d1-review.v1; existing weekly progress remains untouched. Unknown/future/corrupt storage is preserved and not overwritten.
- Retains first/latest answers, review counts, retry feedback and return-to-body action. No account/cloud sync, instructor reporting, calendar enrollment or attendance completion claim.
- Existing eight concept IDs, 10 public article links, pre-course 8 weeks/30 checks/31 questions, lecturers, images and unrelated course modules remain unchanged.

## Sources

All 10 source URLs and edit/verification metadata are recorded in data/foundation-source-map.json under d1Review.sources.
Canonical parent: https://app.notion.com/p/40717d16de4c810c811dd8a1324066cd

- D1-01: 40717d16de4c81d7bbd8fba68936ecab — grape components
- D1-02: 40717d16de4c81cb9b72c529baeec3b4 — annual cycle
- D1-03: 40717d16de4c81b581a8d85b7ff77709 — maturity/environment
- D1-04: 40717d16de4c8143b199fb57a899a5f5 — vineyard choices
- D1-05: 40717d16de4c8129ae41fc99ca760455 — grafting/rootstock
- D1-06: 40717d16de4c814c93b7c56d250d1aea — fermentation
- D1-07: 40717d16de4c81a089b3d25c9e5e74a0 — skin contact
- D1-08: 40717d16de4c81bca48fff8dbdb56587 — MLF/lees/maturation
- D1-09: 40717d16de4c81a790eec02320cffcb1 — origin systems (concepts only; no numeric regulations)
- D1-10: 40717d16de4c81108c65e16da8465979 — labels

Source Notion pages have unverified metadata. Read/extraction is not final factual or teaching QA. Linked private historical materials were not copied into student content; backend Notion links are not student navigation. Condensed prose avoids absolute soil/flavor, low-yield/quality or oak/quality claims.

## Six-day status

| Day | Actual status |
| --- | --- |
| D1 | 10 review summaries + 71 checklist items + 30 extension MCQs integrated in code; classroom timetable/media and separate 25-question Course Quiz still pending |
| D2 | 9 digest and 6 shared France units identified previously; child content integration pending; France exact D1/D2 placement unconfirmed |
| D3 | Pre-course preview only; formal curriculum/timetable pending |
| D4 | Pre-course preview only; formal curriculum/timetable pending |
| D5 | Verified timetable/materials missing |
| D6 | Verified timetable/materials missing |

## Validation

- node --test tests/foundation-study.test.mjs tests/foundation-d1.test.mjs: 12/12 passed.
- node --check app/FoundationD1Review.js: passed.
- Tests cover 10/71/30 mapping and IDs, unit 10 restore, review gating, first/latest answers, dedicated storage key with pre-course data untouched, invalid record and quota failures, plus all 6 pre-course regression tests.
- Source parsing validated 3 questions / 4 options per D1 page and 30 actual source answer keys.
- LearningApp diff restricted to new component import, two navigation buttons and D1 component mount. Netlify guard remains ignore = "exit 0"; commit contains [skip netlify].
- Full checkout/dependencies remain unavailable after workspace cleanup. Current resolution checks: typescript, react and vite not installed. Full build:cloudbase, mobile/browser rendering, storage UI refresh/focus/scroll and Tencent deployment NOT verified. Node syntax and pure logic tests are not production build evidence.
- No domain, DNS, ICP, billing, Netlify or Tencent configuration actions this run.

## Next breakpoint

1. Read D2-01 through D2-09 and shared France F-01 through F-06 child pages from canonical inventory; import a coherent D2 review package separately.
2. Read resource-gap matrix 40717d16de4c81c2910decdcecc94d7d. Import verified images/videos and grape original links without removing existing course images.
3. Read Library latest course/lecturer document before introducing any enrollment facts. Do not invent D3–D6 timetable, fees or dates.
4. Obtain complete supported build workspace, run build:cloudbase and browser/mobile QA; then verify actual Tencent deployment independently. Do not call this commit live.



