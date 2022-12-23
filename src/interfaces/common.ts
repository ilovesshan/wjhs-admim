export interface IAttachment {
  id?: string,
  url?: string,
  createByUserId?: string,
  createByUserName?: string,
  createByUserType?: string,
  createTime?: string,
}


export interface IAddress {
  id: string,
  userName: string,
  phone: string,
  area: string,
  city: string,
  province: string,
  detailAddress: string,
  longitude: number,
  latitude: number,
  isDefault: string,
  isDelete: string,
  createTime: string,
}