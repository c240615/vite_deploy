// axios
import axios from 'axios'
// pinia
import { defineStore } from 'pinia'
// env
const { VITE_URL, VITE_PATH } = import.meta.env

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    adminProducts: [],
    pages: {}
  }),
  actions: {
    getAdminProducts (page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`
      axios
        .get(url)
        .then((res) => {
          this.adminProducts = res.data.products
          this.pages = res.data.pagination
        })
        .catch((e) => {
          alert(e.response.data.message)
        })
    },
    updateProduct (id) {
      // 新增
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      let method = 'post'
      // 編輯
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`
        method = 'put'
      }
      axios[method](url, { data: this.tempProduct })
        .then(() => {
          this.getProducts() // 重新取得產品列表
          this.$refs.pModal.closeModal() // 關閉 modal
          this.tempProduct = {} // 清空資料
        })
        .catch((e) => {
          console.log(e)
        })
    },
    deleteProduct (id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`
      axios
        .delete(url)
        .then((res) => {
          this.getAdminProducts()
          this.$refs.dModal.closeModal()
        })
        .catch((e) => {
          alert(e.response.data.message)
        })
    }
  }
})
