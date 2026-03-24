// src/PublicationsView.jsx
import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Lock, ChevronRight, ChevronLeft, Download, Maximize, AlertCircle } from 'lucide-react';
import { publicPublications } from './data'; // 引入刚才写的数据

const PublicationsView = ({ setActiveTab }) => {
  const [activeDoc, setActiveDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 处理极密文档解锁
  const handleSecretUnlock = () => {
    if (password === "0000" || password === "1234") { // 随便设个弱密码符合官僚作风
      setShowSecretModal(false);
      // 解锁成功，跳转到原本的 DetentionView 里的杂志模式
      setActiveTab("secret-magazine"); 
    } else {
      setError("認証失敗: アクセス権限がありません。");
    }
  };

  // 打开公开文档阅读器
  const openReader = (doc) => {
    setActiveDoc(doc);
    setCurrentPage(1);
  };

  // ================= 表世界・公开阅读器界面 =================
  if (activeDoc) {
    return (
      <div className="bg-[#f0f4f8] min-h-[calc(100vh-80px)] flex flex-col font-sans text-[#333] anim-bg">
        {/* 阅读器顶部工具栏 */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveDoc(null)} className="flex items-center gap-2 text-slate-500 hover:text-[#003366] font-bold text-sm bg-slate-50 px-4 py-2 rounded-lg border hover:bg-blue-50 transition-colors">
              <ChevronLeft size={16} /> ライブラリに戻る
            </button>
            <div className="h-6 w-px bg-slate-300 mx-2"></div>
            <div>
              <h2 className="text-lg font-black text-[#003366] leading-none">{activeDoc.title}</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{activeDoc.sub}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded">
              PAGE {currentPage} / {activeDoc.pages}
            </span>
            <div className="flex gap-2 text-slate-400">
              <button className="p-2 hover:bg-slate-100 rounded hover:text-[#003366] transition-colors" title="ダウンロード"><Download size={20} /></button>
              <button className="p-2 hover:bg-slate-100 rounded hover:text-[#003366] transition-colors" title="全画面表示"><Maximize size={20} /></button>
            </div>
          </div>
        </div>

        {/* 核心阅读区域 */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center bg-slate-200/50">
          
          {/* ★ 优化1：高度自适应 (h-[75vh])，确保单屏绝对能看全，告别滚动条 ★ */}
          <div className="h-[75vh] min-h-[500px] max-h-[900px] aspect-[1/1.414] bg-white shadow-2xl relative flex flex-col border border-slate-200 transition-all duration-500">
            
            {/* 顶部分页占位标识 */}
            <div className="absolute top-4 right-6 text-slate-400 text-xs font-mono z-30 bg-white/80 px-2 py-1 rounded">- {currentPage} -</div>
            
            <div className="flex-1 flex items-center justify-center bg-slate-50 border-8 border-white overflow-hidden relative group">
              
              {/* ★ 优化2：左侧点击翻页区 (悬浮显示提示) ★ */}
              <div 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={`absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity ${currentPage === 1 ? 'hidden' : ''}`}
              >
                {/* 悬浮时的渐变阴影与箭头 */}
                <div className="w-20 h-full flex items-center justify-center bg-gradient-to-r from-black/20 to-transparent">
                  <ChevronLeft size={48} className="text-white drop-shadow-lg opacity-80 hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* ★ 优化2：右侧点击翻页区 (悬浮显示提示) ★ */}
              <div 
                onClick={() => setCurrentPage(p => Math.max(1, Math.min(activeDoc.pages, p + 1)))}
                className={`absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity ${currentPage === activeDoc.pages ? 'hidden' : ''}`}
              >
                <div className="w-20 h-full flex items-center justify-center bg-gradient-to-l from-black/20 to-transparent">
                  <ChevronRight size={48} className="text-white drop-shadow-lg opacity-80 hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* 图片展示 (层级置于点击区下方) */}
              {activeDoc.images && activeDoc.images[currentPage - 1] ? (
                <img 
                  src={activeDoc.images[currentPage - 1]} 
                  alt={`${activeDoc.title} - Page ${currentPage}`} 
                  className="w-full h-full object-contain animate-in fade-in duration-500 relative z-10 select-none" 
                  draggable="false"
                />
              ) : (
                <div className="text-center opacity-30 animate-in fade-in relative z-10 select-none">
                  <BookOpen size={64} className="mx-auto mb-4 text-[#003366]" />
                  <p className="text-xl font-black text-[#003366]">{activeDoc.title}</p>
                  <p className="text-sm font-bold">Page {currentPage} Placeholder</p>
                  <p className="text-[10px] mt-4">※ 後日ここに画像アセットを配置します ※</p>
                </div>
              )}
              
            </div>
          </div>

          {/* 底部翻页控制器 (保留作为备用点击方式) */}
          <div className="mt-6 flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-white border border-slate-300 shadow-sm text-[#003366] font-black rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={16} /> 前へ
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, Math.min(activeDoc.pages, p + 1)))}
              disabled={currentPage === activeDoc.pages}
              className="px-6 py-2.5 bg-[#003366] text-white shadow-md font-black rounded hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              次へ <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 刊行物大厅界面 =================
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 anim-bg text-[#333]">
      
      <header className="text-center mb-16 border-b-2 border-[#003366] pb-8">
        <div className="w-16 h-16 bg-blue-50 border border-[#003366]/20 flex items-center justify-center mx-auto mb-6 rounded-full shadow-inner">
          <BookOpen size={32} className="text-[#003366]" />
        </div>
        <h1 className="text-4xl font-black text-[#003366] tracking-tight mb-3">刊行物・資料センター</h1>
        <p className="text-slate-500 font-bold text-sm">NCPD Official Publications & Civic Guidelines</p>
      </header>

      {/* 居中向下排列的列表区 */}
      <div className="space-y-8 relative">
        
        {/* 1. 公开刊物渲染 */}
        {publicPublications.map((pub) => (
          <div key={pub.id} className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-8 group">
            {/* 封面缩略图 */}
            <div className="w-full md:w-48 aspect-[3/4] bg-slate-100 shrink-0 border border-slate-200 overflow-hidden relative cursor-pointer" onClick={() => openReader(pub)}>
              <img src={pub.coverImg} className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" alt="Cover" />
              <div className="absolute inset-0 bg-[#003366]/0 group-hover:bg-[#003366]/10 transition-colors flex items-center justify-center">
                <div className="bg-[#003366] text-white text-[10px] font-black px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                  閲覧する (READ)
                </div>
              </div>
            </div>
            {/* 文本信息 */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-black px-2 py-1 border ${pub.tagColor}`}>{pub.type}</span>
                <span className="text-[10px] text-slate-400 font-bold font-mono">{pub.date}</span>
                <span className="text-[10px] text-slate-400 font-bold font-mono">全 {pub.pages} 頁</span>
              </div>
              <h3 className="text-2xl font-black text-[#003366] mb-1 group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => openReader(pub)}>
                {pub.title}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">{pub.sub}</p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {pub.desc}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4">
                <button onClick={() => openReader(pub)} className="text-sm font-black text-[#003366] hover:text-blue-600 flex items-center gap-1 transition-colors">
                  ▶ 今すぐ読む
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 2. 极密刊物 (带锁) */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-dashed border-slate-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f0f4f8] px-4 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={14} /> RESTRICTED AREA
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border-2 border-slate-800 shadow-2xl p-6 flex flex-col md:flex-row gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-900/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          
          <div className="w-full md:w-48 aspect-[3/4] bg-black shrink-0 border border-slate-700 relative flex flex-col items-center justify-center">
            <Lock size={32} className="text-rose-900/50 mb-2" />
            <p className="text-[10px] font-black text-rose-900/50 tracking-widest border border-rose-900/50 px-2 py-1">CLASSIFIED</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black px-2 py-1 border bg-rose-950/50 text-rose-500 border-rose-900">内部限定資料</span>
            </div>
            <h3 className="text-2xl font-black text-slate-200 mb-1">
              『警媛月刊 Officer Monthly』 Vol.69
            </h3>
            <p className="text-[10px] font-bold text-rose-800 tracking-widest uppercase mb-4">Internal Circulation Only</p>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              ※本資料は奈媛市中央警察署の内部関係者のみ閲覧可能です。市民への公開は固く禁じられています。閲覧には専用のアクセスコードが必要です。
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button onClick={() => setShowSecretModal(true)} className="text-sm font-black text-rose-600 hover:text-rose-400 flex items-center gap-2 transition-colors bg-rose-950/30 px-6 py-2 border border-rose-900/50 hover:bg-rose-900/30">
                <Lock size={16} /> 認証して閲覧する
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 极密刊物密码验证弹窗 */}
      {showSecretModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm anim-bg text-slate-200">
          <div className="relative w-full max-w-sm bg-slate-950 border border-rose-900 shadow-2xl p-8 anim-up text-center">
            <div className="w-16 h-16 bg-rose-950/30 flex items-center justify-center mx-auto mb-4 border border-rose-900/50 rounded-full">
              <ShieldCheck size={32} className="text-rose-700" />
            </div>
            <h3 className="text-xl font-black tracking-widest mb-2">内部システム認証</h3>
            <p className="text-xs text-slate-500 mb-6 font-bold leading-relaxed">
              『警媛月刊』の閲覧には<br/>統制局発行のアクセスコードが必要です。
            </p>
            
            <input 
              type="password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError("");}}
              placeholder="****"
              className="w-full bg-black border border-slate-800 text-center text-2xl tracking-[1em] py-3 text-rose-500 focus:outline-none focus:border-rose-700 mb-2 font-mono"
            />
            {error && <p className="text-[10px] text-rose-600 font-bold mb-4">{error}</p>}
            
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowSecretModal(false)} className="flex-1 py-3 bg-slate-900 text-slate-400 text-xs font-black hover:bg-slate-800 transition-colors">キャンセル</button>
              <button onClick={handleSecretUnlock} className="flex-1 py-3 bg-rose-900 text-white text-xs font-black hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/20">認証要求</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PublicationsView;
