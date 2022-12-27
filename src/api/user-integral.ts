import request from "./request";


// 获取用户积分列表明细
export function selectIntegralList() {
  return request({
    method: "GET",
    url: `/wx/integrals`,
  });
}
