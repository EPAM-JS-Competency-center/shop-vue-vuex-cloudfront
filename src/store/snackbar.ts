import type { Module } from 'vuex';

export interface SnackbarState {
	visible: boolean;
	message: string;
	type: SnackbarType | null;
}

export enum SnackbarType {
	Error = 'error',
}

export const snackbarModuleStore: Module<SnackbarState, any> = {
	namespaced: true,
	state: {
		type: null,
		visible: false,
		message: '',
	},
	actions: {
		showErrorSnackbar({ commit }, { message }: { message: string }) {
			commit('showSnackbar', {
				message,
				type: SnackbarType.Error,
			});
		},
	},
	mutations: {
		showSnackbar(state, payload) {
			state.message = payload.message;
			state.type = payload.type;
			state.visible = true;
		},
		closeSnackbar(state) {
			state.visible = false;
			state.message = '';
		},
	},
};
