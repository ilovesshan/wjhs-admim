import { IAttachment } from "./common";

export interface IRecycleGoodsType {
  id: string,
  name: string,
  describe: string,
  status: string,
  createTime: string,
}

export interface IInsertOrUpdateRecycleGoodsType {
  id?: string,
  name: string,
  describe: string,
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