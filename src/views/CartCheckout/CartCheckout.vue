<template>
	<v-container class="grey lighten-5" fluid>
		<v-row class="my-3" justify="center">
			<v-col cols="12" md="7" xs="10">
				<v-checkout-stepper
					:cartItems="cartItems"
					@clear-cart="clearCart"
					@on-error="showErrorSnackbarMessage"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import VCheckoutStepper from '@/components/CheckoutStepper/CheckoutStepper.vue';

export default Vue.extend({
	name: 'CartCheckout',
	components: {
		VCheckoutStepper,
	},
	computed: {
		...mapGetters(['cartItems']),
	},
	methods: {
		clearCart() {
			this.$store.dispatch('cart/clearCart');
		},
		showErrorSnackbarMessage(reason: string) {
			const message = this.$t('errorMessage.orderCreation', {
				reason: reason,
			});

			this.$store.dispatch('snackbar/showErrorSnackber', { message });
		},
	},
});
</script>
