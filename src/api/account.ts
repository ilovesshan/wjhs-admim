import { IBalanceTopUp } from "@/interfaces/account";
import request from "./request";


// 获取用户积分列表明细
export function selectIntegralList() {
  return request({
    method: "GET",
    url: `/wx/integrals`,
  });
}


// 获取用户余额列表明细
export function selectBalanceList(type: string) {
  return request({
    method: "GET",
    url: `/accounts?type=${type}`,
  });
}


// 用户账户
export function updateBalance(data: IBalanceTopUp) {
  return request({
    method: "PUT",
    url: `/accounts`,
    data,
  });
}

