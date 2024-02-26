import { defineStore } from 'pinia'

export const useToastStore = defineStore({
  id: 'toast',
  state: () => ({
    message: '',
    type: '' // 'success', 'error', 'warning'
  }),
  actions: {
    setMessage (message) {
      this.message = message
    },
    setType (type) {
      this.type = type
    },
    clearToast () {
      this.message = ''
      this.type = ''
    }
  }
})
