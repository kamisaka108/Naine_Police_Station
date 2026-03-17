import React, { useState, useEffect } from "react";
import "./styles.css";
import { navItems, slides, cast, nfTags, nfHotLives, nfFixedFeeds, departments, dispatchData } from './data';
import {
  Shield,Users,Lock,Search,ChevronRight,ChevronLeft,ChevronDown,FileText,
  Camera,BookOpen,Info,Eye,Radio,Video,Award,Zap,Play,Pause,TrendingUp,Clock,
  PhoneCall,Heart,Star,List,Flame,Wifi,Layers,User,LogOut,Gift,Bell,Bookmark,Layout,MoreHorizontal,
  Home,Send,MessageCircle,Monitor,
  X,
  Car,        // 新增：用于交通课
  Briefcase, // 新增：用于刑事课
  Unlock,
  CheckCircle
} from "lucide-react";

// ==========================================
// 2. 根组件与路由调度 (Root & Router)
// ==========================================
const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  // 当进入 N.F 平台时，直接挂载专属全屏视图，隐藏主站头部底部
  if (activeTab === "nf-platform") {
    return <NFPlatformView onBackToPortal={() => setActiveTab("home")} />;
  }

// 渲染政务网主视图
const renderContent = () => {
  switch (activeTab) {
    case "home":
      return <HomeView setActiveTab={setActiveTab} />;
    case "dispatch":
      return <DispatchView setSelectedOfficer={setSelectedOfficer} />;
    case "depts":
      // ▼ 重点看这里：换成我们刚刚建好的“展柜” ▼
      return <OrganizationView setActiveTab={setActiveTab} />; 
    case "publications":
      return <PublicationsView />;
    case "detention":
      return <DetentionView />;
    default:
      return <HomeView setActiveTab={setActiveTab} />;
  }
};

  const isParentActive = (item) => {
    if (item.id === activeTab) return true;
    if (item.children)
      return item.children.some((child) => child.id === activeTab);
    return false;
  };

  return (
    <div className="min-h-screen font-sans bg-[#f4f7f9] text-[#333] transition-colors duration-500 text-left">
      {/* 门户头部 */}
      <header className="sticky top-0 z-[100] border-b-4 bg-white border-[#003366] shadow-sm">
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setActiveTab("home")}
            >
              <div className="relative w-14 h-14 flex items-center justify-center shadow-lg border bg-gradient-to-b from-[#ffd700] to-[#b8860b] border-[#8b6508]">
                <Shield
                  className="text-[#003366] w-8 h-8 drop-shadow-md"
                  fill="currentColor"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter leading-none text-[#003366]">
                  奈媛市中央警察署
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 text-[#666]">
                  Public Safety & Citizen Support
                </p>
              </div>
            </div>

            <nav className="hidden lg:flex items-stretch h-full">
              {navItems.map((item) => (
                <div key={item.id} className="relative group flex">
                  <button
                    onClick={() => !item.children && setActiveTab(item.id)}
                    className={`px-5 flex flex-col justify-center items-center transition-all border-b-4 relative ${
                      isParentActive(item)
                        ? "border-[#003366] bg-[#f0f4f8] text-[#003366]"
                        : "border-transparent hover:bg-gray-50 text-[#555]"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold leading-none">
                        {item.label}
                      </span>
                      {item.children && (
                        <ChevronDown
                          size={12}
                          className="mt-0.5 opacity-50 group-hover:rotate-180 transition-transform"
                        />
                      )}
                    </div>
                    <span className="text-[9px] mt-1 opacity-60 font-mono uppercase">
                      {item.sub}
                    </span>
                  </button>

                  {item.children && (
                    <div className="absolute top-full left-0 w-64 pt-0 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[110]">
                      <div className="shadow-2xl border-t-2 overflow-hidden bg-white border-[#003366]">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setActiveTab(child.id)}
                            className={`w-full text-left p-4 border-b last:border-0 transition-colors flex flex-col gap-1 ${
                              activeTab === child.id
                                ? "bg-[#f0f4f8] text-[#003366]"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-sm font-black">
                              {child.label}
                            </span>
                            <span className="text-[10px] opacity-60 leading-tight">
                              {child.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* 门户主内容区 */}
      <main
        className={
          activeTab === "home"
            ? "pt-0"
            : "max-w-[1600px] mx-auto px-10 py-8 min-h-[60vh]"
        }
      >
        {renderContent()}
      </main>

      {/* 全局警员详情弹窗 */}
      {selectedOfficer && (
        <OfficerProfile
          officer={selectedOfficer}
          onClose={() => setSelectedOfficer(null)}
        />
      )}

      {/* 门户底部 */}
      <footer className="bg-[#002244] text-white py-12 mt-20 transition-colors">
        <div className="max-w-[1600px] mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/10 pb-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-[#ffd700]" />
              <span className="font-bold text-lg">奈媛市中央警察署</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              〒880-00XX 奈媛市中央区官庁街1-1-1
              <br />
              代表電話：080-XXXX-XXXX（24小时受付）
            </p>
          </div>
          <div className="flex flex-col gap-2 text-xs text-white/80">
            <span className="font-bold mb-2 uppercase tracking-widest text-[10px]">
              Links
            </span>
            <a href="#" className="hover:text-amber-400">
              ▶ 奈媛市官网
            </a>
            <a href="#" className="hover:text-amber-400">
              ▶ 篠宮美研株式会社
            </a>
          </div>
          <div className="bg-white/5 p-4 rounded-xl text-[10px] text-white/40 space-y-2">
            <p>© NAINE CENTRAL POLICE DEPARTMENT</p>
            <p>※ 本站所有警员肖像权归奈媛警署所有，严禁盗图。</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// 3. 门户子页面 (Portal Views)
// ==========================================
const HomeView = ({ setActiveTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % slides.length),
      8000
    );
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* 轮播模块 */}
      <div className="relative bg-[#f7f9fb] pt-12 pb-14 overflow-hidden border-b border-gray-200">
        <div
          className="flex transition-transform duration-[1200ms] ease-out"
          style={{
            transform: `translateX(calc(12.5vw - ${currentIndex * 75}vw))`,
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`w-[75vw] flex-shrink-0 px-4 transition-all duration-1000 ${
                i === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-30 scale-95"
              }`}
            >
              <div className="bg-white flex h-[420px] shadow-2xl overflow-hidden">
                <div
                  className={`w-[48%] h-full relative overflow-hidden ${
                    slide.displayMode === "contain"
                      ? slide.bgColor || "bg-black"
                      : "bg-slate-200"
                  }`}
                >
                  <img
                    src={slide.img}
                    className={`w-full h-full ${
                      slide.displayMode === "contain"
                        ? "object-contain p-6"
                        : "object-cover"
                    } ${
                      i === currentIndex ? "scale-110" : "scale-100"
                    } transition-transform duration-[8s]`}
                  />
                </div>
                <div
                  className={`flex-1 flex flex-col ${slide.color} text-white`}
                >
                  <div
                    className={`${slide.accent} h-20 flex items-center px-10 font-black text-2xl`}
                  >
                    {slide.title}
                  </div>
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <p className="text-blue-50/80 font-light leading-relaxed">
                      {slide.desc}
                    </p>
                    <button
                      onClick={() => setActiveTab(slide.link)}
                      className="bg-[#f39800] text-white px-12 py-3.5 rounded-full font-black w-fit flex items-center gap-2 group"
                    >
                      詳細を見る{" "}
                      <ChevronRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 控制器 */}
        <button
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="absolute left-[3vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 hover:bg-white text-[#003366] rounded-full flex items-center justify-center shadow-xl"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          className="absolute right-[3vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/70 hover:bg-white text-[#003366] rounded-full flex items-center justify-center shadow-xl"
        >
          <ChevronRight size={32} />
        </button>
        <div className="mt-8 flex items-center justify-center gap-10">
          <div className="flex gap-4 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${
                  i === currentIndex
                    ? "bg-[#9d174d] border-[#9d174d] scale-125"
                    : "bg-gray-300 border-transparent hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-5 py-1.5 bg-white border border-gray-300 shadow-sm rounded-none text-[#003366] text-xs font-black hover:bg-[#f0f4f8] transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause size={14} fill="currentColor" /> 一時停止
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> 再生
              </>
            )}
          </button>
        </div>
      </div>

      <section className="max-w-[1500px] mx-auto px-4 pt-16 flex flex-col items-center">
        <h3 className="text-3xl font-black text-[#003366] tracking-widest uppercase italic">
          トピックス
        </h3>
        <div className="w-12 h-1.5 bg-[#f39800] mt-4 shadow-sm"></div>
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-4">
        <TopicRow
          onClick={() => setActiveTab("dispatch")}
          title="实时紧急救济派单"
          sub="APP/WEB 同步受理"
          desc="针对市民面临的各类身体或心理危机，即刻派遣最近的女性警官。"
          icon={<Radio size={24} />}
          img="https://i.postimg.cc/Wz03M6R7/79489071-p0.webp"
        />
        <TopicRow
          onClick={() => setActiveTab("detention")}
          title="留置管理与人格矫正"
          sub="CORRECTIONAL"
          desc="通过拘留区警媛的贴身奉仕，对特定罪犯进行身心重塑。"
          icon={<Lock size={24} />}
        />
        <TopicRow
          title="警媛月刊 线上订购"
          sub="Vol.48"
          desc="本月特辑：『透过制服缝隙窥视的法律秩序』。刊载决定性瞬间的高画质写真。"
          icon={<FileText size={24} />}
        />
        <TopicRow
          onClick={() => setActiveTab("nf-platform")}
          title="公共区域 监视入口"
          sub="N.F 平台限定"
          desc="市内主要车站、公厕设置的『奉仕观测专用摄像机』直播流。"
          icon={<Camera size={24} />}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-10 pb-16">
        <div className="bg-white border-l-8 border-[#003366] p-10 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-5">
            <Info size={32} className="text-[#003366]" />
            <div>
              <h3 className="text-2xl font-black text-[#003366]">
                新着情報 / Announcements
              </h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1 font-bold">
                Latest Operational Updates
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <NewsRow
              date="2025.03.15"
              label="公告"
              title="关于本月拘留区‘177制度’侍奉制服更新及母乳采集配额的通知"
            />
            <NewsRow
              date="2025.03.12"
              label="重要"
              title="警报：发现针对N.F平台官方直播流的非法盗录及二次售卖行为"
            />
            <NewsRow
              date="2025.03.11"
              label="公告"
              title="关于地域防范合作单位「篠宮美研」特供巡逻装备配发完毕的通知"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 紧急救济派单视图 (体制内情色·肉色禁忌版)
// ==========================================
const DispatchView = ({ setSelectedOfficer }) => {
  const [clickCount, setClickCount] = useState(0); 
  const [isSecretMode, setIsSecretMode] = useState(false); 
  const [showVerifyModal, setShowVerifyModal] = useState(false); 
  const [idInput, setIdInput] = useState(''); 
  const [verifyError, setVerifyError] = useState('');
  
  const [callingOfficer, setCallingOfficer] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false); 
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const [hasPendingDispatch, setHasPendingDispatch] = useState(false); 

  const [selectedService, setSelectedService] = useState(dispatchData.secret.services[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);

  const slots = Array.from({ length: 10 }, (_, i) => cast[i] || { isPlaceholder: true });

  const handleSecretTrigger = () => {
    if (isSecretMode) return;
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setShowVerifyModal(true);
      setClickCount(0);
    }
  };

  const handleVerify = () => {
    if (idInput.length === 12 && /^\d+$/.test(idInput)) {
      setShowVerifyModal(false);
      setIsSecretMode(true);
    } else {
      setVerifyError('認証失敗: マイナンバー(12桁の数字)を確認してください。');
    }
  };

  const handleDispatchSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCallingOfficer(null); 
      setShowSuccessModal(true); 
      setHasPendingDispatch(true); 
    }, 3500);
  };

  const closeForm = () => {
    setCallingOfficer(null);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    return selectedService.price + selectedAddons.reduce((sum, a) => sum + a.price, 0);
  };

// 女警们当前红绿灯状态展示
  const getStatusDisplay = (status, shift) => {
    if (shift === "勤務終了") return { color: 'bg-amber-400', text: isSecretMode ? '🟡 ザーメン処理・補給中' : '🟡 返回警局補給中', disable: true };
    if (status === '待機中') return { color: 'bg-emerald-500', text: isSecretMode ? '🟢 待機中 / 奉仕可能' : '🟢 待機中 / 可呼叫', disable: false };
    if (status === '出動中') return { color: 'bg-rose-500', text: isSecretMode ? '🔴 接客中 / 中出し奉仕中' : '🔴 正在執行救濟任務', disable: true };
    return { color: 'bg-slate-400', text: '⚪ 状態不明', disable: true };
  };

  // 生成完美支持半星的评分组件
  const renderStars = (rating, isSecret) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-3 h-3">
            {/* 背景底星 */}
            <Star size={12} className={isSecret ? "text-rose-200" : "text-slate-200"} />
            {/* 填充亮星 */}
            {(i < fullStars || (i === fullStars && hasHalf)) && (
              <div className={`absolute inset-0 overflow-hidden ${i === fullStars && hasHalf ? 'w-1/2' : 'w-full'}`}>
                <Star size={12} className={isSecret ? "text-rose-500 fill-rose-500" : "text-amber-400 fill-amber-400"} />
              </div>
            )}
          </div>
        ))}
        <span className={`text-[10px] font-mono ml-1 font-bold ${isSecret ? 'text-rose-700' : 'text-slate-500'}`}>
          {Number(rating).toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* 极致诱惑的背景：不再是全黑，而是带有一丝粉红/肉色的病态白 */}
      {isSecretMode && (
        <div className="fixed inset-0 bg-[#fff5f8] transition-colors duration-1000" style={{ zIndex: 0 }} />
      )}

      <div className={`relative z-10 py-6 animate-in fade-in duration-1000 min-h-screen transition-colors duration-700 ${isSecretMode ? 'text-rose-950' : 'text-[#333]'}`}>
        
        {/* 1. 身份验证弹窗 (公文风格的变态变异) */}
        {showVerifyModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#fff5f8]/90 backdrop-blur-sm">
            <div className="bg-white border-2 border-rose-800 p-8 w-full max-w-md shadow-[0_0_50px_rgba(225,29,72,0.15)] animate-in zoom-in-95 font-serif">
              <div className="flex items-center justify-center gap-3 mb-6 text-rose-800 border-b border-rose-200 pb-4">
                <Lock size={24} className="animate-pulse" />
                <h3 className="text-xl font-black tracking-widest">特例奉仕・アクセス認証</h3>
              </div>
              <p className="text-xs text-rose-900/70 mb-4 leading-relaxed text-center font-bold">
                【機密】これより先は特例性欲処理統制局の管轄となります。<br/>
                市民ID（マイナンバー12桁）を入力してください。
              </p>
              <input 
                type="text" 
                maxLength={12}
                placeholder="0000 0000 0000"
                value={idInput}
                onChange={(e) => {setIdInput(e.target.value); setVerifyError('');}}
                className="w-full bg-rose-50 border-2 border-rose-200 text-rose-900 font-black text-center text-xl tracking-[0.5em] py-4 mb-2 focus:outline-none focus:border-rose-500"
              />
              {verifyError && <p className="text-[10px] text-rose-600 mb-4 text-center font-bold">{verifyError}</p>}
              <div className="flex gap-4 mt-6">
                <button onClick={() => setShowVerifyModal(false)} className="flex-1 py-3 bg-white border border-rose-200 text-rose-400 font-bold hover:bg-rose-50">破棄</button>
                <button onClick={handleVerify} className="flex-1 py-3 bg-rose-800 text-white font-black hover:bg-rose-900 shadow-lg active:scale-95 transition-all">認証・接続</button>
              </div>
            </div>
          </div>
        )}

        {/* 2. 派单成功提示弹窗 (公文风格) */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className={`w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 border text-center ${isSecretMode ? 'bg-white border-2 border-rose-800' : 'bg-white border-blue-200'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${isSecretMode ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                <CheckCircle size={32} />
              </div>
              <h3 className={`text-2xl font-black mb-4 ${isSecretMode ? 'text-rose-900' : 'text-[#003366]'}`}>要請受理完了</h3>
              <p className={`text-sm leading-relaxed mb-8 font-bold ${isSecretMode ? 'text-rose-900/60' : 'text-slate-500'}`}>
                {isSecretMode 
                  ? "対象の雌犬（警察官）への派遣要請が確定しました。\n現在の奉仕業務が完了するまで、追加の要請はロックされます。\n準備をしてお待ちください。"
                  : "警局目前已收到您的派遣救济请求。\n在当前派遣业务完成前，暂时不可进行二次请求提交。\n请您耐心等待警员抵达。"}
              </p>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className={`w-full py-3 font-bold transition-colors active:scale-95 ${isSecretMode ? 'bg-rose-800 hover:bg-rose-900 text-white' : 'bg-[#003366] hover:bg-[#002244] text-white'}`}
              >
                確認 (閉じる)
              </button>
            </div>
          </div>
        )}

        {/* 3. 呼叫表单弹窗 */}
        {callingOfficer && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in p-4">
            <div className={`w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 ${isSecretMode ? 'bg-white border-2 border-rose-200 text-rose-950' : 'bg-white border border-blue-100 text-[#333]'}`}>
              <div className={`p-6 flex items-center gap-6 border-b ${isSecretMode ? 'bg-rose-50 border-rose-100' : 'bg-blue-50/50 border-blue-50'}`}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-current shrink-0">
                  <img src={callingOfficer.img} className="w-full h-full object-cover" alt={callingOfficer.name} />
                </div>
                <div>
                  <h3 className={`text-2xl font-black ${isSecretMode ? 'text-rose-800' : 'text-[#003366]'}`}>
                    {isSecretMode ? '指名対象: ' : '要請対象: '}{callingOfficer.name}
                  </h3>
                  <p className={`text-sm font-bold ${isSecretMode ? 'text-rose-400' : 'opacity-70'}`}>
                    {isSecretMode ? `${callingOfficer.age}歳 | ${callingOfficer.size}` : `${callingOfficer.rank} | ${callingOfficer.dept}`}
                  </p>
                </div>
                {!isProcessing && <button onClick={closeForm} className="ml-auto opacity-50 hover:opacity-100"><X size={24} /></button>}
              </div>

              <div className="p-8">
                {isProcessing ? (
                  <div className="py-12 flex flex-col items-center justify-center font-mono space-y-6">
                    <div className={`w-16 h-16 border-t-4 rounded-full animate-spin ${isSecretMode ? 'border-rose-600' : 'border-[#003366]'}`}></div>
                    <div className={`text-sm font-black tracking-widest ${isSecretMode ? 'text-rose-700' : 'text-[#003366]'}`}>
                      <p className="animate-pulse mb-2">{isSecretMode ? '> 特例奉仕プロトコルを確認中...' : '> 通報内容を精査中...'}</p>
                      <p className="animate-pulse delay-1000 mb-2" style={{animationDelay: '1s'}}>{isSecretMode ? '> 該当雌犬のスケジュールを強制確保中...' : '> 地域課へ出動指令を送信中...'}</p>
                      <p className="animate-pulse delay-2000" style={{animationDelay: '2s'}}>{isSecretMode ? '> パトカーのGPS偽装を完了...' : '> 完了までしばらくお待ちください。'}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {isSecretMode ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-rose-600 mb-2">
                          <Flame size={18} /> <h4 className="font-black tracking-widest uppercase">サービスコース選択</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {dispatchData.secret.services.map(svc => (
                            <div key={svc.id} onClick={() => setSelectedService(svc)} className={`p-4 border-2 cursor-pointer transition-all flex justify-between items-center ${selectedService.id === svc.id ? 'bg-rose-50 border-rose-400' : 'bg-white border-rose-100 hover:border-rose-300'}`}>
                              <div>
                                <div className="font-black text-rose-900">{svc.name} <span className="text-[10px] text-rose-400 ml-2">{svc.duration}</span></div>
                                <div className="text-[10px] text-rose-900/60 mt-1 font-bold">{svc.desc}</div>
                              </div>
                              <div className="font-mono font-black text-rose-600">¥{svc.price.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-rose-100">
                          <h4 className="font-black text-sm text-rose-800 mb-3">オプション (追加要求)</h4>
                          <div className="flex flex-wrap gap-2">
                            {dispatchData.secret.addons.map(addon => (
                              <button key={addon.id} onClick={() => toggleAddon(addon)} className={`px-3 py-1.5 text-xs font-bold border-2 transition-colors ${selectedAddons.find(a=>a.id === addon.id) ? 'bg-rose-800 text-white border-rose-800' : 'bg-white text-rose-600 border-rose-200 hover:border-rose-400'}`}>
                                {addon.name} (+¥{addon.price.toLocaleString()})
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="bg-rose-50/50 p-4 border border-rose-200">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-bold text-rose-800">予想請求額</span>
                            <span className="text-3xl font-black text-rose-600 font-mono">¥{calculateTotal().toLocaleString()}</span>
                          </div>
                          <p className="text-[9px] text-rose-900/50 leading-tight font-bold">{dispatchData.secret.warning}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                         <h4 className="font-black text-[#003366] text-lg border-b border-blue-50 pb-2">{dispatchData.surface.title}</h4>
                         <div className="space-y-4">
                           <div>
                             <label className="block text-xs font-bold text-slate-500 mb-1">要請者の氏名</label>
                             <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500" placeholder="例: 奈媛 太郎" />
                           </div>
                           <div>
                             <label className="block text-xs font-bold text-slate-500 mb-1">現在地 / 派遣先住所</label>
                             <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500" placeholder="GPSロケーションを許可、または住所を入力" />
                           </div>
                           <div>
                             <label className="block text-xs font-bold text-slate-500 mb-1">事案の種類</label>
                             <select className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500">
                               {dispatchData.surface.incidentTypes.map((type, idx) => <option key={idx}>{type}</option>)}
                             </select>
                           </div>
                           <p className="text-[10px] text-red-500 font-medium bg-red-50 p-2 border border-red-100">{dispatchData.surface.warning}</p>
                         </div>
                      </div>
                    )}
                    <div className="mt-8">
                      <button onClick={handleDispatchSubmit} className={`w-full py-4 font-black tracking-widest uppercase transition-transform active:scale-95 flex items-center justify-center gap-2 ${isSecretMode ? 'bg-rose-800 text-white shadow-lg hover:bg-rose-900' : 'bg-[#003366] text-white hover:bg-[#002244]'}`}>
                        <Send size={18} /> {isSecretMode ? '救済を確定し、雌犬を呼び出す' : '緊急出動を要請する'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto space-y-12 px-4">
          
          {/* =======================================
              雷达大盘风格头部 (血肉色白底雷达)
             ======================================= */}
          <header className={`relative p-10 border-b-4 overflow-hidden rounded-xl ${isSecretMode ? 'bg-white border-rose-800 shadow-[0_10px_30px_rgba(225,29,72,0.05)]' : 'bg-[#001833] border-[#003366] shadow-xl'}`}>
            
            {/* 雷达动态背景 */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <div className={`absolute inset-0 bg-[size:40px_40px] ${isSecretMode ? 'bg-[linear-gradient(rgba(225,29,72,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(225,29,72,0.05)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]'}`}></div>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border rounded-full ${isSecretMode ? 'border-rose-200' : 'border-emerald-500/20'}`}></div>
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border rounded-full ${isSecretMode ? 'border-rose-200' : 'border-emerald-500/20'}`}></div>
              <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 animate-spin [animation-duration:4s]">
                <div className={`w-1/2 h-1/2 rounded-tl-full border-l-2 ${isSecretMode ? 'bg-gradient-to-br from-rose-200 to-transparent border-rose-400' : 'bg-gradient-to-br from-emerald-500/40 to-transparent border-emerald-400'}`}></div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                {/* 触发暗门的星星 */}
                <div onClick={handleSecretTrigger} className={`cursor-crosshair w-20 h-20 flex items-center justify-center rounded-full border-4 backdrop-blur-md group ${isSecretMode ? 'bg-rose-50 border-rose-200 shadow-inner' : 'bg-white/10 border-white/20'}`}>
                  <Star className={`transition-all duration-300 ${isSecretMode ? 'text-rose-500 fill-rose-500 scale-125' : 'text-amber-400 fill-amber-400 group-hover:scale-110'}`} size={36} />
                </div>
                <div>
                  <h2 className={`text-4xl md:text-5xl font-black tracking-widest drop-shadow-sm ${isSecretMode ? 'text-rose-900' : 'text-white'}`}>
                    {isSecretMode ? '特例出動・緊急性欲処理管制' : '緊急出動管制センター'}
                  </h2>
                  <p className={`text-sm font-bold uppercase tracking-[0.4em] mt-2 ${isSecretMode ? 'text-rose-500' : 'text-emerald-400 drop-shadow-[0_0_5px_#10b981]'}`}>
                    {isSecretMode ? 'NCPD Delivery Health System' : 'Real-time Dispatch Control'}
                  </p>
                </div>
              </div>

              <div className={`flex gap-6 p-4 border backdrop-blur-sm rounded-lg ${isSecretMode ? 'border-rose-200 bg-white/80' : 'border-blue-400/30 bg-black/40'}`}>
                <div className="text-center px-4 border-r border-slate-200/20">
                  <p className={`text-[10px] font-bold uppercase ${isSecretMode ? 'text-rose-400' : 'text-slate-400'}`}>稼働中</p>
                  <p className={`text-3xl font-black ${isSecretMode ? 'text-rose-800' : 'text-white'}`}>58<span className={`text-xs ml-1 ${isSecretMode ? 'text-rose-400' : 'text-white/50'}`}>名</span></p>
                </div>
                <div className="text-center px-4">
                  <p className={`text-[10px] font-bold uppercase ${isSecretMode ? 'text-rose-400' : 'text-slate-400'}`}>要請ロック</p>
                  <p className={`text-3xl font-black ${hasPendingDispatch ? 'text-rose-500 animate-pulse' : (isSecretMode ? 'text-rose-800' : 'text-emerald-400')}`}>
                    {hasPendingDispatch ? 'LOCKED' : 'ACTIVE'}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* 警员卡片网格区 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {slots.map((off, i) => {
              if (off.isPlaceholder) {
                return (
                  <div key={i} className={`w-[230px] h-[560.67px] border flex flex-col items-center justify-center p-10 opacity-30 ${isSecretMode ? 'bg-rose-50 border-rose-200' : 'bg-white/40 border-dashed border-blue-100'}`}>
                    <Shield size={64} className={`${isSecretMode ? 'text-rose-300' : 'text-blue-100'} mb-4 opacity-50`} />
                    <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isSecretMode ? 'text-rose-300' : 'text-blue-100'}`}>未登録</p>
                  </div>
                );
              }

              const statusDisplay = getStatusDisplay(off.status, off.shift);
              // 自动识别当前的徽章
              const badges = isSecretMode ? (off.secretBadges || ['特例枠']) : (off.surfaceBadges || ['正規職員']);

              return (
                <div key={i} className={`group w-[230px] h-[560.67px] flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border overflow-hidden relative ${isSecretMode ? 'bg-white border-rose-200' : 'bg-white border-blue-50'}`}>
                  
                  {/* 徽章 */}
                  <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-2 pointer-events-none text-white">
                    <div className="flex gap-1 flex-wrap">
                      {badges.map((b, idx) => (
                        <span key={idx} className={`${isSecretMode ? 'bg-rose-800/90' : 'bg-[#003366]/90'} px-2 py-0.5 text-[8px] font-black uppercase backdrop-blur-sm`}>{b}</span>
                      ))}
                    </div>
                  </div>

                  {/* 照片区 (表世界：姓名+警衔；里世界：姓名+年龄) */}
                  <div className={`h-[360px] relative overflow-hidden ${isSecretMode ? 'bg-rose-50' : 'bg-slate-100'}`}>
                    <img src={off.img} className={`object-cover w-full h-full transition-all duration-700 group-hover:scale-105 ${statusDisplay.disable ? "grayscale opacity-40" : "opacity-95"}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-2xl font-black drop-shadow-lg tracking-tighter">{off.name}</h4>
                      <p className={`text-[10px] font-bold italic mt-1 ${isSecretMode ? 'text-rose-200' : 'text-blue-200'}`}>
                        {isSecretMode ? `年齢: ${off.age}歳` : `階級: ${off.rank}`}
                      </p>
                    </div>
                  </div>
                  
                  {/* 详细信息卡片区 */}
                  <div className="flex-1 p-4 flex flex-col justify-between space-y-4 bg-white/80 backdrop-blur-md">
                    {isSecretMode ? (
                      // --- 里世界展示信息 ---
                      <div className="space-y-3">
                        <div className="bg-rose-50/50 p-2 border border-rose-100">
                          <span className="text-[8px] font-black text-rose-400 uppercase block mb-0.5">スリーサイズ (肉体情報)</span>
                          <p className="text-[11px] font-bold font-mono tracking-tight text-rose-900">{off.size}</p>
                        </div>
                        <div className="bg-rose-50/50 p-2 border border-rose-100">
                          <span className="text-[8px] font-black text-rose-400 uppercase block mb-0.5">得意な奉仕 (特技)</span>
                          <p className="text-[11px] font-bold text-rose-900 line-clamp-1">{off.specialty || '本番行為、奉仕全般'}</p>
                        </div>
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9px] font-black text-rose-400">夜の奉仕評価</span>
                          {renderStars(off.rating || 4.5, true)}
                        </div>
                      </div>
                    ) : (
                      // --- 表世界展示信息 ---
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">所属部署</span>
                          <p className="text-[11px] font-bold text-[#003366]">{off.dept}</p>
                        </div>
                        <div className="bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">完了した救済任務</span>
                          <p className="text-[11px] font-bold font-mono text-[#003366]">{off.dispatches || Math.floor(Math.random()*500)} 件</p>
                        </div>
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9px] font-black text-slate-400">市民評価</span>
                          {renderStars(off.rating || 4.5, false)}
                        </div>
                      </div>
                    )}
                    
                    {/* 状态灯与呼叫按钮 */}
                    <div 
                      className={`flex items-center justify-between pt-3 border-t ${
                        isSecretMode ? 'border-rose-100' : 'border-slate-50'
                      }`}
                    >
                      <div className="flex flex-col justify-center gap-1">
                        {/* 上半部分：红绿灯状态 */}
                        <div className="flex items-center gap-2">
                          <div 
                            className={`w-2 h-2 rounded-full ${
                              statusDisplay.color
                              } ${!statusDisplay.disable ? 'animate-pulse' : ''}`}
                            ></div>
                            <span 
                              className={`text-[10px] font-black ${
                                isSecretMode ? 'text-rose-800' : 'text-slate-600'
                              }`}
                            >
                              {statusDisplay.text}
                            </span>
                          </div>
                          {/* 下半部分：新增的排班时间显示 */}
                          <span 
                            className={`text-[10px] font-mono font-bold pl-0 ${
                              isSecretMode ? 'text-rose-400' : 'text-slate-400'
                            }`}
                          >
                            {isSecretMode ? '奉仕シフト: ' : '勤務時間: '}{off.shift}
                          </span>
                        </div>
  
                            {/* 右侧的呼叫按钮保持完全不变 */}
                            <button 
                              onClick={() => openForm(off)}
                              disabled={statusDisplay.disable || hasPendingDispatch}
                              className={`w-10 h-10 flex items-center justify-center shadow-md transition-all 
                              ${statusDisplay.disable || hasPendingDispatch 
                                    ? (isSecretMode ? 'bg-rose-50 text-rose-200' : 'bg-slate-100 text-slate-300') + ' cursor-not-allowed'
                                      : isSecretMode 
                                      ? 'bg-rose-800 hover:bg-rose-900 text-white active:scale-90' 
                                      : 'bg-[#003366] hover:bg-[#002244] text-white active:scale-90'
                              }`}
                            >
                              {statusDisplay.disable || hasPendingDispatch ? <X size={16} /> : <PhoneCall size={16} fill="currentColor" />}
                              </button>
                        </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const PublicationsView = () => (
  <div className="space-y-12 py-10">
    <h2 className="text-4xl font-black text-[#003366]">刊行物・資料センター</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 border-2 border-blue-50 shadow-sm flex gap-6">
        <div className="w-16 h-16 bg-slate-50 flex items-center justify-center shrink-0">
          <BookOpen className="text-blue-600" />
        </div>
        <div className="space-y-2">
          <span className="text-[9px] font-black text-gray-300 uppercase">
            MAGAZINE
          </span>
          <h3 className="text-xl font-black text-[#003366]">
            警媛月刊 Officer Monthly
          </h3>
          <p className="text-sm text-gray-500 font-light">
            本月特辑：‘街道走光抓拍精华’与‘拘留室精液回收率排行榜’。
          </p>
        </div>
      </div>
    </div>
  </div>
);

const DetentionView = () => (
  <div className="max-w-3xl mx-auto py-10 animate-in fade-in duration-700">
    <div className="text-center space-y-2 mb-12">
      <h2 className="text-3xl font-black text-[#003366]">留置管理・更生支援</h2>
    </div>
    <div className="bg-white border-l-[10px] border-l-[#003366] border border-blue-50 p-10 shadow-sm">
      <h4 className="font-black text-[#003366] mb-6 flex items-center gap-3 border-b border-blue-50 pb-3">
        <FileText size={20} /> 留置エリア奉仕規定
      </h4>
      <ul className="space-y-5 list-none text-gray-500 font-medium">
        <li className="flex gap-4">
          <span className="text-[#003366] font-black shrink-0">第01条</span>
          <span>被留置者に対し、献身的な奉仕を提供すること。</span>
        </li>
      </ul>
    </div>
  </div>
);

// ==========================================
// 组织案内视图 (全局 CSS 动画版，绝对生效)
// ==========================================
const OrganizationView = ({ setActiveTab }) => {
  const [activeDept, setActiveDept] = useState(departments[0]);
  const [viewMode, setViewMode] = useState('dept'); 
  const [activeOfficer, setActiveOfficer] = useState(null);
  
  const [unlockedProfiles, setUnlockedProfiles] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [slideDirection, setSlideDirection] = useState('up');

  const iconMap = {
    Car: <Car size={20} />, Shield: <Shield size={20} />, Search: <Search size={20} />,
    Briefcase: <Briefcase size={20} />, Monitor: <Monitor size={20} />, FileText: <FileText size={20} />
  };

  const handleDeptClick = (dept) => {
    setActiveDept(dept);
    setViewMode('dept');
  };

  const openOfficerDetail = (officer) => {
    setSlideDirection('up'); 
    setActiveOfficer(officer);
    setViewMode('detail');
  };

  const handleUnlockConfirm = () => {
    setUnlockedProfiles(new Set(unlockedProfiles).add(activeOfficer.id));
    setShowModal(false);
  };

  const handlePrevOfficer = () => {
    if (!activeDept.roster) return;
    setSlideDirection('left');
    const currentIndex = activeDept.roster.findIndex(o => o.id === activeOfficer.id);
    const prevIndex = currentIndex === 0 ? activeDept.roster.length - 1 : currentIndex - 1;
    setActiveOfficer(activeDept.roster[prevIndex]);
  };

  const handleNextOfficer = () => {
    if (!activeDept.roster) return;
    setSlideDirection('right');
    const currentIndex = activeDept.roster.findIndex(o => o.id === activeOfficer.id);
    const nextIndex = currentIndex === activeDept.roster.length - 1 ? 0 : currentIndex + 1;
    setActiveOfficer(activeDept.roster[nextIndex]);
  };

  if (viewMode === 'detail' && activeOfficer) {
    const isUnlocked = unlockedProfiles.has(activeOfficer.id);
    
    // 根据滑动方向，自动赋予我们在 styles.css 里写好的类名
    const contentAnimateClass = slideDirection === 'right' ? 'anim-right' 
                              : slideDirection === 'left' ? 'anim-left' 
                              : 'anim-up';

    return (
      <div className="h-[calc(100vh-64px)] bg-[#050505] flex relative overflow-hidden anim-bg">
        
        {/* 左右切换箭头 */}
        {activeDept.roster && activeDept.roster.length > 1 && (
          <>
            <button 
              onClick={handlePrevOfficer}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-[60] w-16 h-16 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-pink-600 hover:border-pink-500 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
            >
              <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleNextOfficer}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-[60] w-16 h-16 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white/50 hover:text-white hover:bg-pink-600 hover:border-pink-500 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] group"
            >
              <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {/* 左侧照片 */}
        <div key={`img-${activeOfficer.id}`} className={`w-1/2 h-full relative ${contentAnimateClass}`}>
          <img src={activeOfficer.img} className="w-full h-full object-cover opacity-80" alt={activeOfficer.name} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#050505]/50 to-[#050505]"></div>
          
          <button 
            onClick={() => setViewMode('list')}
            className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white bg-black/40 px-4 py-2 rounded-full backdrop-blur-md transition-all border border-white/10 hover:bg-black/60 z-10"
          >
            <ChevronLeft size={18} /> リストに戻る (返回列表)
          </button>

          <div className="absolute bottom-12 left-12 right-12 text-white drop-shadow-2xl">
            <h1 className="text-6xl font-black tracking-tighter mb-2">{activeOfficer.name}</h1>
            <p className="text-xl font-bold text-amber-500 uppercase tracking-widest">{activeOfficer.rank} | {activeDept.name}</p>
          </div>
        </div>

        {/* 右侧情报区 */}
        <div key={`text-${activeOfficer.id}`} className={`w-1/2 h-full overflow-y-auto p-12 text-zinc-300 relative z-20 ${contentAnimateClass} anim-delay-100`}>
          <div className="max-w-xl mx-auto space-y-10 pb-20">
            {/* 基础情报 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                <FileText className="text-blue-500" size={20} />
                <h3 className="text-xl font-black text-white tracking-widest">公開プロファイル (公开信息)</h3>
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
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                {isUnlocked ? <Unlock className="text-pink-500" size={20} /> : <Lock className="text-rose-500" size={20} />}
                <h3 className="text-xl font-black text-white tracking-widest">極秘レコード (N.F 深层情报)</h3>
              </div>

              {!isUnlocked ? (
                <div 
                  onClick={() => setShowModal(true)}
                  className="relative group cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                >
                  <div className="p-8 filter blur-sm opacity-30 select-none text-sm leading-relaxed h-48">
                    [WARNING: CLASSIFIED DATA] This section contains highly sensitive behavioral logs, off-duty activities, and N.F platform performance metrics. Access restricted to Premium Subscribers only. 
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 group-hover:bg-black/80 transition-all">
                    <Lock className="text-rose-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
                    <span className="text-rose-500 font-black tracking-widest text-sm border border-rose-500/50 px-6 py-2 bg-rose-950/50">
                      タップしてロック解除 (点击解锁)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="anim-up space-y-6">
                  <div className="text-sm leading-relaxed whitespace-pre-line bg-[#1a0f14] p-6 rounded border border-pink-900/50 text-pink-100 shadow-[0_0_30px_rgba(190,24,93,0.1)]">
                    {activeOfficer.hiddenInfo}
                  </div>

                  {/* 私密双图展示 */}
                  {(activeOfficer.hiddenImg1 || activeOfficer.hiddenImg2) && (
                    <div className="flex gap-4 w-full">
                      {activeOfficer.hiddenImg1 && (
                        <div className="flex-1 h-48 bg-[#0a0508] rounded border border-pink-900/30 overflow-hidden relative group cursor-pointer shadow-inner">
                          <img src={activeOfficer.hiddenImg1} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Classified File 1" />
                          <div className="absolute inset-0 ring-1 ring-inset ring-pink-500/20 pointer-events-none"></div>
                        </div>
                      )}
                      {activeOfficer.hiddenImg2 && (
                        <div className="flex-1 h-48 bg-[#0a0508] rounded border border-pink-900/30 overflow-hidden relative group cursor-pointer shadow-inner">
                          <img src={activeOfficer.hiddenImg2} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="Classified File 2" />
                          <div className="absolute inset-0 ring-1 ring-inset ring-pink-500/20 pointer-events-none"></div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setActiveTab('nf-platform')}
                    className="w-full py-4 bg-gradient-to-r from-pink-700 to-rose-600 text-white font-black tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-lg shadow-pink-900/50 flex justify-center items-center gap-2"
                  >
                    <Monitor size={18} /> N.F クリエイターページへ (前往她的主页)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 订阅弹窗 Modal */}
        {showModal && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm anim-bg">
            <div className="bg-zinc-950 border border-pink-900 p-8 max-w-md w-full shadow-[0_0_50px_rgba(225,29,72,0.2)] text-center anim-up">
              <div className="w-16 h-16 bg-pink-950/50 border border-pink-500 flex items-center justify-center mx-auto mb-6 rounded-full">
                <Zap className="text-pink-500" size={30} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">プレミアム購読の確認</h3>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                対象: <span className="text-pink-400 font-bold">{activeOfficer.name}</span><br/>
                彼女の N.F チャンネルを購読し、極秘の奉仕記録とプライベート映像を解禁しますか？<br/>
                <span className="text-xs text-zinc-600 mt-2 block">(購読料が引き落とされます)</span>
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-zinc-900 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors"
                >
                  否、検討する
                </button>
                <button 
                  onClick={handleUnlockConfirm}
                  className="flex-1 py-3 bg-pink-600 text-white font-black hover:bg-pink-500 transition-colors shadow-lg shadow-pink-900/50"
                >
                  是、支払う
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 常规视图
  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 text-slate-800">
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
                  ? 'bg-blue-50 text-[#003366] font-bold border-l-4 border-[#003366]'
                  : 'text-slate-600 hover:bg-slate-100'
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

      <div className="flex-1 p-8 overflow-y-auto anim-bg">
        {viewMode === 'dept' ? (
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
                <div 
                  onClick={() => setViewMode('list')}
                  className="flex items-center justify-between bg-blue-50 p-5 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 hover:shadow-md transition-all group"
                >
                  <span className="font-bold text-[#003366] flex items-center">
                    <Users size={18} className="mr-2" /> 人員配置 (名单查看)
                  </span>
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
                <h2 className="text-2xl font-black text-[#003366] flex items-center gap-3">
                  <Users size={24} /> {activeDept.name} 直属名簿
                </h2>
                <p className="text-sm text-slate-500 mt-1">Personnel Roster & Classified Files</p>
              </div>
              <button 
                onClick={() => setViewMode('dept')}
                className="text-sm font-bold text-slate-500 hover:text-[#003366] flex items-center gap-1 bg-white px-4 py-2 rounded shadow-sm border"
              >
                <ChevronLeft size={16} /> 戻る (返回)
              </button>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
              {activeDept.roster && activeDept.roster.length > 0 ? (
                activeDept.roster.map((officer) => (
                  <div 
                    key={officer.id}
                    onClick={() => openOfficerDetail(officer)}
                    className="bg-white border-2 border-slate-100 hover:border-[#003366] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex group rounded-r-lg overflow-hidden relative"
                  >
                    <div className="w-24 h-32 bg-slate-200 shrink-0 overflow-hidden relative">
                      <img src={officer.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-4 flex flex-col justify-center relative flex-1">
                      <span className="absolute top-1 right-2 text-4xl font-black italic text-slate-50 select-none -z-0">
                        {officer.id.substring(0,4).toUpperCase()}
                      </span>
                      <div className="relative z-10">
                        <span className="text-[10px] font-black tracking-widest text-[#f39800] uppercase block mb-1">
                          {officer.rank}
                        </span>
                        <h4 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-2">
                          {officer.name}
                        </h4>
                        <p className="text-xs text-slate-500 font-bold truncate">
                          ID: NCPD-{Math.floor(Math.random() * 9000) + 1000}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-lg">
                  この部署には現在登録されている人員データがありません。<br/>
                  (该部门暂无录入警员数据)
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 4. N.F 平台专属视图 (Fullscreen Takeover)
// ==========================================
const NFPlatformView = ({ onBackToPortal }) => {
  const [nfTab, setNfTab] = useState("surveillance");
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreatorsUnlocked, setIsCreatorsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-white">
        <div className="w-20 h-20 border-t-4 border-pink-600 animate-spin mb-8 shadow-[0_0_40px_rgba(219,39,119,0.4)]"></div>
        <p className="text-pink-600 animate-pulse text-sm font-black tracking-[0.3em] uppercase">
          Security Connection Establishing...
        </p>
        <p className="text-zinc-800 text-[10px] mt-4 uppercase tracking-[0.5em]">
          Naine Fans • Private Terminal v4.13
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-700 text-left ${
        nfTab === "surveillance"
          ? "bg-[#050505] text-zinc-400"
          : "bg-[#fff9f9] text-[#5a4a4a]"
      }`}
    >
      <header
        className={`sticky top-0 z-[100] border-b transition-all duration-500 ${
          nfTab === "surveillance"
            ? "bg-black border-pink-900/40 shadow-[0_4px_40px_rgba(0,0,0,0.9)]"
            : "bg-white border-rose-100 shadow-sm"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-10 h-24 flex items-center justify-between relative">
          <div
            className="flex items-center gap-6 cursor-pointer group"
            onClick={() => {
              setNfTab("surveillance");
              setIsCreatorsUnlocked(false);
            }}
          >
            <div
              className={`w-14 h-14 flex items-center justify-center transition-all ${
                nfTab === "surveillance"
                  ? "bg-pink-700 text-white shadow-[0_0_20px_rgba(190,24,93,0.6)]"
                  : "bg-rose-400 text-white"
              }`}
            >
              <Zap size={30} fill="currentColor" />
            </div>
            <div>
              <h1
                className={`text-3xl font-black italic tracking-tighter transition-colors ${
                  nfTab === "surveillance" ? "text-white" : "text-rose-600"
                }`}
              >
                NAINE-FANS{" "}
                <span className="underline decoration-4 text-pink-600">
                  SERVICE
                </span>
              </h1>
              <p
                className={`text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold ${
                  nfTab === "surveillance" ? "text-white" : "text-rose-400"
                }`}
              >
                Secret Content Distribution Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 border border-zinc-800">
            <button
              onClick={() => setNfTab("surveillance")}
              className={`px-12 py-3 text-xs font-black transition-all ${
                nfTab === "surveillance"
                  ? "bg-pink-700 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              ライブ監視エリア
            </button>
            <button
              onClick={() => setNfTab("creators")}
              className={`px-12 py-3 text-xs font-black transition-all ${
                nfTab === "creators"
                  ? "bg-rose-400 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              クリエイター
            </button>
          </div>

          <div className="flex items-center gap-6">
            {/* 返回主系统的断开连接按钮 */}
            <button
              onClick={onBackToPortal}
              className="hidden lg:flex items-center gap-2 px-4 py-2 border border-pink-900 text-pink-500 hover:bg-pink-900/20 hover:text-pink-400 text-[10px] font-black tracking-widest uppercase transition-all"
            >
              <LogOut size={14} /> システム切断
            </button>

            <div className="text-right hidden md:block">
              <p
                className={`text-xl font-black ${
                  nfTab === "surveillance" ? "text-pink-500" : "text-rose-500"
                }`}
              >
                12,480.00 <span className="text-xs ml-1 font-bold">PT</span>
              </p>
              <p
                className={`text-[9px] opacity-40 uppercase font-black tracking-widest text-right ${
                  nfTab === "surveillance" ? "text-white" : "text-zinc-500"
                }`}
              >
                Available Points
              </p>
            </div>

            {nfTab !== "creators" && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-12 h-12 flex items-center justify-center border transition-all hover:scale-105 active:scale-95 border-zinc-800 text-zinc-500 bg-zinc-900 hover:border-pink-600 hover:text-pink-500"
                >
                  <Users size={24} />
                  <ChevronDown
                    size={12}
                    className="absolute -bottom-1 -right-1 text-pink-600"
                  />
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-4 w-64 shadow-2xl z-[110] border bg-zinc-950 border-zinc-800 text-zinc-300 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-4">
                      <div className="w-10 h-10 bg-pink-600/20 flex items-center justify-center text-pink-500 font-bold">
                        VIP
                      </div>
                      <div>
                        <p className="text-xs font-black text-white">
                          優良市民 ID: 88210
                        </p>
                        <p className="text-[9px] opacity-50 uppercase tracking-tighter">
                          Premium Member
                        </p>
                      </div>
                    </div>
                    <div className="p-2 space-y-1 text-white">
                      {[
                        "プロフィール",
                        "ポイントチャージ",
                        "マイサブスクリプション",
                        "視聴履歴",
                      ].map((label, idx) => (
                        <button
                          key={idx}
                          className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold hover:bg-pink-600/10 hover:text-pink-500 transition-all"
                        >
                          <ChevronRight size={12} className="opacity-40" />{" "}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-10 py-12">
        {nfTab === "surveillance" ? (
          <SurveillanceView />
        ) : isCreatorsUnlocked ? (
          <CreatorsPortal />
        ) : (
          <CreatorsGateway onUnlock={() => setIsCreatorsUnlocked(true)} />
        )}
      </main>

      <footer
        className={`mt-24 border-t py-16 transition-all ${
          nfTab === "surveillance"
            ? "bg-black border-pink-900/20"
            : "bg-rose-50/50 border-rose-100"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-10 flex flex-col items-center gap-6 text-center text-white">
          <Shield
            size={40}
            className={`opacity-20 ${
              nfTab === "surveillance" ? "text-pink-600" : "text-rose-400"
            }`}
          />
          <div className="space-y-2 text-center text-white">
            <p
              className={`text-[11px] font-bold tracking-[0.6em] uppercase ${
                nfTab === "surveillance" ? "text-zinc-700" : "text-rose-300"
              }`}
            >
              Naine Security Bureau • Internal Node 09
            </p>
            <p className="text-[9px] opacity-30 max-w-lg leading-relaxed font-medium">
              本プラットフォームは奈媛市警察署の公認の下で運営されています。無断転载は厳罰の対象となります。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SurveillanceView = () => (
  <div className="space-y-12">
    <header className="border-b border-zinc-900 pb-10">
      <div className="flex items-center gap-4 mb-6 text-white">
        <div className="px-5 py-1.5 bg-pink-700 text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(190,24,93,0.4)]">
          Connected
        </div>
        <span className="text-[12px] font-bold text-zinc-600 uppercase">
          ライブ監視・リアルタイム配信
        </span>
      </div>
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10">
        <div className="flex items-center gap-12 shrink-0 pr-12 border-r border-zinc-800/50 text-white">
          <h2 className="text-7xl font-black italic tracking-tighter uppercase relative">
            盜攝
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-950 pr-4">
              エリア
            </span>
          </h2>
          <div className="px-6 py-4 bg-pink-900/10 border border-pink-900/20">
            <Wifi size={44} className="text-pink-600 animate-pulse" />
          </div>
        </div>
        <div className="flex-1 max-w-2xl bg-gradient-to-r from-pink-900/40 to-black border border-pink-600/30 p-5 flex items-center justify-between gap-6 shadow-2xl relative overflow-hidden group cursor-pointer text-white">
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-12 h-12 bg-pink-600/20 flex items-center justify-center text-pink-500 border border-pink-600/30 shrink-0">
              <Gift size={24} />
            </div>
            <div>
              <div className="bg-pink-600 text-[8px] font-black px-2 py-0.5 w-fit mb-1 uppercase">
                New Campaign
              </div>
              <h4 className="text-base font-black leading-none">
                新規会員 30日間無制限無料体験中
              </h4>
              <p className="text-[9px] text-pink-200/50 mt-2 font-bold uppercase tracking-widest">
                Access All Restricted Content Free
              </p>
            </div>
          </div>
          <button className="relative z-10 px-6 py-2.5 bg-pink-600 text-white text-[10px] font-black shrink-0 shadow-lg active:scale-95">
            今すぐ申し込む
          </button>
          <Zap
            size={100}
            className="absolute -right-8 -bottom-8 text-pink-600/5 rotate-12 group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>
      <p className="text-base font-bold text-zinc-600 mt-8">
        奈媛警察署内および市内各所に秘匿设置されたカメラからの生中継映像
      </p>
    </header>

    <div className="bg-zinc-900/40 p-6 border border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
      <div className="flex flex-wrap items-center gap-3 flex-1">
        <span className="text-[11px] font-black text-pink-600 uppercase flex items-center gap-2 mr-4">
          <Layers size={16} /> カテゴリー:
        </span>
        {nfTags.map((tag) => (
          <button
            key={tag}
            className="px-4 py-1.5 bg-black border border-zinc-800 text-[11px] font-bold text-zinc-500 hover:text-pink-400 hover:border-pink-900 transition-all"
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 border-l border-zinc-800 pl-8 shrink-0">
        <button className="flex items-center gap-2 text-xs font-black text-white px-6 py-2.5 bg-pink-800 hover:bg-pink-700 transition-all">
          人気順
        </button>
        <button className="flex items-center gap-2 text-xs font-black text-zinc-500 px-6 py-2.5 hover:text-white transition-colors">
          新着順
        </button>
      </div>
    </div>

    <section className="space-y-8 text-white">
      <div className="flex items-center gap-4 text-pink-600 border-l-4 border-pink-700 pl-5">
        <Flame size={26} fill="currentColor" className="animate-bounce" />
        <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-white">
          注目度の高いライブ配信
        </h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {nfHotLives.map((live, i) => (
          <div
            key={i}
            className="group relative bg-zinc-950 aspect-[9/16] overflow-hidden border border-zinc-800 hover:border-pink-600 transition-all duration-700 cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            <img
              src={live.img}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all"
            />
            <div className="absolute top-4 left-4 z-20">
              <div className="bg-pink-600 text-white px-3 py-1 text-[10px] font-black animate-pulse border border-white/10">
                LIVE
              </div>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 text-[10px] font-bold text-white border border-white/5 backdrop-blur-md">
                <Eye size={12} className="text-pink-500" /> {live.viewers}
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-pink-950 via-[#050505] to-transparent pt-40">
              <p className="text-[10px] font-black text-pink-500 mb-2 uppercase">
                FEED: {live.type}
              </p>
              <h4 className="text-xl font-black leading-tight mb-4">
                {live.location}
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 shadow-[0_0_8px_#db2777]"></div>
                <span className="text-xs font-black text-zinc-300 uppercase tracking-widest">
                  {live.cast}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-8 pt-16 text-zinc-400">
      <div className="flex items-center gap-4 text-zinc-600 border-l-4 border-zinc-800 pl-5">
        <Monitor size={24} />
        <h3 className="text-xl font-black uppercase tracking-[0.4em]">
          警察署内固定カメラフィード
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {nfFixedFeeds.map((feed, i) => (
          <div
            key={i}
            className="group relative bg-[#0a0a0a] aspect-video overflow-hidden border border-zinc-900 hover:border-zinc-500 transition-all duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
              <Video
                size={48}
                className="text-zinc-800 group-hover:text-pink-900/20"
              />
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 px-2 py-1 text-[10px] font-bold text-white border border-white/5 backdrop-blur-md z-10">
              <Users size={10} className="text-pink-500" /> {feed.viewers}
            </div>
            <div className="absolute top-4 left-4 flex gap-2 items-center text-white z-10">
              <div className="w-1.5 h-1.5 bg-pink-600 animate-ping"></div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                CAM_{feed.id}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-3">
              <div className="flex justify-between items-end text-white">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-pink-700 uppercase tracking-widest">
                    STATION_SURVEILLANCE
                  </p>
                  <h4 className="text-base font-black text-zinc-300">
                    {feed.location}
                  </h4>
                </div>
                <p className="text-[9px] font-bold text-zinc-600 italic">
                  Target: {feed.target}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-2 border border-white/5">
                <div className="flex items-center gap-1.5 text-pink-500">
                  <Flame size={12} fill="currentColor" />
                  <span className="text-[10px] font-black">
                    {feed.heat}{" "}
                    <span className="text-[8px] opacity-60">HEAT</span>
                  </span>
                </div>
                <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-900 to-pink-500"
                    style={{
                      width: `${Math.min((feed.heat / 3000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const CreatorsGateway = ({ onUnlock }) => (
  <div className="max-w-4xl mx-auto py-32 text-center text-[#333]">
    <div className="w-24 h-24 bg-rose-50 flex items-center justify-center mx-auto mb-10 border border-rose-100 shadow-xl shadow-rose-100/50">
      <Lock size={48} className="text-rose-400 animate-pulse" />
    </div>
    <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 text-center">
      Creator <span className="text-rose-400">Section</span>
    </h2>
    <p className="text-lg text-[#8a7a7a] font-medium leading-relaxed max-w-xl mx-auto text-center">
      個人クリエイターチャンネルへのアクセスは现在制限されています。
      <br />
      承認リクエストを送信し、VIPアクセス権を取得してください。
    </p>
    <div className="mt-12 flex justify-center gap-4">
      <button
        onClick={onUnlock}
        className="px-10 py-4 bg-rose-400 text-white font-black text-sm hover:bg-rose-500 transition-all shadow-lg shadow-rose-200 active:scale-95"
      >
        承認リクエストを送信
      </button>
    </div>
  </div>
);

const CreatorsPortal = () => (
  <div className="flex gap-12 items-start text-[#333]">
    <aside className="w-72 shrink-0 space-y-8 sticky top-36">
      <div className="bg-white border border-rose-100 p-4 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-300 shrink-0">
          <User size={24} />
        </div>
        <div>
          <h3 className="font-black text-[#2d2424] text-xs leading-tight">
            優良市民 88210
          </h3>
          <p className="text-[9px] text-rose-300 font-bold uppercase tracking-widest mt-0.5">
            VIP Member
          </p>
        </div>
      </div>
      <nav className="bg-white border border-rose-100 p-1 shadow-sm space-y-0.5">
        {[
          { i: <Home size={18} />, l: "ホーム", a: true },
          { i: <Bell size={18} />, l: "通知", b: "12" },
          { i: <Heart size={18} />, l: "コレクション" },
          { i: <Bookmark size={18} />, l: "ブックマーク" },
          { i: <User size={18} />, l: "プロフィール" },
          { i: <List size={18} />, l: "購読詳細" },
          { i: <Layout size={18} />, l: "スタジオ" },
        ].map((btn, idx) => (
          <button
            key={idx}
            className={`w-full flex items-center justify-between p-4 transition-all group ${
              btn.a ? "bg-rose-50/50" : "hover:bg-rose-50/30"
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={
                  btn.a
                    ? "text-rose-500"
                    : "text-rose-200 group-hover:text-rose-300"
                }
              >
                {btn.i}
              </span>
              <span
                className={`text-sm tracking-tight font-black ${
                  btn.a
                    ? "text-rose-600"
                    : "text-[#2d2424] group-hover:text-rose-600"
                }`}
              >
                {btn.l}
              </span>
            </div>
            {btn.b && (
              <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                {btn.b}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>

    <section className="flex-1 space-y-10">
      <PostCard
        author="星見 春"
        id="haru_ncpd_019"
        time="2時間前"
        content="本日の地域課巡回完了です。更衣室ライブのアーカイブ、反響が大きくて驚いてます...💕"
        img="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000"
        likes="1,240"
        comments="84"
      />
      <PostCard
        author="佐藤 遥香"
        id="haruka_chief_024"
        time="5時間前"
        content="救済派遣の依頼が急増中。市民の皆様の期待に応えるのが、中央警の務めですから。"
        img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000"
        likes="2,810"
        comments="156"
      />
    </section>

    <aside className="w-80 shrink-0 space-y-10 sticky top-36">
      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-200 group-focus-within:text-rose-400 transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="クリエイターを検索..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-rose-100 focus:outline-none focus:border-rose-300 text-sm font-medium transition-all"
        />
      </div>
      <section className="space-y-8">
        <div className="flex items-center justify-between text-rose-400 border-b border-rose-100 pb-4">
          <h4 className="text-sm font-black uppercase tracking-widest">
            おすすめ
          </h4>
          <TrendingUp size={16} />
        </div>
        <div className="space-y-6">
          <RecommendBanner
            name="風間 凛子"
            id="@rinko_刑事"
            img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"
            bg="bg-rose-100/30"
          />
          <RecommendBanner
            name="月野 澪"
            id="@mio_鑑定室"
            img="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400"
            bg="bg-stone-100/50"
          />
        </div>
      </section>
    </aside>
  </div>
);

// ==========================================
// 5. 基础与共用子组件 (Shared Components)
// ==========================================
const TopicRow = ({ title, sub, desc, icon, img, onClick }) => (
  <div
    onClick={onClick}
    className="group flex bg-white border border-blue-50 hover:border-[#003366] shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer overflow-hidden text-[#333]"
  >
    <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 shrink-0 flex items-center justify-center border-r border-blue-50 relative group-hover:bg-blue-50 overflow-hidden">
      {img ? (
        <img
          src={img}
          className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-all duration-700"
        />
      ) : (
        <div className="text-blue-100">{icon}</div>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-900/5">
        <Play size={20} className="text-[#003366]" fill="currentColor" />
      </div>
    </div>
    <div className="flex-1 p-6 flex flex-col justify-center">
      <div className="flex items-baseline gap-3 mb-1">
        <h4 className="text-lg font-black text-[#003366] group-hover:text-[#002244]">
          {title}
        </h4>
        <span className="text-[10px] font-bold text-slate-300 uppercase">
          {sub}
        </span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
        {desc}
      </p>
    </div>
  </div>
);

const NewsRow = ({ date, label, title }) => (
  <div className="flex items-center gap-6 group cursor-pointer border-b border-gray-50 py-5 last:border-0 text-[#333]">
    <span className="text-xs font-mono text-slate-300 w-24 shrink-0">
      {date}
    </span>
    <span
      className={`text-[10px] px-3 py-1 rounded-full font-black shrink-0 ${
        label === "重要"
          ? "bg-rose-50 text-rose-500"
          : "bg-slate-50 text-slate-400"
      }`}
    >
      {label}
    </span>
    <span className="text-sm font-bold text-gray-700 group-hover:text-[#003366] truncate flex-1">
      {title}
    </span>
    <ChevronRight size={16} className="text-slate-100" />
  </div>
);

const OfficerProfile = ({ officer, onClose }) => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 animate-in fade-in duration-300 text-[#333]">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    ></div>
    <div className="relative w-full max-w-2xl bg-white border border-blue-50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <button
        className="absolute top-8 right-8 z-20 text-slate-200 hover:text-slate-500"
        onClick={onClose}
      >
        <X size={32} />
      </button>
      <div className="p-12 bg-[#f8fafc] border-b border-blue-50 flex gap-8 items-center">
        <div className="w-32 h-40 bg-slate-100 border-4 border-white shadow-sm relative overflow-hidden">
          <img src={officer.img} className="object-cover w-full h-full" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[#003366]">{officer.name}</h2>
          <p className="text-blue-300 text-sm font-bold tracking-widest uppercase">
            {officer.rank} | {officer.dept}
          </p>
        </div>
      </div>
      <div className="p-12 space-y-6 overflow-y-auto">
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          机密信息。
        </p>
      </div>
    </div>
  </div>
);

const PostCard = ({ author, id, time, content, img, likes, comments }) => (
  <div className="bg-white border border-rose-100 shadow-sm overflow-hidden text-[#333]">
    <div className="p-6 flex gap-4">
      <div className="w-12 h-12 bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-300 shrink-0">
        <User size={24} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-black text-[#2d2424] text-base leading-none">
              {author}
            </h4>
            <p className="text-[10px] text-rose-300 font-bold mt-1.5">
              @{id} • {time}
            </p>
          </div>
          <MoreHorizontal size={18} className="text-rose-100" />
        </div>
        <p className="mt-4 text-[14px] text-[#4a3a3a] leading-relaxed font-medium">
          {content}
        </p>
      </div>
    </div>
    <div className="aspect-[16/9] bg-stone-100 overflow-hidden">
      <img src={img} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 border-t border-rose-50 flex items-center gap-8">
      <button className="flex items-center gap-2 text-rose-300 hover:text-rose-500 transition-colors">
        <Heart size={18} />
        <span>{likes}</span>
      </button>
      <button className="flex items-center gap-2 text-rose-300 hover:text-rose-500 transition-colors">
        <MessageCircle size={18} />
        <span>{comments}</span>
      </button>
      <button className="flex items-center gap-2 text-rose-300 hover:text-rose-500 transition-colors">
        <Send size={18} />
      </button>
      <button className="ml-auto text-rose-200 hover:text-rose-400">
        <Bookmark size={20} />
      </button>
    </div>
  </div>
);

const RecommendBanner = ({ name, id, img, bg }) => (
  <div
    className={`group relative w-full h-24 border border-rose-100 overflow-hidden cursor-pointer flex items-center p-4 transition-all hover:border-rose-300 ${bg}`}
  >
    <div className="flex-1 z-10">
      <h5 className="font-black text-[#2d2424] text-sm leading-none">{name}</h5>
      <p className="text-[10px] text-rose-300 font-bold mt-1.5">{id}</p>
      <button className="mt-2 text-[9px] font-black text-rose-400 uppercase tracking-tighter hover:underline">
        View Profile
      </button>
    </div>
    <div className="w-16 h-16 border-2 border-white shadow-xl overflow-hidden shrink-0">
      <img src={img} className="w-full h-full object-cover" />
    </div>
  </div>
);

export default App;
