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
        path: 'orders',
        component: () => import('../components/dashboard/OrdersView.vue')
      },
      {
        path: 'products',
        component: () => import('../components/dashboard/ProductsView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../components/dashboard/CouponsView.vue')
      },
      {
        path: 'comments',
        component: () => import('../components/dashboard/CommentsView.vue')
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
