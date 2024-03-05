<template>
  <nav aria-label="Page navigation" class="d-flex justify-content-center mt-5">
    <ul class="pagination">
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
  </nav>
  <p v-if="!pages">{{ pages }}</p>
</template>

<script>
export default {
  props: ['pages', 'getAdminProducts']
}
</script>

<style scoped></style>
