<template>
	<v-menu left bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				class="ma-2 pa-2"
				icon
				large
				v-bind="attrs"
				v-on="on"
				data-test-id="account-button"
				aria-haspopup="true"
			>
				<v-icon>account_circle</v-icon>
			</v-btn>
		</template>

		<v-list data-test-id="account-menu">
			<v-list-item to="/admin/orders">
				<v-list-item-title>
					{{ $t('orders.manage') }}
				</v-list-item-title>
			</v-list-item>

			<v-list-item to="/admin/products">
				<v-list-item-title>
					{{ $t('products.manage') }}
				</v-list-item-title>
			</v-list-item>

			<v-list-item to="/admin/product-form">
				<v-list-item-title>
					{{ $t('products.create') }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'AccountButtonMenu',
});
</script>
