<template>
  <div id="swiper-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小程序" name="wx"> <swiper-list-cpn :list="noticeLIst" :currentIndex="31" />
      </el-tab-pane>
      <el-tab-pane label="App" name="app"> <swiper-list-cpn :list="noticeLIst" :currentIndex="32" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { swiperStore } from '../../../../store';

import swiperListCpn from "./components/swiper-list.vue"

const activeName = ref('wx')

const noticeLIst = computed(() => swiperStore.list);
const handleClick = () => swiperStore.requestSwiper({ type: activeName.value.includes("wx") ? 32 : 31 });

// 默认加载请求小程序轮播图
swiperStore.requestSwiper({ type: 31 });

</script>

<style lang="less" scoped>
#swiper-page {}
</style>