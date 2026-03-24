// src/HomeView.jsx
import React, { useState, useEffect } from 'react';
// 引入所有可能用到的图标
import { ChevronLeft, ChevronRight, Pause, Play, Radio, Lock, FileText, Camera, Info, Shield, Megaphone, Car, HeartHandshake, Briefcase, AlertCircle } from 'lucide-react';
// ★ 核心：引入我们刚刚写好的 slides 和 homeData
import { slides, homeData } from './data'; 

// --- 图标映射字典 (用于将 data.js 里的字符串映射为真实的图标) ---
const IconMap = {
  Radio: <Radio size={28} />,
  Lock: <Lock size={28} />,
  Car: <Car size={28} />,
  FileText: <FileText size={28} />,
  Camera: <Camera size={28} />,
  Briefcase: <Briefcase size={28} />,
  HeartHandshake: <HeartHandshake size={28} />
};

// --- 辅助组件：TopicRow (已支持动态图片覆盖图标) ---
const TopicRow = ({ onClick, title, sub, desc, iconName, img }) => (
  <div onClick={onClick} className="flex bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group h-32 overflow-hidden">
    {/* ★ 如果 data.js 里填了 img，就显示图片，否则显示默认的蓝色图标背景 ★ */}
    {img ? (
      <div className="w-48 shrink-0 overflow-hidden">
        <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={title} />
      </div>
    ) : (
      <div className="w-32 shrink-0 bg-slate-50 flex items-center justify-center text-[#003366] border-r border-gray-100 group-hover:bg-blue-50 transition-colors">
        {IconMap[iconName] && React.cloneElement(IconMap[iconName], { className: "group-hover:scale-110 transition-transform" })}
      </div>
    )}
    <div className="p-6 flex-1 flex flex-col justify-center">
      <div className="flex items-end gap-3 mb-2">
        <h4 className="text-xl font-black text-[#003366] group-hover:text-pink-700 transition-colors">{title}</h4>
        <span className="text-[10px] font-bold text-slate-400 mb-1 tracking-widest">{sub}</span>
      </div>
      <p className="text-sm text-slate-600 font-serif leading-relaxed">{desc}</p>
    </div>
  </div>
);

// --- 辅助组件：NewsRow ---
const NewsRow = ({ date, label, title }) => (
  <div className="flex items-start gap-4 py-3 border-b border-gray-100 group cursor-pointer">
    <span className="text-xs font-mono text-slate-500 pt-0.5">{date}</span>
    <span className={`text-[10px] font-bold px-2 py-0.5 shrink-0 ${label === '重要' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>{label}</span>
    <p className="text-sm text-slate-700 group-hover:text-[#003366] transition-colors flex-1">{title}</p>
  </div>
);

// ==========================================
// 主视图组件: HomeView
// ==========================================
const HomeView = ({ setActiveTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % slides.length), 8000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#f5f7f8] min-h-screen pb-20 animate-in fade-in duration-1000">
      
      {/* 紧急通告栏 */}
      <div className="bg-rose-700 text-white text-sm font-bold py-2 px-6 flex justify-center items-center gap-3 shadow-md relative z-40">
        <AlertCircle size={16} className="animate-pulse" />
        <span>【緊急】現在、特別救済派遣の要請が集中しております。担当の警察官が、できるだけ早く予約受付を開始いたします。</span>
      </div>

      {/* ================= 1. 高级轮播模块 (完全读取 data.js) ================= */}
      <div className="relative bg-[#f7f9fb] pt-8 pb-14 overflow-hidden border-b border-gray-200 shadow-inner">
        <div className="flex transition-transform duration-[1200ms] ease-out" style={{ transform: `translateX(calc(12.5vw - ${currentIndex * 75}vw))` }}>
          {slides.map((slide, i) => (
            <div key={i} className={`w-[75vw] flex-shrink-0 px-4 transition-all duration-1000 ${i === currentIndex ? "opacity-100 scale-100" : "opacity-30 scale-95"}`}>
              <div className="bg-white flex h-[420px] shadow-2xl overflow-hidden border border-slate-200">
                <div className={`w-[48%] h-full relative overflow-hidden ${slide.displayMode === "contain" ? slide.bgColor || "bg-black" : "bg-slate-200"}`}>
                  <img src={slide.img} className={`w-full h-full ${slide.displayMode === "contain" ? "object-contain p-6" : "object-cover"} ${i === currentIndex ? "scale-110" : "scale-100"} transition-transform duration-[8s]`} alt="slide" />
                </div>
                <div className={`flex-1 flex flex-col ${slide.color} text-white`}>
                  <div className={`${slide.accent} h-20 flex items-center px-10 font-black text-2xl tracking-widest`}>{slide.title}</div>
                  <div className="flex-1 p-10 flex flex-col justify-between">
                    <p className="text-white/90 font-serif text-lg leading-relaxed">{slide.desc}</p>
                    <button onClick={() => setActiveTab(slide.link)} className="bg-white text-slate-900 hover:bg-[#f39800] hover:text-white px-12 py-3.5 rounded-full font-black w-fit flex items-center gap-2 group transition-colors shadow-lg">
                      詳細を見る <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 轮播控制器 (略) */}
        <button onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)} className="absolute left-[3vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-white text-[#003366] rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm"><ChevronLeft size={32} /></button>
        <button onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)} className="absolute right-[3vw] top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-white text-[#003366] rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm"><ChevronRight size={32} /></button>
        
        <div className="mt-8 flex items-center justify-center gap-10">
          <div className="flex gap-4 items-center">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentIndex(i)} className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${i === currentIndex ? "bg-[#003366] border-[#003366] scale-125" : "bg-gray-300 border-transparent hover:bg-gray-400"}`} />
            ))}
          </div>
          <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-5 py-1.5 bg-white border border-gray-300 shadow-sm text-[#003366] text-xs font-black hover:bg-[#f0f4f8] transition-colors">
            {isPlaying ? <><Pause size={14} fill="currentColor" /> 一時停止</> : <><Play size={14} fill="currentColor" /> 再生</>}
          </button>
        </div>
      </div>

      {/* ================= 2. 核心内容区 ================= */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 flex flex-col xl:flex-row gap-10">
        
        {/* 左侧：局长致辞 + 业务 Topics */}
        <div className="xl:w-[65%] space-y-12">
          
          {/* A. 局长致辞 (数据驱动) */}
          <section className="bg-white border-t-4 border-[#003366] shadow-md p-8 sm:p-10 relative overflow-hidden">
            {/* ★ 局长头像动态替换逻辑 ★ */}
            <div className="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-slate-200 rounded-full border-4 border-slate-100 shadow-inner overflow-hidden flex items-center justify-center grayscale opacity-80">
              {homeData.chiefMessage.portraitImg ? (
                <img src={homeData.chiefMessage.portraitImg} className="w-full h-full object-cover" alt="署長" />
              ) : (
                <div className="text-[10px] text-slate-400 font-bold text-center">{homeData.chiefMessage.name}<br/>(画像準備中)</div>
              )}
            </div>
            
            <h2 className="text-3xl font-black text-[#003366] mb-6 tracking-widest">署長挨拶</h2>
            <div className="pr-28 sm:pr-40 space-y-5 text-sm text-slate-700 leading-relaxed font-serif">
              <p className="text-lg sm:text-xl font-bold text-slate-800 mb-4">{homeData.chiefMessage.greetingTitle}</p>
              {homeData.chiefMessage.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              <p className="font-bold text-slate-800 mt-6 text-right">{homeData.chiefMessage.title}　{homeData.chiefMessage.name}</p>
            </div>
          </section>

          {/* B. Topics 列表 (数据驱动) */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-3xl font-black text-[#003366] tracking-widest uppercase italic">トピックス</h3>
              <div className="flex-1 h-1.5 bg-[#f39800] shadow-sm"></div>
            </div>
            <div className="space-y-4">
              {homeData.topics.map(topic => (
                <TopicRow 
                  key={topic.id}
                  onClick={() => topic.link !== 'none' ? setActiveTab(topic.link) : null}
                  title={topic.title} 
                  sub={topic.sub}
                  desc={topic.desc}
                  iconName={topic.iconName}
                  img={topic.img} // 传递图片链接
                />
              ))}
            </div>
          </section>
        </div>

        {/* 右侧：新着情报 + 狂热招募公告 */}
        <div className="xl:w-[35%] space-y-10">
          
          {/* C. 新着情报 (数据驱动) */}
          <div className="bg-white border-l-8 border-[#003366] p-8 shadow-md border-y border-r border-gray-200">
            <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
              <Info size={28} className="text-[#003366]" />
              <div>
                <h3 className="text-xl font-black text-[#003366]">新着情報 / Announcements</h3>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mt-1 font-bold">Latest Operational Updates</p>
              </div>
            </div>
            <div className="space-y-1">
              {homeData.news.map((item, idx) => (
                <NewsRow key={idx} date={item.date} label={item.label} title={item.title} />
              ))}
            </div>
          </div>

          {/* D. 女性警察官 采用情报 (数据驱动) */}
          <div className="bg-[#fffdf5] border-2 border-rose-800 shadow-xl relative overflow-hidden group">
            <Megaphone size={120} className="absolute -right-8 -bottom-8 text-rose-900 opacity-5 rotate-[-15deg] pointer-events-none" />
            
            <div className="bg-gradient-to-r from-rose-900 to-rose-700 text-white p-5 shadow-md">
              <h3 className="font-black text-xl tracking-widest">{homeData.recruitment.title}</h3>
              <p className="text-[10px] mt-1 font-bold tracking-widest text-rose-200">{homeData.recruitment.sub}</p>
            </div>
            
            <div className="p-6 space-y-5">
              <p className="text-sm font-bold text-rose-950 leading-relaxed border-b border-rose-200 pb-4 font-serif whitespace-pre-line">
                {homeData.recruitment.desc}
              </p>

              <div className="space-y-3">
                <p className="text-xs font-black text-rose-900 bg-rose-100 border border-rose-200 px-3 py-1 inline-block shadow-sm">■ 必須応募条件</p>
                <ul className="text-xs text-slate-800 space-y-2 list-disc list-inside font-bold ml-1">
                  {homeData.recruitment.basicConditions.map((cond, idx) => (
                    <li key={idx}>{cond}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 mt-6">
                <p className="text-xs font-black text-white bg-rose-800 px-3 py-1 inline-block shadow-sm animate-pulse">■ 例外条件（無審査・即時採用特枠）</p>
                <p className="text-[10px] text-rose-700 font-bold mb-2">※以下のいずれかに該当する方は、基礎審査を免除し【優先特任枠】として即時採用いたします。</p>
                
                <div className="h-56 overflow-y-auto custom-scrollbar space-y-3 pr-2 border-y border-rose-100 py-2 bg-white/50">
                  {homeData.recruitment.exceptions.map((ex, idx) => (
                    <div key={idx} className="bg-white border-l-4 border-rose-700 p-3 shadow-sm text-[11px] text-slate-700 leading-relaxed">
                      <span className="font-black text-rose-900 block mb-1 text-xs">{ex.title}</span>
                      {ex.desc}
                    </div>
                  ))}
                </div>
              </div>

              {/* 对接 Creator 工具的按钮 (已修复跳转) */}
            <button 
                onClick={() => setActiveTab('generator')} 
                className="w-full mt-4 py-4 bg-rose-800 text-white font-black text-sm hover:bg-rose-950 transition-colors shadow-lg flex justify-center items-center gap-2 group"
            >
                <FileText size={18} className="group-hover:scale-110 transition-transform" /> 履歴書提出
            </button>
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeView;
