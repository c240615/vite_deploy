<template>
  <div class="text-end">
    <button class="btn btn-orange" @click.prevent="openModal">新增產品</button>
  </div>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <!-- <ModalComponent></ModalComponent> -->
</template>

<script>

// import { mapActions } from 'pinia'
// import ModalComponent from './ModalComponent.vue'
// import useModalStore from '../../stores/modal.js'
export default {
  // methods: { ...mapActions(useModalStore, ['openModal']) }
  // components: { ModalComponent }
}
</script>

<style scoped></style>
