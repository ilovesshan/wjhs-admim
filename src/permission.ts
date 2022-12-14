import { ElMessage } from "element-plus";
import router from "./router";
import { SCache } from "./utils/cache";
import type { IUserInfo } from "./interfaces/user";

// 路由拦截
const whileList: Array<string> = ["notFound", "login"];
router.beforeEach((to, from, next) => {
  if (SCache.get("token") && SCache.get("userInfo")) {
    if (to.path === "/login") {
      // 已经登录情况下 不能直接访问登录界面
      next(from.path);
      return;
    }
    // has token
    // 判断是否有权限(根据角色CODE)进入
    if (canAccess((SCache.get("userInfo") as IUserInfo).userType)) {
      next();
    } else {
      ElMessage({ message: "非管理员用户暂时不能登录后台管理系统", type: 'error' });
      next("/login");
    }
  } else {
    // no token
    if (whileList.includes(to.name as string)) {
      // 白名单放行
      next();
    } else {
      // to login page
      next("/login");
    }
  }
})

export function canAccess(code: string): boolean {
  return code === "0";
}