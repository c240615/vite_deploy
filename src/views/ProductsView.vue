<template>
  <h1 class="my-3 text-dark text-center"><b>瑞和水果行</b></h1>
  <div class="m-4">
    <div class="m-4" v-if="!cartList.carts.length">
      <div>購物車沒有任何品項</div>
    </div>
    <div class="m-4" v-else>
      <div class="m-4 position-relative">
        <p class="text-end">購物車</p>
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        >
          {{ cartList.carts.length }}
        </span>
      </div>

      <table class="table align-middle">
        <tbody>
          <tr class="border" v-for="item in cartList.carts" :key="item.id">
            <td width="100">
              <a
                href="#"
                class="text-dark"
                @click.prevent="removeCartItem(item.id)"
                >X</a
              >
            </td>
            <td width="100">
              <img :src="item.product.imageUrl" alt="" class="table-img" />
            </td>
            <td class="text-center" width="100">{{ item.product.title }}</td>
            <td>
              <select
                class="form-select"
                :value="item.qty"
                @change="(evt) => setCartQty(item.id, evt)"
              >
                <option selected v-for="i in 20" :key="i" :value="i">
                  {{ i }}
                </option>
              </select>
            </td>
            <td class="text-end">$ {{ item.subtotal }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="text-end">
              總金額 NT$ {{ cartList.total }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>

  <!--卡片-->
  <div class="row g-4 m-4">
    <template v-for="product in sortProducts" :key="product.name">
      <div class="col-md-4">
        <div class="card eachproduct">
          <img
            :src="product.imageUrl"
            :alt="product.title"
            class="card-img-top text-center"
          />

          <div class="card-body">
            <h5>
              {{ product.title }}
              <span class="float-end">$ {{ product.price }}</span>
            </h5>

            <div class="d-flex flex-column justify-content-evenly desbox">
              <p class="card-text">{{ product.description }}</p>
            </div>

            <div class="input-group">
              <a
                class="btn btn-outline-primary"
                type="button"
                @click.prevent="addToCart(product.id)"
                >加入購物車</a
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <div class="banner"></div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useProductStore } from '../stores/product.js'
import { useCartStore } from '../stores/cart.js'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapActions(useProductStore, ['getProducts']),
    ...mapActions(useCartStore, ['addToCart', 'removeCartItem', 'setCartQty'])
  },
  computed: {
    ...mapState(useProductStore, ['sortProducts']),
    ...mapState(useCartStore, ['cartList'])
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style scoped>
.table-img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
.eachproduct {
  height: 480px;
}
.desbox {
  height: 170px;
}
.banner {
  height: 100px;
}
</style>
