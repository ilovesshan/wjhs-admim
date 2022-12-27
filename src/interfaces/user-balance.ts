export interface IUserBalance {
  userId: string,
  username: string,
  avatarUrl: string,
  balance: number,
  accountRecords: Array<IBalanceRecord>
}

export interface IBalanceRecord {
  id: string,
  userTypeFrom: string,
  userTypeTo: string,
  userIdFrom: string,
  userIdTo: string,
  payStatus: string,
  tradingId: string
  tradingMoney: number,
  tradingType: string,
  tradingNote: string,
  isDelete: string,
  createTime: string
}

export interface IBalanceTopUp {
  userIdFrom?: string,
  userIdTo?: string,
  userTypeFrom?: string,
  userTypeTo?: string,
  userNameFrom?: string,
  userNameTo?: string,
  tradingMoney?: number,
  tradingNote?: string
}