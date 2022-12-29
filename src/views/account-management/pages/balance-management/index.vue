<template>
  <div id="balance-management-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">

        <el-form-item label="用户类型">
          <el-select v-model="currentUserType">
            <el-option key="0" label="平台用户" value="0" />
            <el-option key="1" label="小程序用户" value="1" />
            <el-option key="2" label="骑手用户" value="2" />
            <el-option key="3" label="回收中心用户" value="3" />
          </el-select>
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

        <el-button disabled @click="handleUpdate(selectedIds[0])" type="success" plain>更新<el-icon
            class="el-icon--right">
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
      <el-table :data="userBalanceList" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="昵称" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scoped">
            <el-avatar v-if="scoped.row.avatarUrl" :src="baseUrl + scoped.row.avatarUrl" @error="() => true" />
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="180" />
        <el-table-column fixed="right" label="操作" width="280">
          <template #default="scope">
            <el-button @click="openDialogTopUp(scope.row)" link type="success"
              :disabled="currentUserType == '1' || currentUserType == '0'" size="small">余额充值</el-button>
            <el-button @click="handleSelectIntegralRecord(scope.row)" link type="primary"
              size="small">查看余额流水</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 余额流水弹窗 -->
    <el-dialog v-model="dialogTableVisible" title="余额流水记录">
      <el-table style="height: 400px;" :data="currentBalance?.accountRecords">
        <el-table-column property="tradingId" label="交易单号" width="300" />
        <el-table-column property="tradingMoney" label="交易金额" width="100" />
        <el-table-column label="交易类型" width="120">
          <template #default="scoped">
            <el-tag :type="scoped.row.userIdFrom == currentUserId ? 'success' : 'danger'">{{ scoped.row.userIdFrom ==  currentUserId ? '收入' : '支出'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="tradingNote" label="交易备注" width="220" />
        <el-table-column property="userTypeFrom" label="收入账户类型" width="120">
          <template #default="scoped">
            <el-tag type="success">{{ getStringByCode(scoped.row.userTypeFrom) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip property="userIdFrom" label="收入账户ID" width="200" />
        <el-table-column property="userTypeTo" label="支出账户类型" width="120">
          <template #default="scoped">
            <el-tag >{{ getStringByCode(scoped.row.userTypeTo) }}</el-tag>
          </template>
        </el-table-column> 
        <el-table-column show-overflow-tooltip property="userIdTo" label="支出账户ID" width="200" />

        <el-table-column property="createTime" label="交易时间" width="200" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button @click="showRecordDetail(scope.row.id)" link type="success" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


    <!-- 余额充值弹窗 -->
    <el-dialog v-model="dialogTopUpVisible" title="余额充值">
      <el-form :model="topUpData" label-width="120px">
        <el-form-item label="支出账户姓名">
          <el-input disabled v-model="topUpData.userNameTo" />
        </el-form-item>

        <el-form-item label="收入账户姓名">
          <el-input disabled v-model="topUpData.userNameFrom" />
        </el-form-item>

        <el-form-item label="交易金额">
          <el-input type="number" v-model="topUpData.tradingMoney" />
        </el-form-item>

        <el-form-item label="交易备注">
          <el-input v-model="topUpData.tradingNote" />
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogTopUpVisible = false">取消</el-button>
          <el-button type="primary" @click="balanceTopUp"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Delete, Download, Search, RefreshRight, Plus, Edit } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { selectBalanceList, updateBalance } from "@/api/account";
import { accountStore, userStore } from "@/store/index"
import ServiceConfig from "@/config/serviceConfig";
import { getStringByCode } from "@/utils/system-dict";
import { IBalanceTopUp, IUserBalance } from "@/interfaces/account";

const currentUserType = ref("0");
const topUpData = ref<IBalanceTopUp>({});
const dialogTableVisible = ref(false);
const dialogTopUpVisible = ref(false);
const currentBalance = ref<IUserBalance>();
const selectedIds = ref<Array<string>>([]);
const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
const userBalanceList = computed<Array<IUserBalance>>(() => accountStore.userBalanceList);
const currentUserId = ref("");

const getBalanceList = async () => {
  const result = await selectBalanceList(currentUserType.value);
  if (result.code == 200) {
    accountStore.saveUserBalanceList(result.data as Array<IUserBalance>)
  }
}
getBalanceList();

const handleSelectionChange = (selected: Array<any>) => {
  selectedIds.value = selected.map((notice: any) => notice.id)
}
const handleSearch = () => getBalanceList();
const handleReset = () => {
  currentUserType.value = "0";
  getBalanceList();
}
const openDialog = () => { }
const handleUpdate = (id: string) => { }
const handleDelete = (id: string) => { }
const handleExport = () => { }

const showRecordDetail = (recordId: string) => {
  ElMessage.info("功能还未上线，敬请期待！");
}

const handleSelectIntegralRecord = (row: IUserBalance) => {
  dialogTableVisible.value = true;
  currentUserId.value = row.userId;
  currentBalance.value = row;
}

const openDialogTopUp = (row: IUserBalance) => {
  currentUserId.value = row.userId;
  topUpData.value = {
    userIdFrom: currentUserId.value,
    userIdTo: userStore.userInfo.id,

    userTypeFrom: currentUserType.value,
    userTypeTo: "0",

    userNameFrom: row.username,
    userNameTo: userStore.userInfo.username,

    tradingMoney: 0,
    tradingNote: "平台端充值",
  }
  dialogTopUpVisible.value = true;
}

const balanceTopUp = async () => {
  const result = await updateBalance(topUpData.value);
  if (result.code == 200) {
    dialogTopUpVisible.value = false;
    getBalanceList();
    ElMessage.success(result.message);
  } else {
    ElMessage.error(result.message)
  }
}

</script>
<style lang="less" scoped>
#balance-management-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>