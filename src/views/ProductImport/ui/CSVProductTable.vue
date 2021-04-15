<template>
	<v-data-table
		:headers="headers"
		:items="products"
		:items-per-page="10"
		:loading="isFetching"
		item-key="id"
		class="elevation-1"
	>
		<template v-slot:loading>
			<v-progress-linear indeterminate color="indigo" />

			<p class="pa-2 v-data-table__empty-wrapper">
				{{ $t('app.loading') }}
			</p>
		</template>

		<template v-slot:item="{ item }">
			<tr>
				<td>{{ item.title }}</td>

				<td>
					{{ item.description }}
				</td>

				<td>{{ item.price }}</td>

				<td>
					<v-chip :color="getColor(item.count)" dark>
						{{ item.count }}
					</v-chip>
				</td>

				<td>
					<v-btn
						class="mr-1"
						color="primary"
						small
						:to="`/admin/product-form/${item.id}`"
					>
						{{ $t('common.manage') }}
					</v-btn>

					<v-btn
						class="ml-1"
						color="error"
						@click="deleteProduct(item.id)"
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

import { Product } from '@/models/product';

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

export default Vue.extend({
	name: 'CSVProductTable',
	props: {
		products: Array as PropType<Product[]>,
		isFetching: Boolean,
	},
	data() {
		const headerTitle = (textId: string, value: string) => ({
			text: this.$t(textId),
			value,
		});

		return {
			headers: [
				headerTitle('products.title', 'title'),
				headerTitle('products.description', 'description'),
				headerTitle('products.price', 'price'),
				headerTitle('products.count', 'count'),
				headerTitle('products.action', 'action'),
			],
		};
	},
	methods: {
		getColor,
		deleteProduct(productId: string) {
			this.$emit('delete-product', productId);
		},
	},
});
</script>
