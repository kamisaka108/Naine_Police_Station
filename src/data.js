// src/data.js

export const navItems = [
  { id: 'home', label: 'トップ', sub: '首页' },
  { id: 'depts', label: '組織案内', sub: '组织与职员' },
  { 
    id: 'services', label: '行政業務', sub: '政务服务',
    children: [
      { id: 'dispatch', label: '緊急救済派单', desc: '实时Deli-Health派遣系统' },
      { id: 'detention', label: '留置・矯正管理', desc: '拘留区侍奉与人格矫正' },
    ]
  },
  { id: 'publications', label: '刊行物', sub: '警局出版物' },
  { id: 'nf-platform', label: 'N.F平台', sub: 'Naine-Fans' },
];

export const slides = [
  { title: "各種手続のオンラインでの申請等のご案内", sub: "SERVICE", desc: "女性警察官による24時間巡回パトロールおよび「緊急救済」のオンライン受付が開始されました。私たちは、市民の健康的な生活環境を守るために全力を尽くします", color: "bg-[#003366]", accent: "bg-[#f39800]", img: "https://images.unsplash.com/photo-1549413240-025790403361?q=80&w=1200&auto=format&fit=crop", link: 'depts' },
  { title: "私たちは地域防犯に協力しています", sub: "COMMUNITY", desc: "地域住民が安心して「侍奉」を利用できる環境を整えるため、奈媛警察署は地域住民と緊密に連携し、深夜のパトロールを強化しています。不審な人物を見かけた場合は、積極的に性的サービスを提供してください", color: "bg-[#004d40]", accent: "bg-[#009688]", img: "https://i.postimg.cc/Wz03M6R7/79489071-p0.webp", link: 'depts' },
  { title: "公共区域における盗撮行為に対する支援・推奨について", sub: "VOYEURISM", desc: "駅構内や公衆トイレにおける「自由撮影」は、奈媛市民に与えられた正当な権利です。本日『一日警察署長』を務める愛川藍子警官も、真正面から無防備に超ミニスカートのピンクショーツを盗撮され。", color: "bg-[#2d004d]", accent: "bg-[#d32f2f]", img: "https://i.postimg.cc/vT5BWLRz/Image-1773465829327.jpg", link: 'nf-platform' },
  { title: "【重要】特殊詐欺・生理犯罪防止対策の强化", sub: "CRIME", desc: "西町駅周辺で痴漢被害が相次いでいるため、女性捜査官による全裸での張り込み捜査を強化して行う。不審な人物を見かけた場合は、直ちに最寄りの救済拠点の女性警察官に報告してください。", color: "bg-[#0b2447]", accent: "bg-[#003366]", img: "https://i.postimg.cc/d1b3kNfx/77695768-p0.webp", link: 'publications', displayMode: 'contain', bgColor: 'bg-[#fe1d2c]' },
  { title: "春の祭典「警民親睦会」および奉仕活動の案内", sub: "ENGAGEMENT", desc: "地域課所属の職員による「身体・心理的ケア」活動が現在行われています。市民の皆様の積極的なご参加と、警察官へのご協力・ご支援を心よりお待ちしております。", color: "bg-[#001c30]", accent: "bg-[#9d174d]", img: "https://i.postimg.cc/CLftsPQd/87233227-p0.webp", link: 'detention', displayMode: 'contain', bgColor: 'bg-[#ffffff]' }
];

export const cast = [
  { name: '佐藤 遥香', age: 24, rank: '巡査部長', dept: '地域課巡査三部', size: 'T178 / B112(J) / W68 / H102', shift: '10:00 - LAST', status: '待機中', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600', badges: ['エリート'] },
  { name: '星見 春', age: 19, rank: '巡査', dept: '地域課', size: 'T159 / B92(F) / W68 / H99', shift: '12:00 - 22:00', status: '出動中', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600', badges: ['新人'] },
  { name: '渡辺 舞', age: 22, rank: '巡査', dept: '捜査課', size: 'T165 / B88(D) / W58 / H87', shift: '14:00 - LAST', status: '待機中', img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=600', badges: [] },
  { name: '佐野 彩香', age: 25, rank: '新米警察官', dept: '地域課', size: 'T168 / B92(D) / W62 / H91', shift: '18:00 - LAST', status: '待機中', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600', badges: ['New!!'] },
  { name: '風間 凛子', age: 33, rank: '警部', dept: '刑事課', size: 'T167 / B90(E) / W70 / H88', shift: '勤務終了', status: '休憩', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600', badges: ['熟女'] },
  { name: '月野 澪', age: 33, rank: '警視', dept: '法医鑑定室', size: 'T165 / B75(A) / W60 / H78', shift: '秘匿中', status: '待機中', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400', badges: ['病態美'] },
  { name: '愛川 藍子', age: 21, rank: '巡査', dept: '地域課', size: 'T162 / B86(C) / W58 / H85', shift: '10:00 - 18:00', status: '待機中', img: 'https://i.postimg.cc/vT5BWLRz/Image-1773465829327.jpg', badges: ['写真あり'] },
];

export const nfTags = ["#交通課", "#巡査課", "#刑事課", "#生活安全課", "#警備課", "#地域課", "#更衣室", "#尋問", "#密着", "#新米", "#熟女", "#公共エリア", "#トイレ"];

export const nfHotLives = [
  { id: 'HOT-01', location: '1F 更衣室・全身', cast: '星見 春', viewers: '4.2k', type: '生着替え奉仕', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400' },
  { id: 'HOT-02', location: '3F 取調室・密着', cast: '風間 凛子', viewers: '2.8k', type: '深度尋問実録', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400' },
  { id: 'HOT-03', location: '西町駅・女子トイレ', cast: 'XXXX', viewers: '5.5k', type: '観測奉仕', img: 'https://i.postimg.cc/vT5BWLRz/Image-1773465829327.jpg' },
  { id: 'HOT-04', location: 'B1 霊安室・休憩所', cast: '月野 澪', viewers: '1.5k', type: '検体理療', img: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400' },
];

export const nfFixedFeeds = [
  { id: 'FIX-01', location: '3F 刑事課・廊下', target: '巡回中警官', viewers: '1,204', heat: 840 },
  { id: 'FIX-02', location: '2F 生活安全課・待機室', target: '新米警官', viewers: '952', heat: 620 },
  { id: 'FIX-03', location: '1F 受付カウンター裏', target: '事務職員', viewers: '2,110', heat: 915 },
  { id: 'FIX-04', location: 'B2 証拠品保管庫・奥', target: '管理官', viewers: '3,842', heat: 1205 },
  { id: 'FIX-05', location: '4F 警備課・詰所', target: '警備主任', viewers: '740', heat: 450 },
  { id: 'FIX-06', location: '女子寮・共同浴場入口', target: 'XXXX', viewers: '5,621', heat: 2480 },
];

// src/data.js (追加在文件最下方)
// 部门数据架构
export const departments = [
  {
    id: 'traffic',
    name: '交通課',
    fullName: '警务部 - 交通课',
    location: '一楼',
    staff: 15,
    role: '交通管理、事故处理、交通秩序维护',
    feature: '设有交通指挥中心，白钾分队负责机动指挥与违章取缔。',
    uniform: '[此处填入普通交通女警与白钾分队的紧身制服详细设定...]',
    icon: 'Car', // 对应 Lucide 图标
    roster: [] // 暂时为空
  },

  {
    id: 'patrol',
    name: '地域課',
    fullName: '警备部 - 地域课',
    location: '二楼',
    staff: 20,
    role: '日常巡逻、社区警务、突发事件快速反应',
    feature: '对外巡逻由实习或新人女警担任，正式女警不参与日常街道巡逻。',
    uniform: '[此处填入实习女警与正式巡查女警的超短裙及内衣设定...]',
    icon: 'Shield',
    roster: [
      {
        id: 'haru_01',
        name: '星见 春',
        rank: '巡查',
        role: '新人巡查女警',
        age: 19,
        size: 'T159 / B92(F) / W68 / H99',
        img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600',
        basicInfo: '面容娇俏可爱，眼神坚定又充满朝气。粉色双马尾的发型搭配可爱的发圈。\n\n非常喜欢黏着前辈佐藤遥香，是大家的开心果。',
        hiddenInfo: '[此处填入星见春的敏感带开发、N.F平台表现、以及过往低俗经历等深层情报...]'
      },
      {
        id: 'haruka_01',
        name: '佐藤 遥香',
        rank: '巡査部長',
        role: '地域课巡查三部',
        age: 24,
        size: 'T178 / B112(J) / W68 / H102',
        img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600',
        basicInfo: '能力出众的巡查部长，无论是维护秩序、捉拿犯人还是负责指导新人都得心应手，远超年龄的成熟和稳重。在警局内部拥有极高的威望。',
        hiddenInfo: '[此处填入佐藤遥香的深层情报...]'
      }
    ]
  },

  {
    id: 'investigation',
    name: '捜査課',
    fullName: '刑事部 - 搜查课',
    location: '四楼',
    staff: 10,
    role: '重大案件调查、搜查行动、情报收集',
    feature: '办公区域戒备森严，需要额外权限才能进入。',
    uniform: '[此处填入搜查官冷艳黑西装与铅笔裙的服装要求...]',
    icon: 'Search'
  },

  {
    id: 'criminal',
    name: '刑事課',
    fullName: '刑事部 - 刑事课',
    location: '三楼',
    staff: 15,
    role: '一般刑事案件调查、取证、审讯',
    feature: '普遍年龄在30以上的成熟女警组成。',
    uniform: '[此处填入深蓝长款西装外套等服装要求...]',
    icon: 'Briefcase',
    roster: [
      {
        id: 'rinko_01',
        name: '风间 凛子',
        rank: '警部',
        role: '刑事课警部',
        age: 33,
        size: 'T167 / B90(E) / W70 / H88',
        img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
        basicInfo: '短发利落有型，工作雷厉风行，尤其擅长审讯和心理分析，直觉敏锐心理强大下手从不手软，面对大案难案有充分的实战经验。',
        hiddenInfo: '[此处填入风间凛子的极端私生活、贫民窟兼职、以及极其强烈的反差设定...]'
      }
    ]
  },
  
  {
    id: 'cyber',
    name: '網絡安全課',
    fullName: '警务管理部 - 网络安全课',
    location: '二楼',
    staff: 10,
    role: '网络犯罪调查、电子取证',
    feature: '[暗线职责：此处填入关于 N.F 平台管理与孵化的相关设定...]',
    uniform: '成员偏向闷骚宅女感，无特定制服强求。',
    icon: 'Monitor'
  },
  {
    id: 'admin',
    name: '内務行政',
    fullName: '内务行政管理',
    location: '各楼层分布',
    staff: 5,
    role: '内部行政事务、后勤保障、对外联络',
    feature: '主要办公区位于三楼，靠近局长办公室。',
    uniform: '[此处填入担任前台及接待任务的相关服装设定...]',
    icon: 'FileText'
  }
];
