// import axios from 'axios';

// import { API_PATHS } from '@/constants/api-paths';

import productList from './productList.json';

const fetchAllProducts = async () => {
    return productList;
    /* TODO: uncomment when time comes
    return axios.get(`${API_PATHS.bff}/product/available/`)
      .then(res => res.data);
    */
}

export const productApi = {
    fetchAllProducts,
};