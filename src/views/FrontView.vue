<template>
  <h2>前台</h2>
  <nav>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/cart">cart</RouterLink> |
    <RouterLink to="/products">products</RouterLink> |
    <RouterLink to="/login">login</RouterLink> |
    <RouterLink to="/admin">後台</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<script></script>

/*它的 CSS 只作用于当前组件中的元素 */
<style scoped></style>
