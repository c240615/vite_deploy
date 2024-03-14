<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-orange" @click.prevent="openModal('new')">
        新增優惠券
      </button>
    </div>
    <table class="table mt-4 text-start">
      <thead>
        <tr>
          <th width="120">名稱</th>
          <th width="120">折扣</th>
          <th width="120">啟用</th>
          <th width="120">修改資料</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.title">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}</td>
          <td class="text-primary" v-if="coupon.is_enabled">啟用</td>
          <td v-else>未啟用</td>
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
    <PaginationComponent
      :pages="pages"
      :item="item"
      :get-coupons="getCoupons"
    ></PaginationComponent>
    <!-- /分頁元件 -->
  </div>
  <!-- Modal -->
  <CouponModal
    :temp-item="tempItem"
    :is-new="isNew"
    :get-coupons="getCoupons"
    :update-coupon="updateCoupon"
    ref="cModal"
  ></CouponModal>
  <DeleteModal
    :temp-item="tempItem"
    :delete-product="deleteProduct"
    :delete-coupon="deleteCoupon"
    ref="dModal"
  ></DeleteModal>
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
import CouponModal from '../dashboard/CouponModal.vue'
import DeleteModal from './DeleteModal.vue'
import ToastComponent from '../ToastComponent.vue'
// env
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      coupons: [],
      pages: {},
      item: 'coupon',
      isNew: false,
      tempItem: {}
    }
  },
  methods: {
    ...mapActions(useToastStore, ['showToast']),
    getCoupons () {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons`
      axios
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pages = res.data.pagination
        })
        .catch((e) => {
          this.showToast('編輯失敗', `${e.message}`)
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
      axios[method](url, {
        data: {
          title: this.tempItem.title,
          is_enabled: this.tempItem.is_enabled,
          percent: this.tempItem.percent,
          due_date: new Date().getTime(),
          code: 'testCode'
        }
      })
        .then((res) => {
          this.getCoupons()
          this.$refs.cModal.closeModal()
          this.tempItem = {}
          this.showToast(`${res.data.message}`, 'success')
        })
        .catch((e) => {
          this.$refs.cModal.closeModal()
          this.showToast('編輯失敗', 'error')
        })
    },
    deleteCoupon () {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempItem.id}`
      axios
        .delete(url)
        .then((res) => {
          this.getCoupons()
          this.tempItem = {}
          this.$refs.dModal.closeModal()
          this.showToast(`${res.data.message}`, 'success')
        })
        .catch((e) => {
          this.$refs.dModal.closeModal()
          this.showToast('刪除失敗', 'error')
        })
    },
    openModal (status, coupon) {
      if (status === 'new') {
        this.tempItem = {}
        this.isNew = true
        this.$refs.cModal.openModal()
      } else if (status === 'edit') {
        this.tempItem = { ...coupon }
        this.isNew = false
        this.$refs.cModal.openModal()
      } else if (status === 'delete') {
        this.tempItem = { ...coupon }
        this.isNew = false
        this.$refs.dModal.openModal()
      }
    }
  },
  mounted () {
    this.getCoupons()
  },
  components: { PaginationComponent, CouponModal, DeleteModal, ToastComponent }
}
</script>

<style scoped></style>
