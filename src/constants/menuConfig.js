import { lazy } from 'react';

export const MENU_LIST = [
  { id: 'home', title: '홈', component: lazy(() => import('../pages/Home')) },
  { id: 'users', title: '사용자 관리', component: lazy(() => import('../pages/UserList')) },
  { id: 'settings', title: '환경 설정', component: lazy(() => import('../pages/Settings')) },
];