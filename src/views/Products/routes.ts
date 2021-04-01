import { RouteConfig } from "vue-router";

import ProductMainEntry from "../../views/Products/ProductMainEntry.vue";

import CartCheckout from "./views/CartCheckout/CartCheckout.vue";
import ProductImport from "./views/ProductImport/ProductImport.vue";
import ProductOrders from "./views/ProductOrders/ProductOrders.vue";
import ProductHomeIndex from "./views/ProductHomeIndex/ProductHomeIndex.vue";
import EditableOrderForm from "./views/EditableOrderForm/EditableOrderForm.vue";
import EditableProductForm from "./views/EditableProductForm/EditableProductForm.vue";

const orderRoutes: RouteConfig[] = [
    {
        path: '/admin/order/:orderId?',
        name: 'EditableOrderForm',
        component: EditableOrderForm,
    },
    {
        path: "/admin/orders",
        name: "ProductOrders",
        component: ProductOrders,
    },
];

const productRoutes: RouteConfig[]  = [
    {
        path: "/admin/products",
        name: "ProductImport",
        component: ProductImport,
    },
    {
        path: "/admin/product-form/:productId?",
        name: "EditableProductForm",
        component: EditableProductForm,
    },
]


export const routes: RouteConfig[] = [
    {
        path: "/",
        name: "ProductMainEntry",
        component: ProductMainEntry,
        children: [
            {
                path: "/cart",
                name: "CartCheckout",
                component: CartCheckout,
            },
            ...productRoutes,
            ...orderRoutes,
            // default
            {
                path: "/*",
                name: "ProductHomeIndex",
                component: ProductHomeIndex,
            },
        ],
    },
];