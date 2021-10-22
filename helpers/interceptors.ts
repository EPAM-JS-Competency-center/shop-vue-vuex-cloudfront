import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

export default function setup() {
	axios.interceptors.response.use(
		response => {
			if (response.status === 200 || response.status === 201) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(response);
			}
		},
		error => {
			if (error.response.status) {
				switch (error.response.status) {
					case StatusCodes.BAD_REQUEST:
						alert(error.response.data?.data);
						break;

					case StatusCodes.UNAUTHORIZED:
						alert(error.response.data?.message);
						break;

					case StatusCodes.FORBIDDEN:
						alert(error.response.data?.message);
						break;
				}
				return Promise.reject(error.response);
			}
		}
	);
}
