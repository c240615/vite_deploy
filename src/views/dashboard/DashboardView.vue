<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-md bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
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
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    <main class="row g-0">
      <aside class="border col-md-4 p-2">
        <div class="btn-group d-flex flex-column">
          <div class="list-group m-3">
            <router-link
              to="/admin/products"
              class="list-group-item list-group-item-action"
              aria-current="true"
            >
              產品列表
            </router-link>
            <router-link
              to="/admin/coupons"
              class="list-group-item list-group-item-action"
              >優惠券列表</router-link
            >
            <router-link
              to="/admin/orders"
              class="list-group-item list-group-item-action"
              >訂單列表</router-link
            >
            <router-link
              to="/admin/comments"
              class="list-group-item list-group-item-action"
              >評論列表</router-link
            >
          </div>
        </div>
      </aside>
      <section class="border bg-primary col-md-8 p-2">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <p>
            產品頁面： 串接取得、新增、刪除、更新產品 API 啟用狀態顯示 Modal
            細節欄位 上傳圖片API 分頁功能
          </p>
          <p>
            訂單頁面： 串接取得、刪除、更新訂單 API Modal 細節欄位 付款狀態切換
            分頁功能
          </p>
          <p>
            優惠券頁面： 串接取得、新增、刪除、更新優惠券 API 啟用狀態顯示 Modal
            細節欄位 分頁功能
          </p>
          <p>
            貼文頁面（加分項目）： 串接取得、新增、刪除、更新貼文 API
            啟用公開狀態 Modal 細節欄位 分頁功能
          </p>
          登入 / 登出 小功能 alert、loading 元件 串接圖片上傳 API
        </div>
        <RouterView></RouterView>
      </section>
    </main>
  </div>
  <nav class="nav">
    <!-- <RouterLink to="/admin/products" class="btn btn-success active">products</RouterLink> |
    <RouterLink to="/admin/order">order</RouterLink> | -->
    <RouterLink to="/">前台</RouterLink>
  </nav>
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
