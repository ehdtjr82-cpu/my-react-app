import { lazy } from 'react';

export const MENU_LIST = [
  {
    id: 'system',
    title: '시스템 관리',
    children: [
      { id: 'users', title: '사용자 관리', component: lazy(() => import('../pages/UserList')) },
      { id: 'auth', title: '권한 설정', component: lazy(() => import('../pages/Auth')) },
    ]
  },
  {
    id: 'trade',
    title: '거래 관리',
    children: [
      { id: 'orders', title: '주문 현황', component: lazy(() => import('../pages/Orders')) },
    ]
  },
  { id: 'home', title: '대시보드', component: lazy(() => import('../pages/Home')) }
];