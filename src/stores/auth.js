import { defineStore, mapActions } from 'pinia'
import axios from 'axios'
import { useToastStore } from './toast.js'

const { VITE_URL } = import.meta.env

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
    ...mapActions(useToastStore, ['showToast']),
    login (user) {
      const url = `${VITE_URL}/admin/signin`
      axios
        .post(url, user)
        .then((res) => {
          // console.log(res.data.message)
          const { token, expired } = res.data
          // 儲存 Token
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
        })
        .then(() => {
          this.isAuthenticated = true
          this.user = user
          this.showToast('登入成功', 'success')
        })
        .catch((e) => {
          alert(e)
          this.showToast('登入失敗', 'error')
        })
    },
    logout () {
      const url = `${VITE_URL}/logout`
      axios
        .post(url)
        .then((res) => {
          document.cookie =
            'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          this.showToast(res.data.message, 'success')
        })
        .catch((e) => {
          console.log(e)
        })
      this.user = null
      this.checkLogin()
    },
    checkLogin () {
      const url = `${VITE_URL}/api/user/check`
      axios
        .post(url)
        .then((res) => {
          this.isAuthenticated = true
        })
        .catch((e) => {
          this.isAuthenticated = false
        })
    }
  }
})
