<template>
  <div v-if="productCount < 1">
    <v-btn color="pink" icon large @click="showCounters()">
      <v-icon>shopping_cart</v-icon>
    </v-btn>
  </div>
  <div v-else>
    <v-btn icon large @click="decrementProduct()">
      <v-icon>remove</v-icon>
    </v-btn>

    <span class="px-3">
      {{ productCount }}
    </span>

    <v-btn
      :disabled="isAddButtonDisabled"
      icon
      large
      @click="incrementProduct()"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AddProductToCart",
  props: {
    maxCount: Number,
    isEditable: Boolean,
  },
  data () {
    return {
      productCount: 0,
    };
  },
  computed: {
    isAddButtonDisabled(): boolean {
      return this.productCount >= this.maxCount;
    },
  },
  methods: {
    showCounters() {
      if (!this.isEditable) {
        return;
      }

      this.incrementProduct();
    },
    incrementProduct() {
      this.productCount += 1;
    },
    decrementProduct() {
      this.productCount -= 1;
    },
  },
});
</script>
