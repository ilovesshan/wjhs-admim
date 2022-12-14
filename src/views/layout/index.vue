<template>
  <div id="index">
    <div class="common-layout">
      <el-container>
        <IndexAside />
        <el-container direction="vertical">
          <IndexHeader />
          <el-main>
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
          <IndexFooter />
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IndexHeader from "@/components/layout/header.vue"
import IndexAside from "@/components/layout/aside.vue"
import IndexFooter from "@/components/layout/footer.vue"
</script>

<style scoped lang="less">
#index {
  width: 100%;
  height: 100vh;
  background-color: #f1f3f4;

  .common-layout,
  .el-container {
    height: 100%;

    .el-main {
      width: 100%;
      background-color: #ffffff;
    }
  }
}
</style>