import { IAddress, IAttachment } from "./common"
import { IRecycleGoods } from "./recycle-goods"
import { IUserInfo } from "./user"

export interface IRecycleGoodsOrder {
  id: string
  submitUserId: string
  receiveUserId: string
  orderType: string
  status: string
  tradingMoney: number
  totalWeight: number
  totalIntegral: number
  addressId: string
  appointmentBeginTime: string
  appointmentEndTime: string
  showAppointmentTime: string
  note: string
  noteAttachmentIds: string,
  recycleOrderDetails: Array<IRecycleOrderDetails>,
  attachments: Array<IAttachment>,
  address: IAddress,
  receiveUser: IUserInfo,
  isDelete: string,
  createTime: string
}

export interface IRecycleOrderDetails {
  id: string
  orderId: string
  goodsId: string
  recycleGoods: IRecycleGoods,
  weight: number
  isDelete: string
  createTime: string
}