<template>
	<v-data-table
		:headers="headers"
		:items="mappedStatusHistoryItems"
		:items-per-page="10"
		:loading="isFetching"
		item-key="id"
		class="elevation-1"
	>
		<template v-slot:loading>
			<v-progress-linear indeterminate color="indigo"></v-progress-linear>

			<p class="pa-2 v-data-table__empty-wrapper">
				{{ $t('app.loading') }}
			</p>
		</template>

		<template v-slot:item="{ item }">
			<tr>
				<td class="text-center">
					{{ item.status }}
				</td>
				<td class="text-center">
					{{ item.date }}
				</td>
				<td class="text-center">
					{{ item.comment }}
				</td>
			</tr>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import type { StatusHistory } from '@/models/order';

export default Vue.extend({
	name: 'StatusHistoryTable',
	props: {
		items: Array as PropType<StatusHistory[]>,
	},
	data() {
		const toi18n = (v: string) => this.$t(v);

		return {
			isFetching: false,
			headers: [
				{
					text: toi18n('common.status'),
					value: 'status',
					sortable: true,
					align: 'center',
				},
				{
					text: toi18n('common.dateAndTime'),
					value: 'timestamp',
					sortable: true,
					align: 'center',
				},
				{ text: toi18n('common.comment'), value: 'comment', align: 'center' },
			],
		};
	},
	computed: {
		mappedStatusHistoryItems() {
			return this.items.map((item: StatusHistory, i: number) => ({
				id: i,
				date: new Date(item.timestamp),
				status: item.status,
				comment: item.comment,
			}));
		},
	},
});
</script>
