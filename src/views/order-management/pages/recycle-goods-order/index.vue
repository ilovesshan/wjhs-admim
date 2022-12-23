<template>
  <div id="recycle-goods-order-page">
    <!-- 操作栏 -->
    <el-card shadow="never">
      <!-- 搜索条件框  -->
      <el-form :inline="true" label-width="68px" label-position="left">
        <el-form-item label="订单类型" prop="">
          <el-select v-model="searchParams.orderType">
            <el-option key="10" label="用户到骑手" value="10" />
            <el-option key="11" label="骑手到回收中心" value="11" />
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态" prop="">
          <el-select v-model="searchParams.status" :disabled="searchParams.orderType == '11'">
            <el-option key="4" label="待接单" value="4" />
            <el-option key="5" label="待上门" value="5" />
            <el-option key="6" label="待结算" value="6" />
            <el-option key="7" label="已完结" value="7" />
            <el-option key="8" label="已超时" value="8" />
            <el-option key="9" label="取消订单" value="9" />
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
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never">
      <el-table :data="recycleGoodsOrderList" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="address.userName" label="下单用户名称" width="160" />
        <el-table-column prop="address.phone" label="下单用户手机号" width="200" />
        <el-table-column prop="receiveUser.username" label="接单用户名称" width="160" />
        <el-table-column prop="receiveUser.phone" label="接单用户手机号" width="200" />
        <el-table-column prop="tradingMoney" label="交易金额(元)" width="120" />
        <el-table-column prop="totalWeight" label="订单重量(KG)" width="120" />
        <el-table-column label="订单预约时间" width="240">
          <template #default="scope"> {{ scope.row.showAppointmentTime }} </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="240" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button @click="showDetail(scope.row.id)" link type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { Search, RefreshRight } from '@element-plus/icons-vue'

import { orderStore } from "@/store/index"
import { selectRecycleGoodsOrderList } from "@/api/recycle-goods-order";
import { IRecycleGoodsOrder } from "@/interfaces/recycle-goods-order";

const router = useRouter();

const searchParams = reactive({
  orderType: "10",
  status: "4",
});

const recycleGoodsOrderList = computed(() => orderStore.recycleGoodsOrderList);

const handleSearch = () => requestRecycleGoodsOrderList();


const handleReset = () => {
  searchParams.orderType = "10";
  searchParams.status = "4";
  requestRecycleGoodsOrderList();
}

const requestRecycleGoodsOrderList = async () => {
  const status = searchParams.orderType == "11" ? "7" : searchParams.status
  const result = await selectRecycleGoodsOrderList(status, searchParams.orderType);
  const data = result.data.map((order: IRecycleGoodsOrder) => {
    order.showAppointmentTime = order.appointmentBeginTime.substring(0, 16) + " - " + order.appointmentEndTime.substring(11, 16);
    return order;
  })
  orderStore.saveRecycleGoodsList(data as Array<IRecycleGoodsOrder>)
}

const showDetail = (id: string) => router.push({
  path: `/order-management/recycle-goods-order-detail/${id}/${searchParams.orderType}`
});

requestRecycleGoodsOrderList();


</script>

<style lang="less" scoped>
#recycle-goods-order-page {
  .el-card {
    margin-bottom: 15px;

    ::v-deep .el-form-item__label {
      font-weight: 700 !important;
    }
  }
}
</style>