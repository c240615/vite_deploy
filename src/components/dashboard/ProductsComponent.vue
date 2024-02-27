<template>
  <div class="text-end">
    <button class="btn btn-orange" @click.prevent="openModal">新增產品</button>
  </div>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <!-- <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('new')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.category }}</td>
              <td>{{ product.title }}</td>
              <td class="text-end">{{ product.origin_price }}</td>
              <td class="text-end">{{ product.price }}</td>
              <td>
                <span v-if="product.is_enabled" class="text-success">啟用</span>
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
        </table> -->
  <!-- 分頁元件 -->
  <!-- <pagination :pages="pages" :get-products="getProducts"></pagination> -->
  <!-- /分頁元件 -->
  <!-- </div> -->
  <!-- Modal -->
  <!-- <Product-Modal
        :temp-product="tempProduct"
        :update-product="updateProduct"
        ref="pModal"
      ></Product-Modal>
      <Delete-Modal
        :temp-product="tempProduct"
        :delete-product="deleteProduct"
        ref="dModal"
      ></Delete-Modal> -->
</template>

<script>
import axios from 'axios'
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [], // 產品列表
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      pages: {}
    }
  },
  methods: {
    // 3. 取得產品列表
    getProducts (page = 1) {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products
          this.pages = res.data.pagination
        })
        .catch((e) => {
          alert(e.response.data.message)
        })
    },
    // 4-1 彈出視窗
    openModal (status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.pModal.openModal()
      } else if (status === 'edit') {
        this.tempProduct = { ...product }
        if (!Array.isArray(this.tempProduct.imagesUrl)) {
          this.tempProduct.imagesUrl = []
        }
        this.isNew = false
        this.$refs.pModal.openModal()
      } else if (status === 'delete') {
        this.tempProduct = { ...product }
        this.isNew = false
        this.$refs.dModal.openModal()
      }
    },
    updateProduct () {
      // 新增
      let url = `${this.api}/api/${this.apiPath}/admin/product`
      let method = 'post'
      // 編輯
      if (!this.isNew) {
        url = `${this.api}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      axios[method](url, { data: this.tempProduct })
        .then(() => {
          this.getProducts() // 重新取得產品列表
          this.$refs.pModal.closeModal() // 關閉 modal
          this.tempProduct = {} // 清空資料
        })
        .catch((e) => {
          console.log(e)
        })
    },
    deleteProduct () {
      const url = `${this.api}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
      axios
        .delete(url)
        .then((res) => {
          this.getProducts() // 重新取得產品列表
          this.$refs.dModal.closeModal() // 關閉 modal
        })
        .catch((e) => {
          alert(e.response.data.message)
        })
    }
  }
  // mounted () {
  //   const token = document.cookie.replace(
  //     /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
  //     '$1'
  //   )
  //   axios.defaults.headers.common.Authorization = token
  // }
  // components: { pagination, ProductModal, DeleteModal }
}
</script>

<style scoped></style>
