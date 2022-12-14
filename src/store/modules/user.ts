import { IUserInfo, IUserLoginInfo, IWxUserInfo } from "@/interfaces/user";
import { defineStore } from "pinia";
import { SCache } from "../../utils/cache";


export interface IUserStore {
  userInfo: IUserInfo
  userLoginInfo: IUserLoginInfo,
  wxUserList: Array<IWxUserInfo>,
  systemUserList: Array<IUserInfo>,
}


const userStore = defineStore("userStore", {
  state(): IUserStore {
    return {
      userLoginInfo: {
        id: SCache.get("id"),
        username: SCache.get("username"),
        token: SCache.get("token"),
      },
      userInfo: SCache.get("userInfo"),
      wxUserList: [],
      systemUserList: [],
    }
  },

  getters: {},

  actions: {
    saveUserLoginInfo(userLoginInfo: IUserLoginInfo) {
      this.userLoginInfo = userLoginInfo;
      SCache.set("id", userLoginInfo.id);
      SCache.set("username", userLoginInfo.username);
      SCache.set("token", userLoginInfo.token);
    },

    cleanUserLoginInfo() {
      this.$patch({ userLoginInfo: {} })
      SCache.clear()
    },

    saveUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo;
      SCache.set("userInfo", userInfo);
    },

    cleanUserInfo() {
      this.$patch({ userInfo: {} })
      SCache.clear()
    },

    saveWxUserList(wxUserList: Array<IWxUserInfo>) {
      this.wxUserList = wxUserList;
    },

    saveSystemUserList(systemUserList: Array<IUserInfo>) {
      this.systemUserList = systemUserList;
    },
  }
});


export default userStore;