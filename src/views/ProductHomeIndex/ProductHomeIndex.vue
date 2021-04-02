<template>
  <div class="grey lighten-5">
    <v-container>
      <v-row>
        <v-col
          xs="12"
          sm="6"
          md="4"
          col="3"
          v-for="(product, index) in products"
          :key="product.id"
        >
          <v-card class="pa-2" outlined tile>
            <v-img
              height="250"
              :src="`https://source.unsplash.com/random?sig=${index}`"
            ></v-img>

            <v-card-title>{{ product.title }}</v-card-title>
            <v-card-text>
              <p class="my-4 subtitle-1">
                {{ product.description }}
              </p>
              <p>{{ product.price }}</p>
              <p>{{ product.count }}</p>
            </v-card-text>

            <v-card-actions>
              <v-add-product-to-cart
                isEditable
                :maxCount="product.count"
              ></v-add-product-to-cart>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import VAddProductToCart from "./ui/AddProductToCart.vue";

import { productApi } from '@/api/product-api';

// TODO: avoid any, model
export default Vue.extend({
  name: "ProductHomeIndex",
  components: { VAddProductToCart },
  data() {
    return {
      isFetching: false,
      products: [],
      error: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.isFetching = true;

      productApi
        .fetchAvailableProducts()
        .then((products: any) => {
          this.products = products;
        })
        .finally(() => {
          this.isFetching = false;
        });
    },
  },
});
</script>

<style scoped></style>
