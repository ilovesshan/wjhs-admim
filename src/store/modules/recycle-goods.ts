import { IAttachment } from "@/views/system/pages/swiper/type";
import { defineStore } from "pinia";

export interface IRecycleGoodsType {
  id: string,
  name: string,
  describe: string,
  status: string,
  createTime: string,
}

export interface IRecycleGoods {
  id: string,
  typeId: string,
  name: string,
  describe: string,
  attachmentId: string,
  integral: string,
  userPrice: string,
  driverPrice: string,
  recycleCenterPrice: string,
  attachment: IAttachment,
  status: string,
  createTime: string,
}

export interface IInsertOrUpdateRecycleGoods {
  id?: string,
  attachmentId: string,
  describe: string,
  driverPrice: string,
  integral: string,
  name: string,
  recycleCenterPrice: string,
  typeId: string,
  userPrice: string,
}

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