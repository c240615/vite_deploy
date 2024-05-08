// axios
import axios from 'axios'
// pinia
import { defineStore } from 'pinia'
// env
const { VITE_URL, VITE_PATH } = import.meta.env

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    products: []
  }),
  actions: {
    async getProducts () {
      const url = `${VITE_URL}/api/${VITE_PATH}/products/all`
      const response = await axios.get(url)
      this.products = response.data.products
    }
  },
  getters: {
    sortProducts: ({ products }) => {
      return products.sort((a, b) => b.price - a.price)
    }
  }
})
