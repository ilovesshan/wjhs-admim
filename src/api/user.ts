import request from "./request";
import type { IInsertOrUpdateUser, ILoginUserInfo } from "@/interfaces/user";


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
export function insertUser(data: IInsertOrUpdateUser) {
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


// 根据ID获取用户
export function selectUserById(userId: string) {
  return request({
    method: "GET",
    url: `users/${userId}`,
  })
}

// 更新用户
export function updateUser(data: IInsertOrUpdateUser) {
  return request({
    method: "PUT",
    url: `users`,
    data,
  })
}