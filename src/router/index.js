import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 登入路由
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  // 前台路由
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'cart',
        name: '購物車',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'products',
        name: '產品列表',
        component: () => import('../views/ProductsView.vue')
      }
    ]
  },
  // 後台路由
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    // 前台巢狀路由
    children: [
      {
        path: 'order',
        component: () => import('../views/dashboard/OrderView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/dashboard/ProductsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
