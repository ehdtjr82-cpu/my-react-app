import React, { Suspense } from 'react';
import { useMdi } from '../../hooks/useMdi';
import { MENU_LIST } from '../../constants/menuConfig';

const MdiLayout = () => {
  // hook을 통해 상태와 제어 함수를 가져옴
  const { tabs, activeTabId, setActiveTabId, openTab, closeTab } = useMdi();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 1. 사이드바 영역 */}
      <div style={{ width: '200px', background: '#2c3e50', color: '#fff' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {MENU_LIST.map((menu) => (
            <li 
              key={menu.id} 
              onClick={() => openTab(menu.id)}
              style={{ padding: '15px', cursor: 'pointer', borderBottom: '1px solid #34495e' }}
            >
              {menu.title}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. 메인 컨텐츠 영역 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 탭 헤더 */}
        <div style={{ display: 'flex', background: '#ecf0f1', borderBottom: '1px solid #ccc' }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              style={{
                padding: '10px 20px', cursor: 'pointer',
                background: activeTabId === tab.id ? '#fff' : 'transparent',
                fontWeight: activeTabId === tab.id ? 'bold' : 'normal',
                borderRight: '1px solid #ccc'
              }}
            >
              {tab.title}
              {tab.id !== 'home' && (
                <span onClick={(e) => closeTab(e, tab.id)} style={{ marginLeft: '10px', color: 'red' }}>✕</span>
              )}
            </div>
          ))}
        </div>

        {/* 탭 본문 (lazy 로딩 적용) */}
        <div style={{ flex: 1, overflow: 'auto', padding: '10px' }}>
          <Suspense fallback={<div>화면을 불러오는 중입니다...</div>}>
            {tabs.map((tab) => {
              const Component = tab.component;
              return (
                <div key={tab.id} style={{ display: activeTabId === tab.id ? 'block' : 'none', height: '100%' }}>
                  <Component />
                </div>
              );
            })}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MdiLayout;