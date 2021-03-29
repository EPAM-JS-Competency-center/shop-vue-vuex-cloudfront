
<template>
  <v-app-bar class="px-6" color="indigo" dark app>
    <v-toolbar-title>
        <router-link class="home-link" to="/">My Store!</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ma-2 pa-2"
          icon
          large
          v-bind="attrs"
          v-on="on"
          aria-haspopup="true"
        >
          <v-icon>account_circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item to="/admin/orders">
          <v-list-item-title> Manage orders </v-list-item-title>
        </v-list-item>

        <v-list-item to="/admin/products">
          <v-list-item-title>Manage products</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn class="ma-2 pa-2" to="/cart" icon large>
      <v-icon>shopping_cart</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
export default {
  name: "ProductHeader",
};
</script>

<style scoped>
  .home-link {
     color: white;
    text-decoration: none;
  }
</style>