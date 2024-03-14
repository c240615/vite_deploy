<template>
  <nav aria-label="Page navigation" class="d-flex justify-content-center mt-5">
    <ul class="pagination" v-if="item === 'product'">
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ disabled: !pages.has_pre }"
        @click="getAdminProducts(pages.current_page - 1)"
      >
        <a class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages"
        :key="page + 123"
      >
        <a class="page-link" @click="getAdminProducts(page)">{{ page }}</a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ disabled: !pages.has_next }"
        @click="getAdminProducts(pages.current_page + 1)"
      >
        <a class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    <ul class="pagination" v-if="item === 'coupon'">
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ disabled: !pages.has_pre }"
        @click="getCoupons(pages.current_page - 1)"
      >
        <a class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages"
        :key="page + 123"
      >
        <a class="page-link" @click="getCoupons(page)">{{ page }}</a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ disabled: !pages.has_next }"
        @click="getCoupons(pages.current_page + 1)"
      >
        <a class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
    <ul class="pagination" v-if="item === 'order'">
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ disabled: !pages.has_pre }"
        @click="getOrders(pages.current_page - 1)"
      >
        <a class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ active: page === pages.current_page }"
        v-for="page in pages.total_pages"
        :key="page + 123"
      >
        <a class="page-link" @click="getOrders(page)">{{ page }}</a>
      </li>
      <li
        class="page-item"
        style="cursor: pointer"
        :class="{ disabled: !pages.has_next }"
        @click="getOrders(pages.current_page + 1)"
      >
        <a class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  <p v-if="!pages">{{ pages }}</p>
</template>

<script>
export default {
  props: ['item', 'pages', 'getAdminProducts', 'getCoupons', 'getOrders']
}
</script>

<style scoped></style>
