<template>
	<v-snackbar v-model="value" timeout="7000">
		<p class="my-0 font-weight-medium" v-html="message"></p>

		<p class="my-0 text-caption font-weight-thin">
			{{ $t('errorMessage.checkDevLogs') }}
		</p>

		<template v-slot:action="{ attrs }">
			<v-btn color="pink" text v-bind="attrs" @click="value = false">
				{{ $t('common.close') }}
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		message: String,
		value: {
			type: Boolean,
			required: true,
		},
	},
});
</script>
