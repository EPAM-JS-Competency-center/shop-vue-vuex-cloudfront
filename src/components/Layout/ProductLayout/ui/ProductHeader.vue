<template>
  <v-app-bar class="px-6" color="indigo" dark app>
    <v-toolbar-title>
      <router-link class="home-link" to="/">
        {{ $t("app.title") }}
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-account-btn-menu></v-account-btn-menu>

    <v-btn class="ma-2 pa-2 mr-5" to="/cart" icon large>
      <v-icon>shopping_cart</v-icon>
    </v-btn>

    <v-language-picker-btn-menu></v-language-picker-btn-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

import VAccountBtnMenu from './AccountButtonMenu.vue';
import VLanguagePickerBtnMenu from './LanguagePickerButtonMenu.vue';

export default Vue.extend({
  name: "ProductHeader",
  components: {VAccountBtnMenu, VLanguagePickerBtnMenu},
});
</script>

<style scoped>
.home-link {
  color: white;
  text-decoration: none;
}
</style>
