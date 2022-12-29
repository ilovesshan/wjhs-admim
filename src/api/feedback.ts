import request from "./request";


// 根据用户类型获取反馈列表
export function selectFeedbackListByType(type: string) {
  return request({
    method: "GET",
    url: `/feedback?type=${type}`,
  });
}

// 更新反馈状态(已处理)
export function updateFeedbackStatus(id: string) {
  return request({
    method: "PUT",
    url: `/feedback/${id}`,
  });
}

