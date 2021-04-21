<template>
	<div class="grey lighten-5">
		<v-progress-linear
			indeterminate
			color="indigo"
			:class="[isFetching ? '' : 'op-0']"
		/>
		<v-container class="white">
			<h4 class="text-h4 d-flex justify-center py-6">
				{{ $t('orders.manageOne') }}
			</h4>

			<v-row justify="center">
				<v-col cols="12">
					<v-status-history-table :items="statusHistoryItems">
					</v-status-history-table>
				</v-col>
				<v-divider />
			</v-row>

			<v-row justify="center">
				<v-col cols="6">
					<v-order-details :cartItems="cartItems" :address="order.address" />
				</v-col>
				<v-col cols="6">
					<v-change-status-form
						:initialStatus="statusSelectValue"
						@submit="submitStatusDetails"
					/>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<style scoped>
.op-0 {
	opacity: 0;
}
</style>

<script lang="ts">
import Vue from 'vue';

import { ORDER_STATUS, Order } from '@/models/order';
import { CartItem } from '@/models/cart-item';
import { Product } from '@/models/product';

import { ordersApi } from '@/api/orders-api';
import { productApi } from '@/api/product-api';

import VOrderDetails from '@/components/CheckoutStepper/ui/OrderDetails.vue';

import VStatusHistoryTable from './ui/StatusHistoryTable.vue';
import VChangeStatusForm from './ui/ChangeStatusForm.vue';

const initialOrder = {
	address: {
		firstName: '',
		lastName: '',
		address: '',
		comment: '',
	},
};

export default Vue.extend({
	name: 'EditableOrderForm',
	components: { VOrderDetails, VChangeStatusForm, VStatusHistoryTable },
	data: () => ({
		cartItems: [] as CartItem[],
		order: initialOrder as Order,
		//
		statusSelectValue: ORDER_STATUS.Open,
		statusHistoryItems: [],
		comment: '',
		//
		isFetching: false,
	}),
	beforeRouteEnter(to, _, next) {
		next(vm => {
			// @ts-expect-error todo
			vm.fetchExistingOrder(to.params.orderId);
		});
	},
	methods: {
		updateView(cartItems: CartItem[], order: Order) {
			const statusHistory = (order.statusHistory || []) as any;

			this.cartItems = cartItems;
			this.order = order;
			this.statusHistoryItems = statusHistory;

			const lastStatus = statusHistory[statusHistory.length - 1];

			this.statusSelectValue = lastStatus?.status as any;
		},
		fetchExistingOrder(orderId: string) {
			this.isFetching = true;

			Promise.all([
				productApi.fetchProducts(),
				ordersApi.fetchOrderById(orderId),
			])
				.then(([products, order]) => {
					const cartItems = order.items.map(cart => ({
						product: products.find((p: Product) => p.id === cart.productId),
						count: cart.count,
					}));

					this.updateView(cartItems as any, order as any);
				})
				.finally(() => {
					this.isFetching = false;
				})
				.catch(e => {
					this.showErrorSnackbar(e.message);
				});
		},
		showErrorSnackbar(reason: string) {
			const message = this.$t('errorMessage.cantProceedRequest', {
				reason: reason,
			});

			this.$store.dispatch('snackbar/showErrorSnackber', { message });
		},
		submitStatusDetails(v: { status: ORDER_STATUS; comment: string }) {
			const orderId = this.order.id as string;

			this.isFetching = true;

			ordersApi
				.changeOrderStatus(orderId, {
					status: v.status,
					comment: v.comment || '',
				})
				.finally(() => {
					this.isFetching = false;
				})
				.catch(e => {
					this.showErrorSnackbar(e.message);
				});
		},
	},
});
</script>
