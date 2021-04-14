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

const create = (order: Omit<Order, 'statusHistory'>) => {
	return axios.put(`${API_PATHS.order}/order`, order);
};

export const ordersApi = {
	deleteOrderById,
	fetchOrders,
	create,
};
