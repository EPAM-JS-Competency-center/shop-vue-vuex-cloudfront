<template>
	<v-container>
		<p class="text-h6">Order summary</p>

		<v-order-details :cartItems="cartItems" :address="address">
		</v-order-details>

		<div class="d-flex justify-end">
			<v-btn class="mr-1" type="button" @click="$emit('back')">
				{{ $t('common.back') }}
			</v-btn>

			<v-btn
				class="ml-1"
				data-test-id="place-order-button"
				type="button"
				color="primary"
				@click="handleStepSubmit"
			>
				{{ $t('orders.apply') }}
			</v-btn>
		</div>
	</v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { CartItem } from '@/models/cart-item';

import VOrderDetails from './OrderDetails.vue';

export default Vue.extend({
	name: 'ReviewYourOrderStep',
	components: { VOrderDetails },
	props: {
		cartItems: Array as PropType<CartItem[]>,
		address: Object,
	},
	methods: {
		handleStepSubmit() {
			this.$emit('complete');
		},
	},
});
</script>
