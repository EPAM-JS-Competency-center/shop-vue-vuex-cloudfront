import type { VueConstructor } from 'vue';
import VueI18n from 'vue-i18n';

import { messages, Locale } from '@/locale';

export const connecti18n = (Vue: VueConstructor) => {
	Vue.use(VueI18n);

	return new VueI18n({
		locale: Locale.EN,
		fallbackLocale: Locale.RU,
		messages: {
			[Locale.EN]: messages.en,
			[Locale.RU]: messages.ru,
			[Locale.ZH]: messages.zh,
		},
	});
};
