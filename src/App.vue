<template>
  header
  <RouterView />
  {{ test }}
  footer
</template>

<script>
export default {
  data () {
    return {
      test: 123
    }
  },
  mounted () {
    console.log(this.test)
  }
}
</script>

<style lang="scss"></style>
