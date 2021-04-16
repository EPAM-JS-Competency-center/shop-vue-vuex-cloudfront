import type { Module } from 'vuex';

// import window from "@/libs/window";

import { profileApi } from '@/api/profile-api';
import { Product } from '@/models/product';
import { CartItem } from '@/models/cart-item';

// const CART_STORAGE_KEY = "CART_STORAGE_KEY";

// const localStorageValue = window.localStorage.getItem(CART_STORAGE_KEY) || "[]";
// const defaultCarts = JSON.parse(localStorageValue);

const findProductInCartById = (cart: CartItem[], productId: string) =>
	cart.find((c: CartItem) => c.product.id === productId);

interface CartState {
	cartItems: CartItem[];
	errorMessage: string;
}

const cartModuleStore: Module<CartState, any> = {
	namespaced: true,
	state: {
		cartItems: [],
		errorMessage: '',
	},
	mutations: {
		setErrorMessage(state, msg: string) {
			state.errorMessage = msg;
		},
		setCartItems(state, items: CartItem[]) {
			state.cartItems = items;
		},
		// =
		addProductToCart(state, product: Product) {
			const cartItems = state.cartItems;
			const existingCartItem = findProductInCartById(cartItems, product.id);

			if (existingCartItem) {
				existingCartItem.count += 1;
			} else {
				cartItems.push({ product, count: 1 });
			}

			state.cartItems = [...cartItems];
		},
		removeProductFromCart(state, productId: string) {
			const cartItems = state.cartItems;
			const existingCartItem = findProductInCartById(cartItems, productId);

			if (!existingCartItem) {
				return;
			}

			existingCartItem.count -= 1;

			if (existingCartItem.count < 1) {
				state.cartItems = cartItems.filter(
					(c: CartItem) => c.product.id !== productId
				);

				return;
			}

			state.cartItems = [...cartItems];
		},
	},
	actions: {
		_synchronizeCartWithBackend({ commit, state }) {
			profileApi.updateCart(state.cartItems).catch(e => {
				commit('setErrorMessage', e.message);
			});
		},
		//
		fetchCart({ commit }) {
			profileApi
				.fetchCart()
				.then(data => {
					commit('setCartItems', data);
				})
				.catch(e => {
					commit('setErrorMessage', e.message);
				});
		},
		addProductToCart({ commit }, product: Product) {
			commit('addProductToCart', product);

			this.dispatch('cart/_synchronizeCartWithBackend');
		},
		removeProductFromCart({ commit }, productId: string) {
			commit('removeProductFromCart', productId);

			this.dispatch('cart/_synchronizeCartWithBackend');
		},
		clearCart({ commit }) {
			commit('setCartItems', []);

			this.dispatch('cart/_synchronizeCartWithBackend');
		},
	},
};

export { cartModuleStore };
