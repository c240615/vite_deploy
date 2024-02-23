<template>
  <div><RouterView /></div>
</template>

<script>
export default {
  data () {
    return {
      date: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./assets/main.scss";
div {
  font-family: 'Noto Sans TC Variable', sans-serif;
}
</style>
