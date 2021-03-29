<template>
  <v-app>
    <v-product-header></v-product-header>

    <v-main>
      <v-container fluid>
          <slot></slot>
      </v-container>
    </v-main>

    <v-footer app>
      see you later
    </v-footer>
  </v-app>
</template>

<script lang="ts">
  import VProductHeader from './ui/ProductHeader.vue';

export default {
  name: "ProductLayout",
  components: {VProductHeader}
};
</script>