<template>
  <div
    class="container p-5 m-5 d-flex justify-content-center align-items-center"
    style="height: 100vh; width: 100vw"
  >
    <div class="row d-flex justify-content-center" style="width: 100vw">
      <div class="col-8">
        <form class="form-signin" @submit.prevent="login(user)">
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
            <label for="username">電子郵件</label>
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
            <label for="password">密碼</label>
          </div>
          <div class="d-flex">
            <RouterLink
              to="/"
              id="home"
              class="btn btn-lg btn-primary w-100 mt-3 text-white me-3"
              type="button"
              v-if="isAuthenticated"
            >
              首頁
            </RouterLink>
            <button
              id="login"
              class="btn btn-lg btn-primary w-100 mt-3 text-white"
              type="submit"
              v-else
            >
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth.js'
export default {
  data () {
    return { user: { username: '', password: '' } }
  },
  methods: { ...mapActions(useAuthStore, ['login']) },
  computed: { ...mapState(useAuthStore, ['isAuthenticated']) },
  watch: {
    // 登入後轉址後台
    isAuthenticated (n, o) {
      if (n) {
        this.$router.push('/admin/products')
      }
    }
  }
}
</script>

<style scoped></style>
