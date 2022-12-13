import request from "./request";


// 获取回收商品分类
export function selectRecycleGoodsType() {
  return request({
    method: "GET",
    url: `/recycleGoodsTypes`,
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