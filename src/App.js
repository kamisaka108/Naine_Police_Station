import React, { useState, useEffect } from "react";
import { navItems, slides, cast, nfTags, nfHotLives, nfFixedFeeds, departments } from './data';
import {
  Shield,Users,Lock,Search,ChevronRight,ChevronLeft,ChevronDown,FileText,
  Camera,BookOpen,Info,Eye,Radio,Video,Award,Zap,Play,Pause,TrendingUp,Clock,
  PhoneCall,Heart,Star,List,Flame,Wifi,Layers,User,LogOut,Gift,Bell,Bookmark,Layout,MoreHorizontal,
  Home,Send,MessageCircle,Monitor,
  X,
  Car,        // 新增：用于交通课
  Briefcase   // 新增：用于刑事课
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
      return <OrganizationView />; 
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

const DispatchView = ({ setSelectedOfficer }) => {
  const [historyItemsVisible, setHistoryItemsVisible] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(-1);
  const slots = Array.from(
    { length: 10 },
    (_, i) => cast[i] || { isPlaceholder: true }
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const indexToUnlock = Math.floor(scrollY / 150);
      setHistoryItemsVisible((prev) =>
        prev.map((_, i) => i <= Math.min(indexToUnlock, 4))
      );
      setActiveHistoryIndex(indexToUnlock);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-6 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* 左侧边栏 */}
        <aside className="w-full lg:w-56 space-y-12 shrink-0 sticky top-28">
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-blue-100 pb-3">
              <Star className="text-amber-300 fill-amber-300" size={16} />
              <h3 className="text-lg font-black text-[#556b82] tracking-tighter italic uppercase">
                トピックス
              </h3>
            </div>
            <div className="bg-white p-3 border border-blue-50 space-y-4">
              <div className="aspect-[3/4] overflow-hidden relative group cursor-pointer shadow-inner bg-slate-100">
                <img
                  src={cast[0].img}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute top-2 left-2 bg-[#003366] text-white px-2 py-0.5 text-[7px] font-black italic tracking-widest uppercase">
                  Pick Up
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium px-1">
                点名率No.1キャスト。
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div
              className={`flex items-center gap-3 border-b-2 border-blue-100 pb-3 transition-all duration-700 ${
                historyItemsVisible[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Clock className="text-slate-300" size={18} />
              <h3 className="text-lg font-black text-[#556b82] tracking-tighter italic uppercase">
                履歴.
              </h3>
            </div>
            <div className="space-y-3">
              {cast.slice(0, 5).map((item, i) => (
                <div
                  key={i}
                  className={`flex gap-3 items-center p-2 hover:bg-white transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group ${
                    historyItemsVisible[i]
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-90"
                  }`}
                >
                  <div className="w-10 h-10 overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                    <img
                      src={item.img}
                      className="object-cover w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p
                      className={`text-[10px] font-black group-hover:text-[#003366] transition-colors truncate ${
                        activeHistoryIndex === i
                          ? "text-[#003366]"
                          : "text-slate-400"
                      }`}
                    >
                      {item.name}
                    </p>
                    <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">
                      チェック履歴
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* 右侧网格 */}
        <div className="flex-1 space-y-10">
          <header className="flex flex-col items-center text-center space-y-1">
            <h2 className="text-5xl font-black text-[#003366] tracking-[0.2em]">
              今日出勤
            </h2>
            <div className="flex flex-col items-center gap-1 py-3">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                本日出勤可能：
                <span className="text-rose-500 text-xl font-black">58名</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                明日 3月17日(火){" "}
                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>{" "}
                出勤予定：42名
              </div>
            </div>
            <div className="w-full max-w-[600px] h-[1px] bg-pink-100"></div>
          </header>

          <div className="space-y-4">
            <div className="flex justify-center w-full">
              <h3 className="text-2xl font-black text-[#003366] tracking-[0.3em] uppercase italic text-center">
                派遣可能な警察官
              </h3>
            </div>
            <div className="flex items-center gap-2 pl-2">
              <div className="w-2.5 h-2.5 bg-emerald-400 animate-ping"></div>
              <span className="text-[10px] font-black text-[#556b82] uppercase tracking-[0.2em]">
                リアルタイム稼働中
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {slots.map((off, i) =>
              off.isPlaceholder ? (
                <div
                  key={i}
                  className="w-[230px] h-[560.67px] bg-white/40 border border-dashed border-blue-100 flex flex-col items-center justify-center p-10 opacity-30"
                >
                  <Shield size={64} className="text-blue-100 mb-4" />
                  <p className="text-[10px] font-bold text-blue-100 uppercase tracking-[0.3em]">
                    未登録
                  </p>
                </div>
              ) : (
                <div
                  key={i}
                  onClick={() => setSelectedOfficer(off)}
                  className="group w-[230px] h-[560.67px] flex flex-col bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border border-blue-50 cursor-pointer overflow-hidden relative"
                >
                  <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-2 pointer-events-none text-white">
                    <div className="flex gap-1">
                      {off.badges.map((b, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-400 px-2 py-0.5 text-[8px] font-black uppercase"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <div className="bg-black/60 px-2 py-0.5 text-[8px] font-mono font-bold">
                      {off.shift}
                    </div>
                  </div>
                  <div className="h-[360px] relative overflow-hidden bg-slate-100">
                    <img
                      src={off.img}
                      className={`object-cover w-full h-full transition-all duration-[10s] group-hover:scale-110 ${
                        off.shift === "勤務終了"
                          ? "grayscale opacity-30"
                          : "opacity-95"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-2xl font-black drop-shadow-lg tracking-tighter">
                        {off.name}
                      </h4>
                      <p className="text-[10px] font-bold opacity-70 italic">
                        年齢: {off.age}歳
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1 h-3 bg-blue-500"></div>
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                            階級: {off.rank}
                          </span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 pl-2.5">
                          所属: {off.dept}
                        </p>
                      </div>
                      <div className="bg-[#fcfdff] p-2.5 border border-blue-50 text-slate-400">
                        <span className="text-[8px] font-black text-slate-300 uppercase block mb-1">
                          スリーサイズ
                        </span>
                        <p className="text-[11px] font-bold font-mono tracking-tight">
                          {off.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 ${
                            off.status === "待機中"
                              ? "bg-blue-400 animate-pulse"
                              : off.status === "出動中"
                              ? "bg-rose-400"
                              : "bg-slate-300"
                          }`}
                        ></div>
                        <span
                          className={`text-[10px] font-black ${
                            off.status === "待機中"
                              ? "text-blue-500"
                              : off.status === "出動中"
                              ? "text-rose-500"
                              : "text-slate-300"
                          }`}
                        >
                          {off.status}
                        </span>
                      </div>
                      <button className="w-10 h-10 bg-[#003366] hover:bg-[#002244] text-white flex items-center justify-center shadow-md active:scale-90">
                        <PhoneCall size={16} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
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
// 组织案内视图 (部门结构展示)
// ==========================================
const OrganizationView = () => {
  // 默认选中第一个部门
  const [activeDept, setActiveDept] = useState(departments[0]);

  // 用于将文本名称映射为真实图标的辅助对象
  const iconMap = {
    Car: <Car size={20} />,
    Shield: <Shield size={20} />,
    Search: <Search size={20} />,
    Briefcase: <Briefcase size={20} />,
    Monitor: <Monitor size={20} />,
    FileText: <FileText size={20} />
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50 text-slate-800">
      {/* 左侧部门导航栏 */}
      <div className="w-1/4 bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-6 bg-[#003366] text-white">
          <h2 className="text-xl font-bold tracking-widest">組織案内</h2>
          <p className="text-sm text-blue-200 mt-1">Naine Police Departments</p>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setActiveDept(dept)}
              className={`flex items-center p-3 rounded-lg transition-all ${
                activeDept.id === dept.id
                  ? 'bg-blue-50 text-[#003366] font-bold border-l-4 border-[#003366]'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="mr-3 text-slate-400">
                {iconMap[dept.icon] || <Shield size={20} />}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{dept.name}</div>
                <div className="text-xs text-slate-400">{dept.location}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* 右侧部门详细档案 */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* 头部标题区 */}
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
            {/* 左列：职责与特色 */}
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  <Bookmark size={16} className="mr-2" /> 主要職責
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {activeDept.role}
                </p>
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

            {/* 右列：人员与制服规定 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-blue-50 p-5 rounded-lg border border-blue-100">
                <span className="font-bold text-[#003366] flex items-center">
                  <Users size={18} className="mr-2" /> 人員配置
                </span>
                <span className="text-2xl font-black text-[#003366]">{activeDept.staff} 名</span>
              </div>
              
              <div>
                <h3 className="flex items-center text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                  <Layers size={16} className="mr-2" /> 服装規定 (制服要件)
                </h3>
                {/* 这里的 whitespace-pre-line 可以让你在 data.js 里敲的回车直接换行 */}
                <div className="bg-slate-800 text-slate-200 p-5 rounded-lg text-sm leading-relaxed border-l-4 border-[#f39800] shadow-inner whitespace-pre-line">
                  {activeDept.uniform}
                </div>
              </div>
            </div>
          </div>
        </div>
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
