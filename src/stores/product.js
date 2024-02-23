import { defineStore } from 'pinia'

export default defineStore('product', {
  state: () => ({ products: [] }),
  actions: {
    increment () {
      this.count += 1
    }
  }
})
