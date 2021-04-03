import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { Product } from '@/models/product';

import productList from './productList.json';

const fetchAvailableProducts = async (): Promise<Product[]> => {
  return productList;
  /* TODO: uncomment when time comes
  return axios.get(`${API_PATHS.bff}/product/available/`)
    .then(res => res.data);
  */
};


const fetchProducts = async (): Promise<Product[]> => {
  return productList;
  /* TODO: uncomment when time comes
  axios.get(`${API_PATHS.bff}/product`)
  .then(res => res.data);
  */
};


const fetchProductById = async (id: string) => {
  console.info(`GET fetchProductById: ${id}`);

  return productList[1];
  /* TODO: uncomment when time comes
  axios.get(`${API_PATHS.bff}/product/${id}`)
  .then(res => res.data);
  */
};

const deleteProductById = (id: string) => {
  console.info(`DELETE deleteProductById: ${id}`);

  return axios.delete(`${API_PATHS.bff}/product/${id}`);
};

const saveProduct = (productToSave: Product) => {
  console.info(`PUT saveProduct: ${JSON.stringify(productToSave)}`);

  return axios.put(`${API_PATHS.bff}/product`, productToSave);
}


export const productApi = {
  fetchAvailableProducts,
  deleteProductById,
  fetchProducts,
  fetchProductById,
  saveProduct,
};