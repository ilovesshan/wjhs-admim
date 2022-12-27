export interface IUserIntegral {
  userId: string
  username: string
  avatarUrl: string
  integral: number
  integralRecords: Array<IIntegralRecord>
}

export interface IIntegralRecord {
  id: string
  userId: string
  orderId: string
  payStatus: string
  tradingIntegral: number
  isDelete: string
  createTime: string
}