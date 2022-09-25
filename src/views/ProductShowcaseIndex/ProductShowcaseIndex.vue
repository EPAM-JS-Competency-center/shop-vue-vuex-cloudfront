<template>
	<div class="grey lighten-5">
		<v-container>
			<v-row>
				<v-col
					xs="12"
					sm="6"
					md="4"
					col="3"
					v-for="product in products"
					:key="product.id"
				>
					<v-card class="pa-2" data-test-id="product-card" outlined tile>
						<v-img height="250" :src="product.image"></v-img>
						<v-card-title>{{ product.title }}</v-card-title>
						<v-card-text>
							<p class="my-4 subtitle-1">
								{{ product.description }}
							</p>
							<p>
								{{
									$t('products.dynamicPrice', {
										price: formatPrice(product.price),
									})
								}}
							</p>

							<p>
								{{ $t('products.dynamicCount', { count: product.count }) }}
							</p>
						</v-card-text>

						<v-card-actions>
							<v-add-product-to-cart
								isEditable
								@increment="handleProductIncrement(product)"
								@decrement="handleProductDecrement(product.id)"
								:maxCount="product.count"
							></v-add-product-to-cart>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

import { VAddProductToCart } from '@/components/AddProductToCart';

import { Product } from '@/models/product';
import { productApi } from '@/api/product-api';
import { formatter as priceFormatter } from '@/libs/price';

export default Vue.extend({
	name: 'ProductShowcaseIndex',
	components: { VAddProductToCart },
	data() {
		return {
			isFetching: false,
			products: [] as Product[],
			error: null,
		};
	},
	created() {
		this.fetchProducts();
	},
	methods: {
		formatPrice(price: number) {
			return priceFormatter.number(price);
		},
		fetchProducts() {
			this.isFetching = true;

			productApi
				.fetchProducts()
				.then(products => {
					this.products = products;
				})
				.finally(() => {
					this.isFetching = false;
				});
		},

		handleProductIncrement(product: Product) {
			this.$store.dispatch('cart/addProductToCart', product);
		},

		handleProductDecrement(productId: string) {
			this.$store.dispatch('cart/removeProductFromCart', productId);
		},
	},
});
</script>
