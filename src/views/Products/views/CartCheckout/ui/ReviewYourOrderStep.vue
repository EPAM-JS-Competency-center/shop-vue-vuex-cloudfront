<template>
  <v-container>
    <p class="text-h6">Order summary</p>

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

    <div class="d-flex justify-end">
      <v-btn class="mr-1" type="button" @click="$emit('back')"> Back </v-btn>
      <v-btn
        class="ml-1"
        type="button"
        color="primary"
        @click="handleStepSubmit"
      >
        Place order
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import VCartList from "./CartList.vue";

export default Vue.extend({
  name: "ReviewYourOrderStep",
  props: {
    cartItems: Array,
    address: Object,
  },
  components: { VCartList },
  methods: {
    handleStepSubmit() {
      this.$emit("complete");
    },
  },
});
</script>
