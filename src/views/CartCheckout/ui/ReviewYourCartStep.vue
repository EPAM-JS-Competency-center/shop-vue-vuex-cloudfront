<template>
	<v-container>
		<p class="text-h6">
			{{ $t('cart.summary') }}
		</p>

		<v-cart-list isEditable :cartItems="cartItems"></v-cart-list>

		<div class="d-flex justify-end">
			<v-btn
				class="ml-1"
				type="button"
				color="primary"
				@click="handleStepSubmit"
			>
				{{ $t('common.next') }}
			</v-btn>
		</div>
	</v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { CartItem } from '@/models/cart-item';

import VCartList from './CartList.vue';

export default Vue.extend({
	name: 'ReviewYourCartStep',
	props: {
		cartItems: Array as PropType<CartItem[]>,
	},
	components: { VCartList },
	methods: {
		handleStepSubmit() {
			this.$emit('complete');
		},
	},
});
</script>
