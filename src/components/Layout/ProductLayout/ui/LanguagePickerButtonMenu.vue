<template>
	<v-menu left bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				class="ma-2 pa-2"
				icon
				v-bind="attrs"
				v-on="on"
				aria-haspopup="true"
			>
				<v-icon>language</v-icon>
			</v-btn>
		</template>

		<v-list v-model="$i18n.locale">
			<v-list-item
				v-for="(lang, i) in langs"
				:key="i"
				link
				@click="$i18n.locale = lang"
			>
				<v-list-item-title>
					{{ lang }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import Vue from 'vue';

import { availableLangs } from '@/locale';

export default Vue.extend({
	name: 'LanguagePickerButtonMenu',
	data: () => ({
		langs: availableLangs,
	}),
});
</script>
