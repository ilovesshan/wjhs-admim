<template>
  <el-header>
    <div class="header-left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadCrumbList">{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-button @click="logout" plain>logout</el-button>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

import { userStore } from "../../store/index"

const route = useRoute()
const router = useRouter()
const breadCrumbList = ref<any[]>([]);

const logout = () => {
  userStore.cleanUserInfo();
  userStore.cleanUserLoginInfo();
  router.push({ path: "/login" });
}


watch(() => route.matched, (newVal) => {
  breadCrumbList.value = newVal.filter(r => r.meta && r.meta.title);
}, { immediate: true })


</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>