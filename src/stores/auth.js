import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_URL } = import.meta.env

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    user: null
  }),
  actions: {
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
        .catch((e) => {
          console.log(e)
        })
      this.isAuthenticated = true
      this.user = user
    },
    logout () {
      const url = `${VITE_URL}/logout`
      axios
        .post(url)
        .then(() => {
          document.cookie =
            'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        })
        .catch((e) => {
          console.log(e)
        })
      this.isAuthenticated = false
      this.user = null
    },
    checkLogin () {
      const url = `${VITE_URL}/api/user/check`
      axios
        .post(url)
        .then((res) => {
          // console.log(res)
          this.isAuthenticated = true
        })
        .catch((e) => {
          this.isAuthenticated = false
        })
    }
  }
})
