<template>
  <div v-show="isErrorSnackbar">
    <v-error-snackbar v-model="snackbar.visible" :message="snackbar.message">
    </v-error-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { SnackbarType } from "@/store/snackbar";

import VErrorSnackbar from "./ui/ErrorSnackbar.vue";

export default Vue.extend({
  components: { VErrorSnackbar },
  computed: {
    snackbar() {
      return this.$store.state.snackbar;
    },
    isErrorSnackbar() {
      const snackbar = this.$store.state.snackbar;

      return snackbar.type === SnackbarType.Error;
    },
  },
});
</script>
