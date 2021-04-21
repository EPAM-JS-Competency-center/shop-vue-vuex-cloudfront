<template>
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
					:initialFormValues="address"
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
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { ordersApi } from '@/api/orders-api';
import { CartItem } from '@/models/cart-item';

import VReviewYourCartStep from './ui/ReviewYourCartStep.vue';
import VShippingAddressStep from './ui/ShippingAddressStep.vue';
import VReviewYourOrderStep from './ui/ReviewYourOrderStep.vue';
//
import VThisCartIsEmpty from './ui/ThisCartIsEmpty.vue';
import VThankYouForOrder from './ui/ThankYouForOrder.vue';

interface ShippingAddressFormValues {
	firstName: string;
	lastName: string;
	address: string;
	comment?: string;
}

const initialAddress = {
	firstName: '',
	lastName: '',
	address: '',
	comment: '',
};

export default Vue.extend({
	name: 'CheckoutStepper',
	props: {
		cartItems: Array as PropType<CartItem[]>,
	},
	components: {
		VThisCartIsEmpty,
		VThankYouForOrder,
		//
		VShippingAddressStep,
		VReviewYourCartStep,
		VReviewYourOrderStep,
	},
	data: () => ({
		address: initialAddress,
		stepIndex: 1,
	}),
	created() {
		this.showEmptyCartIf(this.isCartEmpty);
	},
	computed: {
		isCartEmpty(): boolean {
			return !this.cartItems.length;
		},
	},
	watch: {
		isCartEmpty(empty: boolean) {
			this.showEmptyCartIf(empty);
		},
	},
	methods: {
		showEmptyCartIf(empty: boolean) {
			if (empty) {
				this.stepIndex = 0;
			}
		},
		clearCart() {
			this.address = initialAddress;

			this.$emit('clear-cart');
		},
		goBackStep() {
			this.stepIndex -= 1;
		},
		goNextStep() {
			this.stepIndex += 1;
		},
		handleReviewCartStep1() {
			this.goNextStep();
		},
		handleShippingAddressStep2(v: ShippingAddressFormValues) {
			this.address = {
				firstName: v.firstName,
				lastName: v.lastName,
				address: v.address,
				comment: v.comment || '',
			};

			this.goNextStep();
		},

		handleOrderStep3() {
			const order = {
				items: this.cartItems.map((cart: CartItem) => ({
					productId: cart.product.id,
					count: cart.count,
				})),
				address: this.address,
			};

			ordersApi
				.create(order)
				.then(() => {
					this.clearCart();
					this.goNextStep();
				})
				.catch(e => {
					this.$emit('on-error', e.message);
				});
		},
	},
});
</script>
