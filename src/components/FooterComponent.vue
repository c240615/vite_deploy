<template>
  <footer class="bg-secondary text-center text-lg-start">
    <div class="text-center p-3 text-dark">
      版權所有 © 2024 Claire
      <a class="link-dark" :href="github">Document</a>
    </div>
  </footer>
</template>

<script>
const { VITE_GITHUB } = import.meta.env
export default {
  data () {
    return {
      github: ''
    }
  },
  mounted () {
    this.github = VITE_GITHUB
  }
}
</script>

<style scoped></style>
