import noticeModule from "./modules/notice";
import swiperModule from "./modules/swiper";
import userModule from "./modules/user"
import recycleGoodsModule from "./modules/recycle-goods"
import orderModule from "./modules/order";
import accountModule from "./modules/account";
import feedbackModule from "./modules/feedback";

// 用户模块
const userStore = userModule();

// 轮播图模块
const swiperStore = swiperModule();

// 通知公告模块
const noticeStore = noticeModule();

// 回收商品模块
const recycleGoodsStore = recycleGoodsModule();

// 订单模块
const orderStore = orderModule();

// 账户模块
const accountStore = accountModule();

// 意见反馈模块
const feedbackStore = feedbackModule();

export {
  userStore,
  swiperStore,
  noticeStore,
  recycleGoodsStore,
  orderStore,
  accountStore,
  feedbackStore
}