<template>
  <div class="toast-container position-fixed top-1 end-0 p-3">
    <div
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body">
        <div class="row g-0">
          <div class="col-md-8 text-start align-middle">
            <i
              class="bi bi-check-circle-fill text-dark me-4"
              v-if="type === 'success'"
            ></i>
            <i
              class="bi bi-x-circle-fill text-danger me-4"
              v-else-if="type === 'error'"
            ></i>
            {{ message }}
          </div>
          <div class="col-md-4 text-end align-middle">
            <button
              type="button"
              class="btn-close align-top"
              data-bs-dismiss="toast"
              aria-label="Close"
              @click.prevent="clearToast"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useToastStore } from '../stores/toast.js'
export default {
  methods: {
    ...mapActions(useToastStore, ['clearToast'])
  },
  computed: {
    ...mapState(useToastStore, ['message', 'type'])
  }
}
</script>
