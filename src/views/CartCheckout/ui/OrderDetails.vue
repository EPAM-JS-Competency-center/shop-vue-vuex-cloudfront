<template>
  <div>
    <v-cart-list :cartItems="cartItems"></v-cart-list>

    <v-divider></v-divider>

    <v-list subheader>
      <v-list-item class="px-0">
        <v-list-item-content>
          <v-list-item-title>Shipping address:</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-list-item-title>
            {{ address.firstName }} {{ address.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle v-text="address.address">
          </v-list-item-subtitle>
        </v-list-item-action>
      </v-list-item>

      <v-list-item class="px-0">
        <v-list-item-content>
          <p class="h6 mb-4">Comment:</p>
          <p>
            {{ address.comment }}
          </p>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import VCartList from "./CartList.vue";

export default Vue.extend({
  name: "OrderDetails",
  props: {
    cartItems: Array,
    address: Object,
  },
  components: { VCartList },
});
</script>
