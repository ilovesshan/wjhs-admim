import { IRecycleGoodsOrder } from "@/interfaces/recycle-goods-order";
import { defineStore } from "pinia";

interface IOrderState {
  recycleGoodsOrderList: Array<IRecycleGoodsOrder>
}

const orderModule = defineStore("orderStore", {
  state(): IOrderState {
    return {
      recycleGoodsOrderList: [],
    }
  },

  getters: {},

  actions: {
    saveRecycleGoodsList(recycleGoodsOrderList: Array<IRecycleGoodsOrder>) {
      this.recycleGoodsOrderList = recycleGoodsOrderList;
    },
  }
});
export default orderModule;