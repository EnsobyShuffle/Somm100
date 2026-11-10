export default [
  {
    title: '意大利｜两个地名，各自指向什么葡萄？',
    prompt: '把 Barolo 与 Brunello di Montalcino 放到意大利地图上。给每款酒分别写出所在大区和酿酒品种。如果再读到 Chianti Classico Riserva，你能从名称直接写出这瓶酒的实际配比吗？',
    answer: 'Barolo 在皮埃蒙特，用 Nebbiolo。Brunello di Montalcino 在托斯卡纳，用 Sangiovese。Chianti Classico Riserva 的产区规则给出 Sangiovese 的最低比例，实际配比需要查生产者的酒款资料。',
    reviews: [[3, '皮埃蒙特'], [5, '托斯卡纳']],
  },
  {
    title: '意大利与西班牙｜两款起泡酒的资料怎么对照？',
    prompt: '为 Prosecco DOC Spumante 和 Cava 各做一张卡。写下国家、可以先认识的葡萄品种，以及要从技术资料核对的发酵步骤。品种栏怎样写，才不会把常见品种写成某瓶酒的配方？',
    answer: 'Prosecco DOC Spumante 来自意大利，以 Glera 为主要品种，常见做法是在密闭耐压罐内二次发酵。Cava 来自西班牙，学习时可先认识 Macabeo、Xarel·lo 和 Parellada，二次发酵在瓶中进行。把品种写作学习线索，再用两瓶酒各自的技术表确认实际配比。',
    reviews: [[4, '威尼托与 Prosecco'], [8, '西班牙与 Cava']],
  },
  {
    title: '西班牙与葡萄牙｜两种写法能填上哪一栏？',
    prompt: '给两条酒款记录补表。第一条写 Rías Baixas、Albariño，第二条写 Vinho Verde、Alvarinho。先圈出可以合并的葡萄品种，再写两条必须分开核对的信息。',
    answer: 'Albariño 和 Alvarinho 是同一品种的两种写法。产地分别查西班牙的 Rías Baixas 和葡萄牙的 Vinho Verde。要比较风格，再分别查酒款资料或品鉴观察，例如酸度和成酒甜度。',
    reviews: [[8, '下海湾产区'], [9, '葡萄牙绿酒产区']],
  },
  {
    title: '葡萄牙与匈牙利｜看到地名以后，还要找什么？',
    prompt: '一张卡只写 Douro，另一张只写 Tokaji。给每张卡写一个下一步查证问题。再分别举两个在该产地可能遇到的成酒类型或风格。',
    answer: 'Douro 先问是静止葡萄酒还是波特酒，再找酒款的酿造资料。Tokaji 先找 Dry 或 Aszú 等风格提示，可对照干型 Furmint 与贵腐甜酒。两张卡的地名都可以先定位，成酒类型或风格要再查一条证据。',
    reviews: [[9, '杜罗'], [13, '托卡伊']],
  },
  {
    title: '西班牙｜同一品种，怎样比较两份熟成资料？',
    prompt: '两张模拟技术卡都写 2021。甲是 Rioja，品种栏写 Tempranillo，熟成栏写旧橡木桶。乙是 Ribera del Duero，品种栏写 Tinto Fino，熟成栏留空。把两张卡整理成产区、品种、年份、熟成四栏。要比较两瓶的橡木影响，还得查什么？',
    answer: '产区各自保留，Tinto Fino 与 Tempranillo 可归为同一品种，年份都是 2021。甲的熟成栏可记录旧桶，乙先标待查。向生产者查乙用的容器和两款各自的熟成时间，再以品鉴观察核对香气和质地。',
    reviews: [[6, '西班牙地图'], [7, '西班牙红酒对照']],
  },
  {
    title: '德国与奥地利｜先把酒标信息分栏',
    prompt: '甲的练习标签写 Mosel · Riesling · Spätlese，乙写 Wachau · Riesling，手边只有这两行字。分别记录产地、品种及能读出的附加信息。若要给两款都填上成酒的干甜，下一步各查什么？',
    answer: '两款都写 Riesling。Mosel 和 Wachau 分别放入产地栏。甲的 Spätlese 是与采收成熟条件相关的 Prädikat，乙这行未给出同类信息。干甜都先留待查。甲可继续找 trocken 等干甜提示，两款也可查对应酒款的技术资料和残糖。',
    reviews: [[11, '德国静止酒酒标'], [12, '奥地利 Wachau']],
  },
];
