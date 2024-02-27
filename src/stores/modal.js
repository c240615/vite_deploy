// axios
// pinia
import { defineStore } from 'pinia'
// bootstrap
import { Modal } from 'bootstrap'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isNew: false
  }),
  actions: {
    openModal () {
      const modal = new Modal(document.getElementById('myModal'))
      modal.show()
    }
  }
})
