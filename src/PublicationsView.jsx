// src/PublicationsView.jsx
import React, { useState } from "react";
import {
  BookOpen,
  ShieldCheck,
  Lock,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  ShoppingCart,
  ShieldAlert,
} from "lucide-react";
import { publicPublications, secretPublication } from "./data";

const PublicationsView = ({ setActiveTab }) => {
  const [activeDoc, setActiveDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSecretHubUnlocked, setIsSecretHubUnlocked] = useState(false);

  const handleSecretUnlock = () => {
    if (password === "0000" || password === "1234") {
      setShowSecretModal(false);
      setPassword("");
      setIsSecretHubUnlocked(true);
    } else {
      setError("認証失敗: アクセス権限がありません。");
    }
  };

  const openReader = (doc) => {
    setActiveDoc(doc);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  // ================= 1. 电子阅读器界面 =================
  if (activeDoc) {
    const currentIssue = activeDoc.issues
      ? activeDoc.issues[currentPage - 1]
      : null;
    const currentImg = currentIssue
      ? currentIssue.img
      : activeDoc.images
      ? activeDoc.images[currentPage - 1]
      : null;

    return (
      <div className="bg-[#f0f4f8] min-h-[calc(100vh-80px)] flex flex-col font-sans text-[#333] anim-bg">
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveDoc(null)}
              className="flex items-center gap-2 text-slate-500 hover:text-[#003366] font-bold text-sm bg-slate-50 px-4 py-2 rounded-lg border hover:bg-blue-50 transition-colors"
            >
              <ChevronLeft size={16} /> 書庫に戻る
            </button>
            <div className="h-6 w-px bg-slate-300 mx-2"></div>
            <div>
              <h2 className="text-lg font-black text-[#003366] leading-none flex items-center gap-2">
                {activeDoc.isSecret && (
                  <Lock size={16} className="text-rose-600" />
                )}
                {activeDoc.title}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {activeDoc.sub}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded border border-slate-200">
              PAGE {currentPage} / {activeDoc.pages}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center bg-slate-200/50">
          <div className="flex flex-col md:flex-row items-stretch justify-center shadow-2xl max-w-full">
            <div className="h-[75vh] min-h-[500px] max-h-[900px] aspect-[1/1.414] bg-white relative flex flex-col border-y border-l border-slate-200 shrink-0">
              <div className="absolute top-4 right-6 text-slate-400 text-xs font-mono z-30 bg-white/80 px-2 py-1 rounded shadow-sm">
                - {currentPage} -
              </div>
              <div className="flex-1 flex items-center justify-center bg-slate-50 border-8 border-white overflow-hidden relative group">
                <div
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity ${
                    currentPage === 1 ? "hidden" : ""
                  }`}
                >
                  <div className="w-20 h-full flex items-center justify-center bg-gradient-to-r from-black/20 to-transparent">
                    <ChevronLeft
                      size={48}
                      className="text-white drop-shadow-lg opacity-80 hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                <div
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.max(1, Math.min(activeDoc.pages, p + 1))
                    )
                  }
                  className={`absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-pointer flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity ${
                    currentPage === activeDoc.pages ? "hidden" : ""
                  }`}
                >
                  <div className="w-20 h-full flex items-center justify-center bg-gradient-to-l from-black/20 to-transparent">
                    <ChevronRight
                      size={48}
                      className="text-white drop-shadow-lg opacity-80 hover:scale-110 transition-transform"
                    />
                  </div>
                </div>
                {currentImg ? (
                  <img
                    src={currentImg}
                    alt={`Page ${currentPage}`}
                    className="w-full h-full object-contain animate-in fade-in duration-500 relative z-10 select-none"
                    draggable="false"
                  />
                ) : (
                  <div className="text-center opacity-30 animate-in fade-in relative z-10 select-none">
                    <BookOpen
                      size={64}
                      className="mx-auto mb-4 text-[#003366]"
                    />
                    <p className="text-xl font-black text-[#003366]">
                      {activeDoc.title}
                    </p>
                    <p className="text-[10px] mt-4 font-black">
                      ※ 画像データ未登録 ※
                    </p>
                  </div>
                )}
              </div>
            </div>
            {currentIssue && (
              <div className="w-full md:w-80 lg:w-96 bg-white border-y border-r border-slate-200 p-8 flex flex-col shrink-0 overflow-y-auto custom-scrollbar relative">
                <div className="absolute top-8 right-8 border-4 border-rose-600/20 text-rose-600/20 text-2xl font-black px-4 py-1 rotate-[15deg] pointer-events-none uppercase tracking-widest">
                  Classified
                </div>
                <p className="text-rose-700 font-black text-xs mb-3 uppercase tracking-widest border-b border-rose-100 pb-2 w-fit">
                  {currentIssue.id}
                </p>
                <h3 className="text-2xl font-black text-[#003366] mb-6 leading-tight">
                  {currentIssue.title}
                </h3>
                <div className="w-8 h-1 bg-blue-100 mb-6"></div>
                <p className="text-sm text-slate-700 leading-relaxed font-serif whitespace-pre-line relative z-10">
                  {currentIssue.content}
                </p>
              </div>
            )}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-white border border-slate-300 shadow-sm text-[#003366] font-black rounded hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={16} /> 前のページ
            </button>
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.max(1, Math.min(activeDoc.pages, p + 1))
                )
              }
              disabled={currentPage === activeDoc.pages}
              className="px-6 py-2.5 bg-[#003366] text-white shadow-md font-black rounded hover:bg-[#002244] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              次のページ <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 2. 内部秘密阅览室 (Secret Hub 中间页) =================
  if (isSecretHubUnlocked) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-6 anim-bg text-[#333]">
        <header className="flex justify-end items-end mb-12 border-b-2 border-rose-900/20 pb-4">
          <button
            onClick={() => setIsSecretHubUnlocked(false)}
            className="text-xs font-bold text-slate-500 hover:text-[#003366] border border-slate-300 px-4 py-2 bg-white flex items-center gap-2 transition-colors shadow-sm"
          >
            <ChevronLeft size={14} /> 一般公開エリアへ戻る
          </button>
        </header>

        <div className="space-y-8">
          <div className="bg-white border-2 border-rose-900/10 shadow-xl p-8 flex flex-col md:flex-row items-start gap-10 relative overflow-hidden group">
            <div className="w-full md:w-64 shrink-0 aspect-[3/4] border border-slate-200 relative shadow-md overflow-hidden bg-slate-100 self-start">
              <img
                src={secretPublication.coverImg}
                className="w-full h-full object-cover"
                alt="Secret Cover"
              />

              <div className="absolute top-5 -right-12 w-40 bg-rose-600 text-white font-black py-1.5 text-[10px] tracking-widest rotate-45 text-center z-10 border border-rose-900/50 drop-shadow-[0_15px_30px_rgba(190,24,93,0.7)] translate-y-[-2px]">
                NEW ISSUE
              </div>
              <div className="absolute bottom-0 right-0 bg-black/80 text-rose-500 border-t border-l border-rose-900/50 text-[10px] font-mono px-2 py-1 z-10">
                VOL.69
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-start w-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black px-2 py-1 bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <Lock size={10} /> {secretPublication.type}
                </span>
                <span className="text-[10px] text-slate-500 font-bold font-mono">
                  発行: {secretPublication.date}
                </span>
                <span className="text-[10px] text-slate-500 font-bold font-mono">
                  全 {secretPublication.pages} 頁
                </span>
              </div>

              <h3 className="text-3xl font-black text-[#003366] mb-2">
                {secretPublication.title}
              </h3>
              <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-6">
                {secretPublication.sub}
              </p>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded mb-4 relative">
                <p className="text-sm text-slate-600 leading-relaxed font-medium relative z-10">
                  {secretPublication.desc}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded mb-6 relative">
                <div className="flex flex-col">
                  {secretPublication.issueDetails?.map((detail, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start sm:items-center gap-6 ${
                        idx !==
                        (secretPublication.issueDetails?.length || 0) - 1
                          ? "border-b border-dashed border-slate-300 pb-3 mb-3"
                          : ""
                      }`}
                    >
                      <span className="font-bold text-slate-700 w-20 shrink-0 text-[13px]">
                        {detail.label}
                      </span>
                      <span
                        className={`text-[13px] leading-relaxed ${
                          detail.label === "頒布価格"
                            ? "font-bold text-rose-700"
                            : "text-slate-600 font-medium"
                        }`}
                      >
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} className="text-slate-400" />
                  <span className="text-sm font-black text-rose-700">
                    {secretPublication.price}
                  </span>
                </div>
                <button
                  onClick={() => openReader(secretPublication)}
                  className="w-full sm:w-auto px-10 py-3 bg-[#003366] text-white font-black shadow-lg hover:bg-blue-800 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <BookOpen size={18} /> 本編を閲覧する
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= 3. 一般刊行物大厅界面 (默认主页) =================
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 anim-bg text-[#333]">
      <header className="text-center mb-16 border-b-2 border-[#003366] pb-8">
        <div className="w-16 h-16 bg-blue-50 border border-[#003366]/20 flex items-center justify-center mx-auto mb-6 rounded-full shadow-inner">
          <BookOpen size={32} className="text-[#003366]" />
        </div>
        <h1 className="text-4xl font-black text-[#003366] tracking-tight mb-3">
          刊行物・資料センター
        </h1>
        <p className="text-slate-500 font-bold text-sm">
          NCPD Official Publications & Civic Guidelines
        </p>
      </header>

      <div className="space-y-8 relative">
        {publicPublications.map((pub) => (
          <div
            key={pub.id}
            className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row items-start gap-8 group"
          >
            <div
              className="w-full md:w-48 aspect-[3/4] bg-slate-100 shrink-0 border border-slate-200 overflow-hidden relative cursor-pointer self-start"
              onClick={() => openReader(pub)}
            >
              <img
                src={pub.coverImg}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                alt="Cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center w-full">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`text-[10px] font-black px-2 py-1 border ${pub.tagColor}`}
                >
                  {pub.type}
                </span>
                <span className="text-[10px] text-slate-400 font-bold font-mono">
                  {pub.date}
                </span>
                <span className="text-[10px] text-slate-400 font-bold font-mono">
                  全 {pub.pages} 頁
                </span>
              </div>
              <h3
                className="text-2xl font-black text-[#003366] mb-1 group-hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => openReader(pub)}
              >
                {pub.title}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-4">
                {pub.sub}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {pub.desc}
              </p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex gap-4">
                <button
                  onClick={() => openReader(pub)}
                  className="text-sm font-black text-[#003366] hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  ▶ 今すぐ読む
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-16 relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-dashed border-slate-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#f0f4f8] px-4 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={14} /> RESTRICTED AREA
            </span>
          </div>
        </div>

        <div className="bg-slate-900 border-2 border-slate-800 shadow-2xl p-6 flex flex-col md:flex-row items-start gap-8 relative overflow-hidden group">
          <div className="w-full md:w-48 aspect-[3/4] bg-black shrink-0 border border-slate-700 relative flex flex-col items-center justify-center self-start">
            <Lock size={32} className="text-rose-900/50 mb-2" />
            <p className="text-[10px] font-black text-rose-900/50 tracking-widest border border-rose-900/50 px-2 py-1">
              CLASSIFIED
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-center relative z-10 w-full">
            <h3 className="text-2xl font-black text-slate-200 mb-1">
              『警媛月刊 Officer Monthly』 データベース
            </h3>
            <p className="text-[10px] font-bold text-rose-800 tracking-widest uppercase mb-4">
              Internal Access Only
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              ※本資料庫は奈媛市中央警察署の内部関係者のみアクセス可能です。専用のアクセスコードを入力して、内部限定資料アーカイブへ入場してください。
            </p>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowSecretModal(true)}
                className="text-sm font-black text-rose-600 hover:text-rose-400 flex items-center gap-2 transition-colors bg-rose-950/30 px-6 py-2 border border-rose-900/50 hover:bg-rose-900/30"
              >
                <Lock size={16} /> 認証してアクセス
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSecretModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm anim-bg text-slate-200">
          <div className="relative w-full max-w-sm bg-slate-950 border border-rose-900 shadow-2xl p-8 anim-up text-center">
            <div className="w-16 h-16 bg-rose-950/30 flex items-center justify-center mx-auto mb-4 border border-rose-900/50 rounded-full">
              <ShieldCheck size={32} className="text-rose-700" />
            </div>
            <h3 className="text-xl font-black tracking-widest mb-2">
              内部システム認証
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-bold leading-relaxed">
              内部限定資料アーカイブへの入場には
              <br />
              統制局発行のアクセスコードが必要です。
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="****"
              className="w-full bg-black border border-slate-800 text-center text-2xl tracking-[1em] py-3 text-rose-500 focus:outline-none focus:border-rose-700 mb-2 font-mono"
            />
            {error && (
              <p className="text-[10px] text-rose-600 font-bold mb-4">
                {error}
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSecretModal(false)}
                className="flex-1 py-3 bg-slate-900 text-slate-400 text-xs font-black hover:bg-slate-800 transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleSecretUnlock}
                className="flex-1 py-3 bg-rose-900 text-white text-xs font-black hover:bg-rose-800 transition-colors shadow-lg shadow-rose-900/20"
              >
                認証要求
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicationsView;
