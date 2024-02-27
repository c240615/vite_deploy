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
          this.user = user
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
          console.log(res)
          document.cookie =
            'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          this.isAuthenticated = false
          this.user = null
        }).then(() => {
          localStorage.removeItem('isLoggedIn')
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
        })
        .catch(() => {
          this.isAuthenticated = false
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
