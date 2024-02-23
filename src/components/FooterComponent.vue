<template>
  <footer class="bg-secondary text-center text-lg-start">
    <div class="text-center p-3">
      版權所有 © 2024
      <a class="text-body" :href="github"> Claire Chou</a>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
const { VITE_GITHUB } = import.meta.env
export default {
  data () {
    return {
      year: '',
      github: ''
    }
  },
  mounted () {
    this.year = dayjs().year()
    this.github = VITE_GITHUB
  }
}
</script>

<style scoped></style>
