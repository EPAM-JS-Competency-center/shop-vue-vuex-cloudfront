<template>
	<v-container class="grey lighten-5 py-2" fluid>
		<v-progress-linear
			indeterminate
			color="indigo"
			:class="[isFetching ? '' : 'opacity-0']"
		>
		</v-progress-linear>

		<v-row class="my-3" justify="center">
			<v-col class="white elevation-1" cols="12" md="6" xs="10">
				<v-product-form
					:disabled="isFetching"
					:product="product"
					:isEditableMode="isEditableMode"
					@submit="handleProductSubmit"
				/>
			</v-col>
		</v-row>

		<v-snackbar v-model="showErrorSnackbar" timeout="7000">
			<p class="my-0 font-weight-medium" v-html="errorMessage"></p>

			<p class="my-0 text-caption font-weight-thin">
				{{ $t('errorMessage.checkDevLogs') }}
			</p>

			<template v-slot:action="{ attrs }">
				<v-btn
					color="pink"
					text
					v-bind="attrs"
					@click="showErrorSnackbar = false"
				>
					{{ $t('common.close') }}
				</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<style scoped>
.opacity-0 {
	opacity: 0;
}
</style>

<script lang="ts">
import Vue from 'vue';

import { productApi } from '@/api/product-api';
import { Product } from '@/models/product';

import VProductForm from './ui/ProductForm.vue';

const emptyProductStub = {
	id: '',
	title: '',
	description: '',
	count: 0,
	price: 0,
};

// TODO: common snackbar

export default Vue.extend({
	name: 'EditableProductForm',
	components: { VProductForm },
	data: () => ({
		isEditableMode: false,
		isFetching: false,
		//
		showErrorSnackbar: false,
		errorMessage: '',
		//
		product: emptyProductStub,
	}),
	beforeRouteEnter(to, _, next) {
		next(vm => {
			// @ts-expect-error todo
			vm.fetchExistingProduct(to.params.productId);
		});
	},
	methods: {
		async fetchExistingProduct(id?: string) {
			this.isEditableMode = Boolean(id);

			if (!id) {
				return;
			}

			this.isFetching = true;

			try {
				this.product = await productApi.fetchProductById(id);
			} catch (e) {
				this.showSnackbarWithMessage(e.message);
			} finally {
				this.isFetching = false;
			}
		},
		showSnackbarWithMessage(errorMessage: string) {
			const message = this.$t('errorMessage.cantProceedRequest', {
				reason: errorMessage,
			});

			this.showErrorSnackbar = true;
			this.errorMessage = message.toString();
		},
		async handleProductSubmit(values: Product) {
			console.info(values);
			this.isFetching = true;

			try {
				await productApi.saveProduct(values);

				this.$router.push('/admin/products');
			} catch (e) {
				this.showSnackbarWithMessage(e.message);
			} finally {
				this.isFetching = false;
			}
		},
	},
});
</script>
