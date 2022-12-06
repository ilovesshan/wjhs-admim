import { defineStore } from "pinia";
import { SCache } from "../../utils/cache";

export interface IUserInfo {
  id: string,
  username: string,
  userType: string,
  gender: string,
  attachmentId: string,
  nickName: string,
  phone: string,
  isDelete: string,
  lastVisitTime: string,
  createTime: string,
  updateTime: string,
}

export interface IUserLoginInfo {
  id: string,
  username: string,
  token: string,
}

export interface IUserStore {
  userInfo: IUserInfo
  userLoginInfo: IUserLoginInfo
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
    }
  }
});


export default userStore;