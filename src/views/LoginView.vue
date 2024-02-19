<template>
  <div
    class="container p-5 m-5 d-flex justify-content-center align-items-center"
    style="height: 100vh; width: 100vw"
  >
    <div class="row d-flex justify-content-center" style="width: 100vw">
      <div class="col-8">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              v-model="user.username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            id="login"
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const { VITE_URL } = import.meta.env
export default {
  data () {
    return {
      // 1. 綁定 input value
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 2. 在 form 上加 click 事件
    login () {
      // 3. 使用 api 儲存 Token
      axios
        .post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          // 儲存 Token
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          // 跳轉頁面
          this.$router.push('/admin/products')
        })
        .catch((e) => {
          alert(e.response.data.message)
        })
    }
  }
}
</script>

/*它的 CSS 只作用于当前组件中的元素 */
<style scoped></style>
