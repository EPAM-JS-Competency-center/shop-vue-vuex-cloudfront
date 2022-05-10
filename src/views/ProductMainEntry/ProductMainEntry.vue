<template>
	<v-product-layout :cartCountBadge="cartItems.length">
		<router-view></router-view>
	</v-product-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

import { VProductLayout } from '@/components/Layout/ProductLayout';

export default Vue.extend({
	name: 'ProductMainEntry',
	components: { VProductLayout },
	computed: {
		...mapState('cart', ['errorMessage', 'cartItems']),
	},
	created() {
		this.fetchInitialCart();
	},
	watch: {
		cartErrorMessage(message: string) {
			if (message) {
				this.$store.dispatch('snackbar/showErrorSnackbar', { message });
			}
		},
	},
	methods: {
		fetchInitialCart() {
			this.$store.dispatch('cart/fetchCart');
		},
	},
});
</script>
