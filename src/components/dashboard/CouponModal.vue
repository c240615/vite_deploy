<template>
  <div
    id="couponModal"
    ref="couponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="couponModalLabel" class="modal-title">
            <span v-if="isNew">新增優惠券</span>
            <span v-else>編輯優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title" class="form-label">名稱</label>
            <input
              id="title"
              v-model="editCoupon.title"
              type="text"
              class="form-control"
              placeholder="請輸入標題"
              required
            />
          </div>
          <div class="mb-4">
            <label for="origin_price" class="form-label">折扣</label>
            <input
              id="origin_price"
              v-model.number="editCoupon.percent"
              type="number"
              min="0"
              max="1"
              step="0.1"
              class="form-control"
              placeholder="請輸入折扣 (0 - 1)"
              required
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                id="is_enabled"
                v-model="editCoupon.is_enabled"
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-success"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateCoupon">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Modal } from 'bootstrap'

export default {
  props: ['tempItem', 'isNew', 'getCoupons', 'updateCoupon'],
  data () {
    return {
      modalCoupon: null,
      editCoupon: {}
    }
  },
  methods: {
    openModal () {
      this.modalCoupon.show()
    },
    closeModal () {
      this.modalCoupon.hide()
    }
  },
  watch: {
    tempItem (n, o) {
      this.editCoupon = this.tempItem
    }
  },
  mounted () {
    this.modalCoupon = new Modal(this.$refs.couponModal)
    this.editCoupon = this.tempItem
    this.editCoupon.is_enabled = 0
  }
}
</script>
