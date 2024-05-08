<template>
  <div
    id="couponModal"
    ref="orderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="couponModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="couponModalLabel" class="modal-title">
            <span v-if="isNew">新增訂單</span>
            <span v-else>編輯訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 d-flex justify-content-between">
            <div>
              <label for="name" class="form-label">訂單編號</label>
              <input
                id="name"
                v-model="date"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
                required
              />
            </div>
            <div class="w-50">
              <label for="date" class="form-label">日期</label>
              <input
                id="date"
                v-model.number="editOrder.percent"
                type="date"
                value="2024-01-01"
                min="2024-01-01"
                max="2050-12-31"
                class="form-control w-100"
                required
              />
            </div>
          </div>
          <div class="mb-3 d-flex justify-content-between">
            <div>
              <label for="name" class="form-label">訂購者</label>
              <input
                id="name"
                type="text"
                class="form-control"
                placeholder="請輸入姓名"
                required
              />
            </div>
            <div class="w-50">
              <label for="tel" class="form-label">訂購電話</label>
              <input
                type="text"
                id="tel"
                class="form-control"
                placeholder="09xxxxxxxx"
              />
            </div>
          </div>
          <div class="mb-3 d-flex justify-content-between">
            <div>
              <label for="email" class="form-label">電子郵件 </label>
              <input
                type="text"
                id="email"
                class="form-control"
                placeholder="name@example.com"
              />
            </div>
            <div class="w-50">
              <label for="address" class="form-label">訂購地址</label>
              <input type="text" id="address" class="form-control" />
            </div>
          </div>
          <!--產品列表-->
          <table class="table mt-4">
            <thead>
              <tr>
                <th>刪除</th>
                <th>產品名稱</th>
                <th width="120">數量</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="aligh-middle">
                  <a href="#" class="link-danger text-decoration-none">X</a>
                </td>
                <td>
                  <input type="text" class="form-control">
                </td>
                <td class="text-end">
                  <input type="text" class="form-control">
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="text-end pe-5" colspan="4">總金額 NT$</td>
              </tr>
            </tfoot>
          </table>
          <!--/產品列表-->
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-success"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  props: ['tempItem', 'isNew'],
  data () {
    return {
      date: '',
      modalOrder: null,
      editOrder: ''
    }
  },
  methods: {
    openModal () {
      this.modalOrder.show()
    },
    closeModal () {
      this.modalOrder.hide()
    }
  },
  watch: {
    tempItem (n, o) {
      this.editOrder = this.tempItem
    }
  },
  mounted () {
    this.date = new Date().getTime()
    console.log(this.date)
    this.modalOrder = new Modal(this.$refs.orderModal)
    this.editOrder = this.tempItem
  }
}
</script>
