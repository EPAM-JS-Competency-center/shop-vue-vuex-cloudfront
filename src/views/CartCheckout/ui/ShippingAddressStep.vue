<template>
	<v-container>
		<v-form
			ref="form"
			v-model="valid"
			@submit.prevent="handleStepSubmit"
			@reset.prevent="resetForm"
		>
			<p class="text-h6">
				{{ $t('cart.shippingAddress') }}
			</p>

			<v-row>
				<v-col cols="12" md="6">
					<v-text-field
						label="First Name"
						v-model="firstname"
						:rules="commonValidationRule"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field
						label="Last Name"
						v-model="lastname"
						:rules="commonValidationRule"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="12">
					<v-text-field
						label="Shipping Address"
						v-model="address"
						:rules="commonValidationRule"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="12">
					<v-text-field label="Comment" v-model="comment" solo></v-text-field>
				</v-col>

				<v-col cols="12" class="d-flex justify-end">
					<v-btn class="mr-1" type="reset"> Clear </v-btn>

					<v-btn class="ml-1" type="submit" color="primary">
						{{ $t('common.next') }}
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script lang="ts">
import Vue from 'vue';

const onlyString = (v: string) => typeof v === 'string';
const required = (v: string) => !!v || 'Field is required';

type VuetifyFormElement = Vue & { validate(): void };

export default Vue.extend({
	name: 'ShippingAddressStep',
	data: () => ({
		valid: true,

		firstname: '',
		lastname: '',
		address: '',
		comment: '',

		commonValidationRule: [required, onlyString],
	}),
	methods: {
		triggerValidation(): void {
			(this.$refs.form as VuetifyFormElement).validate();
		},
		handleStepSubmit() {
			this.triggerValidation();

			if (!this.valid) {
				return;
			}

			this.$emit('complete', {
				firstname: this.firstname,
				lastname: this.lastname,
				address: this.address,
				comment: this.comment,
			});
		},
		resetForm() {
			this.firstname = '';
			this.lastname = '';
			this.address = '';
			this.comment = '';
		},
	},
});
</script>
