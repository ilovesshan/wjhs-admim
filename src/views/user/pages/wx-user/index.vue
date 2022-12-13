<template>
  <div id="wx-user-page">
    <el-card shadow="never">
      <el-table :data="wxUsers" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="sessionKey" label="sessionKey" width="280" />
        <el-table-column prop="nickName" label="昵称" width="180" />
        <el-table-column label="头像" width="120">
          <template #default="scoped">
            <el-avatar v-if="scoped.row.avatarUrl" :src="baseUrl + scoped.row.avatarUrl" @error="() => true" />
          </template>
        </el-table-column>
        <el-table-column label="性别" width="160">
          <template #default="scoped">
            <p>{{ getStringByCode(scoped.row.gender) }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120" />
        <el-table-column prop="city" label="市区" width="120" />
        <el-table-column prop="createTime" label="注册时间" width="240" />
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { wxUserList } from "@/api/user";
import { userStore } from "@/store/index"
import { IWxUserInfo } from "@/store/modules/user";
import { getStringByCode } from "@/utils/system-dict"
import ServiceConfig from "@/config/serviceConfig";

const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const wxUsers = computed(() => userStore.wxUserList);

const getWxUserList = () => {
  wxUserList().then((res: { code: number; data: IWxUserInfo[]; }) => {
    if (res.code == 200) {
      userStore.saveWxUserList(res.data as Array<IWxUserInfo>)
    }
  })
}
getWxUserList();
</script>
<style lang="less" scoped>

</style>