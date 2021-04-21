<template>
	<div v-if="productCount < 1">
		<v-btn
			color="pink"
			icon
			large
			data-test-id="add-product-button"
			@click="showCounters()"
		>
			<v-icon>shopping_cart</v-icon>
		</v-btn>
	</div>
	<div v-else>
		<v-btn
			icon
			large
			data-test-id="decrement-product-count"
			@click="decrementProduct()"
		>
			<v-icon>remove</v-icon>
		</v-btn>

		<span data-test-id="product-count" class="px-3">
			{{ productCount }}
		</span>

		<v-btn
			:disabled="isAddButtonDisabled"
			icon
			large
			data-test-id="increment-product-count"
			@click="incrementProduct()"
		>
			<v-icon>add</v-icon>
		</v-btn>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'AddProductToCart',
	props: {
		maxCount: Number,
		initialCount: Number,
		isEditable: Boolean,
	},
	data() {
		return {
			productCount: this.initialCount || 0,
		};
	},
	computed: {
		isAddButtonDisabled(): boolean {
			return this.productCount >= this.maxCount;
		},
	},
	methods: {
		showCounters() {
			if (!this.isEditable) {
				return;
			}

			this.incrementProduct();
		},
		incrementProduct() {
			this.productCount += 1;

			this.$emit('increment', this.productCount);
		},
		decrementProduct() {
			this.productCount -= 1;

			this.$emit('decrement', this.productCount);
		},
	},
});
</script>
