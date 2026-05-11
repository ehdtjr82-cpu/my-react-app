import { useState } from 'react';
import { MENU_LIST } from '../constants/menuConfig';

export const useMdi = () => {
 
  const defaultTab = MENU_LIST.find(menu => menu.id === 'home');
  const [tabs, setTabs] = useState([defaultTab]);
  const [activeTabId, setActiveTabId] = useState(defaultTab.id);

  const findMenuById = (list, id) => {
    for (const item of list) {
      if (item.id === id) return item; // 찾으면 즉시 반환
      if (item.children) {
        const found = findMenuById(item.children, id); // 자식이 있으면 자식 안으로 들어감
        if (found) return found;
      }
    }
    return null;
  };

  const openTab = (menuId) => {
    const targetMenu = findMenuById(MENU_LIST, menuId);
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