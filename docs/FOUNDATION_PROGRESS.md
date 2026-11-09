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



