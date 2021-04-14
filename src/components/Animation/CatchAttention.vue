<template>
	<transition name="scale" mode="out-in">
		<div class="catch-attention" :key="value">
			{{ value }}
		</div>
	</transition>
</template>

<style>
.catch-attention {
	transition: transform 0.4s;
	backface-visibility: hidden;
}

.scale-enter {
	transform: scale(1.6);
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		value: String,
	},
});
</script>
