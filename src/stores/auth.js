// axios
import axios from 'axios'
// pinia
import { defineStore, mapActions } from 'pinia'
import { useToastStore } from './toast.js'
// env
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
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          return res
        })
        .then((res) => {
          localStorage.setItem('isLoggedIn', 'true')
          this.isAuthenticated = true
          this.user = { useremail: user.username }
        })
        .catch((e) => {
          this.showToast(e.data.message, 'error')
        })
    },
    logout () {
      const url = `${VITE_URL}/logout`
      axios
        .post(url)
        .then((res) => {
          document.cookie =
            'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        })
        .then(() => {
          this.isAuthenticated = false
          this.user = null
          localStorage.setItem('isLoggedIn', 'false')
          this.showToast('登出成功', 'success')
        })
        .catch((e) => {
          console.log(e)
        })
    },
    checkLogin () {
      const url = `${VITE_URL}/api/user/check`
      axios
        .post(url)
        .then(() => {
          this.isAuthenticated = true
          localStorage.setItem('isLoggedIn', 'true')
        })
        .catch(() => {
          this.isAuthenticated = false
          localStorage.setItem('isLoggedIn', 'false')
        })
    },
    getToken () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        axios.defaults.headers.common.Authorization = token
      }
      this.checkLogin()
    }
  }
})
