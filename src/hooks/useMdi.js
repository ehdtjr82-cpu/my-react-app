import { useState } from 'react';
import { MENU_LIST } from '../constants/menuConfig';

export const useMdi = () => {
  // 홈 화면은 기본으로 열려있도록 설정
  const defaultTab = MENU_LIST.find(menu => menu.id === 'home');
  const [tabs, setTabs] = useState([defaultTab]);
  const [activeTabId, setActiveTabId] = useState(defaultTab.id);

  const openTab = (menuId) => {
    debugger;
    const targetMenu = MENU_LIST.find(menu => menu.id === menuId);
    if (!targetMenu) return;

    const isExist = tabs.find((tab) => tab.id === menuId);
    if (!isExist) {
      setTabs(prev => [...prev, targetMenu]);
    }
    setActiveTabId(menuId);
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    const newTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(newTabs);

    if (activeTabId === id && newTabs.length > 0) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  return { tabs, activeTabId, setActiveTabId, openTab, closeTab };
};