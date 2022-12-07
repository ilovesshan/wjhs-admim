import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const dynamicRoutes: RouteRecordRaw[] = [
];

const commonRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页", icon: "home" },
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/statistical-report",
        name: "statistical-report",
        meta: { title: "统计报表", icon: "home" },
        component: () => import("@/views/statistical-report/index.vue"),
      },
      {
        path: "/system",
        name: "system",
        redirect:"/swiper",
        meta: { title: "系统管理", icon: "system" },
        component: () => import("@/views/system/index.vue"),
        children:[
          {
            path: "swiper",
            name: "swiper",
            meta: { title: "轮播图管理", icon: "swiper" },
            component: () => import("@/views/system/pages/swiper/index.vue"),
          },
          {
            path: "notice",
            name: "notice",
            meta: { title: "公告管理", icon: "notice" },
            component: () => import("@/views/system/pages/notice/index.vue"),
          },
          {
            path: "app",
            name: "app",
            meta: { title: "App管理", icon: "swiper" },
            component: () => import("@/views/system/pages/app/index.vue"),
          },
        ]
      }
    ]
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
  history:  createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes: [...commonRoutes],
});

export default router;
