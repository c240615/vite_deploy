import { defineStore } from 'pinia'

export const routerStore = defineStore('routerStore', {
  state: () => ({
    home: '/',
    login: '/login',
    admin: { products: '/admin/products' }
  }),
  actions: {
    navigateToAdmin () {
      this.$router.push('/admin/products')
    }
  }
})
