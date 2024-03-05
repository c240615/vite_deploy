<template>
  <footer class="bg-secondary text-center text-lg-start">
    <div class="text-center p-3 text-dark">
      版權所有 © 2024 Claire
      <a class="link-dark" :href="github">原始碼</a>
      <a class="link-dark" href="https://www.pexels.com/zh-tw/">圖片來源</a>
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
