<template>
	<div class="grey lighten-5">
		<v-container>
			<h5 class="text-h5 mb-3">
				{{ $t('products.importCsvFile') }}
			</h5>

			<v-csv-file-uploader :url="uploaderS3Url"></v-csv-file-uploader>

			<v-csv-product-table
				:products="products"
				:isLoading="isFetching"
				@delete-product="deleteProduct"
			></v-csv-product-table>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import { productApi } from '@/api/product-api';
import { Product } from '@/models/product';

import VCsvProductTable from './ui/CSVProductTable.vue';
import VCsvFileUploader from './ui/CSVFileUploader.vue';

import { API_PATHS } from '@/constants/api-paths';

// TODO: avoid any
export default Vue.extend({
	name: 'ProductImport',
	components: { VCsvProductTable, VCsvFileUploader },
	data() {
		return {
			products: [] as Product[],
			isFetching: false,

			uploaderS3Url: `${API_PATHS.import}/import`,
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		fetchProducts() {
			this.isFetching = true;

			productApi
				.fetchProducts()
				.then((items: Product[]) => {
					this.products = items;
				})
				.finally(() => {
					this.isFetching = false;
				});
		},
		deleteProduct(id: string): void {
			this.isFetching = true;

			productApi
				.deleteProductById(id)
				.then(() => this.fetchProducts())
				.finally(() => {
					this.isFetching = false;
				});
		},
	},
});
</script>
