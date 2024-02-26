<template>
  <nav class="navbar navbar-expand-md bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"
        ><i class="bi bi-amd fs-3 text-dark"></i
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" to="/"
              >最新消息</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" to="/"
              >當季水果</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" data-toggle to="/products"
              >查詢庫存</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" to="/">Q&A</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" to="/cart"
              ><i class="bi bi-cart-fill"></i
            ></RouterLink>
          </li>
        </ul>
        <form class="d-flex">
          <RouterLink to="/login" class="btn btn-dark" v-if="!isAuthenticated"
            >登入</RouterLink
          >
          <div class="text-center" v-else>
            <RouterLink
              to="/admin/products"
              class="text-primary me-4 text-decoration-none text-center align-middle"
              @click.prevent="showToast('進入後台', 'success')"
            >
              後台
            </RouterLink>
            <RouterLink
              to="/"
              id="logout"
              class="btn btn-outline-primary"
              @click.prevent="logout"
            >
              登出
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </nav>
  <!--toast-->
  <ToastComponent></ToastComponent>
  <!-- <button
    type="button"
    class="btn btn-primary"
    id="liveToastBtn"
  >
    Show live toast
  </button> -->

  <div class="toast-container position-fixed top-1 end-0 p-3">
    <div
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body">
        <div class="row g-0">
          <div class="col-md-8 text-start align-middle">
            <i
              class="bi bi-check-circle-fill text-dark me-4"
              v-if="type === 'success'"
            ></i>
            <i
              class="bi bi-x-circle-fill text-danger me-4"
              v-else-if="type === 'error'"
            ></i>
            {{ message }}
          </div>
          <div class="col-md-4 text-end align-middle">
            <button
              type="button"
              class="btn-close align-top"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--toast-->
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth.js'
import { useToastStore } from '../stores/toast.js'
import axios from 'axios'
import { Toast } from 'bootstrap'
import ToastComponent from './ToastComponent.vue'

export default {
  methods: {
    ...mapActions(useAuthStore, ['login', 'logout', 'checkLogin']),
    ...mapActions(useToastStore, ['setMessage', 'setType', 'clearToast']),
    showToast (message, type) {
      this.setMessage(message)
      this.setType(type)
      // toast
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
    }
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    ...mapState(useToastStore, ['message', 'type'])
  },
  mounted () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (token) {
      // 2. 預設 header 帶 token
      axios.defaults.headers.common.Authorization = token
      this.checkLogin()
    }
    if (!this.isAuthenticated) {
      this.$router.push('/')
    }
  },
  components: { ToastComponent }
}
</script>

<style lang="scss" scoped></style>
