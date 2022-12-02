<template>
  <el-header>
    <div class="header-left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in breadCrumbList">{{ item.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import { useRoute  } from "vue-router"
const route = useRoute()
const breadCrumbList = ref<any[]>([]);

watch(() => route.matched, (newVal) => {
  breadCrumbList.value = newVal.filter(r => r.meta && r.meta.title);
}, { immediate: true })

</script>

<style lang="less" scoped>
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>