import type { VueConstructor } from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import { ProductMainEntry } from '../views/ProductMainEntry';

import { CartCheckout } from '../views/CartCheckout';
import { ProductImport } from '../views/ProductImport';
import { ProductOrders } from '../views/ProductOrders';
import { ProductShowcaseIndex } from '../views/ProductShowcaseIndex';
import { EditableOrderForm } from '../views/EditableOrderForm';
import { EditableProductForm } from '../views/EditableProductForm';

const orderRoutes: RouteConfig[] = [
	{
		path: '/admin/order/:orderId?',
		name: 'EditableOrderForm',
		component: EditableOrderForm,
	},
	{
		path: '/admin/orders',
		name: 'ProductOrders',
		component: ProductOrders,
	},
];

const productRoutes: RouteConfig[] = [
	{
		path: '/admin/products',
		name: 'ProductImport',
		component: ProductImport,
	},
	{
		path: '/admin/product-form/:productId?',
		name: 'EditableProductForm',
		component: EditableProductForm,
	},
];

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'ProductMainEntry',
		component: ProductMainEntry,
		children: [
			{
				path: '/cart',
				name: 'CartCheckout',
				component: CartCheckout,
			},
			...productRoutes,
			...orderRoutes,
			// default
			{
				path: '/*',
				name: 'ProductShowcaseIndex',
				component: ProductShowcaseIndex,
			},
		],
	},
];

export const connectRouter = (Vue: VueConstructor) => {
	Vue.use(VueRouter);

	return new VueRouter({
		mode: 'history',
		base: '',
		routes,
	});
};
