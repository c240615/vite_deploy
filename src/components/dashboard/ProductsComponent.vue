<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-orange" @click="openModal('new')">新增產品</button>
    </div>
    <table class="table mt-4 text-start">
      <thead>
        <tr>
          <th width="120">季節</th>
          <th width="120">品項</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="120">啟用</th>
          <th width="120">修改資料</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in adminProducts" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">$ {{ product.origin_price }}</td>
          <td class="text-end">$ {{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-primary">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', product)"
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
      :get-admin-products="getAdminProducts"
    ></PaginationComponent>
    <!-- /分頁元件 -->
  </div>
  <!-- Modal -->
  <ProductModal
    :temp-item="tempItem"
    :is-new="isNew"
    :update-product="updateProduct"
    ref="pModal"
  ></ProductModal>
  <DeleteModal
    :temp-item="tempItem"
    :delete-product="deleteProduct"
    ref="dModal"
  ></DeleteModal>
  <!--ToastComponent-->
  <ToastComponent></ToastComponent>
  <p v-if="!isNew"></p>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'pinia'
// store
import { useAdminStore } from '../../stores/admin'
import { useToastStore } from '../../stores/toast'
// component
import PaginationComponent from '../dashboard/PaginationComponent.vue'
import ProductModal from './ProductModal.vue'
import DeleteModal from '../dashboard/DeleteModal.vue'
import ToastComponent from '../ToastComponent.vue'

const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      tempItem: {},
      isNew: false,
      item: 'product'
    }
  },
  methods: {
    ...mapActions(useAdminStore, ['getAdminProducts']),
    ...mapActions(useToastStore, ['showToast']),
    updateProduct () {
      // 新增
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`
      let method = 'post'
      // 編輯
      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempItem.id}`
        method = 'put'
      }
      axios[method](url, { data: this.tempItem })
        .then((res) => {
          this.getAdminProducts() // 重新取得產品列表
          this.$refs.pModal.closeModal() // 關閉 modal
          this.tempItem = {} // 清空資料
          this.showToast('成功編輯', 'success')
        })
        .catch((e) => {
          this.showToast('編輯失敗', 'error')
        })
    },
    deleteProduct () {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempItem.id}`
      axios
        .delete(url)
        .then((res) => {
          this.getAdminProducts()
          this.$refs.dModal.closeModal()
          this.showToast('成功刪除', 'success')
        })
        .catch((e) => {
          this.showToast('刪除失敗', 'error')
        })
    },
    openModal (status, product) {
      if (status === 'new') {
        this.tempItem = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.pModal.openModal()
      } else if (status === 'edit') {
        this.tempItem = { ...product }
        if (!Array.isArray(this.tempItem.imagesUrl)) {
          this.tempItem.imagesUrl = []
        }
        this.isNew = false
        this.$refs.pModal.openModal()
      } else if (status === 'delete') {
        this.tempItem = { ...product }
        this.isNew = false
        this.$refs.dModal.openModal()
      }
    }
  },
  computed: {
    ...mapState(useAdminStore, ['adminProducts', 'pages'])
  },
  watch: {
    isNew (n, o) {
      this.getAdminProducts()
    }
  },
  mounted () {
    this.getAdminProducts()
  },
  components: {
    PaginationComponent,
    ProductModal,
    DeleteModal,
    ToastComponent
  }
}
</script>

<style scoped></style>
