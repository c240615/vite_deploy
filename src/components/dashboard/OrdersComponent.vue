<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-outline-danger me-3">刪除所有訂單</button>
      <button class="btn btn-orange">新增訂單</button>
    </div>
    <table class="table mt-4 text-start">
      <thead>
        <tr>
          <th width="80">訂單編號</th>
          <th width="100">日期</th>
          <th width="80">訂購人</th>
          <th width="70">總金額</th>
          <th>留言</th>
          <th width="80">付款狀態</th>
          <th width="120">修改資料</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.create_at }}</td>
          <td>{{ new Date(order.create_at).toString().slice(4, 10) }}</td>
          <td>{{ order.user.name }}</td>
          <td class="text-end">{{ order.total }}</td>
          <td>{{ order.message }}</td>
          <td v-if="order.is_paid" class="text-primary">已付款</td>
          <td v-else>未付款</td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', coupon)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <PaginationComponent :pages="pages" :item="item" :get-orders="getOrders"></PaginationComponent>
    <!-- /分頁元件 -->
  </div>
  <!-- Modal -->
  <!-- <DeleteModal
  ></DeleteModal> -->
  <!-- ToastComponent -->
  <ToastComponent></ToastComponent>
</template>

<script>
import axios from 'axios'
// pinia
import { mapActions } from 'pinia'
// store
import { useToastStore } from '../../stores/toast'
// component
import PaginationComponent from './PaginationComponent.vue'

// import DeleteModal from './DeleteModal.vue'
import ToastComponent from '../ToastComponent.vue'
// env
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      orders: [],
      pages: {},
      item: 'order',
      isNew: false,
      tempItem: {}
    }
  },
  methods: {
    ...mapActions(useToastStore, ['showToast']),
    getOrders () {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders`
      axios
        .get(url)
        .then((res) => {
          this.orders = res.data.orders
          this.pages = res.data.pagination
        })
        .catch((e) => {
          this.showToast('編輯失敗', 'error')
        })
    },
    updateCoupon () {
      // 新增
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`
      let method = 'post'
      // 編輯
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempItem.id}`
        method = 'put'
      }
      axios[method](url)
        .then((res) => {
          // this.getCoupons()
          // this.$refs.cModal.closeModal()
          // this.tempItem = {}
          this.showToast(`${res.data.message}`, 'success')
        })
        .catch((e) => {
          // this.$refs.cModal.closeModal()
          this.showToast('編輯失敗', 'error')
        })
    },
    deleteCoupon () {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempItem.id}`
      axios
        .delete(url)
        .then((res) => {
          // this.getCoupons()
          // this.tempItem = {}
          // this.$refs.dModal.closeModal()
          this.showToast(`${res.data.message}`, 'success')
        })
        .catch((e) => {
          // this.$refs.dModal.closeModal()
          this.showToast('刪除失敗', 'error')
        })
    },
    openModal (status, coupon) {
      if (status === 'new') {
        this.tempItem = {}
        this.isNew = true
        // this.$refs.cModal.openModal()
      } else if (status === 'edit') {
        // this.tempItem = { ...coupon }
        // this.isNew = false
        // this.$refs.cModal.openModal()
      } else if (status === 'delete') {
        // this.tempItem = { ...coupon }
        // this.isNew = false
        // this.$refs.dModal.openModal()
      }
    }
  },
  mounted () {
    this.getOrders()
  },
  components: { ToastComponent, PaginationComponent }
  // PaginationComponent, DeleteModal, OrderModal
}
</script>

<style scoped></style>
