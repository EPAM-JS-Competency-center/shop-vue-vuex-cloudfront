<template>
	<div class="grey lighten-5">
		<v-container>
			<h5 class="text-h5 mb-3">
				{{ $t('orders.manage') }}
			</h5>

			<v-orders-table
				:orders="orders"
				:isLoading="isFetching"
				@delete-order="deleteOrder"
			></v-orders-table>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import { ordersApi } from '@/api/orders-api';
import { Order } from '@/models/order';

import VOrdersTable from './ui/OrdersTable.vue';

export default Vue.extend({
	name: 'ProductOrders',
	components: { VOrdersTable },
	data() {
		return {
			orders: [] as Order[],
			isFetching: false,
		};
	},
	created() {
		this.fetchOrders();
	},
	methods: {
		fetchOrders() {
			this.isFetching = true;

			ordersApi
				.fetchOrders()
				.then((items: Order[]) => {
					this.orders = items;
				})
				.finally(() => {
					this.isFetching = false;
				});
		},
		deleteOrder(id: string): void {
			this.isFetching = true;

			ordersApi
				.deleteOrderById(id)
				.then(() => {
					return this.fetchOrders();
				})
				.finally(() => {
					this.isFetching = false;
				});
		},
	},
});
</script>
