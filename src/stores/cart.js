// axios
// import axios from "axios";
// pinia
import { defineStore } from 'pinia'
// env
// const { VITE_URL, VITE_PATH } = import.meta.env;

import { useProductStore } from './product'

export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cart: []
  }),
  actions: {
    addToCart (productId, qty = 1) {
      // 取得現有產品
      const currentCart = this.cart.find(
        (item) => item.productId === productId
      )
      // 重複的產品 + 1
      if (currentCart) {
        currentCart.qty += qty
      } else {
        this.cart.push({
          id: new Date().getTime(),
          productId,
          qty
        })
      }
    },
    removeCartItem (id) {
      const index = this.cart.findIndex((item) => item.id === id)
      this.cart.splice(index, 1)
    },
    setCartQty (id, event) {
      const currentCart = this.cart.find((item) => item.id === id)
      // 字串轉數字
      currentCart.qty = parseInt(event.target.value)
    }
  },
  getters: {
    cartList: ({ cart }) => {
      // cart 整合 product
      const { products } = useProductStore()
      // 用 cart 的 productId 找 product 的所有資料
      const carts = cart.map((item) => {
        const product = products.find(
          (product) => product.id === item.productId
        )
        return {
          ...item,
          product,
          subtotal: product.price * item.qty
        }
      })
      const total = carts.reduce((a, b) => a + b.subtotal, 0)
      return {
        carts,
        total
      }
    }
  }
})
