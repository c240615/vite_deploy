<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempItem.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-success"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteProduct"
            v-if="!this.tempItem.code"
          >
            刪除
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteCoupon"
            v-if="this.tempItem.code"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// bootstrap
import { Modal } from 'bootstrap'
export default {
  props: ['tempItem', 'deleteProduct', 'deleteCoupon'],
  data () {
    return { modalDel: null }
  },
  methods: {
    openModal () {
      this.modalDel.show()
    },
    closeModal () {
      this.modalDel.hide()
    }
  },
  mounted () {
    this.modalDel = new Modal(this.$refs.delProductModal)
    console.log(this.tempItem.code)
  }
}
</script>
