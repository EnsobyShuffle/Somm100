# SOMM100 腾讯云迁移检查点

2026-10-31。Henry 指定 SOMM100 App/PWA 与网站优先，其余项目稍后迁移。

## 代码与目标

- 原始 Sites 项目：`appgprj_6adbaff9281081919f00f6a89b1fa1c7`。
- 已对齐 GitHub `EnsobyShuffle/Somm100` 的 `56ec515c3ff67e97e95f6d66475561d0d87367fd`，逐个校验 853 个文件；18 个差异文件按 Git blob SHA 验证后同步。
- 腾讯云上海标准环境：`shuffle-platform-d6eoe6y06c6f4ea`，控制台已确认到期日 2027-04-30。
- SOMM100 首先使用这个环境的托管根路径 `/`；其他项目不得覆盖此路径。正式域名与备案仍需核对。

## 第一阶段保留现有功能

现有 Netlify 版本的课程、答题、笔记、品鉴、打卡和收藏使用浏览器本地数据。账号页面已明确标注手机号/微信登录尚未开放；旧 D1 接口与 ChatGPT 身份头不能直接作为腾讯云的鉴权方案。

新增构建入口直接复用 `app/LearningApp.tsx` 及原样式、资料、图片、PWA manifest 和 service worker。仅在 CloudBase 构建中明确使用现有游客模式，避免继续请求旧平台账号接口；AI 对话维持未开通状态，引导式英语练习保留。原 Sites 和 Netlify 构建命令保留。

这不是云端账号同步已经迁移的声明。后续需接通腾讯云身份验证、PostgreSQL 数据模型和账号数据导入后，再启用跨设备同步。不会把访客自带身份头当作可信身份，不会向浏览器公开数据库凭证。

## 构建与部署

```sh
npm run build:cloudbase
node --test tests/learning-client.test.mjs tests/testing-store.test.mjs tests/wine-channel.test.mjs tests/study-notes.test.mjs tests/wine-library-studio.test.mjs
python3 scripts/package-cloudbase.py
tcb login --flow device --intl false
tcb hosting detail -e shuffle-platform-d6eoe6y06c6f4ea
tcb hosting deploy ./dist-cloudbase / --verify --safe -e shuffle-platform-d6eoe6y06c6f4ea
```

只上传 `dist-cloudbase/`。ZIP 文件包含托管根目录下的页面与公开资源，禁止上传源码、研究目录、`.openai`、`.env` 或凭证。默认不删除远端文件。

本次不发布旧 ChatGPT Site、不触发 Netlify、不修改旧域名。旧浏览器记录仍属于旧域名，未导出并验证新域名导入前不得切断旧入口。CLI 登录完成后仍须核对托管是否开通、远端现存文件及默认域名，再实际上传。

## 验收边界

已完成构建与八项测试。还需要远端文件校验、桌面/手机交互检查和中国大陆网络测试；地图底图、外链视频和部分远程图片的可用性不能仅凭静态构建保证。首次包不是全部项目搬迁完成，也不是已接通云端同步。

## 最新指令对账（2026-10-31，本轮迁移包）

| 来源与时间（北京时间） | 对账结果 |
| --- | --- |
| GitHub main 2026-10-31 13:36:03，56ec515 | 853 文件基线已对齐，本轮结束前再次核对 main 未变化 |
| 已确认品牌与页面布局 | approved-33388 原品牌图片及现有导航、课程保持；不回退旧 v44 包 |
| 2026-10-30 18:45 取消内置划词翻译 | LearningApp 改接 ExternalAsk，选择文字显示“问 DeepSeek / ChatGPT / 豆包”；点击复制提问并打开官网，不能冒充已接 API；保留记笔记事件与 English Library 内容 |
| 2026-10-31 00:53 五库同页工作台 | 找回 /workspace/scratch/585cd08235ea/somm100-handoff/app/WineLibraryStudio.tsx，仅合入此功能及配套样式；保留之后的课程、资料和界面更新。新增保存失败保护、旧数据格式兼容、逐条勾选及继续编辑；切换五库保留本轮未保存表单 |
| 工作台法国数量 | 17 / 362 / 604 / 1036 / 72 只是 2026-10-27 Notion 历史基线数字，不是已导入网站或已审核数量；生成只整理填写内容，不自动 AI、同步 Notion 或发布 |
| 2026-10-31 14:28 Wine Channel 包 | WC-MIG-20261031-1428 对应相同基线，83 视频，新增前端条目 0；4 个研究候选只保存在 research，不导入视频目录 |
| 登录、邀请码 | 按此前指令暂缓；CloudBase 游客提示明确账号登录与跨设备同步未开放 |
| Community → Jobs 招聘 | 保留为待办，尚未实现 |
| 当前部署优先级 | 先 SOMM100 App/PWA 与网站，再其他项目；不新增原生 App 项目 |

### 验证记录

- 8 项自动测试通过，涵盖学习账号/本机隔离、存储失败、笔记、视频来源及工作台旧记录兼容/更新。
- CloudBase 生产构建成功。已在浏览器看到五库同屏，实际完成填写、保存、生成草稿、逐条及逐库勾选；刷新后记录与勾选保留。划选正文后可见三个外部提问入口。
- 旧工作台原实现的保存错误和预览 HTTP 下 randomUUID 不可用已修正；未触碰旧站实际用户数据。测试条目只存在本机预览域名，不进入部署包。
- 当前部署包 443 文件；构建目录与 ZIP 已重新生成。包内不含 research 或源代码。
- 尚未验证手机真实设备、中国大陆全链路、腾讯云远端托管或域名切换；不得将本检查点称为线上已更新。

### 部署认证阻塞

原设备授权并未被 CLI 接收：@cloudbase/cli 3.8.11 的 getMacAddress 在受限云工作环境调用 os.networkInterfaces 时同步抛出 uv_interface_addresses 错误。已定位并仅为该系统错误沿用工具自身原有的全零 MAC 失败回退；未修改授权、权限或网络安全检查。重启后设备授权轮询可持续等待。腾讯云浏览器开发平台仍发生协议超时；需要完成当前正常设备授权并验证 CLI 身份后，才可读取托管状态和上传。无须重复付款。临时用户码不得写入仓库或自动任务。

## 2026-10-31 16:30 接续检查点

- 用户已再次完成设备授权，但恢复CLI会话时，执行环境明确拒绝访问 `https://tcb-api.cloud.tencent.com:443`（blocked by policy）。这是当前网络策略阻塞，不是付款或用户未确认；不再循环要求设备授权，不修改代理/网络隔离绕过限制。环境状态工具未暴露，`/etc/codex/network-policy.json` 不存在，不能据此假设已放行。
- 正常腾讯云控制台回退检查：原 tab99 刷新后转回官方登录页，说明当前云浏览器会话已失效；微信登录iframe显示 Site Unavailable，尚不能上传。没有取得托管域名，不能编造默认域名或声称已上线。
- 独立自动任务“项目迁移上线与域名汇报”已启用，ID `6ae5a626999c8191bcae44bc6fe8ddce`，Asia/Shanghai 每小时执行；执行顺序 SOMM100 → Shuffle → Art Gallery → Atlas → Enso展示站。团队总报改为引用其结果，避免同时覆盖同一部署。
- 已读取 `Wine_Channel_Migration_20261031_1529.zip`（Library `libfile_439e9587027c8191aedaa50f85dacb73`）。原83条完整保留，按BV去重合入11条Somm House历史教学视频原片链接，待部署目录现为94条。
- 新创作者显示实际发布者“亨利的逐未旅途”（UID32601116）；原片封面、时长、日期和播放器与交接证据逐条对应。移除同ID“待确认账号”重复提示。只引用原平台外链与公开播放器，未下载重传视频；未声称完整观看或拥有全部原始素材版权。个人标注自有内容筛选保留其原语义，不把上传账号身份自动当版权证明。
- 15:29材料作为研究追溯保留在 research；4个Mickey候选仍不进入前端。未触发Netlify或旧Sites发布。
- 尚未上线任何经本任务确认的腾讯云新站；SOMM100新域名尚未取得，其他项目也不得填入猜测地址。下轮先核对有效通路，通路不可用时继续可逆源码/导出准备并报告同一真实阻塞，避免重复报假进展。

## 2026-10-31 Git 仓库自动部署接入

- Henry 已在自己的腾讯云控制台完成 GitHub 授权；截图显示“已授权”，仍在新建部署配置页，尚未提交部署。
- GitHub 目标沿用 `EnsobyShuffle/Somm100`，专用分支 `migration/tencent-somm100`；不改 main、不创建 PR。所有该分支发布提交包含 `[skip netlify]`；本分支另设 `netlify.toml` 的 `ignore = "exit 0"`，防止旧平台自动构建。未访问或操作旧平台账号。
- CloudBase 表单：项目 `somm100`，框架“其他”，Node.js 24，目标目录 `./`，安装命令 `npx --yes pnpm@11.25.0 install --frozen-lockfile`，构建命令 `npm run build:cloudbase`，产物目录 `./dist-cloudbase`，部署路径 `/`。
- 已读取 16:25 视频迁移包（Library `libfile_e31080718d908191bdd62777625110b0`），在此前94条基础上按BV去重新增3条，待部署目录97条；原目录保留，原片证据随同保存。未把已核实元数据说成完整播放或版权确认。
- 此检查点是部署准备，不能代替腾讯构建成功、远端文件验证、实际域名和国内网络验收。

## 子路径修正（覆盖上文根路径配置）

- Henry反馈当前控制台表单的根路径 `/` 无法提交，因此当前部署路径改为 `/somm100`，其余表单命令不变。尚未取得具体校验错误，不能把这一现象说成CloudBase全平台禁止根路径。
- CloudBase构建的Vite base设为 `/somm100/`，仅在该构建中改写app/data内既有公开资源前缀（media、brand、releases、journal、wine-atlas、sw.js）；API、外部视频地址和音标保持。PWA manifest采用相对scope/start_url/icons；service worker按注册scope预缓存并只清理自己scope的旧缓存。
- 生产构建成功，实际入口HTML/JS、资源文件存在性、PWA图标与scope检查通过；离线fallback和其他项目缓存不被删除的执行检查通过。public目录还含历史独立导出的bundle，不把它们误判为当前入口bundle。
- 用户随后表示“部署好了”；尚未提供实际访问URL或构建版本，当前仅记录用户反馈，不能声明网站实测完成。需确认本次子路径修正提交被腾讯构建采用；若未自动触发，则在已有somm100应用重新部署同一分支，不重复创建应用。
