<template>
 cmodal
  <div
    id="couponModal"
    ref="couponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
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
            <label for="title" class="form-label">標題</label>
            <input
              id="title"
              v-model="editProduct.title"
              type="text"
              class="form-control"
              placeholder="請輸入標題"
            />
          </div>

          <div class="row">
            <div class="mb-3 col-md-6">
            </div>
            <div class="mb-3 col-md-6">
              <label for="unit" class="form-label">單位</label>
              <input
                id="unit"
                v-model="editProduct.unit"
                type="text"
                class="form-control"
                placeholder="請輸入單位"
              />
            </div>
          </div>

          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input
                id="origin_price"
                v-model.number="editProduct.origin_price"
                type="number"
                min="0"
                class="form-control"
                placeholder="請輸入原價"
              />
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input
                id="price"
                v-model.number="editProduct.price"
                type="number"
                min="0"
                class="form-control"
                placeholder="請輸入售價"
              />
            </div>
          </div>
          <hr />

          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea
              id="description"
              v-model="editProduct.description"
              type="text"
              class="form-control"
              placeholder="請輸入產品描述"
            >
            </textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">庫存</label>
            <input
              id="content"
              v-model="editProduct.content"
              type="text"
              class="form-control"
              placeholder="請輸入庫存"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                id="is_enabled"
                v-model="editProduct.is_enabled"
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
          <button type="button" class="btn btn-primary" @click="updateProduct">
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
  props: ['tempItem'],
  data () {
    return { modalCoupon: null, editProduct: {} }
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
      this.editProduct = this.tempItem
    }
  },
  mounted () {
    this.modalCoupon = new Modal(this.$refs.couponModal)
    this.editProduct = this.tempItem
  }
}
</script>
