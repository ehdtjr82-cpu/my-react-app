import React, { useState } from 'react';

const Sidebar = ({ menuList, onMenuClick }) => {
  // 현재 펼쳐져 있는 메뉴 ID들을 저장 (여러 개 열 수 있게 배열로 관리)
  const [openMenus, setOpenMenus] = useState([]);

  const toggleMenu = (menuId) => {
    setOpenMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId) // 이미 열려있으면 닫기
        : [...prev, menuId]                // 닫혀있으면 추가
    );
  };

  return (
    <div style={{ width: '200px', background: '#2c3e50', color: '#fff' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuList.map((menu) => (
          <li key={menu.id}>
            {/* 상위 메뉴 제목 */}
            <div 
              onClick={() => menu.children ? toggleMenu(menu.id) : onMenuClick(menu.id)}
              style={{ 
                padding: '15px', 
                cursor: 'pointer', 
                borderBottom: '1px solid #34495e',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              {menu.title}
              {/* 자식이 있으면 화살표 표시 */}
              {menu.children && (
                <span>{openMenus.includes(menu.id) ? '▲' : '▼'}</span>
              )}
            </div>

            {/* 하위 메뉴 (children이 있고, 열림 상태일 때만 렌더링) */}
            {menu.children && openMenus.includes(menu.id) && (
              <ul style={{ listStyle: 'none', padding: 0, background: '#34495e' }}>
                {menu.children.map((child) => (
                  <li 
                    key={child.id}
                    onClick={() => onMenuClick(child.id)}
                    style={{ padding: '12px 12px 12px 30px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    • {child.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;