<template>
	<v-card elevation="1">
		<v-card-title> {{ $t('common.status') }} </v-card-title>
		<v-card-text>
			<v-select
				v-model="select"
				hint="Current status"
				:items="items"
				:label="$t('common.status')"
				persistent-hint
				return-object
				single-line
			></v-select>

			<v-text-field
				:label="$t('common.comment')"
				v-model="comment"
			></v-text-field>
		</v-card-text>
		<v-divider class="mt-2"></v-divider>
		<v-card-actions>
			<v-btn type="button" text color="primary" @click="submitForm">
				{{ $t('common.changeStatus') }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

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
	name: 'ChangeStatusForm',
	props: {
		initialStatus: String as PropType<ORDER_STATUS>,
	},
	data() {
		const defaultValue = this.initialStatus as ORDER_STATUS;

		const toi18n = (v: ORDER_STATUS) => this.$t(intlMap[v]);

		return {
			comment: '',
			//
			select: { value: defaultValue, text: toi18n(defaultValue) },
			items: ORDER_STATUS_FLOW.map((status: ORDER_STATUS) => ({
				value: status,
				text: toi18n(status),
			})),
		};
	},
	methods: {
		submitForm() {
			this.$emit('submit', {
				status: this.select.value,
				comment: this.comment || '',
			});
		},
	},
	watch: {
		initialStatus(newStatus: ORDER_STATUS) {
			this.select = {
				value: newStatus,
				text: this.$t(intlMap[newStatus]),
			};
		},
	},
});
</script>
