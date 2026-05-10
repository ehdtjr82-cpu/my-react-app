import React from 'react';
import MdiLayout from './components/layout/MdiLayout';
import './App.css'; // 전역 스타일이 필요하다면 추가

function App() {
  return (
    <div className="App">
      {/* MDI 전체 레이아웃 호출 */}
      <MdiLayout />
    </div>
  );
}

export default App;