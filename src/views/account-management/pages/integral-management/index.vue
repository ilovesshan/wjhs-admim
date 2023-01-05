<template>
  <div id="integral-management-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">
        <el-form-item label="昵称" prop="">
          <el-input placeholder="昵称关键字" clearable />
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

        <el-button disabled @click="handleUpdate(selectedIds[0])" type="success" plain>更新<el-icon class="el-icon--right">
            <Edit />
          </el-icon>
        </el-button>

        <el-button disabled @click="handleDelete(selectedIds[0])" type="danger" plain>删除<el-icon class="el-icon--right">
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
    <el-card shadow="never">
      <el-table :data="userIntegralList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="昵称" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scoped">
            <el-avatar v-if="scoped.row.avatarUrl" :src="baseUrl + scoped.row.avatarUrl" @error="() => true" />
          </template>
        </el-table-column>
        <el-table-column prop="integral" label="积分" width="180" />
        <el-table-column fixed="right" label="操作" width="280">
            <template #default="scope">
              <el-button @click="handleSelectIntegralRecord(scope.row)" link type="primary" size="small">查看积分流水</el-button>
            </template>
          </el-table-column>
      </el-table>
    </el-card>

    <!-- 积分流水弹窗 -->
    <el-dialog v-model="dialogTableVisible" title="积分流水记录">
      <el-table :data="currentIntegral?.integralRecords">
        <el-table-column property="orderId" label="交易单号" width="300" />
        <el-table-column property="tradingIntegral" label="交易积分" width="100" />
        <el-table-column label="交易类型" width="120">
          <template #default="scoped">
            <el-tag :type="scoped.row.payStatus == '36' ? 'success' : 'danger' ">{{ getStringByCode(scoped.row.payStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="createTime" label="交易时间"  width="200" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button @click="showRecordDetail(scope.row.id)" link type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { selectIntegralList } from "@/api/account";
import { accountStore } from "@/store/index"
import ServiceConfig from "@/config/serviceConfig";
import { getStringByCode } from "@/utils/system-dict";
import { ElMessage } from "element-plus";
import { IUserIntegral } from "@/interfaces/account";

const dialogTableVisible = ref(false);
const currentIntegral= ref<IUserIntegral>();
const selectedIds = ref<Array<string>>([]);
const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const userIntegralList = computed(() => accountStore.userIntegralList);

const getIntegralList = async () => {
  const result = await selectIntegralList();
  if (result.code == 200) {
      accountStore.saveUserIntegralList(result.data as Array<IUserIntegral>)
  }
}
getIntegralList();

const handleSelectionChange = (selected: Array<any>) => {
  selectedIds.value = selected.map((notice: any) => notice.id)
}
const handleSearch = () => { }
const handleReset = () => { }
const openDialog = () => { }
const handleUpdate = (id: string) => { }
const handleDelete = (id: string) => { }
const handleExport = () => { }

const handleSelectIntegralRecord = (row: IUserIntegral) => {
  dialogTableVisible.value = true;
  currentIntegral.value = row;
}

const showRecordDetail = (recordId: string) => {
  ElMessage.info("功能还未上线，敬请期待！");
}

</script>
<style lang="less" scoped>
#integral-management-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>