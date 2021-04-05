import Vue from 'vue';
import Vuex from 'vuex';

// import window from '@/libs/window';

import { cartModuleStore } from './domain/cart';
import { snackbarModuleStore } from './snackbar';

Vue.use(Vuex);
/*
const localStoragePlugin = (store: Store<any>) => {
  store.subscribe((_, { cartModule }) => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartModule.cart))
  });
}
*/

export default new Vuex.Store({
	modules: {
		cart: cartModuleStore,
		snackbar: snackbarModuleStore,
	},
	getters: {
		cartErrorMessage: state => state.cart.errorMessage,
		cartItems: state => state.cart.cartItems,
	},
	// plugins: [localStoragePlugin]
});
