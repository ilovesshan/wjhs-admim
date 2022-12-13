import { IInsertUser } from "@/views/user/pages/system-user/type";
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

// 获取小程序用户列表
export function wxUserList() {
  return request({
    method: "GET",
    url: `/wx/users`,
  })
}

// 获取系统用户列表(骑手、回收中心、平台端)
export function systemUserList(type: string) {
  return request({
    method: "GET",
    url: `users?type=${type}`,
  })
}

// 新增用户
export function insertUser(data: IInsertUser) {
  return request({
    method: "POST",
    url: `users`,
    data,
  })
}

// 删除用户
export function deleteUser(userId: string) {
  return request({
    method: "DELETE",
    url: `users/${userId}`,
  })
}
