import type { VueConstructor } from 'vue';
import Vuetify from 'vuetify/lib';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';

const options = {};

export const connectVuetify = (Vue: VueConstructor) => {
	Vue.use(Vuetify);

	return new Vuetify(options);
};
