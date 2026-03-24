

// ==========================================
// 2. 根组件与路由调度 (Root & Router)
// ==========================================
const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedOfficer, setSelectedOfficer] = useState(null);

  // 当进入 N.F 平台时，直接挂载专属全屏视图，隐藏主站头部底部
  if (activeTab === "nf-platform") {
    return <NFPlatformView setActiveTab={setActiveTab} />;
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
      // ▼ 修改这里：让 publications 指向新大厅 ▼
      case "publications":
        return <PublicationsView setActiveTab={setActiveTab} />;
      // ▼ 新增这里：大厅验证密码成功后，跳转到里世界杂志 ▼  
      case "secret-magazine":
        return <DetentionView targetTab="magazine" />;
      // ▼ 修改 2：给 detention 加上 detention 参数 ▼
      case "detention":
        return <DetentionView targetTab="detention" />;

      // ★ 新增的这三行，接通生成器！★
      case "generator":
        return <KyoinGenerator setActiveTab={setActiveTab} />;

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
    <AppProvider>
    <div className="min-h-screen font-sans bg-[#f4f7f9] text-[#333] transition-colors duration-500 text-left">
      {/* 门户头部 */}
      <header className="sticky top-0 z-[100] border-b-4 bg-white border-[#003366] shadow-sm">
        <div className="max-w-[1600px] mx-auto px-10">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setActiveTab("home")}
            >
              {/* 替换后的专属警徽 */}
              <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setActiveTab("home")}
                >
                  {/* ★ 核心修改：这里放你的警徽图片 ★ */}
                  <img
                    src="https://i.postimg.cc/y6tDFhgY/jing-ju-jing-hui-suo-xiao-tu.png" // ← 把这里换成你的图片地址！
                    alt="NCPD Logo"
                    className="w-12 h-12 object-contain group-hover:scale-105 group-hover:drop-shadow-md transition-all duration-300"
                  />

                  <div>
                    <h1 className="text-xl font-black text-[#003366] tracking-widest group-hover:text-blue-700 transition-colors">
                      奈媛市中央警察署
                    </h1>
                    <p className="text-[10px] font-bold text-slate-500 tracking-widest">
                      Naine Central Police Department
                    </p>
                  </div>
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
    </AppProvider>
  );
};

// ==========================================
// 紧急救济派单视图 (终极细节打磨版：专属菜单 + 防遮挡)
// ==========================================
const DispatchView = ({ setSelectedOfficer }) => {
  // ★ 新增：引入全局中枢的派单名单
  const { dispatchCast } = useAppContext();
  const [clickCount, setClickCount] = useState(0);
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [idInput, setIdInput] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const [callingOfficer, setCallingOfficer] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [hasPendingDispatch, setHasPendingDispatch] = useState(false);

  // 动态读取当前女警的专属菜单
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // ★ 修改：把原来的 slots 逻辑，换成使用动态的 dispatchCast
  // 并且保证哪怕你加了很多人，格子也会自动以 5 的倍数扩充！
  const totalSlots = Math.max(10, Math.ceil(dispatchCast.length / 5) * 5);
  const slots = Array.from(
    { length: totalSlots },
    (_, i) => dispatchCast[i] || { isPlaceholder: true }
  );

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
      setVerifyError("認証失敗: マイナンバー(12桁の数字)を確認してください。");
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

  // 打开弹窗并初始化专属菜单
  const openForm = (off) => {
    setCallingOfficer(off);
    const services = off.services || dispatchData.secret.services;
    setSelectedService(services[0]);
    setSelectedAddons([]);
  };

  const closeForm = () => {
    setCallingOfficer(null);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    if (selectedAddons.find((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    return (
      selectedService.price +
      selectedAddons.reduce((sum, a) => sum + a.price, 0)
    );
  };

  const getStatusDisplay = (status, shift) => {
    if (shift === "勤務終了")
      return {
        color: "bg-amber-400",
        text: isSecretMode ? "🟡 ザーメン処理・補給中" : "🟡 返回警局補給中",
        disable: true,
      };
    if (status === "待機中")
      return {
        color: "bg-emerald-500",
        text: isSecretMode ? "🟢 待機中 / 奉仕可能" : "🟢 待機中 / 可呼叫",
        disable: false,
      };
    if (status === "出動中")
      return {
        color: "bg-rose-500",
        text: isSecretMode ? "🔴 接客中 / 中出し奉仕中" : "🔴 正在執行救濟任務",
        disable: true,
      };
    return { color: "bg-slate-400", text: "⚪ 状態不明", disable: true };
  };

  const renderStars = (rating, isSecret) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="relative w-3 h-3">
            <Star
              size={12}
              className={isSecret ? "text-rose-200" : "text-slate-200"}
            />
            {(i < fullStars || (i === fullStars && hasHalf)) && (
              <div
                className={`absolute inset-0 overflow-hidden ${
                  i === fullStars && hasHalf ? "w-1/2" : "w-full"
                }`}
              >
                <Star
                  size={12}
                  className={
                    isSecret
                      ? "text-rose-500 fill-rose-500"
                      : "text-amber-400 fill-amber-400"
                  }
                />
              </div>
            )}
          </div>
        ))}
        <span
          className={`text-[10px] font-mono ml-1 font-bold ${
            isSecret ? "text-rose-700" : "text-slate-500"
          }`}
        >
          {Number(rating).toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <>
      {isSecretMode && (
        <div
          className="fixed inset-0 bg-[#fff5f8] transition-colors duration-1000"
          style={{ zIndex: 0 }}
        />
      )}

      <div
        className={`relative z-10 py-6 animate-in fade-in duration-1000 min-h-screen transition-colors duration-700 ${
          isSecretMode ? "text-rose-950" : "text-[#333]"
        }`}
      >
        {/* 1. 身份验证弹窗 */}
        {showVerifyModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fff5f8]/90 backdrop-blur-sm">
            <div className="bg-white border-2 border-rose-800 p-8 w-full max-w-md shadow-[0_0_50px_rgba(225,29,72,0.15)] animate-in zoom-in-95 font-serif">
              <div className="flex items-center justify-center gap-3 mb-6 text-rose-800 border-b border-rose-200 pb-4">
                <Lock size={24} className="animate-pulse" />
                <h3 className="text-xl font-black tracking-widest">
                  特例奉仕・アクセス認証
                </h3>
              </div>
              <p className="text-xs text-rose-900/70 mb-4 leading-relaxed text-center font-bold">
                【機密】これより先は特例性欲処理統制局の管轄となります。
                <br />
                市民ID（マイナンバー12桁）を入力してください。
              </p>
              <input
                type="text"
                maxLength={12}
                placeholder="0000 0000 0000"
                value={idInput}
                onChange={(e) => {
                  setIdInput(e.target.value);
                  setVerifyError("");
                }}
                className="w-full bg-rose-50 border-2 border-rose-200 text-rose-900 font-black text-center text-xl tracking-[0.5em] py-4 mb-2 focus:outline-none focus:border-rose-500"
              />
              {verifyError && (
                <p className="text-[10px] text-rose-600 mb-4 text-center font-bold">
                  {verifyError}
                </p>
              )}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="flex-1 py-3 bg-white border border-rose-200 text-rose-400 font-bold hover:bg-rose-50"
                >
                  破棄
                </button>
                <button
                  onClick={handleVerify}
                  className="flex-1 py-3 bg-rose-800 text-white font-black hover:bg-rose-900 shadow-lg active:scale-95 transition-all"
                >
                  認証・接続
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. 派单成功提示弹窗 */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div
              className={`w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 border text-center ${
                isSecretMode
                  ? "bg-white border-2 border-rose-800"
                  : "bg-white border-blue-200"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  isSecretMode
                    ? "bg-rose-100 text-rose-600"
                    : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <CheckCircle size={32} />
              </div>
              <h3
                className={`text-2xl font-black mb-4 ${
                  isSecretMode ? "text-rose-900" : "text-[#003366]"
                }`}
              >
                要請受理完了
              </h3>
              <p
                className={`text-sm leading-relaxed mb-8 font-bold ${
                  isSecretMode ? "text-rose-900/60" : "text-slate-500"
                }`}
              >
                {isSecretMode
                  ? "対象の雌犬（警察官）への派遣要請が確定しました。\n現在の奉仕業務が完了するまで、追加の要請はロックされます。\n準備をしてお待ちください。"
                  : "警察署は現在の救援要請を受領しています。\n現在の派遣業務が完了するまでは。\n一時的に再リクエストの送信はできません。"}
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className={`w-full py-3 font-bold transition-colors active:scale-95 ${
                  isSecretMode
                    ? "bg-rose-800 hover:bg-rose-900 text-white"
                    : "bg-[#003366] hover:bg-[#002244] text-white"
                }`}
              >
                確認 (閉じる)
              </button>
            </div>
          </div>
        )}

        {/* 3. 呼叫表单弹窗 (加入防遮挡的高度限制与内部滚动) */}
        {callingOfficer && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in p-4">
            {/* 核心修改：max-h-[85vh] 限制高度，flex-col 允许内部滚动 */}
            <div
              className={`w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 rounded-lg ${
                isSecretMode
                  ? "bg-white border-2 border-rose-200 text-rose-950"
                  : "bg-white border border-blue-100 text-[#333]"
              }`}
            >
              {/* 头部固定不动 */}
              <div
                className={`p-6 flex-shrink-0 flex items-center gap-6 border-b ${
                  isSecretMode
                    ? "bg-rose-50 border-rose-100"
                    : "bg-blue-50/50 border-blue-50"
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-current shrink-0">
                  <img
                    src={callingOfficer.img}
                    className="w-full h-full object-cover"
                    alt={callingOfficer.name}
                  />
                </div>
                <div>
                  <h3
                    className={`text-2xl font-black ${
                      isSecretMode ? "text-rose-800" : "text-[#003366]"
                    }`}
                  >
                    {isSecretMode ? "指名対象: " : "要請対象: "}
                    {callingOfficer.name}
                  </h3>
                  <p
                    className={`text-sm font-bold ${
                      isSecretMode ? "text-rose-400" : "opacity-70"
                    }`}
                  >
                    {isSecretMode
                      ? `${callingOfficer.age}歳 | ${callingOfficer.size}`
                      : `${callingOfficer.rank} | ${callingOfficer.dept}`}
                  </p>
                </div>
                {!isProcessing && (
                  <button
                    onClick={closeForm}
                    className="ml-auto opacity-50 hover:opacity-100"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>

              {/* 表单内容区 (核心修改：overflow-y-auto 允许内部滚动) */}
              <div className="p-8 overflow-y-auto">
                {isProcessing ? (
                  <div className="py-12 flex flex-col items-center justify-center font-mono space-y-6">
                    <div
                      className={`w-16 h-16 border-t-4 rounded-full animate-spin ${
                        isSecretMode ? "border-rose-600" : "border-[#003366]"
                      }`}
                    ></div>
                    <div
                      className={`text-sm font-black tracking-widest ${
                        isSecretMode ? "text-rose-700" : "text-[#003366]"
                      }`}
                    >
                      <p className="animate-pulse mb-2">
                        {isSecretMode
                          ? "> 特例奉仕プロトコルを確認中..."
                          : "> 通報内容を精査中..."}
                      </p>
                      <p
                        className="animate-pulse delay-1000 mb-2"
                        style={{ animationDelay: "1s" }}
                      >
                        {isSecretMode
                          ? "> 該当雌犬のスケジュールを強制確保中..."
                          : "> 地域課へ出動指令を送信中..."}
                      </p>
                      <p
                        className="animate-pulse delay-2000"
                        style={{ animationDelay: "2s" }}
                      >
                        {isSecretMode
                          ? "> パトカーのGPS偽装を完了..."
                          : "> 完了までしばらくお待ちください。"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {isSecretMode ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-rose-600 mb-2">
                          <Flame size={18} />{" "}
                          <h4 className="font-black tracking-widest uppercase">
                            サービスコース選択
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                          {/* 动态读取该女警的专属 services */}
                          {(
                            callingOfficer.services ||
                            dispatchData.secret.services
                          ).map((svc) => (
                            <div
                              key={svc.id}
                              onClick={() => setSelectedService(svc)}
                              className={`p-4 border-2 cursor-pointer transition-all flex justify-between items-center ${
                                selectedService?.id === svc.id
                                  ? "bg-rose-50 border-rose-400"
                                  : "bg-white border-rose-100 hover:border-rose-300"
                              }`}
                            >
                              <div>
                                <div className="font-black text-rose-900">
                                  {svc.name}{" "}
                                  <span className="text-[10px] text-rose-400 ml-2">
                                    {svc.duration}
                                  </span>
                                </div>
                                <div className="text-[10px] text-rose-900/60 mt-1 font-bold">
                                  {svc.desc}
                                </div>
                              </div>
                              <div className="font-mono font-black text-rose-600">
                                ¥{svc.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-rose-100">
                          <h4 className="font-black text-sm text-rose-800 mb-3">
                            オプション (追加要求)
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {/* 动态读取该女警的专属 addons */}
                            {(
                              callingOfficer.addons ||
                              dispatchData.secret.addons
                            ).map((addon) => (
                              <button
                                key={addon.id}
                                onClick={() => toggleAddon(addon)}
                                className={`px-3 py-1.5 text-xs font-bold border-2 transition-colors ${
                                  selectedAddons.find((a) => a.id === addon.id)
                                    ? "bg-rose-800 text-white border-rose-800"
                                    : "bg-white text-rose-600 border-rose-200 hover:border-rose-400"
                                }`}
                              >
                                {addon.name} (+¥{addon.price.toLocaleString()})
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="bg-rose-50/50 p-4 border border-rose-200">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-bold text-rose-800">
                              予想請求額
                            </span>
                            <span className="text-3xl font-black text-rose-600 font-mono">
                              ¥{calculateTotal().toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[9px] text-rose-900/50 leading-tight font-bold">
                            {dispatchData.secret.warning}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <h4 className="font-black text-[#003366] text-lg border-b border-blue-50 pb-2">
                          {dispatchData.surface.title}
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              要請者の氏名
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500"
                              placeholder="例: 奈媛 太郎"
                            />
                          </div>
                          {/* 新增的电话号码输入框 */}
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              連絡先 (電話番号)
                            </label>
                            <input
                              type="tel"
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500 font-mono"
                              placeholder="例: 090-XXXX-XXXX"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              現在地 / 派遣先住所
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500"
                              placeholder="GPSロケーションを許可、または住所を入力"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              事案の種類
                            </label>
                            <select className="w-full p-3 bg-slate-50 border border-slate-200 focus:outline-blue-500">
                              {dispatchData.surface.incidentTypes.map(
                                (type, idx) => (
                                  <option key={idx}>{type}</option>
                                )
                              )}
                            </select>
                          </div>
                          <p className="text-[10px] text-red-500 font-medium bg-red-50 p-2 border border-red-100">
                            {dispatchData.surface.warning}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mt-8">
                      <button
                        onClick={handleDispatchSubmit}
                        className={`w-full py-4 font-black tracking-widest uppercase transition-transform active:scale-95 flex items-center justify-center gap-2 ${
                          isSecretMode
                            ? "bg-rose-800 text-white shadow-lg hover:bg-rose-900"
                            : "bg-[#003366] text-white hover:bg-[#002244]"
                        }`}
                      >
                        <Send size={18} />{" "}
                        {isSecretMode
                          ? "救済を確定し、雌犬を呼び出す"
                          : "緊急出動を要請する"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =======================================
            主大盘界面 (雷达与人员列表)
           ======================================= */}
        <div className="max-w-[1400px] mx-auto space-y-12 px-4">
          <header
            className={`relative p-10 border-b-4 overflow-hidden rounded-xl ${
              isSecretMode
                ? "bg-white border-rose-800 shadow-[0_10px_30px_rgba(225,29,72,0.05)]"
                : "bg-[#001833] border-[#003366] shadow-xl"
            }`}
          >
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <div
                className={`absolute inset-0 bg-[size:40px_40px] ${
                  isSecretMode
                    ? "bg-[linear-gradient(rgba(225,29,72,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(225,29,72,0.05)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"
                }`}
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border rounded-full ${
                  isSecretMode ? "border-rose-200" : "border-emerald-500/20"
                }`}
              ></div>
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border rounded-full ${
                  isSecretMode ? "border-rose-200" : "border-emerald-500/20"
                }`}
              ></div>
              <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 animate-spin [animation-duration:4s]">
                <div
                  className={`w-1/2 h-1/2 rounded-tl-full border-l-2 ${
                    isSecretMode
                      ? "bg-gradient-to-br from-rose-200 to-transparent border-rose-400"
                      : "bg-gradient-to-br from-emerald-500/40 to-transparent border-emerald-400"
                  }`}
                ></div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div
                  onClick={handleSecretTrigger}
                  className={`cursor-crosshair w-20 h-20 flex items-center justify-center rounded-full border-4 backdrop-blur-md group ${
                    isSecretMode
                      ? "bg-rose-50 border-rose-200 shadow-inner"
                      : "bg-white/10 border-white/20"
                  }`}
                >
                  <Star
                    className={`transition-all duration-300 ${
                      isSecretMode
                        ? "text-rose-500 fill-rose-500 scale-125"
                        : "text-amber-400 fill-amber-400 group-hover:scale-110"
                    }`}
                    size={36}
                  />
                </div>
                <div>
                  <h2
                    className={`text-4xl md:text-5xl font-black tracking-widest drop-shadow-sm ${
                      isSecretMode ? "text-rose-900" : "text-white"
                    }`}
                  >
                    {isSecretMode
                      ? "特例奉仕・性欲処理統制局"
                      : "緊急出動管制センター"}
                  </h2>
                  <p
                    className={`text-sm font-bold uppercase tracking-[0.4em] mt-2 ${
                      isSecretMode
                        ? "text-rose-500"
                        : "text-emerald-400 drop-shadow-[0_0_5px_#10b981]"
                    }`}
                  >
                    {isSecretMode
                      ? "NCPD Delivery Health System"
                      : "Real-time Dispatch Control"}
                  </p>
                </div>
              </div>

              <div
                className={`flex gap-6 p-4 border backdrop-blur-sm rounded-lg ${
                  isSecretMode
                    ? "border-rose-200 bg-white/80"
                    : "border-blue-400/30 bg-black/40"
                }`}
              >
                <div className="text-center px-4 border-r border-slate-200/20">
                  <p
                    className={`text-[10px] font-bold uppercase ${
                      isSecretMode ? "text-rose-400" : "text-slate-400"
                    }`}
                  >
                    稼働中
                  </p>
                  <p
                    className={`text-3xl font-black ${
                      isSecretMode ? "text-rose-800" : "text-white"
                    }`}
                  >
                    58
                    <span
                      className={`text-xs ml-1 ${
                        isSecretMode ? "text-rose-400" : "text-white/50"
                      }`}
                    >
                      名
                    </span>
                  </p>
                </div>
                <div className="text-center px-4">
                  <p
                    className={`text-[10px] font-bold uppercase ${
                      isSecretMode ? "text-rose-400" : "text-slate-400"
                    }`}
                  >
                    要請ロック
                  </p>
                  <p
                    className={`text-3xl font-black ${
                      hasPendingDispatch
                        ? "text-rose-500 animate-pulse"
                        : isSecretMode
                        ? "text-rose-800"
                        : "text-emerald-400"
                    }`}
                  >
                    {hasPendingDispatch ? "LOCKED" : "ACTIVE"}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {slots.map((off, i) => {
              if (off.isPlaceholder) {
                return (
                  <div
                    key={i}
                    className={`w-[230px] h-[560.67px] border flex flex-col items-center justify-center p-10 opacity-30 ${
                      isSecretMode
                        ? "bg-rose-50 border-rose-200"
                        : "bg-white/40 border-dashed border-blue-100"
                    }`}
                  >
                    <Shield
                      size={64}
                      className={`${
                        isSecretMode ? "text-rose-300" : "text-blue-100"
                      } mb-4 opacity-50`}
                    />
                    <p
                      className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                        isSecretMode ? "text-rose-300" : "text-blue-100"
                      }`}
                    >
                      未登録
                    </p>
                  </div>
                );
              }

              const statusDisplay = getStatusDisplay(off.status, off.shift);
              const badges = isSecretMode
                ? off.secretBadges || ["特例枠"]
                : off.surfaceBadges || ["正規職員"];

              return (
                <div
                  key={i}
                  className={`group w-[230px] h-[560.67px] flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border overflow-hidden relative ${
                    isSecretMode
                      ? "bg-white border-rose-200"
                      : "bg-white border-blue-50"
                  }`}
                >
                  <div className="absolute top-0 left-0 right-0 z-20 flex justify-between p-2 pointer-events-none text-white">
                    <div className="flex gap-1 flex-wrap">
                      {badges.map((b, idx) => (
                        <span
                          key={idx}
                          className={`${
                            isSecretMode ? "bg-rose-800/90" : "bg-[#003366]/90"
                          } px-2 py-0.5 text-[8px] font-black uppercase backdrop-blur-sm`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`h-[360px] relative overflow-hidden ${
                      isSecretMode ? "bg-rose-50" : "bg-slate-100"
                    }`}
                  >
                    <img
                      src={off.img}
                      className={`object-cover w-full h-full transition-all duration-700 group-hover:scale-105 ${
                        statusDisplay.disable
                          ? "grayscale opacity-40"
                          : "opacity-95"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-2xl font-black drop-shadow-lg tracking-tighter">
                        {off.name}
                      </h4>
                      <p
                        className={`text-[10px] font-bold italic mt-1 ${
                          isSecretMode ? "text-rose-200" : "text-blue-200"
                        }`}
                      >
                        {isSecretMode
                          ? `年齢: ${off.age}歳 · ${off.bodyStatus || '単身'}`
                          : `階級: ${off.rank}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 p-4 flex flex-col justify-between space-y-4 bg-white/80 backdrop-blur-md">
                    {isSecretMode ? (
                      <div className="space-y-3">
                        <div className="bg-rose-50/50 p-2 border border-rose-100">
                          <span className="text-[8px] font-black text-rose-400 uppercase block mb-0.5">
                            スリーサイズ (肉体情報)
                          </span>
                          <p className="text-[11px] font-bold font-mono tracking-tight text-rose-900">
                            {off.size}
                          </p>
                        </div>
                        <div className="bg-rose-50/50 p-2 border border-rose-100">
                          <span className="text-[8px] font-black text-rose-400 uppercase block mb-0.5">
                            得意な奉仕 (特技)
                          </span>
                          {/* 改为 text-[10px] 稍微缩小字号，leading-tight 控制紧凑行高，break-words 允许长文本换行 */}
                          <p className="text-[10px] font-bold text-rose-900 leading-tight break-words">
                            {off.specialty || "本番行為、奉仕全般"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9px] font-black text-rose-400">
                            夜の奉仕評価
                          </span>
                          {/* 读取专属的里世界评分 */}
                          {renderStars(off.secretRating || 4.5, true)}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">
                            所属部署
                          </span>
                          <p className="text-[11px] font-bold text-[#003366]">
                            {off.dept}
                          </p>
                        </div>
                        <div className="bg-slate-50 p-2 border border-slate-100">
                          <span className="text-[8px] font-black text-slate-400 uppercase block mb-0.5">
                            完了した救済任務
                          </span>
                          <p className="text-[11px] font-bold font-mono text-[#003366]">
                            {off.dispatches || Math.floor(Math.random() * 500)}{" "}
                            件
                          </p>
                        </div>
                        <div className="flex items-center justify-between px-1">
                          <span className="text-[9px] font-black text-slate-400">
                            市民評価
                          </span>
                          {/* 读取专属的表世界评分 */}
                          {renderStars(off.surfaceRating || 4.5, false)}
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex items-center justify-between pt-3 border-t ${
                        isSecretMode ? "border-rose-100" : "border-slate-50"
                      }`}
                    >
                      <div className="flex flex-col justify-center gap-1">
                        {/* 上半部分：红绿灯状态 */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              statusDisplay.color
                            } ${!statusDisplay.disable ? "animate-pulse" : ""}`}
                          ></div>
                          <span
                            className={`text-[10px] font-black ${
                              isSecretMode ? "text-rose-800" : "text-slate-600"
                            }`}
                          >
                            {statusDisplay.text}
                          </span>
                        </div>
                        {/* 下半部分：新增的排班时间显示 */}
                        <span
                          className={`text-[10px] font-mono font-bold pl-0 ${
                            isSecretMode ? "text-rose-400" : "text-slate-400"
                          }`}
                        >
                          {isSecretMode ? "奉仕シフト: " : "勤務時間: "}
                          {off.shift}
                        </span>
                      </div>

                      {/* 右侧的呼叫按钮保持完全不变 */}
                      <button
                        onClick={() => openForm(off)}
                        disabled={statusDisplay.disable || hasPendingDispatch}
                        className={`w-10 h-10 flex items-center justify-center shadow-md transition-all 
      ${
        statusDisplay.disable || hasPendingDispatch
          ? (isSecretMode
              ? "bg-rose-50 text-rose-200"
              : "bg-slate-100 text-slate-300") + " cursor-not-allowed"
          : isSecretMode
          ? "bg-rose-800 hover:bg-rose-900 text-white active:scale-90"
          : "bg-[#003366] hover:bg-[#002244] text-white active:scale-90"
      }`}
                      >
                        {statusDisplay.disable || hasPendingDispatch ? (
                          <X size={16} />
                        ) : (
                          <PhoneCall size={16} fill="currentColor" />
                        )}
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
