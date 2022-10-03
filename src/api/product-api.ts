import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { Product } from '@/models/product';

import productList from './productList.json';

const fetchAvailableProducts = async (): Promise<Product[]> => {
	return axios
		.get(`${API_PATHS.bff}/product/available/`)
		.then(res => res.data)
		.catch(e => {
			console.error(e);
			// << !!! mocks if any error !!!
			return productList;
		});
};

const fetchProducts = async (): Promise<Product[]> => {
	return axios
		.get(`${API_PATHS.product}/products`)
		.then(res => res.data.products)
		.catch(e => {
			console.error(e);
			// << !!! mocks if any error !!!
			return productList;
		});
};

const fetchProductById = async (id: string) => {
	console.info(`GET fetchProductById: ${id}`);

	return axios
		.get(`${API_PATHS.product}/products/${id}`)
		.then(res => res.data.product);
};

const deleteProductById = (id: string) => {
	console.info(`DELETE deleteProductById: ${id}`);

	return axios.delete(`${API_PATHS.bff}/product/${id}`);
};

const saveProduct = (productToSave: Product) => {
	console.info(`PUT saveProduct: ${JSON.stringify(productToSave)}`);
	productToSave.price = parseFloat(`${productToSave.price}`);
	productToSave.count = parseInt(`${productToSave.count}`);
	return axios.post(`${API_PATHS.product}/products`, productToSave);
};

export const productApi = {
	fetchAvailableProducts,
	deleteProductById,
	fetchProducts,
	fetchProductById,
	saveProduct,
};
