export interface INoticeCreateOrUpdate {
  id?: string,
  type: number,
  title: string,
  subTitle?: string,
  detail?: string,
  link?: string,
}

export interface INoticeSelect {
  type: number,
  title?: string | null,
  detail?: string
  beginTime?: string
  endTime?: string
  tempTime?: string
}


export interface INotice {
  id: string
  type: string
  title: string
  subTitle: string
  detail: string
  link: string
  createTime: string
}

