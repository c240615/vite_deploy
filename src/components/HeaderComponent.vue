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
              >產品</RouterLink
            >
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
          <RouterLink
            to="/"
            id="logout"
            class="btn btn-outline-primary"
            @click.prevent="logout"
            v-else
          >
            登出
          </RouterLink>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { userStore } from '../stores/user.js'
import axios from 'axios'

export default {
  methods: { ...mapActions(userStore, ['login', 'logout']) },
  computed: {
    ...mapState(userStore, ['isAuthenticated'])
  },
  mounted () {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )
    if (token) {
      this.isAuthenticated = true
      axios.defaults.headers.common.Authorization = token
    } else {
      this.isAuthenticated = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
