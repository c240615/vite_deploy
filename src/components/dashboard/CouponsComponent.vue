<template>
  {{ {
      "due_date": 6547658,
      "is_enabled": 1,
      "percent": 80,
      "title": "超級特惠價格"
    } }}
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-orange" @click.prevent="openModal('new')">
        新增優惠券
      </button>
    </div>
    <table class="table mt-4 text-start">
      <thead>
        <tr>
          <th width="120">名稱 title</th>
          <th width="120">折扣 percent</th>
          <th width="120">啟用 is_enabled</th>
          <th width="120">修改資料</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>coupon.title</td>
          <td>coupon.percent</td>
          <td>coupon.is_enabled</td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <PaginationComponent :pages="pages" :coupons="coupons"></PaginationComponent>
    <!-- /分頁元件 -->
  </div>
  <!-- Modal -->
  <CouponModal
    :temp-item="tempItem"
    ref="cModal"
  ></CouponModal>
  <DeleteModal
    :temp-item="tempItem"
    :delete-product="deleteProduct"
    ref="dModal"
  ></DeleteModal>
</template>

<script>
import axios from 'axios'
// component
import PaginationComponent from './PaginationComponent.vue'
import CouponModal from '../dashboard/CouponModal.vue'
import DeleteModal from './DeleteModal.vue'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      coupons: [],
      pages: {},
      coupon: {},
      isNew: false,
      tempItem: {}
    }
  },
  methods: {
    getCoupons () {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons`
      axios
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons
          this.pages = res.data.pagination
        })
        .catch((e) => {
          alert(e)
        })
    },
    openModal (status, coupon) {
      if (status === 'new') {
        this.tempItem = {}
        this.isNew = true
        this.$refs.cModal.openModal()
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
    this.getCoupons()
  },
  components: { PaginationComponent, CouponModal, DeleteModal }
}
</script>

<style scoped></style>
