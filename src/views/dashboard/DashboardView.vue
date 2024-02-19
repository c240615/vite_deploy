<template>
  <h2>後台</h2>
  <nav>
    <RouterLink to="/admin/products">products</RouterLink> |
    <RouterLink to="/admin/order">order</RouterLink> |
    <RouterLink to="/">前台</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios'
const { VITE_URL } = import.meta.env
export default {
  data () {
    return {
      test: 12
    }
  },
  methods: {
    checkAdmin () {
      // 4. 進入驗證程序
      const url = `${VITE_URL}/api/user/check`
      axios
        .post(url)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          // 若 token 有誤則返回 login
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    // 1. 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    // 2. 預設 header 帶 token
    axios.defaults.headers.common.Authorization = token
    // 3. 進入驗證階段
    this.checkAdmin()
  }
}
</script>

<style scoped></style>
