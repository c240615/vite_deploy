import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_URL } = import.meta.env

export const userStore = defineStore('userStore', {
  state: () => ({
    isAuthenticated: false, // 登入狀態
    user: null
  }),
  actions: {
    // 登入
    login (username, password) {
      const user = { username, password }
      axios
        .post(`${VITE_URL}/admin/signin`, user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.isAuthenticated = true
          this.user = user
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 登出
    logout () {
      const url = `${VITE_URL}/logout`
      axios
        .post(url)
        .then((res) => {
          console.log(res.data.message)
          this.isAuthenticated = false
          this.user = null
          document.cookie =
            'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
})
