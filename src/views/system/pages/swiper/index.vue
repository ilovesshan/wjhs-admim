<template>
  <div id="swiper-page">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="小程序" name="wxmp">小程序</el-tab-pane>
      <el-tab-pane label="App" name="app">App</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('wxmp')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  
}

</script>

<style lang="less" scoped>
#swiper-page {}
</style>