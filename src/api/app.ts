import { ICreateApk } from "@/interfaces/app";
import request from "./request";


// 查询app版本列表
export function selectApkList() {
  return request({
    method: "GET",
    url: `/appVersions`,
  });
}

// 上传app
export function uploadApk(data: any) {
  return request({
    method: "POST",
    url: `/appVersions`,
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

// 删除app
export function deleteApkById(id: string) {
  return request({
    method: "DELETE",
    url: `/appVersions/${id}`,
  });
}