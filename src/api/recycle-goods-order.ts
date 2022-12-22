import request from "./request";

// 获取回收商品订单列表
export function selectRecycleGoodsOrderList(status: string, orderType: string) {
  return request({
    method: "GET",
    url: `/recycleOrders/platform?status=${status}&orderType=${orderType}`,
  });
}


// 获取回收商品订单详情
export function selectRecycleGoodsOrderById(id: string) {
  return request({
    method: "GET",
    url: `/recycleOrders/${id}`,
  });
}
