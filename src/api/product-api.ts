import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';

import productList from './productList.json';

const fetchAvailableProducts = async () => {
  return productList;
  /* TODO: uncomment when time comes
  return axios.get(`${API_PATHS.bff}/product/available/`)
    .then(res => res.data);
  */
};


const fetchProducts = async () => {
  return productList;
  /* TODO: uncomment when time comes
  axios.get(`${API_PATHS.bff}/product`)
  .then(res => res.data);
  */
};

const deleteProductById = async (id: string) => {
  axios.delete(`${API_PATHS.bff}/product/${id}`)
    .then(() => {
      return axios.get(`${API_PATHS.bff}/product`);
    })
    .then(res => res.data);
};


export const productApi = {
  fetchAvailableProducts,
  deleteProductById,
  fetchProducts,
};