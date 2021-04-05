<template>
	<div class="grey lighten-5">
		<v-container>
			<v-stepper v-model="stepIndex">
				<h4 class="text-h4 d-flex justify-center py-6">Checkout</h4>

				<v-stepper-header>
					<v-stepper-step :complete="stepIndex > 1" step="1">
						{{ $t('cart.review') }}
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="stepIndex > 2" step="2">
						{{ $t('cart.shippingAddress') }}
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step :complete="stepIndex > 3" step="3">
						{{ $t('orders.review') }}
					</v-stepper-step>

					<v-divider></v-divider>

					<v-stepper-step step="4">
						{{ $t('orders.complete') }}
					</v-stepper-step>
				</v-stepper-header>

				<v-stepper-items>
					<v-stepper-content step="0">
						<v-this-cart-is-empty />
					</v-stepper-content>

					<v-stepper-content step="1">
						<v-review-your-cart-step
							:cartItems="cartItems"
							@complete="handleReviewCartStep1"
						/>
					</v-stepper-content>

					<v-stepper-content step="2">
						<v-shipping-address-step
							@complete="handleShippingAddressStep2"
							@back="goBackStep"
						/>
					</v-stepper-content>

					<v-stepper-content step="3">
						<v-review-your-order-step
							:cartItems="cartItems"
							:address="address"
							@complete="handleOrderStep3"
							@back="goBackStep"
						/>
					</v-stepper-content>

					<v-stepper-content step="4">
						<v-thank-you-for-order />
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

import VReviewYourCartStep from './ui/ReviewYourCartStep.vue';
import VShippingAddressStep from './ui/ShippingAddressStep.vue';
import VReviewYourOrderStep from './ui/ReviewYourOrderStep.vue';
//
import VThisCartIsEmpty from './ui/ThisCartIsEmpty.vue';
import VThankYouForOrder from './ui/ThankYouForOrder.vue';

interface ShippingAddressFormValues {
	firstname: string;
	lastname: string;
	address: string;
	comment?: string;
}

export default Vue.extend({
	name: 'CartCheckout',
	components: {
		VThisCartIsEmpty,
		VThankYouForOrder,
		//
		VShippingAddressStep,
		VReviewYourCartStep,
		VReviewYourOrderStep,
	},
	data() {
		return {
			address: {
				firstName: 'FirstName',
				lastName: 'LastName',
				address: 'Moon',
				comment: 'the best place',
			},
			stepIndex: 1,
		};
	},
	created() {
		if (this.isCartEmpty) {
			this.stepIndex = 0;
		}
	},
	computed: {
		...mapGetters(['cartItems']),
		isCartEmpty(): boolean {
			return !this.cartItems.length;
		},
	},
	methods: {
		goBackStep() {
			this.stepIndex -= 1;
		},
		goNextStep() {
			this.stepIndex += 1;
		},
		handleReviewCartStep1() {
			this.goNextStep();
		},
		handleShippingAddressStep2(values: ShippingAddressFormValues) {
			console.info(values);
			this.goNextStep();
		},
		handleOrderStep3() {
			this.goNextStep();
		},
	},
});
</script>

<style scoped></style>
