<template>
	<div :class="{ 'right-bottom-corner': bottomRightCorner }" aria-hidden="true">
		<span class="version"> {{ appVersion }} </span>
	</div>
</template>

<style scoped>
div {
	position: fixed;
	z-index: 100;
}

.version {
	animation: smooth 5s ease-in infinite;
}

@keyframes smooth {
	0% {
		opacity: 0.9;
	}
	50% {
		opacity: 0.3;
	}
	100% {
		opacity: 0.9;
	}
}

.right-bottom-corner {
	right: 20px;
	bottom: 20px;
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		value: String,
		bottomRightCorner: Boolean,
	},
	computed: {
		appVersion() {
			return `App ver. ${this.value || 0}`;
		},
	},
});
</script>
