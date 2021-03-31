<template>
  <v-app>
    <v-product-header></v-product-header>

    <v-main>
      <v-container class="px-0" fluid>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer
      class="white py-12 d-flex flex-column justify-center align-center"
      
    >
      <p class="text-subtitle1 text--secondary">
        {{ $t("common.thankYouForPurchase") }}
      </p>

      <p class="text-body2 text--secondary">
        Copyright ©
        {{ $t("app.title") }}
        {{ currentDate }}
      </p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import VProductHeader from "./ui/ProductHeader.vue";

export default {
  name: "ProductLayout",
  data: () => ({
    currentDate: `${new Date().getFullYear()}.`,
  }),
  components: { VProductHeader },
};
</script>
