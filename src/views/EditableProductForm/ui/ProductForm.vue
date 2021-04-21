<template>
	<v-form
		class="px-4"
		:disabled="disabled"
		ref="form"
		v-model="valid"
		@submit.prevent="handleFormSubmit"
	>
		<h4
			class="text-h4 d-flex justify-center py-6"
			v-html="dynamicFormTitleText"
		></h4>

		<v-row>
			<v-col cols="12" md="12">
				<v-text-field
					:label="$t('products.title')"
					name="title"
					v-model="title"
					:rules="validationRules"
				></v-text-field>
			</v-col>

			<v-col cols="12" md="12">
				<v-text-field
					:label="$t('products.description')"
					name="description"
					v-model="description"
					:rules="validationRules"
				></v-text-field>
			</v-col>

			<v-col cols="12" md="6">
				<v-text-field
					type="number"
					:label="$t('products.price')"
					name="price"
					v-model="price"
					:rules="validationRules"
				></v-text-field>
			</v-col>

			<v-col cols="12" md="6">
				<v-text-field
					type="number"
					name="count"
					:label="$t('products.count')"
					v-model="count"
					:rules="validationRules"
				></v-text-field>
			</v-col>

			<v-col cols="12" class="d-flex justify-end">
				<v-btn class="mr-1" type="button" @click="handleFormReset">
					{{ $t('common.clear') }}
				</v-btn>

				<v-btn
					class="ml-1"
					type="submit"
					color="primary"
					v-html="dynamicSubmitButtonText"
				>
				</v-btn>
			</v-col>
		</v-row>
	</v-form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

import { Product } from '@/models/product';

type VuetifyFormElement = Vue & { validate(): void };
// TODO: common validation rules
const required = (v: string) => !!v || 'Field is required';

export default Vue.extend({
	props: {
		product: Object as PropType<Product>,
		disabled: Boolean,
		isEditableMode: Boolean,
	},
	data: () => ({
		valid: true,
		validationRules: [required],
		//
		title: '',
		description: '',
		count: 0,
		price: 0,
	}),
	computed: {
		dynamicFormTitleText() {
			const textId = this.isEditableMode ? 'products.edit' : 'products.create';

			return this.$t(textId);
		},
		dynamicSubmitButtonText() {
			const textId = this.isEditableMode ? 'products.update' : 'products.save';

			return this.$t(textId);
		},
	},
	watch: {
		product(v: Product) {
			this.title = v.title;
			this.description = v.description;
			this.count = v.count;
			this.price = v.price;
		},
	},
	methods: {
		triggerValidation(): void {
			(this.$refs.form as VuetifyFormElement).validate();
		},
		handleFormSubmit() {
			this.triggerValidation();

			if (!this.valid) {
				return;
			}

			this.$emit('submit', {
				title: this.title,
				description: this.description,
				count: this.count,
				price: this.price,
			});
		},
		handleFormReset() {
			this.title = '';
			this.description = '';
			this.count = 0;
			this.price = 0;
		},
	},
});
</script>
