// src/AppContext.js
import React, { createContext, useState, useContext } from 'react';
// ★ 注意这里多引入了 cast 作为派单系统的初始数据
import { detentionData, departments as initialDepts, cast as initialCast } from './data';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [detentionRoster, setDetentionRoster] = useState(detentionData.internal.roster);
  const [departments, setDepartments] = useState(initialDepts);
  // ★ 新增：接管紧急救济派单大厅的数据
  const [dispatchCast, setDispatchCast] = useState(initialCast);

  const addOfficer = (newOfficer) => {
    const badgeID = `ID-${Math.floor(1000 + Math.random() * 9000)}`;

    if (newOfficer.dept === '地下拘留区(侍奉警媛)') {
      setDetentionRoster(prev => [...prev, {
        name: newOfficer.name,
        badge: badgeID,
        img: newOfficer.img || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
        status: "新規配属",
        todayHours: newOfficer.todayHours || 12.5,
        weekHours: newOfficer.weekHours || 84,
        fatigue: newOfficer.fatigue || 0,
        semen: newOfficer.semen || 0,
        obedience: newOfficer.obedience || 100,
        pregnant: newOfficer.tags.includes('妊娠中') || newOfficer.tags.includes('母乳分泌'),
        condition: "データ同期完了・待機中",
        tags: newOfficer.tags,
        lore: newOfficer.profileText,
        hiddenImg1: newOfficer.hiddenImg1,
        hiddenImg2: newOfficer.hiddenImg2
      }]);
    } else {
      setDepartments(prev => prev.map(d => {
        if (d.name === newOfficer.dept) {
          return {
            ...d,
            roster: [...(d.roster || []), {
              id: badgeID,
              name: newOfficer.name,
              rank: newOfficer.rank || "新米", // ★ 修复：读取动态阶级
              role: "特例配属",
              age: newOfficer.age,
              size: `T160 / B${newOfficer.bust} / W${newOfficer.waist} / H${newOfficer.hip}`,
              img: newOfficer.img,
              basicInfo: newOfficer.basicInfo || "NCPD 統制局 CMS より新規登録された警媛です。",
              hiddenInfo: newOfficer.profileText,
              hiddenImg1: newOfficer.hiddenImg1,
              hiddenImg2: newOfficer.hiddenImg2
            }]
          };
        }
        return d;
      }));
    }

    // ★ 核心新增：如果勾选了“注册到派单大厅”，就把她也发去派单系统
    if (newOfficer.registerDispatch) {
      setDispatchCast(prev => [...prev, {
        name: newOfficer.name,
        age: newOfficer.age,
        bodyStatus: newOfficer.bodyStatus || '特例配属',
        rank: newOfficer.rank || "新米",
        dept: newOfficer.dept,
        size: `T160 / B${newOfficer.bust} / W${newOfficer.waist} / H${newOfficer.hip}`,
        shift: "12:00 - LAST", 
        status: "待機中",
        img: newOfficer.img || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
        surfaceBadges: ["NEW", "特例枠"],
        secretBadges: newOfficer.tags.length > 0 ? newOfficer.tags : ["NEW"],
        dispatches: 0,
        surfaceRating: 4.5,
        secretRating: 4.8,
        specialty: newOfficer.specialty || "奉仕全般",
        // 接收 CMS 传来的动态菜单！
        services: newOfficer.services,
        addons: newOfficer.addons
      }]);
    }
  };

  return (
    <AppContext.Provider value={{ detentionRoster, departments, dispatchCast, addOfficer }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
