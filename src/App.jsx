import React, { use, useState } from 'react';

// 샘플 화면 컴포넌트들
const Home = () => <div>🏠 홈 대시보드 화면입니다.반영테스트!!!!!!!!!!!!!!!</div>;
const UserList = () => <div>👥 사용자 관리 리스트 화면입니다.</div>;
const Setting = () => <div>⚙️ 시스템 설정 화면입니다.</div>;

const App = () => {
  // 1. 탭 상태 관리 (초기값은 홈)
  const [tabs, setTabs] = useState([{ id: 'home', title: '홈', component: <Home /> }]);
  const [activeTab, setActiveTab] = useState('home');


  // 2. 메뉴 클릭 시 탭 추가 로직
  const addTab = (id, title, component) => {
    if (tabs.find(tab => tab.id === id)) {
      setActiveTab(id); // 이미 열려있으면 포커스만 이동
    } else {
      setTabs([...tabs, { id, title, component }]);
      setActiveTab(id);
    }
  };

  // 3. 탭 닫기 로직
  const closeTab = (id, e) => {
    e.stopPropagation(); // 탭 클릭 이벤트 전파 방지
    const newTabs = tabs.filter(tab => tab.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 좌측 사이드바 메뉴 */}
      <aside style={{ width: '200px', background: '#f4f4f4', padding: '15px' }}>
        <h3>메뉴</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li onClick={() => addTab('users', '사용자관리', <UserList />)} style={{ cursor: 'pointer', marginBottom: '10px' }}>👥 사용자관리</li>
          <li onClick={() => addTab('settings', '시스템설정', <Setting />)} style={{ cursor: 'pointer' }}>⚙️ 시스템설정</li>
        </ul>
      </aside>

      {/* 중앙 메인 영역 (MDI 탭) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <nav style={{ display: 'flex', background: '#ddd', borderBottom: '1px solid #ccc' }}>
          {tabs.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                background: activeTab === tab.id ? '#fff' : '#eee',
                borderRight: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {tab.title}
              {tab.id !== 'home' && (
                <span onClick={(e) => closeTab(tab.id, e)} style={{ marginLeft: '10px', color: 'red' }}>×</span>
              )}
            </div>
          ))}
        </nav>

        <section style={{ padding: '20px', flex: 1 }}>
          {tabs.find(tab => tab.id === activeTab)?.component}
        </section>
      </main>
    </div>
  );
};

export default App;