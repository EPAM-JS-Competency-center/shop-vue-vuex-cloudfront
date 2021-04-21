<template>
	<v-list subheader>
		<v-list-item v-for="cart in cartItems" :key="cart.product.id" class="px-0">
			<v-list-item-avatar size="inherit">
				<v-add-product-to-cart
					:isEditable="isEditable"
					:maxCount="cart.product.count"
					:initialCount="cart.count"
					@increment="handleProductIncrement(cart.product)"
					@decrement="handleProductDecrement(cart.product.id)"
				></v-add-product-to-cart>
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title v-text="cart.product.title"></v-list-item-title>

				<v-list-item-subtitle
					v-text="cart.product.description"
				></v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action>
				<v-list-item-title class="body2">
					{{ formatPrice(cart.product.price) }}
					x
					{{ cart.count }}

					=
					{{ formatPrice(cart.count * cart.product.price) }}
				</v-list-item-title>
			</v-list-item-action>
		</v-list-item>

		<v-list-item class="px-0">
			<v-list-item-content>
				<v-list-item-title>
					{{ $t('cart.shippingAddress') }}
				</v-list-item-title>
			</v-list-item-content>

			<v-list-item-action>
				<v-list-item-title class="body2 font-weight-bold">
					{{ $t('common.free') }}
				</v-list-item-title>
			</v-list-item-action>
		</v-list-item>

		<v-divider />

		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="text-h5">
					{{ $t('common.total') }}
				</v-list-item-title>
			</v-list-item-content>

			<v-list-item-action>
				<p class="text-h5">
					<v-catch-attention :value="formatPrice(totalCartAmount)" />
				</p>
			</v-list-item-action>
		</v-list-item>
	</v-list>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { formatter as priceFormatter } from '@/libs/price';
import { CartItem } from '@/models/cart-item';
import { Product } from '@/models/product';

import { VAddProductToCart } from '@/components/AddProductToCart';
import VCatchAttention from '@/components/Animation/CatchAttention.vue';

const sum = (total: number, item: CartItem) => {
	return item.count * item.product.price + total;
};

export default Vue.extend({
	name: 'CartList',
	props: {
		cartItems: Array as PropType<CartItem[]>,
		isEditable: Boolean,
	},
	computed: {
		totalCartAmount() {
			return this.cartItems.reduce(sum, 0);
		},
	},
	methods: {
		formatPrice(price: number) {
			return priceFormatter.number(price);
		},
		handleProductIncrement(product: Product) {
			this.$store.dispatch('cart/addProductToCart', product);
		},

		handleProductDecrement(productId: string) {
			this.$store.dispatch('cart/removeProductFromCart', productId);
		},
	},
	components: { VAddProductToCart, VCatchAttention },
});
</script>
