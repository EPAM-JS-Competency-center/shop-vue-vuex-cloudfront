import axios from 'axios';

import { API_PATHS } from '@/constants/api-paths';
import { Product, ProductsResponse } from '@/models/product';

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

type FetchProductsParams = {
	skipDataProvider?: boolean;
};

const fetchProducts = async ({
	skipDataProvider,
}: FetchProductsParams = {}): Promise<Product[]> => {
	const params = { skipDataProvider };
	return axios
		.get<ProductsResponse>(`${API_PATHS.bff}/products`, { params })
		.then(res => res.data.data)
		.catch(e => {
			console.error(e);
			// << !!! mocks if any error !!!
			return productList;
		});
};

const fetchProductById = async (id: string) => {
	console.info(`GET fetchProductById: ${id}`);

	return axios.get(`${API_PATHS.bff}/product/${id}`).then(res => res.data);
};

const deleteProductById = (id: string) => {
	console.info(`DELETE deleteProductById: ${id}`);

	return axios.delete(`${API_PATHS.bff}/product/${id}`);
};

const saveProduct = (productToSave: Product) => {
	console.info(`PUT saveProduct: ${JSON.stringify(productToSave)}`);

	return axios.put(`${API_PATHS.bff}/product`, productToSave);
};

export const productApi = {
	fetchAvailableProducts,
	deleteProductById,
	fetchProducts,
	fetchProductById,
	saveProduct,
};
