<template>
  <div id="app">
    <v-app-router></v-app-router>

    <v-app-version bottomRightCorner :value="appVersion"></v-app-version>
  </div>
</template>

<script lang="ts">
import VAppVersion from "@/libs/version/AppVersion.vue";

import VAppRouter from "./AppRouter.vue";

const APP_VERSION = process.env.VUE_APP_VERSION;

export default {
  components: { VAppVersion, VAppRouter },
  data: () => ({
    appVersion: APP_VERSION,
  }),
};
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
</style>
