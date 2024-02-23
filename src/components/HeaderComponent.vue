<template>
  <!-- <nav class="border">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/cart"><i class="bi bi-cart-fill"></i></RouterLink> |
    <RouterLink to="/products">products</RouterLink> |
    <RouterLink to="/login">login</RouterLink> |
    <RouterLink to="/admin">後台</RouterLink>
  </nav> -->
  <nav class="navbar navbar-expand-md bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><i class="bi bi-amd fs-3 text-dark"></i></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" data-toggle to="/products"
              >產品</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link text-primary" to="/cart"
              ><i class="bi bi-cart-fill"></i
            ></RouterLink>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <RouterLink to="/login" class="btn btn-dark">登入</RouterLink>
        </form>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style lang="scss" scoped></style>
