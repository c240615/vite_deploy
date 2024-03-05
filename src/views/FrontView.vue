<template>
  <NavComponent></NavComponent>
  <RouterView></RouterView>
  <FooterComponent class="fixed-bottom"></FooterComponent>
</template>

<script>
// pinia
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'
import { useToastStore } from '../stores/toast'
// component
import NavComponent from '../components/NavComponent.vue'

import FooterComponent from '../components/FooterComponent.vue'

export default {
  methods: {
    ...mapActions(useAuthStore, ['getToken', 'checkLogin']),
    ...mapActions(useToastStore, ['showToast'])
  },
  computed: { ...mapState(useAuthStore, ['isAuthenticated']) },
  components: { NavComponent, FooterComponent }
}
</script>

<style scoped lang="scss"></style>
