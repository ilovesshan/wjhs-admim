import request from "./request";
import type { INoticeCreateOrUpdate, INoticeSelect } from "@/interfaces/notice";


// 获取通知公告列表
export function noticeList(noticeSelect: INoticeSelect) {
  return request({
    method: "GET",
    url: `/notice`,
    params: noticeSelect,
  });
}

// 新增通知公告
export function noticeInsert(notice: INoticeCreateOrUpdate) {
  return request({
    method: "POST",
    url: `/notice`,
    data: notice,
  });
}

// 更新通知公告
export function noticeUpdate(notice: INoticeCreateOrUpdate) {
  return request({
    method: "PUT",
    url: `/notice`,
    data: notice,
  });
}


// 删除通知公告
export function noticeDelete(id: string) {
  return request({
    method: "DELETE",
    url: `/notice/${id}`
  });
}



// 根据ID查询公告
export function noticeGetById(id: string) {
  return request({
    method: "GET",
    url: `/notice/${id}`
  });
}





