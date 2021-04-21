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
						name="firstName"
						label="First Name"
						v-model="firstName"
						:rules="commonValidationRule"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field
						name="lastName"
						label="Last Name"
						v-model="lastName"
						:rules="commonValidationRule"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="12">
					<v-text-field
						name="address"
						label="Shipping Address"
						v-model="address"
						:rules="commonValidationRule"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="12">
					<v-textarea
						outlined
						name="comment"
						label="Comment"
						v-model="comment"
						rows="3"
						clearable
					/>
				</v-col>

				<v-col cols="12" class="d-flex justify-end">
					<v-btn class="mr-1" type="reset"> Clear </v-btn>

					<v-btn
						class="ml-1"
						type="submit"
						data-test-id="to-3-step-button"
						color="primary"
					>
						{{ $t('common.next') }}
					</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

const onlyString = (v: string) => typeof v === 'string';
const required = (v: string) => !!v || 'Field is required';

type VuetifyFormElement = Vue & { validate(): void };

interface FormValues {
	firstName: string;
	lastName: string;
	address: string;
	comment?: string;
}

export default Vue.extend({
	name: 'ShippingAddressStep',
	props: {
		initialFormValues: Object as PropType<FormValues>,
	},
	data() {
		const initial = this.initialFormValues;

		return {
			valid: true,

			firstName: initial.firstName,
			lastName: initial.lastName,
			address: initial.address,
			comment: initial.comment,

			commonValidationRule: [required, onlyString],
		};
	},
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
				firstName: this.firstName,
				lastName: this.lastName,
				address: this.address,
				comment: this.comment,
			});
		},
		resetForm() {
			this.firstName = '';
			this.lastName = '';
			this.address = '';
			this.comment = '';
		},
	},
});
</script>
