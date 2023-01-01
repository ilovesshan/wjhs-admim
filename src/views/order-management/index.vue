<template>
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive include="recycleGoodsOrder,integralGoodsOrder">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>