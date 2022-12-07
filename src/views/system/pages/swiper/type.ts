export interface ISwiperCreateOrUpdate {
  id: string,
  type: number,
  attachmentId: string,
  title: string,
  subTitle: string
  detail: string,
  link: string,
  attachment?: IAttachment,
}

interface IAttachment {
  id?: string,
  url?: string,
  createByUserId?: string,
  createByUserName?: string,
  createByUserType?: string,
  createTime?: string,
}

export interface ISwiper {
  id: string,
  type: string,
  attachmentId: string,
  title: string,
  subTitle: string,
  detail: string,
  link: string,
  attachment: IAttachment,
  createTime: string,
}

export interface ISwiperSelect {
  type: number,
  title?: string,
  beginTime?: string
  endTime?: string
  tempTime?: string
}

