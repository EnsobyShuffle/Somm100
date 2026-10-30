# Video resource verification — 2026-10-24

`video-library.json` contains 8 Bilibili links with exact title, publisher, subject and verification status. It deliberately omits durations, view counts and subscriber counts. No videos were downloaded or rehosted. Only title/index metadata was verified, not playback or teaching accuracy. `learningPrompt` fields are our suggested learning activities, not assertions that the video presents those exact points.

## Evidence map

| BV ID | Title/publisher evidence |
|---|---|
| BV1Vw411J73r | turn7search1 and turn10search10: direct Bilibili video result identifies 葡萄酒迪先森 and 葡萄藤 lesson. |
| BV1qW4y1w7Rs | turn5search1 and turn10search8: direct Bilibili video result identifies 葡萄酒迪先森 and red/rosé vinification part two. |
| BV1NJ411C71H | turn4search0: direct Bilibili title and description; turn9search1: publisher 杯中时光-选酒指南. |
| BV1h3411N7L9 | turn11search0: direct Bilibili title and introduction; turn11search10: Bilibili's own indexed search lists 大渔大师课 as publisher. It is an introductory excerpt; full course is advertised on publisher's own app. |
| BV1Y49nYWE6p | turn7search8 and turn10search2: direct Bilibili result identifies title and 葡萄酒迪先森. |
| BV16t421H7fo | turn6search5 and turn11search5: direct Bilibili page search extract includes title, author and topic tags. |
| BV1EK411b77C | turn6search4 and turn11search2: direct Bilibili page extract includes title and 葡萄酒迪先森. |
| BV1pK411b7QC | turn6search0 and turn11search1: direct Bilibili page extract includes title and 葡萄酒迪先森. |

Several direct reads returned 412 Precondition Failed; mobile-page alternatives also failed. This is a retrieval limit, not proof the videos have disappeared. Interface wording should be compact: “B站 · 外部视频”. A resource details view can say “已核对链接信息；播放状态待实测”. Do not make fake in-app video-player or viewed-completion claims. An external button can genuinely open the recorded Bilibili URL. Tracking “opened” is different from tracking “watched”.

No current video was identified with a reliable direct link specifically for Alsace from the investigated series. Do not synthesize a BV ID from another episode or use a search-results page as though it were a specific lesson. Burgundy and US provide verified region entries now.

## Official CMS level terminology

Primary official sources actually opened:

- CMS Europe qualifications: https://courtofmastersommeliers.org/qualifications/ — turn8view3.
- Introductory: https://courtofmastersommeliers.org/introductory-sommelier-certificate-3-days/ — turn13view0.
- Certified: https://courtofmastersommeliers.org/certified-sommelier-certificate-1-day/ — turn13view1 (redirect from examination URL).
- Advanced: https://courtofmastersommeliers.org/advanced-sommelier-certificate-5-days/ — turn13view2.
- Master: https://courtofmastersommeliers.org/master-sommelier-diploma/ — turn13view3.
- CMS Americas levels: https://www.mastersommeliers.org/certification/certification-levels/ — turn8view2.
- CMS Americas FAQ: https://www.mastersommeliers.org/certification/exams/exam-faqs/ — turn13search2, official indexed text.

| UI value | Full label supported by CMS Europe | Recommended Chinese UI |
|---|---|---|
| Introductory | Introductory Sommelier Certificate | Introductory · 入门阶段 |
| CS | Certified Sommelier Certificate | CS · Certified Sommelier |
| AS | Advanced Sommelier Certificate | AS · Advanced Sommelier |
| MS | Master Sommelier Diploma | MS · Master Sommelier |

**Distinguish app shorthand from credentials.** Official level names are verified. The official sources do not establish CS/AS as authorised post-nominal designations; the CMS Americas FAQ explicitly states Certified Sommelier does not have a CS designation comparable to MS. Therefore CS/AS may be interface abbreviations for learning stages, expanded on first use, but should not be sold as official earned titles. Do not award badges that purport to certify CMS status.

## Quiz data separation

Store `topic`, `difficulty` and `targetStages` as independent fields. Suggested difficulty values: `foundation`, `intermediate`, `advanced`. Stage is learning context, not a score difficulty alias. Example: a foundational Burgundy question can be tagged `topic=regions`, `difficulty=foundation`, `targetStages=[Introductory,CS]`; an advanced vineyard classification question can have the same topic with `difficulty=advanced`, `targetStages=[AS,MS]`. These are SOMM100 editorial tags, not CMS published exam assignments.

The external video author's labels “二级/三级” are their video titles and must not be automatically translated into CMS CS/AS stages. `suggestedStages` in the JSON are our optional cross-curriculum placement suggestions and should be reviewed by Henry.
