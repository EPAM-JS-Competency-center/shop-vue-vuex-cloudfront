import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { Order } from '@/models/order';

import orderList from './orderList.json';

const deleteOrderById = (id: string) => {
	console.info(`DELETE deleteOrderById: ${id}`);

	return axios.delete(`${API_PATHS.order}/order/${id}`);
};

const fetchOrders = async (): Promise<Order[]> => {
	// @ts-expect-error todo
	return orderList;
	/* TODO: uncomment when time comes
        return axios.get(`${API_PATHS.order}/order`)
        .then(res => res.data);
    */
};

export const ordersApi = {
	deleteOrderById,
	fetchOrders,
};
