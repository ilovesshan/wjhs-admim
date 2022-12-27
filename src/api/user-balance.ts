import { IBalanceTopUp } from "@/interfaces/user-balance";
import request from "./request";


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
