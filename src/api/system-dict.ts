import { ILoginUserInfo } from "../views/login/type";
import request from "./request";

// 数据字典
export function systemDict() {
  return request({
    method: "GET",
    url: `/systemDict`,
  })
}
