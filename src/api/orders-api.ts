import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';

import orderList from './orderList.json';

const deleteOrderById = (id: string) => {
    return axios.delete(`${API_PATHS.order}/order/${id}`)
        .then(() => {
            return axios.get(`${API_PATHS.order}/order`)
        }
        ).then(res => res.data)
}

const fetchOrders = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return orderList;
    /* TODO: uncomment when time comes
        return axios.get(`${API_PATHS.order}/order`)
        .then(res => res.data);
    */
}

export const ordersApi = {
    deleteOrderById,
    fetchOrders,
};