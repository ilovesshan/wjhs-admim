import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const commonRoutes: RouteRecordRaw[] = [];
const dynamicRoutes: RouteRecordRaw[] = [];

const router = createRouter({
  history: createWebHistory(),
  routes: [...commonRoutes, ...dynamicRoutes],
});

export default router;
