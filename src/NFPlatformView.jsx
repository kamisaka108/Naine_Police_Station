// src/NFPlatformView.jsx
import React, { useState, useEffect } from 'react';
import { 
  Zap, ChevronDown, ChevronRight, Users, Shield, LogOut, 
  Video, Eye, ShieldAlert, Terminal, Activity, Lock, Radio, 
  Crosshair, AlertTriangle, Flame, Layers, Monitor, Search, 
  TrendingUp, Home, Bell, Heart, Bookmark, User, List, Layout, Wifi, Gift, MessageCircle 
} from 'lucide-react';
import { nfTags, nfHotLives, nfFixedFeeds } from './data';

// ==========================================
// 辅助组件：创作者动态帖子 & 推荐横幅
// ==========================================
const PostCard = ({ author, id, time, content, img, likes, comments }) => (
  <div className="bg-white border border-rose-100 shadow-sm p-6 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-400"><User size={20}/></div>
         <div><h4 className="font-black text-sm text-[#2d2424]">{author}</h4><p className="text-[10px] text-rose-300 font-bold">{id} • {time}</p></div>
      </div>
    </div>
    <p className="text-sm font-medium text-[#5a4a4a] leading-relaxed">{content}</p>
    <img src={img} className="w-full h-64 object-cover rounded-md border border-rose-50" alt="post" />
    <div className="flex gap-6 pt-2 text-rose-300 font-bold text-xs">
      <span className="flex items-center gap-1.5 hover:text-rose-500 cursor-pointer"><Heart size={16} /> {likes}</span>
      <span className="flex items-center gap-1.5 hover:text-rose-500 cursor-pointer"><MessageCircle size={16} /> {comments}</span>
    </div>
  </div>
);

const RecommendBanner = ({ name, id, img, bg }) => (
  <div className={`flex items-center gap-4 p-3 ${bg || 'bg-rose-50'} border border-rose-100/50 cursor-pointer hover:shadow-md transition-shadow`}>
     <img src={img} className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-sm" alt="creator" />
     <div><h5 className="font-black text-[#2d2424] text-sm">{name}</h5><p className="text-[10px] text-rose-400 font-bold">{id}</p></div>
  </div>
);


// ==========================================
// 1. ライブ監視エリア (Surveillance View) - 包含暗网特效滤镜
// ==========================================
const SurveillanceView = ({ setActiveStream, scanlineEffect }) => (
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
        奈媛警察署内および市内各所に秘匿設置されたカメラからの生中継映像
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
            onClick={() => setActiveStream(live)} // ★ 点击触发暗网直播
            className="group relative bg-zinc-950 aspect-[9/16] overflow-hidden border border-zinc-800 hover:border-pink-600 transition-all duration-700 cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          >
            {/* ★ 加入了监控滤镜 ★ */}
            <img
              src={live.img}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-all filter contrast-125 saturate-50 sepia-[.2]"
              alt=""
            />
            <div className={`absolute inset-0 z-10 ${scanlineEffect}`}></div>
            
            {/* ★ 悬浮解锁遮罩 ★ */}
            <div className="absolute inset-0 bg-black/60 z-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div className="border border-pink-500 text-pink-400 bg-pink-950/50 px-4 py-2 font-black tracking-widest text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(219,39,119,0.5)]">
                <Lock size={14} /> 接続して覗き見る
              </div>
            </div>

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
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-pink-950 via-[#050505] to-transparent pt-40 z-20">
              <p className="text-[10px] font-black text-pink-500 mb-2 uppercase">
                FEED: {live.type}
              </p>
              <h4 className="text-xl font-black leading-tight mb-4">{live.location}</h4>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 shadow-[0_0_8px_#db2777]"></div>
                <span className="text-xs font-black text-zinc-300 uppercase tracking-widest">{live.cast}</span>
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
            onClick={() => setActiveStream(feed)} // ★ 点击触发暗网直播
            className="group relative bg-[#0a0a0a] aspect-video overflow-hidden border border-zinc-900 hover:border-zinc-500 transition-all duration-500 cursor-pointer"
          >
            {/* ★ 加入了微弱扫描线 ★ */}
            <div className={`absolute inset-0 z-10 pointer-events-none ${scanlineEffect} opacity-50`}></div>

            {feed.img ? (
            <img 
                src={feed.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity filter contrast-125 saturate-50 sepia-[.2]" 
                alt="" 
            />
            ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                <Video size={48} className="text-zinc-800 group-hover:text-pink-900/20" />
            </div>
            )}
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
            <div className="absolute bottom-4 left-5 right-5 flex flex-col gap-3 z-20">
              <div className="flex justify-between items-end text-white">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-pink-700 uppercase tracking-widest">STATION_SURVEILLANCE</p>
                  <h4 className="text-base font-black text-zinc-300">{feed.location}</h4>
                </div>
                <p className="text-[9px] font-bold text-zinc-600 italic">Target: {feed.target}</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 p-2 border border-white/5">
                <div className="flex items-center gap-1.5 text-pink-500">
                  <Flame size={12} fill="currentColor" />
                  <span className="text-[10px] font-black">{feed.heat} <span className="text-[8px] opacity-60">HEAT</span></span>
                </div>
                <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-900 to-pink-500" style={{ width: `${Math.min((feed.heat / 3000) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ==========================================
// 2. Creators 门禁网关
// ==========================================
const CreatorsGateway = ({ onUnlock }) => (
  <div className="max-w-4xl mx-auto py-32 text-center text-[#333]">
    <div className="w-24 h-24 bg-rose-50 flex items-center justify-center mx-auto mb-10 border border-rose-100 shadow-xl shadow-rose-100/50">
      <Lock size={48} className="text-rose-400 animate-pulse" />
    </div>
    <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6 text-center">
      Creator <span className="text-rose-400">Section</span>
    </h2>
    <p className="text-lg text-[#8a7a7a] font-medium leading-relaxed max-w-xl mx-auto text-center">
      個人クリエイターチャンネルへのアクセスは現在制限されています。
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

// ==========================================
// 3. Creators 门户 (白玫瑰配色社交平台)
// ==========================================
const CreatorsPortal = () => (
  <div className="flex gap-12 items-start text-[#333]">
    <aside className="w-72 shrink-0 space-y-8 sticky top-36">
      <div className="bg-white border border-rose-100 p-4 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-rose-300 shrink-0">
          <User size={24} />
        </div>
        <div>
          <h3 className="font-black text-[#2d2424] text-xs leading-tight">優良市民 88210</h3>
          <p className="text-[9px] text-rose-300 font-bold uppercase tracking-widest mt-0.5">VIP Member</p>
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
          <button key={idx} className={`w-full flex items-center justify-between p-4 transition-all group ${btn.a ? "bg-rose-50/50" : "hover:bg-rose-50/30"}`}>
            <div className="flex items-center gap-4">
              <span className={btn.a ? "text-rose-500" : "text-rose-200 group-hover:text-rose-300"}>{btn.i}</span>
              <span className={`text-sm tracking-tight font-black ${btn.a ? "text-rose-600" : "text-[#2d2424] group-hover:text-rose-600"}`}>{btn.l}</span>
            </div>
            {btn.b && <span className="bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">{btn.b}</span>}
          </button>
        ))}
      </nav>
    </aside>

    <section className="flex-1 space-y-10">
      <PostCard
        author="星見 春" id="haru_ncpd_019" time="2時間前"
        content="本日の地域課巡回完了です。更衣室ライブのアーカイブ、反響が大きくて驚いてます...💕"
        img="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000"
        likes="1,240" comments="84"
      />
      <PostCard
        author="佐藤 遥香" id="haruka_chief_024" time="5時間前"
        content="救済派遣の依頼が急増中。市民の皆様の期待に応えるのが、中央警の務めですから。"
        img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000"
        likes="2,810" comments="156"
      />
    </section>

    <aside className="w-80 shrink-0 space-y-10 sticky top-36">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-200 group-focus-within:text-rose-400 transition-colors" size={18} />
        <input type="text" placeholder="クリエイターを検索..." className="w-full pl-12 pr-4 py-4 bg-white border border-rose-100 focus:outline-none focus:border-rose-300 text-sm font-medium transition-all" />
      </div>
      <section className="space-y-8">
        <div className="flex items-center justify-between text-rose-400 border-b border-rose-100 pb-4">
          <h4 className="text-sm font-black uppercase tracking-widest">おすすめ</h4>
          <TrendingUp size={16} />
        </div>
        <div className="space-y-6">
          <RecommendBanner name="風間 凛子" id="@rinko_刑事" img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" bg="bg-rose-100/30" />
          <RecommendBanner name="月野 澪" id="@mio_鑑定室" img="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400" bg="bg-stone-100/50" />
        </div>
      </section>
    </aside>
  </div>
);


// ==========================================
// 4. N.F 主视图 (NFPlatformView) - 最终整合版
// ==========================================
const NFPlatformView = ({ setActiveTab }) => {  // ← 这里改成了 setActiveTab
  const [nfTab, setNfTab] = useState("surveillance");
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreatorsUnlocked, setIsCreatorsUnlocked] = useState(false);

  // ★ 伪直播状态
  const [activeStream, setActiveStream] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chatMessages, setChatMessages] = useState([]);
  const [viewers, setViewers] = useState(0);

  // 模拟加载动画
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 模拟真实时钟
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 模拟暗网直播间的疯狂弹幕
  useEffect(() => {
    if (!activeStream) {
      setChatMessages([]);
      return;
    }
    setViewers(Math.floor(Math.random() * 5000) + 1200);

    const degenerateComments = [
      "今日の画角最高だな、パンツ丸見えだぞw",
      "もっと奥まで映せ！",
      "5000PT投げた！早く服脱がせろ！",
      "制服の下、絶対ノーパンだろこれ…",
      "巡査の顔エロすぎる…抜けるわ",
      "はよ本番いけ",
      "【システム】匿名ユーザーが 10,000 PT を寄付しました",
      "いい匂いしそう…",
      "これガチの盗撮？やばすぎw",
      "前のシフトの女警より締まり良さそう",
      "カメラもっと下に向けられないの？",
      "NCPD最高！税金払っててよかったわ！"
    ];

    let messageId = 0;
    const chatInterval = setInterval(() => {
      const randomComment = degenerateComments[Math.floor(Math.random() * degenerateComments.length)];
      const isSystem = randomComment.includes('【システム】');
      
      setChatMessages(prev => [
        { 
          id: messageId++, 
          user: isSystem ? 'SYSTEM' : `ID:${Math.random().toString(36).substring(2, 8).toUpperCase()}`, 
          text: randomComment,
          isSystem: isSystem
        }, 
        ...prev
      ].slice(0, 50));
      setViewers(prev => prev + Math.floor(Math.random() * 11) - 3);
    }, Math.random() * 2500 + 1500);

    return () => clearInterval(chatInterval);
  }, [activeStream]);

  const scanlineEffect = "bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none";
  const vignetteEffect = "shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center font-mono text-white">
        <div className="w-20 h-20 border-t-4 border-pink-600 animate-spin mb-8 shadow-[0_0_40px_rgba(219,39,119,0.4)]"></div>
        <p className="text-pink-600 animate-pulse text-sm font-black tracking-[0.3em] uppercase">Security Connection Establishing...</p>
        <p className="text-zinc-800 text-[10px] mt-4 uppercase tracking-[0.5em]">Naine Fans • Private Terminal v4.13</p>
      </div>
    );
  }

  // ★ 核心高能：如果点击了摄像头，立即接管全屏变为暗网直播间 ★
  if (activeStream) {
    return (
      <div className="fixed inset-0 z-[200] bg-black text-green-500 font-mono flex flex-col sm:flex-row overflow-hidden">
        {/* 左侧：监控主画面 */}
        <div className="flex-1 relative flex flex-col">
          <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none drop-shadow-md">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-black text-xl animate-pulse">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div> REC
              </div>
              <div className="text-white text-sm mt-1 bg-black/50 px-2 rounded backdrop-blur-sm border border-white/20">
                CAM_ID: {activeStream.id || "SYS-001"} | {activeStream.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-lg font-black bg-black/50 px-2 rounded backdrop-blur-sm border border-white/20">
                {currentTime.toLocaleDateString('sv-SE')} {currentTime.toLocaleTimeString('en-GB')}
              </div>
              <div className="text-yellow-400 text-sm mt-1 font-bold flex items-center justify-end gap-1 bg-black/50 px-2 rounded backdrop-blur-sm">
                <Eye size={14} /> {viewers.toLocaleString()} VIEWERS
              </div>
            </div>
          </div>

          <div className="flex-1 relative bg-zinc-900 overflow-hidden">
            {activeStream.img ? (
              <img src={activeStream.img} className="w-full h-full object-cover opacity-80 filter contrast-125 saturate-50 sepia-[.3]" alt="Live Feed" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-green-900 opacity-50">
                <Radio size={80} className="mb-4 animate-ping" />
                <p>CONNECTING TO HIDDEN CAMERA...</p>
              </div>
            )}
            <div className={`absolute inset-0 z-10 ${scanlineEffect}`}></div>
            <div className={`absolute inset-0 z-10 ${vignetteEffect}`}></div>
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 pointer-events-none z-10">
              <Crosshair size={120} strokeWidth={1} />
            </div>
          </div>

          <div className="h-16 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between px-6 z-20">
            <button onClick={() => setActiveStream(null)} className="text-red-500 hover:text-red-400 hover:bg-red-950/30 px-4 py-2 border border-red-900/50 flex items-center gap-2 transition-colors text-xs font-black tracking-widest">
              <Terminal size={14} /> 接続切断 (DISCONNECT)
            </button>
            <div className="flex gap-4">
              <button className="text-zinc-500 hover:text-white transition-colors text-xs font-bold border border-zinc-800 px-4 py-1">映像解析</button>
              <button className="text-zinc-500 hover:text-white transition-colors text-xs font-bold border border-zinc-800 px-4 py-1">生体データ同期</button>
            </div>
          </div>
        </div>

        {/* 右侧：暗网弹幕聊天室 */}
        <div className="w-full sm:w-80 bg-black border-l border-zinc-900 flex flex-col z-20">
          <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950">
            <h3 className="text-white font-black text-sm flex items-center gap-2"><Lock size={14} className="text-red-500"/> ENCRYPTED CHAT</h3>
            <span className="text-xs text-zinc-500">N.F PLATFORM</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-3 custom-scrollbar">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`text-xs leading-relaxed animate-in fade-in slide-in-from-bottom-2 ${msg.isSystem ? 'text-yellow-500 font-bold border-l-2 border-yellow-500 pl-2 bg-yellow-950/20 py-1' : 'text-zinc-300'}`}>
                <span className={`font-bold mr-2 ${msg.isSystem ? 'text-yellow-500' : 'text-zinc-500'}`}>{msg.user}:</span>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-zinc-900 bg-zinc-950 space-y-3">
            <input type="text" disabled placeholder="VIP会員のみ発言可能..." className="w-full bg-zinc-900 border border-zinc-800 text-xs p-2 text-zinc-500 cursor-not-allowed" />
            <button className="w-full bg-red-900/20 border border-red-900/50 text-red-500 hover:bg-red-900/40 text-xs font-black py-2 transition-colors flex items-center justify-center gap-2">
              <AlertTriangle size={14} /> 5,000 PT 寄付して指令を出す
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= ★ 恢复原本的 UI 壳子 ★ =================
  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 text-left ${nfTab === "surveillance" ? "bg-[#050505] text-zinc-400" : "bg-[#fff9f9] text-[#5a4a4a]"}`}>
      <header className={`sticky top-0 z-[100] border-b transition-all duration-500 ${nfTab === "surveillance" ? "bg-black border-pink-900/40 shadow-[0_4px_40px_rgba(0,0,0,0.9)]" : "bg-white border-rose-100 shadow-sm"}`}>
        <div className="max-w-[1600px] mx-auto px-10 h-24 flex items-center justify-between relative">
          <div className="flex items-center gap-6 cursor-pointer group" onClick={() => { setNfTab("surveillance"); setIsCreatorsUnlocked(false); }}>
            <div className={`w-14 h-14 flex items-center justify-center transition-all ${nfTab === "surveillance" ? "bg-pink-700 text-white shadow-[0_0_20px_rgba(190,24,93,0.6)]" : "bg-rose-400 text-white"}`}>
              <Zap size={30} fill="currentColor" />
            </div>
            <div>
              <h1 className={`text-3xl font-black italic tracking-tighter transition-colors ${nfTab === "surveillance" ? "text-white" : "text-rose-600"}`}>
                NAINE-FANS <span className="underline decoration-4 text-pink-600">SERVICE</span>
              </h1>
              <p className={`text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold ${nfTab === "surveillance" ? "text-white" : "text-rose-400"}`}>
                Secret Content Distribution Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-zinc-900/80 p-1 border border-zinc-800">
            <button onClick={() => setNfTab("surveillance")} className={`px-12 py-3 text-xs font-black transition-all ${nfTab === "surveillance" ? "bg-pink-700 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}>
              ライブ監視エリア
            </button>
            <button onClick={() => setNfTab("creators")} className={`px-12 py-3 text-xs font-black transition-all ${nfTab === "creators" ? "bg-rose-400 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}>
              クリエイター
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab("home")} className="hidden lg:flex items-center gap-2 px-4 py-2 border border-pink-900 text-pink-500 hover:bg-pink-900/20 hover:text-pink-400 text-[10px] font-black tracking-widest uppercase transition-all">
              <LogOut size={14} /> システム切断
            </button>

            <div className="text-right hidden md:block">
              <p className={`text-xl font-black ${nfTab === "surveillance" ? "text-pink-500" : "text-rose-500"}`}>
                12,480.00 <span className="text-xs ml-1 font-bold">PT</span>
              </p>
              <p className={`text-[9px] opacity-40 uppercase font-black tracking-widest text-right ${nfTab === "surveillance" ? "text-white" : "text-zinc-500"}`}>
                Available Points
              </p>
            </div>

            {nfTab !== "creators" && (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-12 h-12 flex items-center justify-center border transition-all hover:scale-105 active:scale-95 border-zinc-800 text-zinc-500 bg-zinc-900 hover:border-pink-600 hover:text-pink-500">
                  <Users size={24} />
                  <ChevronDown size={12} className="absolute -bottom-1 -right-1 text-pink-600" />
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-4 w-64 shadow-2xl z-[110] border bg-zinc-950 border-zinc-800 text-zinc-300 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 border-b border-zinc-800 bg-zinc-900/50 flex items-center gap-4">
                      <div className="w-10 h-10 bg-pink-600/20 flex items-center justify-center text-pink-500 font-bold">VIP</div>
                      <div>
                        <p className="text-xs font-black text-white">優良市民 ID: 88210</p>
                        <p className="text-[9px] opacity-50 uppercase tracking-tighter">Premium Member</p>
                      </div>
                    </div>
                    <div className="p-2 space-y-1 text-white">
                      {["プロフィール", "ポイントチャージ", "マイサブスクリプション", "視聴履歴"].map((label, idx) => (
                        <button key={idx} className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold hover:bg-pink-600/10 hover:text-pink-500 transition-all">
                          <ChevronRight size={12} className="opacity-40" /> {label}
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
          <SurveillanceView setActiveStream={setActiveStream} scanlineEffect={scanlineEffect} />
        ) : isCreatorsUnlocked ? (
          <CreatorsPortal />
        ) : (
          <CreatorsGateway onUnlock={() => setIsCreatorsUnlocked(true)} />
        )}
      </main>

      <footer className={`mt-24 border-t py-16 transition-all ${nfTab === "surveillance" ? "bg-black border-pink-900/20" : "bg-rose-50/50 border-rose-100"}`}>
        <div className="max-w-[1600px] mx-auto px-10 flex flex-col items-center gap-6 text-center text-white">
          <Shield size={40} className={`opacity-20 ${nfTab === "surveillance" ? "text-pink-600" : "text-rose-400"}`} />
          <div className="space-y-2 text-center text-white">
            <p className={`text-[11px] font-bold tracking-[0.6em] uppercase ${nfTab === "surveillance" ? "text-zinc-700" : "text-rose-300"}`}>
              Naine Security Bureau • Internal Node 09
            </p>
            <p className="text-[9px] opacity-30 max-w-lg leading-relaxed font-medium">
              本プラットフォームは奈媛市警察署の公認の下で運営されています。無断転載は厳罰の対象となります。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NFPlatformView;
