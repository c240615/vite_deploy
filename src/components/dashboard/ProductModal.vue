<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">圖片</label>
                <input
                  id="imageUrl"
                  v-model="editProduct.imageUrl"
                  type="text"
                  class="form-control mb-2"
                  placeholder="請輸入圖片連結"
                />
                <img
                  class="img-fluid"
                  :src="editProduct.imageUrl"
                  :alt="editProduct.imageUrl"
                />
              </div>

              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(editProduct.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, key) in editProduct.imagesUrl"
                  :key="key + 123"
                >
                  <div class="mb-3">
                    <label :for="key" class="form-label">圖片網址</label>
                    <input
                      :id="key"
                      v-model="editProduct.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img
                    class="img-fluid"
                    :src="editProduct.imagesUrl[key]"
                    :alt="editProduct.imagesUrl[key]"
                  />
                </div>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  v-if="
                    !editProduct.imagesUrl.length ||
                    editProduct.imagesUrl[editProduct.imagesUrl.length - 1]
                  "
                  @click="editProduct.imagesUrl.push('')"
                >
                  新增圖片
                </button>
                <button
                  v-else
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="editProduct.imagesUrl.pop()"
                >
                  刪除圖片
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
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
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="editProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
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
                >
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
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
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
import { mapActions } from 'pinia'
import { useAdminStore } from '../../stores/admin'

export default {
  props: ['tempItem', 'updateProduct', 'isNew'],
  data () {
    return { modalProduct: null, editProduct: {} }
  },
  methods: {
    openModal () {
      this.modalProduct.show()
    },
    closeModal () {
      this.modalProduct.hide()
    },
    ...mapActions(useAdminStore, ['getAdminProducts'])
  },
  watch: {
    tempItem (n, o) {
      this.editProduct = this.tempItem
    }
  },
  mounted () {
    this.modalProduct = new Modal(this.$refs.productModal)
    this.editProduct = this.tempItem
  }
}
</script>
