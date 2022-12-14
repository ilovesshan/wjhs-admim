import request from "./request";
import type { IInsertOrUpdateRecycleGoods } from "@/interfaces/recycle-goods";


// 获取回收商品分类
export function selectRecycleGoodsType() {
  return request({
    method: "GET",
    url: `/recycleGoodsTypes`,
  });
}


// 获取回收商品分类根据ID
export function selectRecycleGoodsTypeById(id: string) {
  return request({
    method: "GET",
    url: `/recycleGoodsTypes/${id}`,
  });
}



// 新增回收商品分类
export function insertRecycleGoodsType(data: { name: string, describe: string }) {
  return request({
    method: "POST",
    url: `/recycleGoodsTypes`,
    data,
  });
}

// 删除回收商品分类
export function deleteRecycleGoodsType(id: string) {
  return request({
    method: "DELETE",
    url: `/recycleGoodsTypes/${id}`,
  });
}


// 更新回收商品分类
export function updateRecycleGoodsType(data: any) {
  return request({
    method: "PUT",
    url: `/recycleGoodsTypes`,
    data,
  });
}


// 获取回收商品根据ID
export function selectRecycleGoodsById(id: string) {
  return request({
    method: "GET",
    url: `/recycleGoods/${id}`,
  });
}





// 获取回收商品根据分类
export function selectRecycleGoodsByType(typeId: string) {
  return request({
    method: "GET",
    url: `/recycleGoods?type=${typeId}`,
  });
}


// 新增回收商品
export function insertRecycleGoods(data: IInsertOrUpdateRecycleGoods) {
  return request({
    method: "POST",
    url: `/recycleGoods`,
    data,
  });
}

// 删除回收商品
export function deleteRecycleGoods(id: string) {
  return request({
    method: "DELETE",
    url: `/recycleGoods/${id}`,
  });
}

// 更新回收商品
export function updateRecycleGoods(data: any) {
  return request({
    method: "PUT",
    url: `/recycleGoods`,
    data,
  });
}