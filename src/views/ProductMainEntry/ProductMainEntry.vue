<template>
  <v-product-layout>
    <router-view></router-view>
  </v-product-layout>
</template>

<script lang="ts">
import Vue from 'vue';

import {VProductLayout} from '@/components/Layout/ProductLayout';

export default Vue.extend({
  name: "ProductMainEntry",
  components: {VProductLayout}
});
</script>