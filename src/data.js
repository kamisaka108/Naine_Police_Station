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
