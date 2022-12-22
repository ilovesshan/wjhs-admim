<template>
  <div id="integral-goods-order-detail-page">
    <p v-if="!state.orderDetail.id">加载中...</p>
    <el-form v-else :model="state.orderDetail" label-width="100px">
      <el-form-item label="订单编号：">
        <p>{{ state.orderDetail.id }} </p>
      </el-form-item>

      <el-form-item label="订单状态：">
        <el-tag  type="danger">{{getStringByCode(state.orderDetail.status)}}</el-tag>
      </el-form-item>

      <el-form-item label="商品列表：">
        <div class="goods-list">
          <div class="goods-item" v-for="(item, index) in state.recycleOrderGoodsList" :key="index">
            <div class="text">
              <p>商品名称：{{ item.recycleGoods.name }}</p>
              <p>商品重量(KG)：{{ item.weight }}</p>
              <p>商品价格(元)：{{ route.params.type == '10' ?  item.recycleGoods.userPrice :  item.recycleGoods.recycleCenterPrice }}</p>
            </div>
            <img :src="baseUrl + item.recycleGoods.attachment.url" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="订单总价：">
        <p>{{ state.orderDetail.tradingMoney }}</p>
      </el-form-item>

      <el-form-item label="订单重量：">
        <p>{{ state.orderDetail.totalWeight }}</p>
      </el-form-item>

      <el-form-item label="订单积分：">
        <p>{{ state.orderDetail.totalIntegral }}</p>
      </el-form-item>
      <el-form-item label="预约姓名：">
        <p>{{ state.orderDetail.address.userName }}</p>
      </el-form-item>

      <el-form-item label="预约电话：">
        <p>{{ state.orderDetail.address.phone }}</p>
      </el-form-item>

      <el-form-item label="预约地址：">
        <p>{{ state.orderDetail.address.province + state.orderDetail.address.city + state.orderDetail.address.area +
            state.orderDetail.address.detailAddress
        }}</p>

      </el-form-item>
      <el-form-item label="预约时间：">
        <p>{{ state.orderDetail.showAppointmentTime }}</p>
      </el-form-item>

      <el-form-item label="下单时间：">
        <p>{{ state.orderDetail.createTime }}</p>
      </el-form-item>

      <el-form-item label="图片备注：">
        <div v-if="state.orderDetail.attachments.length > 0">
          <div class="note-image-preview">
            <el-image class="image" v-for="(item, index) in state.orderDetail.attachments" :key="index"
              :src="baseUrl + item.url" :preview-src-list="state.noteImagePreview" fit="cover" />
          </div>
        </div>
      </el-form-item>

      <el-form-item label="下单备注：">
        <p>{{ state.orderDetail.note }}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { selectRecycleGoodsOrderById } from "@/api/recycle-goods-order";
import ServiceConfig from "@/config/serviceConfig";
import { IRecycleGoodsOrder } from "@/interfaces/recycle-goods-order";
import { getStringByCode } from "@/utils/system-dict";
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;

const state = reactive({
  orderDetail: {},
  noteImagePreview: [],
  recycleOrderGoodsList: [],
});


const getOrderDetail = async () => {
  const result = await selectRecycleGoodsOrderById((route.params.id as string));
  result.data.showAppointmentTime = result.data.appointmentBeginTime.substring(0, 16) + " - " + result.data.appointmentEndTime.substring(11, 16);
  state.orderDetail = result.data as IRecycleGoodsOrder;

  // 订单附件图片预览
  if (result.data.attachments.length > 0) {
    state.noteImagePreview = result.data.attachments.map((item: any) => baseUrl + item.url);
  }

  // 订单商品列表
  state.recycleOrderGoodsList = result.data.recycleOrderDetails;
}

getOrderDetail();

</script>

<style lang="less" scoped>
#integral-goods-order-detail-page {
  ::v-deep .el-form-item__label {
    font-weight: 700 !important;
  }

  .goods-item {
    box-sizing: border-box;
    padding: 5px 10px;
    width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #efefef;
    margin-top: 12px;

    .text{
      font-size: 12px;
    }

    img {
      width: 200px;
      height: 90px;
      border-radius: 4px;
    }
  }

  .note-image-preview {
    margin-top: 12px;

    .image {
      width: 100px;
      height: 100px;
      margin: 0 5px;
      border-radius: 4px;
    }
  }
}
</style>