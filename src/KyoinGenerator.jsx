import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, ShieldAlert, CheckCircle, UserPlus, Image as ImageIcon, Camera, PhoneCall, Code, Copy, X } from 'lucide-react';
import { useAppContext } from './AppContext';

const KyoinGenerator = ({ setActiveTab }) => {
  const { addOfficer, departments } = useAppContext(); 
  const deptOptions = [...departments.map(d => d.name), '地下拘留区(侍奉警媛)'];

  const [imageSrc, setImageSrc] = useState(null);
  const [hiddenImg1, setHiddenImg1] = useState(null);
  const [hiddenImg2, setHiddenImg2] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', rank: '巡査', age: 22, bust: 90, waist: 60, hip: 90, 
    dept: '地域課', basicInfo: '', profileText: '', bodyStatus: '単身', specialty: '本番行為'
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [detentionStats, setDetentionStats] = useState({ fatigue: 80, semen: 120, obedience: 100 });
  
  const [registerDispatch, setRegisterDispatch] = useState(false);
  const [dispatchMenu, setDispatchMenu] = useState({
    s1Name: '特別救済 (奉仕)', s1Price: 30000, s1Desc: 'AI生成の専用奉仕コース',
    s2Name: '深度救済 (中出し)', s2Price: 50000, s2Desc: '危険日応相談',
    a1Name: '顔面射精', a1Price: 5000,
    a2Name: '制服汚れ', a2Price: 8000
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // ★ 新增：代码导出弹窗状态
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCode, setExportCode] = useState("");
  const [copyStatus, setCopyStatus] = useState("コピー");

  const fileInputRef = useRef(null);
  const hidden1Ref = useRef(null);
  const hidden2Ref = useRef(null);

  const availableTags = ["大人気","NEW","TOP1","巨乳","母乳分泌","単身","未婚の母","既婚","新婚","婚約中","妊活中","彼氏あり","彼氏と同棲中","バツイチ","未亡人","パパ活中","処女","開発中","完全開発済","危険日","安全日","妊娠初期","妊娠中期","妊娠晚期","授乳中","搾乳期","托卵済","絶頂依存症","露出狂","反抗期","常時発情","絶頂中毒","肉便器","ドM","浮気中毒","死体愛好","薬物依存","氷恋", "薬物","人体改造","おじさん好き","呪い刻印","怪異憑依","体温異常","性病キャリア","複数感染中","梅毒治療中","有毒器官","投薬中","性病愛好者","免疫不全","便器熟女","公衆便所","精液処理専用","精液便所","汚物歓迎","完全肉便器","種付け待機","托卵希望","子宮発情中","無限中出し枠","中出し歓迎","反抗型","狂気", "処女処刑済", "特例採用",  "連続絶頂","肉体返済","淫語", "野外露出","生で中出し","体育会系", "乱交許可", "複数穴","不倫に溺れる","痴漢願望", "拘束"];

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => setter(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!imageSrc || !formData.name || !formData.profileText) {
      alert("【エラー】証拠写真、氏名、および極秘レコードの入力は必須です。");
      return;
    }
    setIsSubmitting(true);
    
    const customServices = [
      { id: "s1", name: dispatchMenu.s1Name, duration: "45分", price: Number(dispatchMenu.s1Price), desc: dispatchMenu.s1Desc },
      { id: "s2", name: dispatchMenu.s2Name, duration: "60分", price: Number(dispatchMenu.s2Price), desc: dispatchMenu.s2Desc }
    ];
    const customAddons = [
      { id: "a1", name: dispatchMenu.a1Name, price: Number(dispatchMenu.a1Price) },
      { id: "a2", name: dispatchMenu.a2Name, price: Number(dispatchMenu.a2Price) }
    ];

    addOfficer({
      name: formData.name, rank: formData.rank, dept: formData.dept,
      img: imageSrc, hiddenImg1: hiddenImg1, hiddenImg2: hiddenImg2,
      tags: selectedTags, basicInfo: formData.basicInfo, profileText: formData.profileText,
      age: formData.age, bust: formData.bust, waist: formData.waist, hip: formData.hip,
      fatigue: detentionStats.fatigue, semen: detentionStats.semen, obedience: detentionStats.obedience,
      todayHours: Math.floor(Math.random() * 10) + 14, weekHours: Math.floor(Math.random() * 50) + 80,
      registerDispatch: registerDispatch, bodyStatus: formData.bodyStatus, specialty: formData.specialty,
      services: customServices, addons: customAddons
    });
    
    setTimeout(() => {
      setIsSubmitting(false); setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false); setImageSrc(null); setHiddenImg1(null); setHiddenImg2(null);
        setFormData({ name: '', rank: '巡査', age: 22, bust: 90, waist: 60, hip: 90, dept: '地域課', basicInfo: '', profileText: '', bodyStatus: '単身', specialty: '本番行為' });
        setSelectedTags([]); setRegisterDispatch(false);
      }, 3500);
    }, 1500);
  };

  // ★ 核心新增：生成 data.js 格式的代码 ★
  const generateExportCode = () => {
    let code = `// ==========================================\n// 【${formData.name || '名称未設定'}】のデータ (CMSより出力)\n// ==========================================\n\n`;

    if (formData.dept === '地下拘留区(侍奉警媛)') {
      code += `// ▼ data.js -> detentionData.internal.roster に追加 ▼\n`;
      code += `{\n`;
      code += `  name: "${formData.name}", badge: "ID-XXXX", img: "[ここに画像URLを入力]", status: "新規配属",\n`;
      code += `  todayHours: 12.0, weekHours: 84, fatigue: ${detentionStats.fatigue}, semen: ${detentionStats.semen}, obedience: ${detentionStats.obedience},\n`;
      code += `  pregnant: ${selectedTags.includes('妊娠中') || selectedTags.includes('母乳分泌')},\n`;
      code += `  condition: "待機中",\n`;
      code += `  tags: ${JSON.stringify(selectedTags)},\n`;
      code += `  lore: \`${formData.profileText}\`,\n`;
      code += `  hiddenImg1: ${hiddenImg1 ? '"[極秘写真1のURLを入力]"' : '""'},\n`;
      code += `  hiddenImg2: ${hiddenImg2 ? '"[極秘写真2のURLを入力]"' : '""'}\n`;
      code += `},\n\n`;
    } else {
      code += `// ▼ data.js -> departments (id: "${formData.dept}") の roster に追加 ▼\n`;
      code += `{\n`;
      code += `  id: "ID-XXXX", name: "${formData.name}", rank: "${formData.rank}", role: "特例配属",\n`;
      code += `  age: ${formData.age}, size: "T160 / B${formData.bust} / W${formData.waist} / H${formData.hip}",\n`;
      code += `  img: "[ここに画像URLを入力]",\n`;
      code += `  basicInfo: "${formData.basicInfo}",\n`;
      code += `  hiddenInfo: \`${formData.profileText}\`,\n`;
      code += `  hiddenImg1: ${hiddenImg1 ? '"[極秘写真1のURLを入力]"' : '""'},\n`;
      code += `  hiddenImg2: ${hiddenImg2 ? '"[極秘写真2のURLを入力]"' : '""'}\n`;
      code += `},\n\n`;
    }

    if (registerDispatch) {
      code += `// ▼ data.js -> cast (緊急救済デリヘル) に追加 ▼\n`;
      code += `{\n`;
      code += `  name: "${formData.name}", age: ${formData.age}, bodyStatus: '${formData.bodyStatus}',\n`;
      code += `  rank: "${formData.rank}", dept: "${formData.dept}",\n`;
      code += `  size: "T160 / B${formData.bust} / W${formData.waist} / H${formData.hip}",\n`;
      code += `  shift: "12:00 - LAST", status: "待機中",\n`;
      code += `  img: "[ここに画像URLを入力]",\n`;
      code += `  surfaceBadges: ["NEW", "特例枠"],\n`;
      code += `  secretBadges: ${JSON.stringify(selectedTags.length ? selectedTags : ["NEW"])},\n`;
      code += `  dispatches: 0, surfaceRating: 4.5, secretRating: 4.8,\n`;
      code += `  specialty: "${formData.specialty}",\n`;
      code += `  services: [\n`;
      code += `    { id: "s1", name: "${dispatchMenu.s1Name}", duration: "45分", price: ${dispatchMenu.s1Price}, desc: "${dispatchMenu.s1Desc}" },\n`;
      code += `    { id: "s2", name: "${dispatchMenu.s2Name}", duration: "60分", price: ${dispatchMenu.s2Price}, desc: "${dispatchMenu.s2Desc}" }\n`;
      code += `  ],\n`;
      code += `  addons: [\n`;
      code += `    { id: "a1", name: "${dispatchMenu.a1Name}", price: ${dispatchMenu.a1Price} },\n`;
      code += `    { id: "a2", name: "${dispatchMenu.a2Name}", price: ${dispatchMenu.a2Price} }\n`;
      code += `  ]\n`;
      code += `},\n`;
    }

    setExportCode(code);
    setShowExportModal(true);
    setCopyStatus("コピー");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportCode);
    setCopyStatus("完了！");
    setTimeout(() => setCopyStatus("コピー"), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111] font-mono text-slate-300 animate-in fade-in duration-500 pb-20 relative">
      
      {/* 成功动画 */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#f4f1ea] border-8 border-rose-800 p-12 flex flex-col items-center animate-in zoom-in-50 relative shadow-[0_0_100px_rgba(225,29,72,0.6)]">
            <CheckCircle size={80} className="text-rose-700 mb-6" />
            <h2 className="text-4xl font-black text-rose-800 tracking-widest mb-2">採用承認完了</h2>
            <p className="text-rose-950 font-bold text-sm">対象のデータは、NCPDデータベースに正常に同期されました。</p>
            <div className="mt-8 px-6 py-2 bg-rose-800 text-white font-black tracking-widest text-2xl rotate-[-10deg] border-4 border-white shadow-xl">CONFIRMED</div>
          </div>
        </div>
      )}

      {/* ★ 新增：代码导出弹窗 ★ */}
      {showExportModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md anim-bg">
          <div className="bg-[#0a0508] border border-rose-900 w-full max-w-4xl shadow-[0_0_50px_rgba(225,29,72,0.2)] anim-up flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-rose-900/50 bg-[#11080c]">
              <h3 className="text-rose-500 font-black tracking-widest flex items-center gap-2"><Code size={18} /> data.js 出力コード (開発者用)</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-hidden flex flex-col flex-1">
              <p className="text-xs text-rose-300/70 mb-4 font-bold">
                ※ 以下のコードをコピーして、プロジェクトの <code>src/data.js</code> の対応する配列内に直接貼り付けてください。<br/>
                ※ 画像はBase64による肥大化を防ぐため、プレースホルダー <code>[ここに画像URLを入力]</code> に置換されています。
              </p>
              <textarea 
                value={exportCode} 
                readOnly 
                className="w-full flex-1 bg-[#111] border border-slate-800 text-emerald-400 p-4 font-mono text-xs whitespace-pre outline-none custom-scrollbar"
              />
            </div>

            <div className="p-4 border-t border-rose-900/50 bg-[#11080c] flex justify-end gap-4">
              <button onClick={() => setShowExportModal(false)} className="px-6 py-2 bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">閉じる</button>
              <button onClick={copyToClipboard} className="px-6 py-2 bg-emerald-700 text-white text-sm font-black flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-900/50">
                <Copy size={16} /> {copyStatus}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-[#000] border-b-2 border-rose-900 px-8 py-5 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <ShieldAlert size={28} className="text-rose-600" />
          <div>
            <h1 className="text-xl font-black tracking-widest text-slate-100">NCPD 地下統制局 - 拡張警媛登録ターミナル</h1>
            <p className="text-xs text-rose-500 font-bold tracking-widest mt-1">HR Data Intake CMS v5.0 (Data Export Supported)</p>
          </div>
        </div>
        <button onClick={() => setActiveTab('home')} className="text-xs font-bold bg-[#222] border border-[#444] hover:bg-rose-900 hover:border-rose-700 text-white px-6 py-2 transition-all">◀ ホームに戻る</button>
      </header>

      <div className="max-w-[1500px] mx-auto mt-8 px-6 flex flex-col xl:flex-row gap-8">
        
        {/* 左侧：表世界数据 */}
        <div className="w-full xl:w-[480px] shrink-0 space-y-6">
          <div className="bg-[#1a1a1a] border border-[#333] p-6 shadow-2xl">
            <h3 className="text-rose-500 font-black text-sm mb-4 border-b border-[#333] pb-2 flex items-center gap-2"><ImageIcon size={16}/> 表世界・公開宣材写真</h3>
            <div onClick={() => fileInputRef.current?.click()} className={`w-full aspect-[3/4] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${imageSrc ? 'border-rose-800 bg-black' : 'border-[#444] hover:border-rose-500'}`}>
              {imageSrc ? <img src={imageSrc} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" alt="Main" /> : <div className="text-center p-8"><UploadCloud size={40} className="mx-auto text-slate-600 mb-2 group-hover:text-rose-500" /><p className="text-slate-400 text-xs font-bold">画像アップロード</p></div>}
              <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => handleImageUpload(e, setImageSrc)} className="hidden" />
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333] p-6 space-y-4 shadow-2xl">
            <h3 className="text-rose-500 font-black text-sm border-b border-[#333] pb-2 flex items-center gap-2"><UserPlus size={16}/> 基礎メタデータ</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] text-slate-500 font-bold block mb-1">氏名</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#444] p-2.5 text-sm text-white outline-none focus:border-rose-500" placeholder="例: 鈴木 美羽" />
              </div>
              <div className="w-24">
                <label className="text-[10px] text-slate-500 font-bold block mb-1">年齢</label>
                <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#444] p-2.5 text-sm text-white outline-none focus:border-rose-500" />
              </div>
              <div className="w-32">
                <label className="text-[10px] text-slate-500 font-bold block mb-1">階級 (Rank)</label>
                <input type="text" value={formData.rank} onChange={(e) => setFormData({...formData, rank: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#444] p-2.5 text-sm text-white outline-none focus:border-rose-500" placeholder="巡査" />
              </div>
            </div>
            
            <div>
              <label className="text-[10px] text-slate-500 font-bold block mb-1">配属先</label>
              <select value={formData.dept} onChange={(e) => setFormData({...formData, dept: e.target.value})} className="w-full bg-[#0a0a0a] border border-[#444] p-2.5 text-sm text-white outline-none focus:border-rose-500">
                {deptOptions.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 font-bold block mb-1">スリーサイズ (B / W / H)</label>
              <div className="flex gap-2">
                <input type="number" value={formData.bust} onChange={e=>setFormData({...formData, bust: e.target.value})} className="w-1/3 bg-[#0a0a0a] border border-[#444] p-2 text-sm text-center text-rose-300" placeholder="B"/>
                <input type="number" value={formData.waist} onChange={e=>setFormData({...formData, waist: e.target.value})} className="w-1/3 bg-[#0a0a0a] border border-[#444] p-2 text-sm text-center text-rose-300" placeholder="W"/>
                <input type="number" value={formData.hip} onChange={e=>setFormData({...formData, hip: e.target.value})} className="w-1/3 bg-[#0a0a0a] border border-[#444] p-2 text-sm text-center text-rose-300" placeholder="H"/>
              </div>
            </div>

            {formData.dept === '地下拘留区(侍奉警媛)' && (
              <div className="bg-rose-950/20 border border-rose-900/50 p-4 mt-4 space-y-3">
                <h4 className="text-[10px] font-bold text-rose-500 mb-2">地下拘留区 専属ステータス</h4>
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400 mb-1"><span>肉体疲労度</span><span>{detentionStats.fatigue}%</span></div>
                  <input type="range" min="0" max="150" value={detentionStats.fatigue} onChange={(e) => setDetentionStats({...detentionStats, fatigue: Number(e.target.value)})} className="w-full accent-rose-600" />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400 mb-1"><span>精液収容量</span><span>{detentionStats.semen}ml</span></div>
                  <input type="range" min="0" max="300" value={detentionStats.semen} onChange={(e) => setDetentionStats({...detentionStats, semen: Number(e.target.value)})} className="w-full accent-white" />
                </div>
                <div>
                  <div className="flex justify-between text-[9px] text-slate-400 mb-1"><span>精神従順度</span><span>{detentionStats.obedience}%</span></div>
                  <input type="range" min="0" max="200" value={detentionStats.obedience} onChange={(e) => setDetentionStats({...detentionStats, obedience: Number(e.target.value)})} className="w-full accent-blue-600" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：文案与动态菜单 */}
        <div className="flex-1 flex flex-col gap-6">
          
          <div className="bg-[#1a1a1a] border border-[#333] shadow-2xl p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-blue-400 font-black text-sm flex items-center gap-2 mb-2"><FileText size={16}/> 公開プロファイル (表世界での紹介文)</h3>
              <textarea value={formData.basicInfo} onChange={(e) => setFormData({...formData, basicInfo: e.target.value})} className="w-full h-20 bg-[#0a0a0a] border border-[#444] p-4 text-slate-300 text-xs leading-relaxed resize-none outline-none focus:border-blue-500 custom-scrollbar"/>
            </div>
            <div>
              <h3 className="text-rose-500 font-black text-[10px] mb-2">特記タグ (最大5個)</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`text-[10px] font-bold px-3 py-1 border transition-all ${selectedTags.includes(tag) ? 'bg-rose-900/40 border-rose-500 text-rose-300' : 'bg-[#111] border-[#333] text-slate-500'}`}>#{tag}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0a0508] border border-rose-900/50 shadow-2xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-rose-900/30 pb-3">
              <h3 className="text-rose-500 font-black text-sm flex items-center gap-2"><PhoneCall size={16}/> 緊急救済 (Dispatch) システム同期</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs font-bold text-slate-400">システムに登録する</span>
                <input type="checkbox" checked={registerDispatch} onChange={(e) => setRegisterDispatch(e.target.checked)} className="w-4 h-4 accent-rose-600" />
              </label>
            </div>

            {registerDispatch ? (
              <div className="space-y-4 animate-in slide-in-from-top-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] text-rose-400 font-bold block mb-1">肉体ステータス</label>
                    <input type="text" value={formData.bodyStatus} onChange={e=>setFormData({...formData, bodyStatus: e.target.value})} className="w-full bg-[#111] border border-rose-900/30 p-2 text-xs text-rose-100 outline-none focus:border-rose-500" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-rose-400 font-bold block mb-1">特技</label>
                    <input type="text" value={formData.specialty} onChange={e=>setFormData({...formData, specialty: e.target.value})} className="w-full bg-[#111] border border-rose-900/30 p-2 text-xs text-rose-100 outline-none focus:border-rose-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rose-950/20 border border-rose-900/30 p-3 space-y-2">
                    <span className="text-[9px] font-black text-rose-500 bg-rose-900/30 px-1">専用コース 1</span>
                    <input type="text" value={dispatchMenu.s1Name} onChange={e=>setDispatchMenu({...dispatchMenu, s1Name: e.target.value})} className="w-full bg-transparent border-b border-rose-900/50 text-xs text-white outline-none" placeholder="コース名"/>
                    <div className="flex gap-2">
                      <input type="number" value={dispatchMenu.s1Price} onChange={e=>setDispatchMenu({...dispatchMenu, s1Price: e.target.value})} className="w-1/2 bg-transparent border-b border-rose-900/50 text-xs text-rose-300 outline-none" placeholder="価格(円)"/>
                    </div>
                    <input type="text" value={dispatchMenu.s1Desc} onChange={e=>setDispatchMenu({...dispatchMenu, s1Desc: e.target.value})} className="w-full bg-transparent border-b border-rose-900/50 text-[10px] text-slate-400 outline-none" placeholder="内容説明"/>
                  </div>
                  <div className="bg-rose-950/20 border border-rose-900/30 p-3 space-y-2">
                    <span className="text-[9px] font-black text-rose-500 bg-rose-900/30 px-1">専用コース 2</span>
                    <input type="text" value={dispatchMenu.s2Name} onChange={e=>setDispatchMenu({...dispatchMenu, s2Name: e.target.value})} className="w-full bg-transparent border-b border-rose-900/50 text-xs text-white outline-none" placeholder="コース名"/>
                    <div className="flex gap-2">
                      <input type="number" value={dispatchMenu.s2Price} onChange={e=>setDispatchMenu({...dispatchMenu, s2Price: e.target.value})} className="w-1/2 bg-transparent border-b border-rose-900/50 text-xs text-rose-300 outline-none" placeholder="価格(円)"/>
                    </div>
                    <input type="text" value={dispatchMenu.s2Desc} onChange={e=>setDispatchMenu({...dispatchMenu, s2Desc: e.target.value})} className="w-full bg-transparent border-b border-rose-900/50 text-[10px] text-slate-400 outline-none" placeholder="内容説明"/>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 bg-rose-950/20 border border-rose-900/30 p-2 flex items-center gap-2">
                    <span className="text-[9px] text-rose-500 font-bold whitespace-nowrap">追加OP1</span>
                    <input type="text" value={dispatchMenu.a1Name} onChange={e=>setDispatchMenu({...dispatchMenu, a1Name: e.target.value})} className="w-full bg-transparent border-b border-rose-900/50 text-[10px] text-white outline-none" placeholder="オプション名"/>
                    <input type="number" value={dispatchMenu.a1Price} onChange={e=>setDispatchMenu({...dispatchMenu, a1Price: e.target.value})} className="w-16 bg-transparent border-b border-rose-900/50 text-[10px] text-rose-300 outline-none text-right" placeholder="円"/>
                  </div>
                  <div className="flex-1 bg-rose-950/20 border border-rose-900/30 p-2 flex items-center gap-2">
                    <span className="text-[9px] text-rose-500 font-bold whitespace-nowrap">追加OP2</span>
                    <input type="text" value={dispatchMenu.a2Name} onChange={e=>setDispatchMenu({...dispatchMenu, a2Name: e.target.value})} className="w-full bg-transparent border-b border-rose-900/50 text-[10px] text-white outline-none" placeholder="オプション名"/>
                    <input type="number" value={dispatchMenu.a2Price} onChange={e=>setDispatchMenu({...dispatchMenu, a2Price: e.target.value})} className="w-16 bg-transparent border-b border-rose-900/50 text-[10px] text-rose-300 outline-none text-right" placeholder="円"/>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-16 flex items-center justify-center border-2 border-dashed border-[#333]">
                <p className="text-[10px] text-slate-500">チェックを入れると、この警媛専用のデリヘルメニューを構築できます。</p>
              </div>
            )}
          </div>

          <div className="flex-1 bg-[#1a1a1a] border border-rose-900/30 shadow-2xl flex flex-col p-6">
            <div className="flex gap-4 mb-4">
              <div onClick={() => hidden1Ref.current?.click()} className={`w-24 h-24 border border-dashed flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${hiddenImg1 ? 'border-pink-500' : 'border-rose-900/50 hover:border-pink-500'}`}>
                {hiddenImg1 ? <img src={hiddenImg1} className="w-full h-full object-cover" alt="H1" /> : <Camera size={16} className="text-rose-800"/>}
                <input type="file" ref={hidden1Ref} onChange={(e) => handleImageUpload(e, setHiddenImg1)} className="hidden" />
              </div>
              <div onClick={() => hidden2Ref.current?.click()} className={`w-24 h-24 border border-dashed flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group ${hiddenImg2 ? 'border-pink-500' : 'border-rose-900/50 hover:border-pink-500'}`}>
                {hiddenImg2 ? <img src={hiddenImg2} className="w-full h-full object-cover" alt="H2" /> : <Camera size={16} className="text-rose-800"/>}
                <input type="file" ref={hidden2Ref} onChange={(e) => handleImageUpload(e, setHiddenImg2)} className="hidden" />
              </div>
              <div className="flex-1">
                <h3 className="text-rose-500 font-black text-sm flex items-center gap-2 mb-2"><ShieldAlert size={16}/> 極秘レコード (N.F 深層情報)</h3>
                <p className="text-[10px] text-slate-500">※左側の枠に裏の顔の写真をアップロード可能</p>
              </div>
            </div>
            <textarea value={formData.profileText} onChange={(e) => setFormData({...formData, profileText: e.target.value})} className="flex-1 w-full bg-[#0a0508] border border-rose-900/30 p-5 text-pink-100/80 text-sm font-serif leading-loose resize-none outline-none focus:border-pink-500 custom-scrollbar" placeholder="ここに Gemini で生成した【極秘レコード】を貼り付け。"/>
          </div>

          {/* ★ 核心修改：新增【导出代码】按钮 ★ */}
          <div className="flex justify-end mt-2 gap-4">
            <button 
              onClick={generateExportCode} 
              className="px-6 py-4 font-black text-sm tracking-widest flex items-center gap-2 transition-all bg-[#1a1a1a] border border-[#444] text-slate-300 hover:text-white hover:border-blue-500 hover:bg-[#222]"
            >
              <Code size={18} /> data.js コード出力
            </button>
            
            <button 
              onClick={handleSubmit} 
              disabled={isSubmitting} 
              className={`px-10 py-4 font-black text-lg tracking-widest flex items-center gap-3 transition-all ${isSubmitting ? 'bg-rose-900 text-rose-400' : 'bg-gradient-to-r from-rose-800 to-pink-700 text-white hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.4)]'}`}
            >
              <CheckCircle size={20} /> システムに登録
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KyoinGenerator;
