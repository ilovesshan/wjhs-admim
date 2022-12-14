<template>
  <div id="notice-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="小程序" name="wx"> <notice-list-cpn :list="noticeLIst" :currentIndex="31" />
      </el-tab-pane>
      <el-tab-pane label="App" name="app"> <notice-list-cpn :list="noticeLIst" :currentIndex="32" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

import noticeListCpn from "./components/notice-list.vue";

import { noticeStore } from '@/store';

const activeName = ref("wx")

const noticeLIst = computed(() => noticeStore.list);
const handleClick = () => noticeStore.requestNotice({ type: activeName.value.includes("wx") ? 32 : 31 });

// 默认加载请求小程序通知公告
noticeStore.requestNotice({ type: 31 });

</script>

<style lang="less" scoped>
#notice-page {
  background-color: transparent;
}
</style>