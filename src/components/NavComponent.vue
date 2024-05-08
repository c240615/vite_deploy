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
            <RouterLink class="nav-link text-primary" data-toggle to="/products"
              >產品列表</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" to="/">Q&A</RouterLink>
          </li>
          <!-- <li class="nav-item">
            <RouterLink class="nav-link text-primary position-relative" to="/cart">
                購物車
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  0
                </span>
            </RouterLink>
          </li> -->
        </ul>
        <form class="d-flex">
          <div
            class="text-center d-flex justify-content-around align-items-center navRight"
            v-if="userState"
          >
            <RouterLink
              to="/admin/products"
              class="text-primary me-4 text-decoration-none text-center align-middle backend"
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
          <RouterLink to="/login" class="btn btn-dark" v-else>登入</RouterLink>
        </form>
      </div>
    </div>
  </nav>
  <!--toast-->
  <ToastComponent></ToastComponent>
  <!--toast-->
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'
import ToastComponent from './ToastComponent.vue'

export default {
  data () {
    return {
      userState: false
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login', 'logout', 'checkLogin', 'getToken']),
    ...mapActions(useToastStore, [
      'setMessage',
      'setType',
      'clearToast',
      'showToast'
    ])
  },
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated']),
    ...mapState(useToastStore, ['message', 'type'])
  },
  watch: {
    isAuthenticated (n, o) {
      if (!n) {
        this.userState = false
        localStorage.setItem('isLoggedIn', 'false')
      }
    }
  },
  created () {
    this.getToken()
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    this.userState = JSON.parse(isLoggedIn)
  },
  components: { ToastComponent }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
  .navRight {
    flex-direction: column;
  }
  .backend {
    margin-bottom: 1rem;
  }
}
</style>
