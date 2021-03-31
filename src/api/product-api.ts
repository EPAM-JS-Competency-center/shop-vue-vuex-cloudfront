import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { Product } from '@/models/Product';

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


const fetchProductById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return productList[1];
  /* TODO: uncomment when time comes
  axios.get(`${API_PATHS.bff}/product/${id}`)
  .then(res => res.data);
  */
};

const deleteProductById = (id: string) => {
  return axios.delete(`${API_PATHS.bff}/product/${id}`)
    .then(() => {
      return axios.get(`${API_PATHS.bff}/product`);
    })
    .then(res => res.data);
};

const saveProduct = (productToSave: Product) => {
  return axios.put(`${API_PATHS.bff}/product`, productToSave);
}


export const productApi = {
  fetchAvailableProducts,
  deleteProductById,
  fetchProducts,
  fetchProductById,
  saveProduct,
};