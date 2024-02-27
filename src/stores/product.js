// axios
import axios from 'axios'
// pinia
import { defineStore } from 'pinia'
// env
const { VITE_URL, VITE_PATH } = import.meta.env

export const useProductStore = defineStore({
  id: 'product',
  state: () => ({
    adminProducts: [],
    pages: {}
  }),
  actions: {
    getProducts (page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}` // 有分頁
      axios
        .get(url)
        .then((res) => {
          this.adminProducts = res.data.products
          this.pages = res.data.pagination
        })
        .catch((e) => {
          alert(e.response.data.message)
        })
    }
  }
})
