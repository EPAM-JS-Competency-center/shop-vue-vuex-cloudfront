<template>
	<v-data-table
		:headers="headers"
		:items="mappedOrders"
		:items-per-page="10"
		:loading="isFetching"
		item-key="id"
		class="elevation-1"
		data-testId="orders-table"
	>
		<template v-slot:loading>
			<v-progress-linear indeterminate color="indigo"></v-progress-linear>

			<p class="pa-2 v-data-table__empty-wrapper">
				{{ $t('app.loading') }}
			</p>
		</template>

		<template v-slot:item="{ item }">
			<tr>
				<td>{{ item.customerInfo }}</td>
				<td>
					<v-chip :color="item.orderColorIndicator" dark>
						{{ item.orderItemsCount }}
					</v-chip>
				</td>
				<td>
					{{ item.address }}
				</td>

				<td>{{ item.status }}</td>

				<td>
					<v-btn
						class="mr-1"
						color="primary"
						small
						exact
						data-testid="manage-order"
						:to="`/admin/order/${item.id}`"
					>
						{{ $t('common.manage') }}
					</v-btn>

					<v-btn
						class="ml-1"
						color="error"
						data-testid="delete-order"
						@click="deleteOrder(item.id)"
						small
					>
						{{ $t('common.delete') }}
					</v-btn>
				</td>
			</tr>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { Order } from '@/models/order';

// TODO Enum
const getColor = (count: number) => {
	if (count > 100) {
		return 'green';
	}

	if (count > 50) {
		return 'orange';
	}

	return 'red';
};

const mapOrder = (order: Order) => {
	const address = Object(order.address);

	const firstName = address?.firstName;
	const lastName = address?.lastName;
	const length = order.items.length;

	const statusHistory = order.statusHistory;
	const lastStatusIndex = order.statusHistory.length - 1;

	const status = statusHistory[lastStatusIndex].status.toUpperCase();

	return {
		id: order.id,
		customerInfo: `${firstName} ${lastName}`,
		orderColorIndicator: getColor(length),
		orderItemsCount: length || 0,
		address: address.address || '',
		status: status || '',
	};
};

export default Vue.extend({
	name: 'OrdersTable',
	props: {
		orders: Array as PropType<Order[]>,
		isFetching: Boolean,
	},
	data() {
		const headerTitle = (textId: string, value: string) => ({
			text: this.$t(textId),
			value,
		});

		return {
			headers: [
				headerTitle('orders.from', 'from'),
				headerTitle('orders.itemsCount', 'itemsCount'),
				headerTitle('orders.address', 'address'),
				headerTitle('orders.status', 'status'),
				headerTitle('orders.action', 'action'),
			],
		};
	},
	computed: {
		mappedOrders() {
			return this.orders.map(mapOrder);
		},
	},
	methods: {
		deleteOrder(orderId: string) {
			this.$emit('delete-order', orderId);
		},
	},
});
</script>
