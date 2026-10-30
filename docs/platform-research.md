# SOMM100 platform research — 2026-10-24

Research notes for implementation, not a claim that production mobile packages or mainland connectivity have been tested. All external sources below are primary official sources. Recommendations are engineering inferences from those sources.

## Recommended route

1. **MVP:** responsive Web App with manifest and progressive enhancement, published as a private test deployment. Use server-side authenticated identity, shared content APIs, and persistent SQL records for attempts, bookmarks and progress. Device storage may support drafts/offline caches, but is not the authoritative cross-device record.
2. **Shared contract:** JSON REST endpoints for courses, chapters, knowledge nodes/edges, questions, attempts, progress and media metadata. Separate content schema from UI so the brand website and mobile clients can reuse the same backend. Version content and API contracts; keep official/public reference provenance distinct from SOMM100-authored exercises.
3. **HarmonyOS:** evaluate an ArkTS/ArkUI native shell with an ArkWeb reading surface, then build native training/recording capabilities as validated needs arise. ArkWeb is an actual Huawei Web component pathway, but a browser/PWA build is not itself a HarmonyOS native installation package. Do not claim the React web UI automatically compiles to native ArkUI.
4. **iOS:** first test Safari/Home Screen web-app use. Later a SwiftUI/native app can reuse the same API and embed selected reading content with WKWebView. A thin website wrapper is not a guaranteed App Store acceptance route; make the native app meaningfully useful through learning, offline reading, recording, sync and native UX.
5. **China release:** mobile layout/PWA support does not prove mainland network reachability. A ChatGPT-authenticated private Sites deployment is a review/testing environment, not evidence of a China-ready public service. Before broad Chinese student access, test real mainland devices/networks and choose hosting/CDN/auth and video delivery appropriate to those results. Domain ownership and production domain binding remain separate tasks. No blanket claim that Bilibili embed/playback works before selecting and testing an actual video.

## Platform sources

| Source | Verified finding | Verification note |
|---|---|---|
| https://webkit.org/blog/17333/webkit-features-in-safari-26-0/ | iOS/iPadOS 26 let users add any site to the Home Screen as a web app; a manifest still adds configured icons/behavior. Service workers can improve the experience but are not required for Home Screen installation there. | Official primary source examined |
| https://webkit.org/blog/13878/ | WebKit documents push support for Home Screen web apps in iOS/iPadOS 16.4. This is platform support, not an MVP feature unless implemented. | Official primary source examined |
| https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/web-component-overview | Official ArkWeb overview exists; content body is JavaScript-rendered and not fully extractable in this lookup. | Official primary source examined |
| https://developer.huawei.com/consumer/en/doc/harmonyos-guides/web-scheme-handler | Official indexed documentation says ArkWeb SchemeHandler can intercept HTTP(S)/custom-protocol requests from Web components or ServiceWorker. | Official primary source examined |
| https://developer.huawei.com/consumer/en/doc/best-practices/bpta-render-web-using-same-layer-render | Official indexed best-practice text describes HTML5 content loaded by Web components. | Official primary source examined |
| https://developer.huawei.com/consumer/en/doc/harmonyos-guides/arkts-ui-development-overview | Official native UI documentation is explicitly ArkTS-based declarative UI development. | Official primary source examined |
| https://developer.apple.com/documentation/webkit/wkwebview | Apple's official WKWebView documentation describes its in-app web browsing/rendering API. Full body is JavaScript-rendered in this lookup. | Official primary source examined |
| https://developer.apple.com/app-store/review/guidelines/ | Guideline 4.2 requires features, content and UI beyond a repackaged website. A wrapper alone does not establish acceptance. | Official primary source examined |

## Curriculum reference sources for an original Viticulture chapter

Use the sources for fact verification and link attribution. Write original explanations and questions; do not reproduce whole fact sheets or their images. The educational grouping below is our synthesis, not an official CMS syllabus.

### Annual cycle and budbreak

AWRI, **Bud dormancy and budburst** (2010), 2 pages:
https://www.awri.com.au/wp-content/uploads/1_phenology_bud_dormancy_and_budburst.pdf

Fact anchors: dormant vines maintain respiration using carbohydrate reserves. Spring's first growth relies on those reserves. Budburst timing is temperature- and variety-dependent; relatively early Chardonnay budburst is a useful comparison with relatively later Cabernet Sauvignon. Young growth is vulnerable to a subsequent freeze. Avoid teaching a single temperature threshold as universally exact.

### Flowering and pollination

AWRI, **Flowering and pollination** (2010), 2 pages:
https://www.awri.com.au/wp-content/uploads/3_phenology_flowering_and_pollination.pdf

Fact anchors: budburst-to-flowering duration varies strongly with temperature. Low temperature can delay flower opening and is associated with poor fruit set. Commercial Vitis vinifera cultivars are normally self-pollinating; cross-pollination is possible. Insects are not required as the primary pollination mechanism.

### Veraison and maturation

AWRI, **Berry development — Ripening (Phase 3)** (2010), 3 pages:
https://www.awri.com.au/wp-content/uploads/5_phenology_berry_development_ripening_3.pdf

Fact anchors: veraison begins the third berry-development phase, with renewed expansion and sugar accumulation. Malic acid generally falls as ripening proceeds; aroma compounds and phenolics evolve. Sugar maturity alone is insufficient to describe full grape maturity. White grapes also undergo veraison; avoid defining it only as red colour appearing.

### Climate, canopy and photosynthesis

Wine Australia, **Canopy management**:
https://www.wineaustralia.com/growing-making/vineyard-management/canopy-management

Fact anchors: enough functional leaf area is needed for ripening, but excessive density can shade fruit and raise disease risk. Management balances leaf/fruit exposure and airflow using pruning, shoot positioning, thinning, leaf removal, irrigation and long-term trellis/rootstock decisions. Optimal exposure depends on variety and climate: “more sun” is not a universal prescription.

AWRI, **Site factors influencing berry ripening processes and rates of ripening** (2010):
https://www.awri.com.au/wp-content/uploads/7_phenology_site_factors.pdf

Fact anchors: site combines soil, water and atmosphere. Soil properties affect water/nutrient availability; shading can restrict sugar accumulation and fruit development. Moderate warmth can support ripening, while excessively high temperatures need not accelerate it. Variety choice should fit the site's seasonal conditions. Keep this a causal explanation rather than asserting soil type mechanically dictates a wine flavour.

## CMS public tasting resource

Official CMS Europe page, actually opened:
https://courtofmastersommeliers.org/other/deductive-tasting-grid/

The page links this official PDF:
https://courtofmastersommeliers.org/wp-content/uploads/Deductive-Tasting-Grid-Dec-2016.pdf

Label accurately: **CMS Europe — Deductive Tasting Grid (PDF labelled Dec 2016; linked by the official resource page as checked 2026-10-24)**. Do not relabel it as a newly released 2026 grid. Our practice UI/questions must say independently prepared SOMM100 training, not official exam questions or certification. Do not mix Europe and Americas exam formats/timings without specifying the jurisdiction and checking its current syllabus.

## Research limitations

- Huawei official guide URLs are resolvable but much page content is rendered client-side; the relevant ArkWeb/ArkTS capabilities above were corroborated by official indexed descriptions, not tested native builds.
- No real iPhone/HarmonyOS device tests, native signing, App Store/AppGallery review, mainland network checks, or Bilibili playback verification were performed by this research task.
- A direct open of the alternate CMS `/deductive-tasting-grid/` URL timed out; `/other/deductive-tasting-grid/` and its PDF both opened successfully.
