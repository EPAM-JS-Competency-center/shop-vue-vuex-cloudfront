import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { CartItem } from '@/models/cart-item';

// TODO: ASK, same verb

interface FetchCartResponse {
	data: {
		data: CartItem;
	};
}

const fetchCart = (): Promise<FetchCartResponse> => {
	return axios.get(`${API_PATHS.cart}/profile/cart`, {
		headers: {
			Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
		},
	});
};

// add, remove - new items
const updateCart = (items: CartItem[]) => {
	return axios.put(
		`${API_PATHS.cart}/profile/cart`,
		{ items },
		{
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		}
	);
};

export const profileApi = {
	fetchCart,
	updateCart,
};
