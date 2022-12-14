import { IRecycleGoods, IRecycleGoodsType } from "@/interfaces/recycle-goods";
import { defineStore } from "pinia";

interface IRecycleGoodsStore {
  goodsTypeList: Array<IRecycleGoodsType>,
  goodsList: Array<IRecycleGoods>,
}


const recycleGoodsModule = defineStore("recycleGoodsStore", {
  state(): IRecycleGoodsStore {
    return {
      goodsTypeList: [],
      goodsList: [],
    }
  },

  getters: {},

  actions: {
    saveGoodsTypeList(goodsTypeList: Array<IRecycleGoodsType>) {
      this.goodsTypeList = goodsTypeList;
    },

    saveGoodsList(goodsList: Array<IRecycleGoods>) {
      this.goodsList = goodsList;
    },
  }
});
export default recycleGoodsModule;