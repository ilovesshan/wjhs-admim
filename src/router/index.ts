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
        meta: { title: "统计报表", icon: "statistical-report" },
        component: () => import("@/views/statistical-report/index.vue"),
      },
      {
        path: "/system-management",
        name: "system-management",
        redirect: "/swiper",
        meta: { title: "系统管理", icon: "system-management" },
        component: () => import("@/views/system-management/index.vue"),
        children: [
          {
            path: "swiper",
            name: "swiper",
            meta: { title: "轮播图管理", icon: "swiper" },
            component: () => import("@/views/system-management/pages/swiper/index.vue"),
          },
          {
            path: "notice",
            name: "notice",
            meta: { title: "公告管理", icon: "notice" },
            component: () => import("@/views/system-management/pages/notice/index.vue"),
          },
          {
            path: "app",
            name: "app",
            meta: { title: "App管理", icon: "swiper" },
            component: () => import("@/views/system-management/pages/app/index.vue"),
          },
          {
            path: "feedback",
            name: "feedback",
            meta: { title: "意见反馈", icon: "feedback" },
            component: () => import("@/views/system-management/pages/feedback/index.vue"),
          },
        ]
      },
      {
        path: "/recycle-goods",
        name: "recycle-goods",
        redirect: "/recycle-goods-type",
        meta: { title: "回收商品管理", icon: "recycle-goods" },
        component: () => import("@/views/recycle-goods/index.vue"),
        children: [
          {
            path: "recycle-goods-type",
            name: "recycle-goods-type",
            meta: { title: "分类管理", icon: "recycle-goods-type" },
            component: () => import("@/views/recycle-goods/pages/recycle-goods-type/index.vue"),
          },
          {
            path: "recycle-goods",
            name: "recycle-goods",
            meta: { title: "商品管理", icon: "recycle-goods" },
            component: () => import("@/views/recycle-goods/pages/recycle-goods/index.vue"),
          },
        ]
      },

      {
        path: "/user-management",
        name: "user-management",
        redirect: "/wx-user",
        meta: { title: "用户管理", icon: "user" },
        component: () => import("@/views/user-management/index.vue"),
        children: [
          {
            path: "wx-user",
            name: "wx-user",
            meta: { title: "小程序用户", icon: "wx-user" },
            component: () => import("@/views/user-management/pages/wx-user/index.vue"),
          },
          {
            path: "system-user",
            name: "system-user",
            meta: { title: "系统用户", icon: "system-user" },
            component: () => import("@/views/user-management/pages/system-user/index.vue"),
          },
        ]
      },

      {
        path: "/order-management",
        name: "order-management",
        redirect: "/recycle-goods-order",
        meta: { title: "订单管理", icon: "order-management" },
        component: () => import("@/views/order-management/index.vue"),
        children: [
          {
            path: "recycle-goods-order",
            name: "recycle-goods-order",
            meta: { title: "回收商品", icon: "recycle-goods-order", keepAlive: true },
            component: () => import("@/views/order-management/pages/recycle-goods-order/index.vue"),
          },
          {
            path: "recycle-goods-order-detail/:id/:type",
            name: "recycle-goods-order-detail",
            meta: { title: "订单详情", icon: "recycle-goods-order-detail" },
            component: () => import("@/views/order-management/pages/recycle-goods-order-detail/index.vue"),
          },
          {
            path: "integral-goods-order",
            name: "integral-goods-order",
            meta: { title: "积分商品", icon: "integral-goods-order", keepAlive: true  },
            component: () => import("@/views/order-management/pages/integral-goods-order/index.vue"),
          },
        ]
      },

      {
        path: "/account-management",
        name: "account-management",
        redirect: "/integral-management",
        meta: { title: "账户管理", icon: "account-management" },
        component: () => import("@/views/account-management/index.vue"),
        children: [
          {
            path: "integral-management",
            name: "integral-management",
            meta: { title: "积分管理", icon: "integral-management" },
            component: () => import("@/views/account-management/pages/integral-management/index.vue"),
          },
          {
            path: "balance-management",
            name: "balance-management",
            meta: { title: "余额管理", icon: "balance-management" },
            component: () => import("@/views/account-management/pages/balance-management/index.vue"),
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
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes: [...commonRoutes],
});

export default router;
