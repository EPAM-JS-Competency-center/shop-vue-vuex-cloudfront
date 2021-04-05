<template>
	<v-select
		v-model="select"
		:hint="`${select.text}`"
		:items="items"
		label="Status"
		persistent-hint
		return-object
		single-line
	></v-select>
</template>

<script lang="ts">
import Vue from 'vue';

import { ORDER_STATUS, ORDER_STATUS_FLOW } from '@/models/order';

const intlMap = {
	[ORDER_STATUS.Open]: 'orders.statusOpen',
	[ORDER_STATUS.Approved]: 'orders.statusApproved',
	[ORDER_STATUS.Confirmed]: 'orders.statusConfirmed',
	[ORDER_STATUS.Sent]: 'orders.statusSent',
	[ORDER_STATUS.Completed]: 'orders.statusCompleted',
	[ORDER_STATUS.Cancelled]: 'orders.statusCancelled',
};

export default Vue.extend({
	name: 'StatusSelect',
	props: {
		status: String,
	},
	data() {
		const defaultValue = this.status as ORDER_STATUS;

		const toi18n = (v: ORDER_STATUS) => this.$t(intlMap[v]);

		return {
			select: { value: defaultValue, text: toi18n(defaultValue) },
			items: ORDER_STATUS_FLOW.map((status: ORDER_STATUS) => ({
				value: status,
				text: toi18n(status),
			})),
		};
	},

	watch: {
		status(newStatus: ORDER_STATUS) {
			this.select = {
				value: newStatus,
				text: this.$t(intlMap[newStatus]),
			};
		},
	},
});
</script>
