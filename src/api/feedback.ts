import request from "./request";


// 根据用户类型获取反馈列表
export function selectFeedbackListByType(userType: string, isSolve: string) {
  return request({
    method: "GET",
    url: `/feedback?userType=${userType}&isSolve=${isSolve}`,
  });
}

// 更新反馈状态(已处理)
export function updateFeedbackStatus(id: string) {
  return request({
    method: "PUT",
    url: `/feedback/${id}`,
  });
}

