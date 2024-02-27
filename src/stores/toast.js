// axios
// pinia
import { defineStore } from 'pinia'
// bootstrap
import { Toast } from 'bootstrap'

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
    showToast (message, type) {
      this.setMessage(message)
      this.setType(type)
      // toast
      const toastEl = document.getElementById('liveToast')
      const toast = new Toast(toastEl)
      toast.show()
    },
    clearToast () {
      this.message = ''
      this.type = ''
    }
  }
})
