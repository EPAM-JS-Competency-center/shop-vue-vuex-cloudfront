<template>
  <div :class="{ 'right-bottom-corner': bottomRightCorner }" aria-hidden="true">
    {{ appVersion }}
  </div>
</template>

<style scoped>
div {
  position: fixed;
  z-index: 100;
  opacity: 0.5;
}

.right-bottom-corner {
  right: 20px;
  bottom: 20px;
}
</style>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    value: Number,
    bottomRightCorner: Boolean,
  },
  computed: {
    appVersion() {
      return `App ver. ${this.value || 0}`;
    },
  },
});
</script>