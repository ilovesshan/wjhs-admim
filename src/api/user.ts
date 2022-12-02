import { ILoginUserInfo } from "../views/login/type";
import request from "./request";

// 用户授权
export function userAuth(loginUserInfo: ILoginUserInfo) {
  return request({
    method: "POST",
    url: `/auth`,
    data: loginUserInfo
  })
}

// 获取用户信息
export function userInfo(userId: string) {
  return request({
    method: "GET",
    url: `users/${userId}`,
  })
}