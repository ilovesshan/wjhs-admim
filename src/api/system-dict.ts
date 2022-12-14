import request from "./request";

// 数据字典
export function systemDict() {
  return request({
    method: "GET",
    url: `/systemDict`,
  })
}
