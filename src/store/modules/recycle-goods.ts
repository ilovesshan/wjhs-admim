import { defineStore } from "pinia";

export interface IRecycleGoodsType {
  id: string,
  name: string,
  describe: string,
  status: string,
  createTime: string,
}

export interface IRecycleGoods {
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