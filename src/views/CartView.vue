<template>
  <div class="bg-light m-4">
    <!--v if-->
    <div>購物車沒有任何品項</div>
    <!--v else-->
  </div>
  <div class="m-4">
    <table class="table align-middle">
      <tbody>
        <tr class="border" v-for="item in cartList.carts" :key="item.id">
          <td width="100">
            <a href="#" class="text-dark">X</a>
          </td>
          <td width="100">
            <img src="" alt="" class="table-img" />
          </td>
          <td class="text-center" width="100">產品名稱</td>
          <td>
            <select class="form-select">
              <option selected>1</option>
            </select>
          </td>
          <td class="text-end">900</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-end">總金額 NT$ {{ cartList.total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useCartStore } from '../stores/cart'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapActions(useCartStore, ['addToCart'])
  },
  computed: {
    ...mapState(useCartStore, ['cartList'])
  }
}
</script>

<style scoped>
.table-img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
</style>
