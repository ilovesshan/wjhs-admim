<template>
  <div id="wx-user-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">
        <el-form-item label="昵称" prop="">
          <el-input placeholder="昵称关键字" clearable />
        </el-form-item>

        <el-form-item label="性别" prop="">
          <el-select>
            <el-option key="20" label="男" value="20" />
            <el-option key="21" label="女" value="21" />
          </el-select>
        </el-form-item>

        <el-form-item label="区域" prop="">
          <el-input placeholder="省/市区关键字" clearable />
        </el-form-item>

        <el-form-item label="创建时间" prop="">
          <el-date-picker format="YYYY-MM-DD" type="daterange" range-separator="到" value-format="YYYY-MM-DD HH:mm:ss"
            @change="datePickerChange" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSearch" type="primary">搜索 <el-icon class="el-icon--right">
              <Search />
            </el-icon>
          </el-button>
          <el-button @click="handleReset">重置 <el-icon class="el-icon--right">
              <RefreshRight />
            </el-icon>
          </el-button>
        </el-form-item>

      </el-form>

      <!-- 新增 、修改、删除、导出 按钮-->
      <el-row>
        <el-button disabled @click="openDialog" plain type="primary">新增<el-icon class="el-icon--right">
            <Plus />
          </el-icon>
        </el-button>

        <el-button @click="handleUpdate(selectedIds[0])" type="success" :disabled="(selectedIds.length != 1)"
          plain>更新<el-icon class="el-icon--right">
            <Edit />
          </el-icon>
        </el-button>

        <el-button @click="handleDelete(selectedIds[0])" type="danger" :disabled="(selectedIds.length < 1)"
          plain>删除<el-icon class="el-icon--right">
            <Delete />
          </el-icon>
        </el-button>

        <el-button @click="handleExport" type="warning" :disabled="(selectedIds.length < 1)" plain>导出<el-icon
            class="el-icon--right">
            <Download />
          </el-icon>
        </el-button>
      </el-row>
    </el-card>

    <!-- 表格区域 -->
    <div id="wx-user-page">
      <el-card shadow="never">
        <el-table :data="wxUsers" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
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
  </div>

</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { wxUserList } from "@/api/user";
import { userStore } from "@/store/index"
import { getStringByCode } from "@/utils/system-dict"
import ServiceConfig from "@/config/serviceConfig";

import type { IWxUserInfo } from "@/interfaces/user";

const selectedIds = ref<Array<string>>([]);
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


const handleSelectionChange = (selected: Array<any>) => {
  selectedIds.value = selected.map((notice: any) => notice.id)
}
const handleSearch = () => { }
const handleReset = () => { }
const openDialog = () => { }
const handleUpdate = (id: string) => { }
const handleDelete = (id: string) => { }
const handleExport = () => { }

const datePickerChange = (value: any) => {
  value[1] = value[1].replace("00:00:00", "23:59:59");
}


</script>
<style lang="less" scoped>
#wx-user-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>