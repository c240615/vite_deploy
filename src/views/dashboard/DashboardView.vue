<template>
  <NavComponent></NavComponent>
  <div class="container-fluid mt-5 p-4">
    <main class="row g-2">
      <aside class="col-md-3 p-5">
        <div class="btn-group d-flex flex-column">
          <div class="list-group">
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
      <section class="border col-md-9 p-5">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
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
</template>

<script>
import NavComponent from '../../components/NavComponent.vue'
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../../stores/auth'
import { useToastStore } from '../../stores/toast'
export default {
  methods: {
    ...mapActions(useAuthStore, ['checkLogin', 'getToken']),
    ...mapActions(useToastStore, ['showToast'])
  },
  computed: { ...mapState(useAuthStore, ['isAuthenticated']) },
  created () {
    this.getToken()
    // this.checkLogin()
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    // alert(JSON.parse(isLoggedIn))
    if (!JSON.parse(isLoggedIn)) {
      this.$router.push('/')
    }
  },
  components: { NavComponent }
}
</script>

<style scoped></style>
