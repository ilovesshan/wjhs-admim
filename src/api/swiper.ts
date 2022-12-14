import request from "./request";
import type { ISwiperCreateOrUpdate, ISwiperSelect } from "@/interfaces/swiper";


// 获取轮播图列表
export function swiperList(swiperSelect: ISwiperSelect) {
  return request({
    method: "GET",
    url: `/swiper`,
    params: swiperSelect
  });
}


// 新增轮播图
export function swiperInsert(swiper: ISwiperCreateOrUpdate) {
  return request({
    method: "POST",
    url: `/swiper`,
    data: swiper,
  });
}


// 更新轮播图
export function swiperUpdate(swiper: ISwiperCreateOrUpdate) {
  return request({
    method: "PUT",
    url: `/swiper`,
    data: swiper,
  });
}


// 删除轮播图
export function swiperDelete(id: string) {
  return request({
    method: "DELETE",
    url: `/swiper/${id}`
  });
}


// 根据ID获取轮播图
export function swiperGetById(id: string) {
  return request({
    method: "GET",
    url: `/swiper/${id}`
  });
}





