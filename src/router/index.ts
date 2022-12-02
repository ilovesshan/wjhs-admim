import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const dynamicRoutes: RouteRecordRaw[] = [
];

const commonRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "home",
    meta: { title: "控制台", icon: "dashboard" },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {},
    component: () => import("@/views/login/index.vue"),
  },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import("@/views/404.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...commonRoutes],
});

export default router;
