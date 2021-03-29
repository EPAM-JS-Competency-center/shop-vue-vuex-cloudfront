import type { VueConstructor } from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import { routes as productRoutes } from '@/views/Products/routes';

export const connectRouter = (Vue: VueConstructor) => {
  const routes: RouteConfig[] = productRoutes;

  Vue.use(VueRouter);

  return new VueRouter({
    mode: "history",
    base: "",
    routes,
  });
};
