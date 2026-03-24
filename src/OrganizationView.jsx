// src/OrganizationView.jsx
import React, { useState, useMemo } from 'react';
import { Shield, Search, ChevronRight, ChevronLeft, FileText, Lock, Unlock, Zap, Bookmark, Star, Users, Layers, Monitor, Car, Briefcase, Activity, Crosshair, AlertTriangle, Video, PhoneCall } from 'lucide-react';
import { useAppContext } from './AppContext';

const OrganizationView = ({ setActiveTab }) => {
  const { departments } = useAppContext(); 
  
  const [activeDeptId, setActiveDeptId] = useState(departments[0]?.id);
  const activeDept = departments.find(d => d.id === activeDeptId) || departments[0];

  const [viewMode, setViewMode] = useState("dept");
  const [activeOfficer, setActiveOfficer] = useState(null);

  const [unlockedProfiles, setUnlockedProfiles] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [slideDirection, setSlideDirection] = useState("up");

  const iconMap = {
    Car: <Car size={20} />,
    Shield: <Shield size={20} />,
    Search: <Search size={20} />,
    Briefcase: <Briefcase size={20} />,
    Monitor: <Monitor size={20} />,
    FileText: <FileText size={20} />,
  };

  const handleDeptClick = (dept) => {
    setActiveDeptId(dept.id);
    setViewMode("dept");
  };

  const openOfficerDetail = (officer) => {
    setSlideDirection("up");
    setActiveOfficer(officer);
    setViewMode("detail");
  };

  const handleUnlockConfirm = () => {
    setUnlockedProfiles(new Set(unlockedProfiles).add(activeOfficer.id));
    setShowModal(false);
  };

  const handlePrevOfficer = () => {
    if (!activeDept.roster) return;
    setSlideDirection("left");
    const currentIndex = activeDept.roster.findIndex((o) => o.id === activeOfficer.id);
    const prevIndex = currentIndex === 0 ? activeDept.roster.length - 1 : currentIndex - 1;
    setActiveOfficer(activeDept.roster[prevIndex]);
  };

  const handleNextOfficer = () => {
    if (!activeDept.roster) return;
    setSlideDirection("right");
    const currentIndex = activeDept.roster.findIndex((o) => o.id === activeOfficer.id);
    const nextIndex = currentIndex === activeDept.roster.length - 1 ? 0 : currentIndex + 1;
    setActiveOfficer(activeDept.roster[nextIndex]);
  };

  // ★ 1. 专属暗黑风 Markdown 渲染器 ★
  const renderClassifiedLore = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-2"></div>;
      
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="mb-2 leading-relaxed">
          {parts.map((part, i) => 
            part.startsWith('**') && part.endsWith('**') 
              ? <strong key={i} className="text-pink-400 font-black bg-pink-950/40 px-1.5 py-0.5 border border-pink-900/50 rounded-sm shadow-[0_0_10px_rgba(244,114,182,0.2)]">{part.slice(2, -2)}</strong>
              : part
          )}
        </p>
      );
    });
  };

  // ★ 2. 生成随机硬核六维数据 (基于角色ID计算，确保每次点开不变) ★
  const officerStats = useMemo(() => {
    if (!activeOfficer) return {};
    const seed = activeOfficer.id.charCodeAt(0) + activeOfficer.name.length;
    return {
      combat: (seed % 40) + 60,       // 战斗力
      obedience: (seed % 30) + 70,    // 服从度
      lewdness: (seed % 20) + 80,     // 淫乱度
      endurance: (seed % 50) + 50,    // 耐久力
      nfPopularity: (seed % 10) + 90  // N.F人气
    };
  }, [activeOfficer]);

  // ================= 详情视图 (Detail View) =================
  if (viewMode === "detail" && activeOfficer) {
    const isUnlocked = unlockedProfiles.has(activeOfficer.id);
    const contentAnimateClass = slideDirection === "right" ? "anim-right" : slideDirection === "left" ? "anim-left" : "anim-up";

    return (
      <div className="h-[calc(100vh-64px)] bg-[#050505] flex relative overflow-hidden anim-bg">
        {/* 左右切换箭头 */}
        {activeDept.roster && activeDept.roster.length > 1 && (
          <>
            <button onClick={handlePrevOfficer} className="absolute left-6 top-1/2 -translate-y-1/2 z-[60] w-16 h-16 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-pink-600 hover:border-pink-500 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
              <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={handleNextOfficer} className="absolute right-6 top-1/2 -translate-y-1/2 z-[60] w-16 h-16 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-pink-600 hover:border-pink-500 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group">
              <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {/* 左侧照片区 */}
        <div key={`img-${activeOfficer.id}`} className={`w-1/2 h-full relative ${contentAnimateClass}`}>
          <img src={activeOfficer.img} className="w-full h-full object-cover opacity-80" alt={activeOfficer.name} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/50 to-[#050505]"></div>
          
          <button onClick={() => setViewMode("list")} className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white bg-black/40 px-4 py-2 rounded-full backdrop-blur-md transition-all border border-white/10 hover:bg-pink-900/50 z-10">
            <ChevronLeft size={18} /> 部署リストに戻る
          </button>

          <div className="absolute bottom-12 left-12 right-12 text-white drop-shadow-2xl">
            <h1 className="text-6xl font-black tracking-tighter mb-2">{activeOfficer.name}</h1>
            <p className="text-xl font-bold text-amber-500 uppercase tracking-widest flex items-center gap-3">
              {activeOfficer.rank} | {activeDept.name}
              <span className="text-[10px] bg-amber-500/20 border border-amber-500 px-2 py-0.5 text-amber-300 rounded">ID: {activeOfficer.id}</span>
            </p>
          </div>
        </div>

        {/* 右侧情报区 */}
        <div key={`text-${activeOfficer.id}`} className={`w-1/2 h-full overflow-y-auto p-12 text-zinc-300 relative z-20 ${contentAnimateClass} anim-delay-100 custom-scrollbar`}>
          <div className="max-w-xl mx-auto space-y-10 pb-20">
            
            {/* 基础情报 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                <FileText className="text-blue-500" size={20} />
                <h3 className="text-xl font-black text-white tracking-widest">公開プロファイル (Public Info)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm font-mono bg-zinc-900 p-4 border border-zinc-800 rounded">
                <p><span className="text-zinc-500 mr-2">AGE:</span> {activeOfficer.age}</p>
                <p><span className="text-zinc-500 mr-2">ROLE:</span> {activeOfficer.role}</p>
                <p className="col-span-2"><span className="text-zinc-500 mr-2">SIZE:</span> <span className="text-amber-400">{activeOfficer.size}</span></p>
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-line bg-zinc-900/50 p-5 rounded border-l-2 border-blue-500">
                {activeOfficer.basicInfo}
              </div>
            </div>

            {/* 深层情报 (加密区) */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div className="flex items-center gap-3">
                  {isUnlocked ? <Unlock className="text-pink-500" size={20} /> : <Lock className="text-rose-500" size={20} />}
                  <h3 className="text-xl font-black text-white tracking-widest">極秘レコード (Classified Lore)</h3>
                </div>
                {isUnlocked && <span className="text-[10px] bg-pink-900/30 text-pink-400 border border-pink-800 px-2 py-1 font-mono animate-pulse">ACCESS GRANTED</span>}
              </div>

              {!isUnlocked ? (
                <div onClick={() => setShowModal(true)} className="relative group cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                  <div className="p-8 filter blur-sm opacity-30 select-none text-sm leading-relaxed h-48">
                    [WARNING: CLASSIFIED DATA] This section contains highly sensitive behavioral logs, off-duty activities, and N.F platform performance metrics. Access restricted to Premium Subscribers only.
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 group-hover:bg-black/80 transition-all">
                    <Lock className="text-rose-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-rose-500 font-black tracking-widest text-sm border border-rose-500/50 px-6 py-2 bg-rose-950/50">タップしてロック解除 (点击解锁)</span>
                  </div>
                </div>
              ) : (
                <div className="anim-up space-y-8">
                  
                  {/* ★ 核心：硬核战力雷达条 ★ */}
                  <div className="bg-[#0a0508] border border-pink-900/30 p-5 rounded shadow-inner space-y-3">
                    <h4 className="text-[10px] font-black text-pink-500 tracking-widest mb-3 flex items-center gap-2"><Activity size={14}/> パラメータ解析 (Stat Analysis)</h4>
                    {[
                      { label: '実務・戦闘力', val: officerStats.combat, color: 'bg-blue-500' },
                      { label: '精神従順度', val: officerStats.obedience, color: 'bg-emerald-500' },
                      { label: '淫乱・発情度', val: officerStats.lewdness, color: 'bg-pink-600' },
                      { label: '肉体耐久力', val: officerStats.endurance, color: 'bg-amber-500' },
                      { label: 'N.F 潜在人気', val: officerStats.nfPopularity, color: 'bg-purple-500' },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-mono">
                        <span className="w-28 text-zinc-400">{stat.label}</span>
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className={`h-full ${stat.color} shadow-[0_0_8px_currentColor]`} style={{ width: `${stat.val}%` }}></div>
                        </div>
                        <span className="w-8 text-right font-bold text-white">{stat.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* ★ 核心：Markdown 渲染的极密档案 ★ */}
                  <div className="text-sm font-serif bg-[#1a0f14] p-6 rounded border border-pink-900/50 text-pink-50 shadow-[0_0_30px_rgba(190,24,93,0.1)]">
                    {renderClassifiedLore(activeOfficer.hiddenInfo)}
                  </div>

                  {/* 双图展示 */}
                  {(activeOfficer.hiddenImg1 || activeOfficer.hiddenImg2) && (
                    <div className="flex gap-4 w-full">
                      {activeOfficer.hiddenImg1 && (
                        <div className="flex-1 h-48 bg-[#0a0508] rounded border border-pink-900/30 overflow-hidden relative group cursor-pointer shadow-inner">
                          <img src={activeOfficer.hiddenImg1} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Classified" />
                        </div>
                      )}
                      {activeOfficer.hiddenImg2 && (
                        <div className="flex-1 h-48 bg-[#0a0508] rounded border border-pink-900/30 overflow-hidden relative group cursor-pointer shadow-inner">
                          <img src={activeOfficer.hiddenImg2} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Classified" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* ★ 核心：生态闭环一键跳转按钮 ★ */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                    <button onClick={() => setActiveTab("dispatch")} className="py-4 bg-zinc-900 border border-zinc-700 hover:border-amber-500 text-amber-500 font-black tracking-widest text-[11px] hover:bg-amber-500/10 transition-colors flex flex-col justify-center items-center gap-1">
                      <PhoneCall size={18} /> 緊急救済要請 (派遣)
                    </button>
                    <button onClick={() => setActiveTab("nf-platform")} className="py-4 bg-gradient-to-r from-pink-800 to-rose-700 text-white font-black tracking-widest text-[11px] hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(190,24,93,0.4)] flex flex-col justify-center items-center gap-1">
                      <Video size={18} /> N.F カメラへ接続
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 订阅弹窗 Modal */}
        {showModal && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm anim-bg">
            <div className="bg-zinc-950 border border-pink-900 p-8 max-w-md w-full shadow-[0_0_50px_rgba(225,29,72,0.2)] text-center anim-up">
              <div className="w-16 h-16 bg-pink-950/50 border border-pink-500 flex items-center justify-center mx-auto mb-6 rounded-full"><Zap className="text-pink-500" size={30} /></div>
              <h3 className="text-2xl font-black text-white mb-2">プレミアム購読の確認</h3>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                対象: <span className="text-pink-400 font-bold">{activeOfficer.name}</span><br />
                彼女の N.F チャンネルを購読し、極秘の奉仕記録とプライベート映像を解禁しますか？<br />
                <span className="text-xs text-zinc-600 mt-2 block">(購読料が引き落とされます)</span>
              </p>
              <div className="flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-zinc-900 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">否、検討する</button>
                <button onClick={handleUnlockConfirm} className="flex-1 py-3 bg-pink-600 text-white font-black hover:bg-pink-500 transition-colors shadow-lg shadow-pink-900/50">是、支払う</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= 部门专属运营看板 (Dashboard) 动态生成器 (擦边公文版) =================
  const renderDeptDashboard = () => {
    let stats = [];
    let log = "";
    let adText = "";

    switch (activeDept.id) {
      case 'traffic':
        stats = [
          { label: "交通事故現場での対応件数", value: "156件", color: "text-amber-600" },
          { label: "『交通違反教育』の指導", value: "320回", color: "text-rose-600" },
          { label: "違法駐車・現行犯摘発率", value: "98.5%", color: "text-blue-600" }
        ];
        log = "> 09:45 - 白鉀分隊が国道2号線で悪質な違反車両を捕捉。現在、車内の徹底的な点検および運転手への「マンツーマン指導」を実行中...";
        adText = "【警告】悪質な交通違反者には、当課警察官による「心身に深く刻み込まれる指導」が課されます。";
        break;
      case 'patrol':
        stats = [
          { label: "緊急支援の派遣完了数", value: "842件", color: "text-emerald-600" },
          { label: "市民の『満足度』", value: "80.8%", color: "text-blue-600" },
          { label: "深夜の特別巡回（グループ）", value: "45回", color: "text-rose-600" }
        ];
        log = "> 14:30 - 地域課 星見巡査が西町公園にて市民3名の「突発暴力衝突事件」を処理完了。現在、乱れた衣服と呼吸を整え、パトロールを再開。";
        adText = "【地域安全】深夜のグループパトロール中は、警媛に対する市民からの「積極的な声掛けと接触」を推奨しています。";
        break;
      case 'criminal':
      case 'investigation':
        stats = [
          { label: "特別尋問（情状酌量）自白率", value: "90%", color: "text-rose-600" },
          { label: "生体証拠提出件数", value: "45件", color: "text-purple-600" },
          { label: "夜の街・潜入捜査数", value: "28店舗確認済み", color: "text-amber-600" }
        ];
        log = "> 23:15 - 刑事課 風間警部が指定暴力団事務所に単独潜入。現在、組員5名から連続で「極めて濃厚な事情聴取」を受けており、重要証拠の吐露待ち...";
        adText = "【免責事項】当課の取調室では、容疑者の心身に「消えない痕跡」を残す徹底的な尋問が行われる場合があります。";
        break;
      case 'cyber': // 網絡安全課
        stats = [
          { label: "都市の防犯カメラ稼働率", value: "99.9%", color: "text-emerald-600" },
          { label: "不正アクセス（覗き見）検知", value: "1,204件", color: "text-amber-600" },
          { label: "秘匿回線接続数", value: "850", color: "text-pink-600" }
        ];
        log = "> 02:00 - 市内の各所に設置された防犯用監視カメラの映像には、異常は見られない。現在、暗号化プロトコルにてN.Fデータセンターへ転送中...";
        adText = "【情報管理】警察署内および市内の「あらゆる死角」に保安用カメラが設置されています。無断での違法な撮影を厳重に防止する。";
        break;
      case 'admin': // 内务行政
        stats = [
          { label: "手続処理件数", value: "1,208件", color: "text-amber-600" },
          { label: "特例警员・新規登録申請", value: "12件", color: "text-blue-600" },
          { label: "各サービスのオンライン利用率", value: "89%", color: "text-rose-600" }
        ];
        log = "> 10:00 - 地下拘留区向けの「特殊業務用具」および、各課向けの「特例制服」の今月分納入を完了。";
        adText = "【総務課より】当署の女性職員に対する「勤務変更申請書」は、特例受付窓口にて24時間承ります。";
        break;
        case 'safety': // 生活安全课
        stats = [
          { label: "深夜補導（密着保護）件数", value: "312件", color: "text-emerald-600" },
          { label: "違法風俗『実地検閲』回数", value: "85回", color: "text-rose-600" },
          { label: "青少年性衝動・未然吸収率", value: "100%", color: "text-blue-600" }
        ];
        log = "> 01:20 - 生活安全課の潜入捜査官が西町繁華街にて「神待少女（家出少女）」に擬態中。現在、対象者（中年男性）からの接触を検知し、ラブホテルでの『深夜特別補導』へ移行...";
        adText = "【市民協力】繁華街で当課の捜査官（便服）を見かけた際は、積極的な「保護（お持ち帰り）」にご協力ください。";
        break;

        case 'csi': // 鉴识课
        stats = [
          { label: "現場DNA資料採取量", value: "1,250ml", color: "text-purple-600" },
          { label: "生体証拠保存率", value: "100%", color: "text-rose-600" },
          { label: "押収アダルト物品の動作確認", value: "完了", color: "text-emerald-600" }
        ];
        log = "> 11:45 - 鑑識課員がラブホテル跡地で現場検証中。ルミノール反応により検出された大量の生体証拠を、特殊な『鑑定・回収の手法』を用いて直接回収中...";
        adText = "【証拠保全】当課は現場の微物・体液を極めて「直接的かつ生々しい手法」で収集・分析し、事件解決に貢献します。";
        break;

       case 'detention_mgmt': // 留置管理课
        stats = [
          { label: "収容者の記録の作成", value: "100%", color: "text-blue-600" },
          { label: "177号制服・損耗（破棄）数", value: "24着", color: "text-rose-600" },
          { label: "夜間特殊暴力事件への対応", value: "実施中", color: "text-amber-600" }
        ];
        log = "> 22:00 - 地下拘留区における本日の消灯時間を超過。これより、管理課員による各房への「夜間巡回」を開始します。";
        adText = "【人権配慮】当署は収容者の「あらゆる正当な要求」を人権として尊重し、管理課員がその身を呈して保護します。";
        break;

        case 'sat': // 警备机动队
        stats = [
          { label: "過去の暴徒『鎮圧』成功率", value: "100%", color: "text-rose-600" },
          { label: "高負荷・密着警護耐久時間", value: "48H", color: "text-amber-600" },
          { label: "暴動の発生件数", value: "0", color: "text-purple-600" }
        ];
        log = "> 18:30 - 第2機動隊が暴動現場に展開。非致死性兵器の効果が薄いため、最終プロトコル『直接鎮圧』へ移行します。";
        adText = "【治安維持】当隊は、いかなる凶悪犯や暴徒に対しても「絶対的火力」をもって物理的・生理的に鎮圧します。";
        break;
      default:
        stats = [
          { label: "本月業務達成率", value: "100%", color: "text-blue-600" },
          { label: "市民対応（ケア）件数", value: "1,024件", color: "text-emerald-600" },
          { label: "治安維持・貢献度", value: "極めて高", color: "text-rose-600" }
        ];
        log = "> 10:00 - 本日の通常業務を正常に進行中。全警媛、市民への『最大限の奉仕』を意識し活動せよ。";
        adText = "【NCPD 統制局】奈媛市警察は、市民の皆様の『あらゆる衝動と欲求』を真っ向から受け止めます。";
    }

    return (
      <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden anim-up">
        <div className="bg-slate-800 text-white p-4 flex items-center gap-2 border-b-4 border-[#003366]">
          <Activity size={18} className="text-amber-400" />
          <h3 className="font-black tracking-widest text-sm uppercase">部署別 運用ダッシュボード (Tactical Dashboard)</h3>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KPI 数据 */}
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-50 p-4 border border-slate-100 rounded flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400 mb-2 uppercase">{stat.label}</span>
              <span className={`text-2xl font-black ${stat.color} font-mono`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {/* 现场日志 */}
        <div className="px-6 pb-6">
          <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-emerald-400 font-mono text-xs leading-relaxed flex items-start gap-3 shadow-inner">
            <Crosshair size={14} className="mt-0.5 shrink-0" />
            <p className="typing-effect">{log}</p>
          </div>
        </div>

        {/* 广告横幅 (★ 取消了 onClick 跳转和 cursor-pointer，变成纯净的官方警告) */}
        <div className="bg-rose-50 border-t border-rose-100 p-3 flex items-center justify-center gap-2 text-rose-700">
          <AlertTriangle size={14} />
          <span className="text-xs font-black tracking-widest">{adText}</span>
        </div>
      </div>
    );
  };

  // ================= 常规视图 (List View) =================
  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 text-slate-800">
      {/* 左侧部门导航 */}
      <div className="w-1/4 bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-6 bg-[#003366] text-white">
          <h2 className="text-xl font-bold tracking-widest">組織案内</h2>
          <p className="text-sm text-blue-200 mt-1">Naine Police Departments</p>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleDeptClick(dept)}
              className={`flex items-center p-3 rounded-lg transition-all ${
                activeDept.id === dept.id
                  ? "bg-blue-50 text-[#003366] font-bold border-l-4 border-[#003366]"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <div className="mr-3 text-slate-400">{iconMap[dept.icon] || <Shield size={20} />}</div>
              <div className="text-left">
                <div className="text-sm font-bold">{dept.name}</div>
                <div className="text-xs text-slate-400">{dept.location}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* 右侧主内容 */}
      <div className="flex-1 p-8 overflow-y-auto anim-bg custom-scrollbar">
        {viewMode === "dept" ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 anim-up">
            <div className="border-b border-slate-100 pb-6 mb-6 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-1">{activeDept.name}</h1>
                <p className="text-slate-500">{activeDept.fullName}</p>
              </div>
              <div className="text-right bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <div className="text-xs text-slate-400 font-bold mb-1">配置場所</div>
                <div className="font-bold text-slate-700">{activeDept.location}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    <Bookmark size={16} className="mr-2" /> 主要職責
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-medium">{activeDept.role}</p>
                </div>
                <div>
                  <h3 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    <Star size={16} className="mr-2" /> 部門特色
                  </h3>
                  <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                    {activeDept.feature}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div onClick={() => setViewMode("list")} className="flex items-center justify-between bg-blue-50 p-5 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 hover:shadow-md transition-all group">
                  <span className="font-bold text-[#003366] flex items-center"><Users size={18} className="mr-2" /> 人員配置 (名簿へアクセス)</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#003366]">{activeDept.staff} 名</span>
                    <ChevronRight className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    <Layers size={16} className="mr-2" /> 服装規定 (制服要件)
                  </h3>
                  <div className="bg-slate-800 text-slate-200 p-5 rounded-lg text-sm leading-relaxed border-l-4 border-[#f39800] shadow-inner whitespace-pre-line">
                    {activeDept.uniform}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="anim-left">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-[#003366] flex items-center gap-3"><Users size={24} /> {activeDept.name} 直属名簿</h2>
                <p className="text-sm text-slate-500 mt-1">Personnel Roster & Classified Files</p>
              </div>
              <button onClick={() => setViewMode("dept")} className="text-sm font-bold text-slate-500 hover:text-[#003366] flex items-center gap-1 bg-white px-4 py-2 rounded shadow-sm border hover:shadow transition-all">
                <ChevronLeft size={16} /> 部門詳細に戻る
              </button>
            </div>

            {/* 人员列表网格 */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              {activeDept.roster && activeDept.roster.length > 0 ? (
                activeDept.roster.map((officer) => (
                  <div key={officer.id} onClick={() => openOfficerDetail(officer)} className="bg-white border-2 border-slate-100 hover:border-[#003366] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex group rounded-r-lg overflow-hidden relative">
                    <div className="w-24 h-32 bg-slate-200 shrink-0 overflow-hidden relative">
                      <img src={officer.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-center relative flex-1">
                      <span className="absolute top-1 right-2 text-4xl font-black italic text-slate-50 select-none -z-0">
                        {officer.id.substring(0, 4).toUpperCase()}
                      </span>
                      <div className="relative z-10">
                        <span className="text-[10px] font-black tracking-widest text-[#f39800] uppercase block mb-1">{officer.rank}</span>
                        <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-2">{officer.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold truncate">Click to view classified file</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-lg bg-white/50">
                  この部署には現在登録されている人員データがありません。<br />(CMSよりデータをインポートしてください)
                </div>
              )}
            </div>

            {/* ★ 核心：填补下方空白的课室专属运营看板 ★ */}
            {renderDeptDashboard()}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationView;
