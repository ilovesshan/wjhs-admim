<template>
  <el-aside width="200px">
    <div class="logo-container">
      <img src="../../assets/images/logo.4eeb8a8e.png" />
      <p>网捷回收</p>
    </div>
    <el-menu router unique-opened background-color="#304156" :default-active="currentPath" text-color="#bfcbd9"
      @open="handleOpen" @close="handleClose">
      <el-menu-item index="/home"> 
        <el-icon> <Orange /> </el-icon>
        <span>首页</span>
      </el-menu-item>
      
      <el-menu-item index="/statistical-report">
        <el-icon> <DataBoard /></el-icon>
        <span>统计报表</span>
      </el-menu-item>

      <el-sub-menu index="/system">
        <template #title>
          <el-icon><Monitor /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/swiper">
          <template #title>
            <el-icon><Picture /> </el-icon>
            <span>轮播图管理</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/system/notice">
          <template #title>
            <el-icon><Notification /> </el-icon>
            <span>公告管理</span>
          </template>
        </el-menu-item>

        <el-menu-item index="/system/app">
          <template #title>
            <el-icon><Iphone /> </el-icon>
            <span>App管理</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import {
  Orange, DataBoard, Iphone, Picture, Notification, Monitor
} from '@element-plus/icons-vue'

import { useRoute } from "vue-router"


const route = useRoute()
const currentPath = ref("");

watch(() => route.fullPath, (newVal) => {
  currentPath.value = newVal;
}, { immediate: true })

const handleOpen = (key: string, keyPath: string[]) => {
}

const handleClose = (key: string, keyPath: string[]) => {
}

</script>

<style lang="less" scoped>
.logo-container {
  width: 200px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }

  p {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin-left: 5px;
  }
}

.el-aside,
.el-menu {
  background-color: #304156;
  border-right: none;

  .el-sub-menu,
  .el-menu-item {
    width: 200px;
  }

  ::v-deep .is-active {
    width: 200px;
  }

  ::v-deep .is-opened .el-menu {
    background-color: #1f2d3d;
  }
}
</style>