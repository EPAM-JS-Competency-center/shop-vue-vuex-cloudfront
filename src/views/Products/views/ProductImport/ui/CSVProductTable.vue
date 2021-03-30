<template>
  <v-data-table
    :headers="headers"
    :items="products"
    :items-per-page="10"
    :loading="isFetching"
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:loading>
      <v-progress-linear indeterminate color="indigo"></v-progress-linear>

      <p class="pa-2 v-data-table__empty-wrapper">Loading... Please wait</p>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.title }}</td>

        <td>
          {{ item.description }}
        </td>

        <td>{{ item.price }}</td>

        <td>
          <v-chip :color="getColor(item.count)" dark>
            {{ item.count }}
          </v-chip>
        </td>

        <td>
          <v-btn
            class="mr-1"
            color="primary"
            small
            :to="`/admin/product-form/${item.id}`"
          >
            {{ $t("common.manage") }}
          </v-btn>

          <v-btn
            class="ml-1"
            color="error"
            @click="deleteProduct(item.id)"
            small
          >
            {{ $t("common.delete") }}
          </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";

const headers = [
  { text: "Title", value: "title" },
  { text: "Description", value: "description" },
  { text: "Price", value: "price" },
  { text: "Count", value: "count" },
  { text: "Action", value: "action" },
];

// TODO Enum
const getColor = (count: number) => {
  if (count > 100) {
    return "green";
  }

  if (count > 50) {
    return "orange";
  }

  return "red";
};

export default Vue.extend({
  name: "CSVProductTable",
  props: {
    products: Array,
    isFetching: Boolean,
  },
  data() {
    return {
      headers,
    };
  },
  methods: {
    getColor,
    deleteProduct(productId: string) {
      this.$emit("delete-product", productId);
    },
  },
});
</script>
