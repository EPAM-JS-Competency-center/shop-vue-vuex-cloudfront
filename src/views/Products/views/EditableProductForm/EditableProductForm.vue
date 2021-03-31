<template>
  <div class="grey lighten-5">
    <v-container class="white">
      <h4 class="text-h4 d-flex justify-center py-6">
        {{ $t("products.create") }}
      </h4>

      <v-product-form @submit="handleProductSubmit"></v-product-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { Product } from "@/models/product";

import VProductForm from "./ui/ProductForm.vue";

export default Vue.extend({
  name: "EditableProductForm",
  components: { VProductForm },
  methods: {
    handleProductSubmit(values: Product) {
      console.info(values);
    },
  },
});
</script>
