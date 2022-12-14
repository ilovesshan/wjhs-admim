
export interface IUserInfo {
  id: string,
  username: string,
  userType: string,
  gender: string,
  attachmentId: string,
  nickName: string,
  phone: string,
  isDelete: string,
  lastVisitTime: string,
  createTime: string,
  updateTime: string,
}

export interface IUserLoginInfo {
  id: string,
  username: string,
  token: string,
}

export interface IWxUserInfo {
  id: string
  openId: string
  skey: string
  sessionKey: string
  gender: string
  avatarUrl: string
  city: string
  province: string
  country: string
  nickName: string
  lastVisitTime: string
  createTime: string
}

export interface IInsertOrUpdateUser {
  id?: string
  attachmentId: string,
  gender: string,
  nickName: string,
  password: string,
  phone: string,
  userType: string | null,
  username: string
}

export interface ILoginUserInfo {
  username: String,
  password: String,
}
