<template>
  <v-list subheader>
    <v-list-item v-for="cart in cartItems" :key="cart.product.id" class="px-0">
      <v-list-item-avatar size="inherit">
        <v-add-product-to-cart
          :isEditable="isEditable"
          :maxCount="cart.product.count"
        ></v-add-product-to-cart>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="cart.product.title"></v-list-item-title>

        <v-list-item-subtitle
          v-text="cart.product.description"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-list-item-title class="body2">
          {{ cart.count }}
          x
          {{ cart.product.price }}
          =
          {{ cart.count * cart.product.price }}
        </v-list-item-title>
      </v-list-item-action>
    </v-list-item>

    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title>
          {{ $t("cart.shippingAddress") }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-list-item-title class="body2 font-weight-bold">
          {{ $t("common.free") }}
        </v-list-item-title>
      </v-list-item-action>
    </v-list-item>

    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ $t("common.total") }}
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-list-item-title class="subtitle1">
          $TODO TOTAL PRICE$
        </v-list-item-title>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import VAddProductToCart from "../../ProductHomeIndex/ui/AddProductToCart.vue";

export default Vue.extend({
  name: "CartList",
  props: {
    cartItems: Array,
    isEditable: Boolean, // TODO
  },
  components: { VAddProductToCart },
});
</script>
