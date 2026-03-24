// src/DetentionView.jsx (仅替换上半部分)
import React, { useState } from 'react';
import { Lock, Shield, Camera, Paperclip, X, Clock, Activity, Flower, Map, ChevronRight, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { detentionData } from './data';
import { useAppContext } from './AppContext';

// ★ 修改1：增加 targetTab 参数，接收来自 App.js 主导航栏的指令
const DetentionView = ({ targetTab = 'detention' }) => {
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', pwd: '' });
  const [loginError, setLoginError] = useState('');
  
  // ★ 修改2：如果指令是 magazine，登录后默认直接打开月刊室
  const [internalTab, setInternalTab] = useState(targetTab === 'magazine' ? 'magazine' : 'dashboard');
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [activeArea, setActiveArea] = useState(detentionData.internal.blueprint[0]);
  const [activeUniform, setActiveUniform] = useState(detentionData.internal.uniforms[0]);
  
  const [magazineTab, setMagazineTab] = useState('reader');
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const [submissions, setSubmissions] = useState(detentionData.internal.magazineArchive.submissions);
  const [selectedVolume, setSelectedVolume] = useState('vol69');
  
  const [publicActiveImage, setPublicActiveImage] = useState(detentionData.public.defaultCover);

  const [isEditorAuth, setIsEditorAuth] = useState(false);
  const [showEditorAuthModal, setShowEditorAuthModal] = useState(false);
  const [editorKey, setEditorKey] = useState('');
  const [editorAuthError, setEditorAuthError] = useState('');
  // ★ 从全局中枢读取排班表 ★
  const { detentionRoster } = useAppContext();

  const handleLogin = () => {
    if (loginData.id.length >= 4 && loginData.pwd.length >= 4) {
      setShowLoginModal(false);
      setIsSecretMode(true);
    } else {
      setLoginError('認証エラー：職員IDまたはパスワードの形式が不正です。');
    }
  };

// ★ 新增：极密档案 Markdown 渲染器 ★
const renderLoreText = (text) => {
  if (!text) return null;
  return text.split('\n').map((line, idx) => {
    if (!line.trim()) return <div key={idx} className="h-2"></div>; // 处理空行
    
    // 处理加粗语法 **xxx** 变成红字高亮
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={idx} className="mb-1.5 leading-relaxed">
        {parts.map((part, i) => 
          part.startsWith('**') && part.endsWith('**') 
            ? <strong key={i} className="text-[#8b0000] font-black bg-rose-50 px-1">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
};

  const ProgressBar = ({ label, value, colorClass }) => { /* ... 保持不变 ... */
    const isOverflow = value > 100;
    const width = Math.min(value, 100);
    return (
      <div className="mb-4">
        <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
          <span>{label}</span><span className={isOverflow ? 'text-red-600 animate-pulse' : ''}>{value}% {isOverflow && '(限界突破)'}</span>
        </div>
        <div className="w-full bg-slate-200 h-2 border border-slate-300 relative overflow-hidden">
          <div className={`h-full ${colorClass} transition-all duration-1000`} style={{ width: `${width}%` }}></div>
          {isOverflow && <div className="absolute inset-0 bg-red-500/30 animate-pulse"></div>}
        </div>
      </div>
    );
  };

  const DynamicImageGallery = ({ images, placeholderText, heightClass = "h-[150px]" }) => { /* ... 保持不变 ... */
    if (!images || images.length === 0) return null;
    return (
      <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
        {images.map((imgUrl, idx) => (
          <div key={idx} className={`w-[250px] shrink-0 ${heightClass} border-2 border-dashed border-slate-400 bg-[#e6e4dc] flex flex-col items-center justify-center relative overflow-hidden group`}>
            {imgUrl ? <img src={imgUrl} className="w-full h-full object-cover" alt={`NeoStudio Render ${idx + 1}`} /> : <><ImageIcon size={24} className="text-slate-400 mb-2 opacity-50" /><p className="text-[9px] font-bold text-slate-500 text-center px-4">{placeholderText}<br/>({idx + 1})</p></>}
          </div>
        ))}
      </div>
    );
  };

  // --- 表世界 ---
  if (!isSecretMode) {
    return (
      <div className="bg-[#f5f7f8] min-h-screen pb-20 font-sans text-slate-800 animate-in fade-in duration-1000">
        
        {/* 1. 无论哪个表世界页面，都需要这套共用的登录弹窗 */}
        {showLoginModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-slate-100 border-2 border-slate-400 p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 font-mono">
              <div className="flex flex-col items-center mb-6 border-b-2 border-slate-300 pb-4">
                <Shield size={32} className="text-slate-700 mb-2" />
                <h3 className="text-lg font-black tracking-widest text-slate-800">NCPD 地下施設管理網</h3>
                <p className="text-[10px] text-slate-500">Underground Facility Management</p>
              </div>
              <div className="space-y-4 mb-6">
                <div><label className="block text-[10px] font-bold text-slate-600 mb-1">職員ID</label><input type="text" placeholder="例: 1048" value={loginData.id} onChange={(e) => {setLoginData({...loginData, id: e.target.value}); setLoginError('');}} className="w-full bg-white border border-slate-300 px-3 py-2 text-sm font-bold focus:outline-blue-500"/></div>
                <div><label className="block text-[10px] font-bold text-slate-600 mb-1">暗証番号</label><input type="password" placeholder="****" value={loginData.pwd} onChange={(e) => {setLoginData({...loginData, pwd: e.target.value}); setLoginError('');}} className="w-full bg-white border border-slate-300 px-3 py-2 text-sm font-bold focus:outline-blue-500"/></div>
                {loginError && <p className="text-[10px] text-red-600 font-bold">{loginError}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowLoginModal(false)} className="flex-1 py-2 bg-slate-200 text-slate-600 font-bold hover:bg-slate-300 text-sm">戻る</button>
                <button onClick={handleLogin} className="flex-1 py-2 bg-slate-800 text-white font-bold hover:bg-slate-900 text-sm">認証実行</button>
              </div>
            </div>
          </div>
        )}

        {/* 2. 核心路由判定：根据 targetTab 显示不同的表世界官方页面 */}
        
        {/* === 路线 A：如果是从「刊行物」点进来的 === */}
        {targetTab === 'magazine' ? (
          <>
            <div className="bg-white border-b border-slate-200 py-1 px-6 text-[10px] flex justify-between items-center text-slate-500">
              <div className="flex gap-4 items-center">文字サイズ設定等</div>
              <button onClick={() => { setInternalTab('magazine'); setMagazineTab('reader'); setShowLoginModal(true); }} className="font-bold hover:text-pink-700 transition-colors flex items-center gap-1">
                <Lock size={10} /> 電子書庫(職員専用)
              </button>
            </div>
            
            <div className="max-w-[1200px] mx-auto px-6 py-3 text-[10px] text-slate-500 flex items-center gap-2">
              <span className="hover:underline cursor-pointer">NCPD ホーム</span> ＞ <span className="hover:underline cursor-pointer">広報・刊行物</span> ＞ <span className="font-bold text-slate-700">公式マガジン案内</span>
            </div>
            
            <div className="max-w-[1000px] mx-auto px-6 mt-10">
              <h1 className="text-3xl font-black text-[#003366] mb-8 border-b-2 border-[#003366] pb-4">公式刊行物のご案内</h1>
              <div className="bg-white p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/3 bg-slate-100 border border-slate-300 aspect-[3/4] flex flex-col items-center justify-center text-slate-400 shadow-lg relative">
                  <ImageIcon size={48} className="mb-4 opacity-50" />
                  <p className="font-bold text-sm tracking-widest">{detentionData.internal.magazineArchive.specs.name}</p>
                  <p className="text-[10px] mt-2">表紙画像 (準備中)</p>
                  <div className="absolute top-4 -right-4 bg-pink-600 text-white font-black text-xs px-6 py-1 rotate-45 shadow-md">NEW ISSUE</div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-2xl font-black text-slate-800 mb-4">{detentionData.internal.magazineArchive.specs.name}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-serif">
                    奈媛中央警察署が公式に発行する、職員向けの広報およびコミュニケーション促進マガジンです。<br/><br/>
                    各課の活躍や、職員間の交流（婚活支援等）を目的とした特集記事を多数掲載しております。
                  </p>
                  <div className="bg-slate-50 border border-slate-200 p-4 space-y-3 mb-8">
                    <div className="flex border-b border-dashed border-slate-200 pb-2"><span className="w-32 font-bold text-slate-700 text-sm">発行日</span><span className="text-sm text-slate-600">{detentionData.internal.magazineArchive.specs.publishDate}</span></div>
                    <div className="flex border-b border-dashed border-slate-200 pb-2"><span className="w-32 font-bold text-slate-700 text-sm">頒布価格</span><span className="text-sm font-black text-pink-700">{detentionData.internal.magazineArchive.specs.price}</span></div>
                    <div className="flex"><span className="w-32 font-bold text-slate-700 text-sm">取扱場所</span><span className="text-sm text-slate-600">{detentionData.internal.magazineArchive.specs.distribution}</span></div>
                  </div>
                  <button onClick={() => { setInternalTab('magazine'); setMagazineTab('reader'); setShowLoginModal(true); }} className="w-full py-4 bg-[#003366] text-white font-bold hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center gap-2">
                    <Lock size={16} /> 職員専用デジタルアーカイブへログイン
                  </button>
                </div>
              </div>
            </div>
          </>

        ) : (

        /* === 路线 B：如果是从「留置管理 (Detention)」点进来的，保持之前的排版不变 === */
        <>
        {/* 1. 无障碍工具条 */}
        <div className="bg-white border-b border-slate-200 py-1 px-6 text-[10px] flex justify-between items-center text-slate-500">
          <div className="flex gap-4 items-center">
            <span className="flex gap-1 items-center">文字サイズ <button className="border px-1.5 hover:bg-slate-100">小</button><button className="border px-1.5 bg-slate-100 font-bold">中</button><button className="border px-1.5 hover:bg-slate-100">大</button></span>
            <span className="flex gap-1 items-center hidden sm:flex">背景色 <button className="border px-1.5 bg-white text-black font-bold">白</button><button className="border px-1.5 bg-black text-white">黒</button></span>
          </div>
          <button onClick={() => { setInternalTab('dashboard'); setShowLoginModal(true); }} className="font-bold hover:text-[#003366] transition-colors flex items-center gap-1">
            <Lock size={10} /> 職員専用イントラネット
          </button>
        </div>

        {/* 2. 面包屑导航 */}
        <div className="max-w-[1200px] mx-auto px-6 py-3 text-[10px] text-slate-500 flex items-center gap-2">
          <span className="hover:underline cursor-pointer">NCPD ホーム</span> ＞ 
          <span className="hover:underline cursor-pointer">組織案内</span> ＞ 
          <span className="font-bold text-slate-700">留置・矯正管理センター</span>
        </div>

        {/* 3. 主标题区 */}
        <div className="bg-[#003366] text-white py-10 mb-8 shadow-md">
          <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-blue-200 text-sm font-bold mb-2 tracking-widest">Naiyuan Central Police Department</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-widest">{detentionData.public.title}</h1>
          </div>
        </div>

        {/* 4. 核心内容区 (左右分栏布局) */}
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row gap-8">
          
          {/* 左侧主内容区 (占 3/4) */}
          <div className="flex-1 space-y-10">
            
            <section className="bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">施設概要</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{detentionData.public.desc}</p>
              
              {/* 动态大图展示区 */}
              <div className="w-full h-[350px] sm:h-[450px] bg-slate-100 border border-slate-300 flex items-center justify-center relative overflow-hidden">
                {publicActiveImage ? (
                  <img src={publicActiveImage} className="w-full h-full object-cover animate-in fade-in duration-500" alt="施設内観" />
                ) : (
                  <div className="text-center text-slate-400">
                    <Camera size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="font-bold text-sm tracking-widest">施設内観写真 (準備中)</p>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-6">施設エリア案内</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detentionData.public.areas.map(area => (
                  <div key={area.id} onClick={() => { if(area.img) setPublicActiveImage(area.img); }} className={`bg-white p-5 border border-slate-200 shadow-sm transition-all duration-300 ${area.img ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md border-b-4 hover:border-b-[#003366]' : 'opacity-80 border-b-4 border-slate-200'} ${publicActiveImage === area.img && area.img ? 'ring-2 ring-[#003366] bg-blue-50/50' : ''}`}>
                    <h3 className="text-md font-black text-slate-800 mb-2">{area.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{area.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-3 font-bold text-right">
                      {area.img ? '▶ クリックして写真を表示' : '※ 画像準備中'}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 探视与物品送递规则表格 */}
            <section className="bg-white p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-[#003366] border-l-4 border-[#003366] pl-3 mb-4">{detentionData.public.visitationGuide.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{detentionData.public.visitationGuide.desc}</p>
              
              <table className="w-full text-sm text-left border-collapse border border-slate-300">
                <tbody>
                  <tr>
                    <th className="bg-slate-100 border border-slate-300 p-3 w-1/3 font-bold text-slate-700">面会受付時間</th>
                    <td className="border border-slate-300 p-3 text-slate-600 font-bold">{detentionData.public.visitationGuide.hours}</td>
                  </tr>
                  <tr>
                    <th className="bg-slate-100 border border-slate-300 p-3 align-top font-bold text-slate-700">差し入れ可能な物品</th>
                    <td className="border border-slate-300 p-3 text-slate-600">
                      <ul className="list-disc list-inside space-y-1">
                        {detentionData.public.visitationGuide.allowedItems.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-rose-50 border border-slate-300 p-3 align-top font-bold text-rose-800">差し入れ禁止物品</th>
                    <td className="border border-slate-300 p-3 text-slate-600">
                      <ul className="list-disc list-inside space-y-1 text-rose-700 font-bold">
                        {detentionData.public.visitationGuide.forbiddenItems.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          {/* 右侧边栏 (占 1/4) */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-white border border-slate-200 shadow-sm">
              <h3 className="bg-[#003366] text-white font-bold p-3 text-sm flex justify-between items-center">
                新着情報 <span className="text-[10px] bg-blue-800 px-2 py-0.5 rounded-full">News</span>
              </h3>
              <ul className="p-4 space-y-4">
                {detentionData.public.news.map((n, i) => (
                  <li key={i} className="border-b border-dashed border-slate-200 pb-3 last:border-0 last:pb-0">
                    <span className="text-[10px] text-slate-500 font-bold block mb-1">{n.date}</span>
                    <a href="#" className="text-xs text-blue-700 hover:underline leading-relaxed block">{n.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-100 border border-slate-300 p-5">
              <h3 className="font-bold text-slate-800 mb-3 border-b-2 border-slate-300 pb-2 text-sm">お問い合わせ</h3>
              <p className="text-xs font-bold text-slate-600 mb-1">{detentionData.public.contact.dept}</p>
              <p className="text-xl font-black text-[#003366] mb-3">{detentionData.public.contact.phone}</p>
              <p className="text-[10px] text-slate-500 leading-relaxed">{detentionData.public.contact.address}</p>
            </div>

            <div className="space-y-3">
              <div className="w-full h-16 bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800 font-bold text-xs hover:bg-blue-100 cursor-pointer transition-colors shadow-sm">
                ▶ NCPD 警察官採用サイト (女性限定)
              </div>
              <div className="w-full h-16 bg-slate-50 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer transition-colors shadow-sm">
                ▶ 犯罪被害者支援窓口
              </div>
            </div>
          </aside>

        </div>
      </>
    )}

      </div>
    );
  }
  // --- 里世界 (下方代码完全不需要动，保持原样) ---
  // --- 里世界 ---
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#e6e4dc] text-[#2c2b29] font-serif animate-in fade-in duration-1000 pb-12 relative">
      
      {/* 1. HR 肉体打卡系统弹窗 */}
      {selectedOfficer && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4 font-mono">
          <div className="bg-white w-full max-w-3xl border-2 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8b0000] z-20"></div>
            <button onClick={() => setSelectedOfficer(null)} className="absolute top-3 right-3 text-slate-400 hover:text-black z-20 transition-colors"><X size={20} /></button>
            <div className="w-full md:w-2/5 bg-slate-100 relative h-[300px] md:h-auto border-r border-slate-300">
              <img src={selectedOfficer.img} className="w-full h-full object-cover grayscale-[10%]" alt={selectedOfficer.name} />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <p className="text-[10px] font-bold text-slate-300 tracking-widest uppercase mb-1">Badge No. {selectedOfficer.badge}</p>
                <h3 className="text-2xl font-black">{selectedOfficer.name}</h3>
              </div>
            </div>
            <div className="w-full md:w-3/5 p-8 flex flex-col bg-[#fbf9f4]">
              <div className="border-b-2 border-slate-800 pb-3 mb-6">
                <h4 className="text-lg font-black tracking-widest text-slate-800">【機密】勤怠・肉体ステータス</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-slate-300 p-3">
                  <span className="text-[9px] text-slate-400 font-bold block mb-1 uppercase">配属先</span>
                  <span className="text-sm font-black text-[#8b0000]">{selectedOfficer.status}</span>
                </div>
                <div className="bg-white border border-slate-300 p-3">
                  <span className="text-[9px] text-slate-400 font-bold block mb-1 uppercase">特記事項</span>
                  <div className="flex gap-1 flex-wrap">
                    {selectedOfficer.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-6 flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-slate-600 mb-1"><Clock size={12} /> <span className="text-[10px] font-bold">本日の連続稼働</span></div>
                  <p className="text-2xl font-black font-mono text-slate-800">{selectedOfficer.todayHours.toFixed(1)} <span className="text-xs text-slate-500">Hours</span></p>
                </div>
                <div className="w-px bg-slate-300"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-slate-600 mb-1"><Activity size={12} /> <span className="text-[10px] font-bold">今週の累積稼働</span></div>
                  <p className="text-2xl font-black font-mono text-[#8b0000]">{selectedOfficer.weekHours.toFixed(1)} <span className="text-xs text-slate-500">/ 168h</span></p>
                </div>
              </div>
              <div className="space-y-1 mb-6">
                <ProgressBar label="肉体疲労度" value={selectedOfficer.fatigue} colorClass={selectedOfficer.fatigue > 90 ? 'bg-red-600' : 'bg-amber-500'} />
                <ProgressBar label="精液収容量" value={selectedOfficer.semen} colorClass="bg-white border-y border-r border-slate-300" />
                <ProgressBar label="精神従順度" value={selectedOfficer.obedience} colorClass="bg-[#003366]" />
              </div>
              
              {/* ★ 修改后：使用高级渲染器解析档案 ★ */}
              {selectedOfficer.lore && (
                <div className="mb-6 bg-slate-100 border border-slate-300 p-5 h-56 overflow-y-auto custom-scrollbar shadow-inner relative">
                  <p className="text-xs font-black text-rose-800 border-b-2 border-rose-800 pb-2 mb-3 tracking-widest sticky top-0 bg-slate-100 z-10">
                    【機密】人事プロファイリング調書
                  </p>
                  <div className="font-serif text-[11px] text-slate-700">
                    {renderLoreText(selectedOfficer.lore)}
                  </div>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between border-t border-slate-300 pt-4">
                <div className="flex items-center gap-2">
                  {selectedOfficer.pregnant ? (
                    <div className="flex items-center gap-1.5 text-pink-600 bg-pink-50 px-2 py-1 border border-pink-200">
                      <Flower size={14} /> <span className="text-[10px] font-black tracking-widest">繁育小粉花 授与済</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500">臨床ステータス: <span className="text-slate-800">{selectedOfficer.condition}</span></span>
                  )}
                </div>
                <button disabled className="bg-slate-200 text-slate-400 text-xs font-bold px-6 py-2 border border-slate-300 cursor-not-allowed">打刻 (退勤不可)</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. 新增：审查室 8位数密钥认证系统弹窗 */}
      {showEditorAuthModal && (
        <div className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in p-4 font-mono">
          <div className="bg-[#fbf9f4] border-4 border-[#8b0000] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 relative overflow-hidden">
            {/* 极其压抑的警告背景水印 */}
            <div className="absolute -right-10 -bottom-10 text-9xl text-rose-900 opacity-5 rotate-[-20deg] pointer-events-none select-none">
              <Lock />
            </div>
            
            <div className="flex flex-col items-center mb-6 border-b-2 border-slate-300 pb-4 relative z-10">
              <Shield size={40} className="text-[#8b0000] mb-3" />
              <h3 className="text-xl font-black tracking-widest text-[#8b0000]">当番警媛 認証システム</h3>
              <p className="text-[10px] text-slate-600 font-bold mt-1">Editor Authentication Gateway</p>
            </div>
            
            <div className="space-y-4 mb-6 relative z-10">
              <div className="bg-rose-50 border border-rose-200 p-3 text-[10px] text-rose-900 font-bold mb-4 leading-relaxed">
                ※次号の編集審査は、今週の「当番警媛」のみアクセス可能です。<br/>
                付与された <strong>8桁のアクセスキー（網膜認証コード）</strong> を入力してください。
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-800 mb-1 text-center">ACCESS KEY</label>
                <input 
                  type="password" 
                  maxLength={8}
                  placeholder="********"
                  value={editorKey}
                  onChange={(e) => {setEditorKey(e.target.value); setEditorAuthError('');}}
                  className="w-full bg-white border-2 border-slate-400 px-3 py-3 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:border-[#8b0000] transition-colors shadow-inner"
                />
              </div>
              {editorAuthError && <p className="text-[10px] text-red-600 font-bold text-center animate-pulse">{editorAuthError}</p>}
            </div>
            
            <div className="flex gap-3 relative z-10">
              <button 
                onClick={() => setShowEditorAuthModal(false)} 
                className="flex-1 py-3 bg-slate-300 text-slate-700 font-bold hover:bg-slate-400 text-sm transition-colors border border-slate-400"
              >
                キャンセル
              </button>
              <button 
                onClick={() => {
                  if (editorKey.length === 8) {
                    setIsEditorAuth(true);
                    setMagazineTab('editor');
                    setShowEditorAuthModal(false);
                    setEditorKey(''); // 清空密码
                  } else {
                    setEditorAuthError('認証エラー：8文字のキーを正確に入力してください。');
                  }
                }} 
                className="flex-1 py-3 bg-[#8b0000] text-white font-bold hover:bg-rose-900 shadow-md transition-colors text-sm border border-rose-950"
              >
                認証・ログイン
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 头部 */}
      <header className="border-b-4 border-[#8b0000] bg-[#f4f1ea] px-8 py-6 flex justify-between items-end shadow-md relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-[#8b0000] opacity-5 select-none pointer-events-none tracking-widest rotate-[-15deg]">極秘文書</div>
        <div className="relative z-10">
          <p className="text-[#8b0000] font-black tracking-widest text-sm mb-1">奈媛中央警察署 / 特例性欲処理統制局</p>
          <h1 className="text-4xl font-black tracking-widest text-[#2c2b29]">留置・矯正管理システム</h1>
        </div>
        <div className="relative z-10 text-right">
          <p className="text-xs font-bold text-slate-500">ログイン職員: {loginData.id || 'ADMIN'}</p>
          <button onClick={() => setIsSecretMode(false)} className="mt-3 px-4 py-1 border border-slate-400 text-xs font-bold hover:bg-slate-200 transition-colors">ログアウト</button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto mt-8 px-6 flex flex-col lg:flex-row gap-8">
        
        {/* 左侧菜单 */}
        <aside className="w-full lg:w-64 shrink-0 space-y-2 font-bold">
          <button onClick={() => setInternalTab('dashboard')} className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${internalTab === 'dashboard' ? 'bg-[#dcd8c8] border-[#8b0000] text-[#8b0000]' : 'border-transparent hover:bg-[#dcd8c8]/50'}`}>📁 施設稼働状況 (20床)</button>
          <button onClick={() => setInternalTab('blueprint')} className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${internalTab === 'blueprint' ? 'bg-[#dcd8c8] border-[#8b0000] text-[#8b0000]' : 'border-transparent hover:bg-[#dcd8c8]/50'}`}>📁 地下施設 平面図 (F1~F5)</button>
          <button onClick={() => setInternalTab('officers')} className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${internalTab === 'officers' ? 'bg-[#dcd8c8] border-[#8b0000] text-[#8b0000]' : 'border-transparent hover:bg-[#dcd8c8]/50'}`}>📁 侍奉警媛シフト管理</button>
          <button onClick={() => setInternalTab('rule177')} className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${internalTab === 'rule177' ? 'bg-[#dcd8c8] border-[#8b0000] text-[#8b0000]' : 'border-transparent hover:bg-[#dcd8c8]/50'}`}>📁 【侍奉制服】177制度</button>
          <button onClick={() => setInternalTab('magazine')} className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${internalTab === 'magazine' ? 'bg-[#dcd8c8] border-[#8b0000] text-[#8b0000]' : 'border-transparent hover:bg-[#dcd8c8]/50'}`}>📁 《警媛月刊》編纂室</button>
        </aside>

        <main className="flex-1 bg-[#fbf9f4] border border-[#dcd8c8] shadow-sm p-8 font-mono relative">
          
          {/* TAB 1 ~ 4 省略内容，保持上版原有代码逻辑 */}
          {internalTab === 'dashboard' && (
             <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               {/* 复制回你现有的 Dashboard 代码 */}
               <div className="flex justify-between items-center border-b-2 border-[#2c2b29] pb-4">
                 <h2 className="text-2xl font-black tracking-widest">【24H稼働中】雑居房・単独房 モニタリング</h2>
                 <div className="flex gap-4 text-xs font-bold">
                   <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#fff0f0] inline-block border border-[#8b0000]"></span> 密着奉仕中</span>
                   <span className="flex items-center gap-1"><span className="w-3 h-3 bg-[#e6e4dc] inline-block border border-slate-400"></span> 空室</span>
                 </div>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                 {detentionData.internal.cells.map(cell => (
                   <div key={cell.id} className={`border border-[#2c2b29] p-3 relative flex flex-col h-[130px] shadow-sm ${cell.occupied ? 'bg-[#fff0f0]' : 'bg-[#e6e4dc] opacity-60'}`}>
                     <div className="flex justify-between items-start mb-2">
                       <span className={`text-[#fbf9f4] text-[10px] px-1.5 py-0.5 font-bold ${cell.type === '単独房' ? 'bg-[#2c2b29]' : 'bg-[#5c4a4a]'}`}>{cell.id}</span>
                       <span className="text-[9px] font-bold text-slate-500">{cell.type}</span>
                     </div>
                     {cell.occupied ? (
                       <div className="flex-1 flex flex-col justify-center text-center">
                         <p className="text-sm font-black text-[#8b0000] mb-1">{cell.criminalType}</p>
                         <p className="text-[10px] text-rose-900 font-bold bg-white/50 py-1 border border-rose-200">{cell.servingStatus}</p>
                       </div>
                     ) : (
                       <div className="flex-1 flex items-center justify-center"><p className="text-sm font-bold text-slate-400">空室</p></div>
                     )}
                   </div>
                 ))}
               </div>
             </div>
          )}

          {internalTab === 'blueprint' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               {/* 复制回你现有的 Blueprint 代码 */}
               <h2 className="text-2xl font-black tracking-widest border-b-2 border-[#2c2b29] pb-4">地下施設 エリア別運用規約 (F1~F5)</h2>
               <div className="flex flex-col lg:flex-row gap-8">
                 <div className="w-full lg:w-48 shrink-0 flex flex-col gap-2">
                   {detentionData.internal.blueprint.map(area => (
                     <button key={area.id} onClick={() => setActiveArea(area)} className={`px-4 py-3 text-left border-2 font-bold flex items-center justify-between transition-colors ${activeArea.id === area.id ? 'bg-[#2c2b29] text-[#fbf9f4] border-[#2c2b29]' : 'bg-white border-[#dcd8c8] text-slate-600 hover:border-slate-400'}`}>
                       {area.id} <ChevronRight size={14} className={activeArea.id === area.id ? 'opacity-100' : 'opacity-0'} />
                     </button>
                   ))}
                 </div>
                 <div className="flex-1 bg-white border border-[#dcd8c8] p-6 shadow-inner">
                   <div className="flex items-center gap-3 mb-4"><Map size={24} className="text-[#8b0000]" /><h3 className="text-xl font-black text-[#2c2b29]">{activeArea.name}</h3></div>
                   <p className="text-sm text-slate-700 leading-relaxed mb-6 font-serif">{activeArea.desc}</p>
                   <div className="mb-8"><DynamicImageGallery images={activeArea.images} placeholderText={`${activeArea.id} 施設内観`} heightClass="h-[180px]" /></div>
                   {activeArea.rules && (
                     <div className="bg-[#fff0f0] border-2 border-[#8b0000] p-5">
                       <div className="flex items-center gap-2 text-[#8b0000] font-black mb-5 border-b border-rose-200 pb-2"><AlertTriangle size={18} /><h4>【厳守事項】新入罪犯への初回性奉仕 S.O.P.</h4></div>
                       <div className="space-y-6">
                         {activeArea.rules.map((rule, idx) => (
                           <div key={idx} className="space-y-3">
                             <p className="text-xs text-rose-950 font-bold leading-relaxed flex gap-2"><span className="shrink-0 text-[#8b0000]">▶</span> {rule.text}</p>
                             <DynamicImageGallery images={rule.images} placeholderText={`動作分解図 ${idx + 1}`} heightClass="h-[120px]" />
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>
          )}

          {internalTab === 'officers' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               {/* 复制回你现有的 Officers 代码 */}
               <h2 className="text-2xl font-black tracking-widest border-b-2 border-[#2c2b29] pb-4">【侍奉警媛】今週の当番・シフト表</h2>
               <div className="flex flex-col lg:flex-row gap-6 mb-8">
                 <div className="flex-1 bg-[#f0f0f0] p-4 text-[11px] text-slate-600 font-serif italic whitespace-pre-line border border-slate-300">{detentionData.internal.lore.unspoken}</div>
                 <div className="flex-1 bg-white border border-[#8b0000] p-4">
                   <h4 className="text-[10px] font-black text-white bg-[#8b0000] inline-block px-2 py-0.5 mb-3">警媛就業規則</h4>
                   <ul className="space-y-2">{detentionData.internal.officerRules.map((r, i) => <li key={i} className="text-[10px] font-bold text-slate-800 leading-relaxed border-b border-slate-100 pb-1">{r}</li>)}</ul>
                 </div>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                 {detentionRoster.map((officer, i) => (
                   <div key={i} onClick={() => setSelectedOfficer(officer)} className="bg-white p-2 pb-6 border border-slate-300 shadow-md relative transform rotate-1 hover:rotate-0 hover:scale-105 transition-all cursor-pointer group">
                     <Paperclip size={16} className="absolute -top-3 left-1/2 -translate-x-1/2 text-slate-400 z-10" />
                     <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20 pointer-events-none"><span className="bg-black text-white text-[10px] font-bold px-2 py-1">ステータス確認</span></div>
                     <div className="aspect-square bg-slate-100 overflow-hidden mb-3 border border-slate-200 relative z-0"><img src={officer.img} className="w-full h-full object-cover grayscale-[20%]" alt={officer.name} /></div>
                     <div className="text-center relative z-0"><p className="font-black text-sm text-[#2c2b29]">{officer.name}</p><p className="text-[9px] font-bold text-[#8b0000] mt-1 bg-rose-50 py-0.5 border border-rose-100">{officer.status}</p></div>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {internalTab === 'rule177' && (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
               {/* 复制回你现有的 Rule177 代码 */}
               <h2 className="text-2xl font-black tracking-widest border-b-2 border-[#2c2b29] pb-4">【侍奉制服】177制度 運用規約</h2>
               <div className="bg-[#2c2b29] text-[#fbf9f4] p-4 text-xs font-bold leading-relaxed mb-6 shadow-sm border-l-4 border-[#8b0000]">{detentionData.internal.rule177Lore}</div>
               <div className="flex flex-col lg:flex-row items-start gap-8">
                 <div className="flex-1 space-y-2 w-full">
                   {detentionData.internal.uniforms.map((uni, i) => (
                     <div key={i} onClick={() => setActiveUniform(uni)} className={`flex flex-col sm:flex-row border cursor-pointer transition-all ${activeUniform.day === uni.day ? 'border-[#8b0000] bg-[#fff0f0] shadow-md scale-[1.02]' : 'border-[#2c2b29] bg-white hover:bg-slate-50'}`}>
                       <div className={`sm:w-24 font-black flex items-center justify-center shrink-0 py-2 sm:py-0 transition-colors ${activeUniform.day === uni.day ? 'bg-[#8b0000] text-white' : 'bg-[#2c2b29] text-[#fbf9f4]'}`}>{uni.day}</div>
                       <div className="p-3"><p className="font-black text-[#8b0000] mb-1">{uni.style}</p><p className="text-[11px] text-slate-700 font-serif leading-relaxed">{uni.desc}</p></div>
                     </div>
                   ))}
                 </div>
                 <div className="w-full lg:w-80 shrink-0 space-y-4 lg:sticky lg:top-8">
                   <div className="aspect-[3/4] bg-[#e6e4dc] border-2 border-[#2c2b29] p-2 bg-white shadow-xl relative group">
                     {activeUniform.img ? (
                       <img src={activeUniform.img} className="w-full h-full object-cover" alt={activeUniform.style} />
                     ) : (
                       <div className="w-full h-full border-2 border-dashed border-slate-300 bg-[#fbf9f4] flex flex-col items-center justify-center text-slate-400"><ImageIcon size={40} className="mb-3 opacity-30" /><p className="font-black text-sm text-slate-500">{activeUniform.day} 着用例</p><p className="text-[9px] mt-2">※ 画像未設定</p></div>
                     )}
                     <div className="absolute -bottom-3 -right-3 bg-[#8b0000] text-white text-[10px] font-black px-3 py-1 shadow-lg rotate-[-5deg]">{activeUniform.style}</div>
                   </div>
                 </div>
               </div>
             </div>
          )}

          {/* =======================================
              TAB 5: 《警媛月刊》編纂室 (带有侧边栏往期刊物 + 密码验证)
              ======================================= */}
          {internalTab === 'magazine' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 flex flex-col h-full">
              <div className="flex justify-between items-end border-b-2 border-[#2c2b29] pb-4">
                <h2 className="text-2xl font-black tracking-widest">《警媛月刊》編纂・アーカイブ室</h2>
                
                {/* 顶部内部切换 */}
                <div className="flex bg-[#e6e4dc] border border-[#2c2b29] p-1">
                  <button 
                    onClick={() => setMagazineTab('reader')} 
                    className={`px-4 py-1 text-xs font-bold transition-colors ${magazineTab === 'reader' ? 'bg-[#2c2b29] text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    既刊電子閲覧
                  </button>
                  <button 
                    onClick={() => {
                      if (isEditorAuth) {
                        setMagazineTab('editor');
                      } else {
                        setShowEditorAuthModal(true); // 如果没有验证过，弹出密码框
                      }
                    }} 
                    className={`px-4 py-1 text-xs font-bold transition-colors ${magazineTab === 'editor' ? 'bg-[#8b0000] text-white' : 'text-slate-600 hover:bg-slate-200'}`}
                  >
                    次号投稿審査 (当番業務)
                  </button>
                </div>
              </div>

              {/* 模式 A：电子阅览器 (左侧往期列表 + 右侧幻灯片) */}
              {magazineTab === 'reader' && (
                <div className="flex-1 flex flex-col md:flex-row bg-[#1a1a1a] shadow-inner min-h-[600px] border border-[#2c2b29]">
                  
                  {/* 左侧：往期刊物列表 (Back Issues Sidebar) */}
                  <div className="w-full md:w-56 bg-[#2c2b29] border-r border-[#404040] flex flex-col shrink-0">
                    <div className="p-4 border-b border-[#404040]">
                      <span className="text-white text-xs font-black tracking-widest leading-tight block">
                        バックナンバー<br/><span className="text-[9px] text-slate-400">BACK ISSUES</span>
                      </span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                      {detentionData.internal.magazineArchive.volumes.map(vol => (
                        <button 
                          key={vol.id}
                          onClick={() => { setSelectedVolume(vol.id); setCurrentIssueIndex(0); }}
                          className={`w-full text-left p-3 border-l-4 transition-all flex flex-col ${
                            selectedVolume === vol.id 
                              ? 'bg-[#404040] border-pink-600 text-white shadow-md' 
                              : 'border-transparent text-slate-400 hover:bg-[#333] hover:text-slate-200'
                          }`}
                        >
                          <span className="font-black text-sm mb-0.5">{vol.name}</span>
                          <span className="text-[9px] font-mono">{vol.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 右侧：阅读器主体 */}
                  <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                    
                    {/* 如果选中的是最新的 Vol.69 -> 正常显示幻灯片 */}
                    {selectedVolume === 'vol69' ? (
                      <>
                        {/* 顶部刊物信息 */}
                        <div className="absolute top-4 left-8 w-full flex items-center gap-4 text-[#fbf9f4] text-xs font-bold mb-8">
                          <span className="bg-pink-700 px-3 py-1 shadow-sm tracking-widest">{detentionData.internal.magazineArchive.specs.name}</span>
                          <span className="text-slate-400">{detentionData.internal.magazineArchive.specs.publishDate}</span>
                        </div>

                        {/* 核心幻灯片卡片 */}
                        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[400px]">
                          <div className="w-full md:w-1/2 bg-slate-100 border-b md:border-b-0 md:border-r border-slate-300 relative flex items-center justify-center overflow-hidden min-h-[300px]">
                            {detentionData.internal.magazineArchive.issues[currentIssueIndex].img ? (
                              <img src={detentionData.internal.magazineArchive.issues[currentIssueIndex].img} className="w-full h-full object-cover" alt="Magazine Page" />
                            ) : (
                              <div className="text-center text-slate-400">
                                <ImageIcon size={48} className="mx-auto mb-2 opacity-30" />
                                <p className="text-xs font-bold tracking-widest">NeoStudio 画像読込枠</p>
                              </div>
                            )}
                          </div>
                          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-start pt-12">
                          <p className="text-[#8b0000] font-black text-xs mb-3 uppercase tracking-widest border-b border-rose-200 pb-2 inline-block">
                            {detentionData.internal.magazineArchive.issues[currentIssueIndex].id}
                          </p>
  
                          <h3 className="text-2xl font-black text-[#2c2b29] mb-6 leading-tight">
                            {detentionData.internal.magazineArchive.issues[currentIssueIndex].title}
                          </h3>

                          <p className="text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line">
                            {detentionData.internal.magazineArchive.issues[currentIssueIndex].content}
                          </p>
                          </div>
                        </div>

                        {/* 底部翻页控制器 */}
                        <div className="w-full flex items-center justify-center gap-8 mt-10">
                          <button 
                            onClick={() => setCurrentIssueIndex(Math.max(0, currentIssueIndex - 1))}
                            disabled={currentIssueIndex === 0}
                            className="px-6 py-2 bg-[#333] text-white font-bold hover:bg-pink-700 disabled:opacity-30 disabled:hover:bg-[#333] transition-colors border border-[#555]"
                          >
                            ◀ 前のページ
                          </button>
                          <span className="text-slate-400 font-mono text-sm font-bold tracking-widest">
                            PAGE {currentIssueIndex + 1} / {detentionData.internal.magazineArchive.issues.length}
                          </span>
                          <button 
                            onClick={() => setCurrentIssueIndex(Math.min(detentionData.internal.magazineArchive.issues.length - 1, currentIssueIndex + 1))}
                            disabled={currentIssueIndex === detentionData.internal.magazineArchive.issues.length - 1}
                            className="px-6 py-2 bg-[#333] text-white font-bold hover:bg-pink-700 disabled:opacity-30 disabled:hover:bg-[#333] transition-colors border border-[#555]"
                          >
                            次のページ ▶
                          </button>
                        </div>
                      </>
                    ) : (
                      
                      /* 如果选中的是往期 (Vol.68 及以前) -> 显示权限受限界面 */
                      <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500">
                        <div className="text-center text-slate-500 bg-[#222] border border-[#333] p-12 shadow-2xl relative overflow-hidden">
                          {/* 巨大的锁水印 */}
                          <Lock size={120} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-red-500" />
                          <div className="relative z-10">
                            <Lock size={40} className="mx-auto mb-4 text-slate-600" />
                            <p className="text-xl font-black tracking-widest text-slate-300 mb-2">アーカイブ制限エリア</p>
                            <p className="text-xs font-bold text-slate-500 mb-6">
                              旧号（{detentionData.internal.magazineArchive.volumes.find(v => v.id === selectedVolume)?.name}）のデータ参照
                            </p>
                            <p className="text-[10px] text-rose-800 bg-rose-950/30 border border-rose-900 px-4 py-2 inline-block font-mono">
                              ※ エラー：このデジタルアーカイブの閲覧には、<br/>
                              権限レベル6以上のアクセス承認が必要です。
                            </p>
                          </div>
                        </div>
                      </div>
                      
                    )}
                  </div>
                </div>
              )}

              {/* 模式 B：执勤女警审查工作台 (保持原样，无需修改) */}
              {magazineTab === 'editor' && (
                <div className="flex-1 bg-white border border-[#dcd8c8] p-6 shadow-inner overflow-y-auto max-h-[600px] custom-scrollbar">
                  <div className="bg-[#fffdf5] border-l-4 border-[#8b0000] p-4 text-sm leading-relaxed text-[#2c2b29] mb-8 shadow-sm">
                    <p className="font-bold text-[#8b0000] mb-1">【当番警媛 業務連絡】</p>
                    <p>次号掲載に向けた、署内各課からの自薦スクープ写真の一次審査を行ってください。選考基準は「いかに警察の威厳を汚し、雄（罪犯）の情欲を煽るか」です。露出度や羞恥心（快感）の表現が甘いものは容赦なく却下してください。</p>
                  </div>

                  <div className="space-y-6">
                    {submissions.map((sub, idx) => (
                      <div key={sub.id} className={`border-2 flex flex-col md:flex-row transition-all duration-500 ${sub.status === 'approved' ? 'border-emerald-600 bg-emerald-50' : sub.status === 'rejected' ? 'border-slate-300 bg-slate-100 opacity-60' : 'border-[#2c2b29] bg-white'}`}>
                        <div className="w-full md:w-48 h-48 bg-slate-200 border-r border-slate-300 flex items-center justify-center shrink-0 relative">
                          {sub.img ? <img src={sub.img} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-400 opacity-50" size={32}/>}
                          {sub.status === 'approved' && <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 backdrop-blur-[1px]"><span className="text-emerald-700 border-4 border-emerald-700 font-black text-2xl px-4 py-2 rotate-[-15deg] bg-white/80">掲載承認</span></div>}
                          {sub.status === 'rejected' && <div className="absolute inset-0 flex items-center justify-center bg-slate-800/40 backdrop-blur-[1px]"><span className="text-slate-200 border-4 border-slate-200 font-black text-2xl px-4 py-2 rotate-[10deg] bg-slate-900/80">却下 (露出不足)</span></div>}
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <span className="bg-[#2c2b29] text-[#fbf9f4] text-[10px] px-2 py-0.5 font-bold">投稿者: {sub.officer}</span>
                              <span className="text-[10px] text-slate-500 font-bold tracking-widest">受付番号: {sub.id}</span>
                            </div>
                            <div className="bg-rose-50 border border-rose-100 p-3 rounded-tr-xl rounded-bl-xl rounded-br-xl relative">
                              <p className="text-xs text-rose-950 font-bold leading-relaxed">「{sub.comment}」</p>
                            </div>
                          </div>
                          {sub.status === 'pending' && (
                            <div className="flex gap-4 mt-6">
                              <button onClick={() => {const newSubs = [...submissions]; newSubs[idx].status = 'rejected'; setSubmissions(newSubs);}} className="flex-1 py-2 border-2 border-slate-400 text-slate-600 font-bold hover:bg-slate-100 transition-colors text-sm">✖ 却下 (突き返す)</button>
                              <button onClick={() => {const newSubs = [...submissions]; newSubs[idx].status = 'approved'; setSubmissions(newSubs);}} className="flex-1 py-2 bg-[#8b0000] text-white font-bold hover:bg-rose-900 shadow-md transition-colors text-sm">◎ 承認 (次号掲載)</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default DetentionView;
