<template>
	<div class="d-flex justify-center flex-column align-center py-12">
		<p class="text-h6">
			{{ $t('cart.empty') }}
		</p>

		<v-btn to="/" color="indigo" data-test-id="shop-button" outlined text>
			<v-icon class="mr-2" right dark>shopping_cart</v-icon>
			{{ $t('common.goToShopping') }}
		</v-btn>
	</div>
</template>
