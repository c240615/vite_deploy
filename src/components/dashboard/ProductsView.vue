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
    <tbody>
      <!-- <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <a href="#" class="btn btn-link">Show</a>

          <a href="#" class="btn btn-link">Edit</a>

          <button type="button" class="btn btn-link">Delete</button>
        </td>
      </tr> -->
    </tbody>
  </table>
  <ModalComponent></ModalComponent>
  <!--沒有特價-->
  <!-- <div class="h5" v-if="item.origin_price === item.price">
            {{ item.origin_price }} 元
          </div> -->
  <!--有特價-->
  <!-- <div v-else>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h6">現在只要 {{ item.price }} 元</div>
          </div> -->

  <!-- Modal -->
  <!-- Modal -->
</template>

<script>
import ModalComponent from '../dashboard/ModalComponent.vue'
import { Modal } from 'bootstrap'
export default {
  methods: {
    openModal () {
      const modal = new Modal(document.getElementById('myModal'))
      modal.show()
    }
  },
  mounted () {
    this.openModal()
  },
  components: { ModalComponent }
}
</script>

<style scoped></style>
