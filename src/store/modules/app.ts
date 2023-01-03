import { IApk } from "@/interfaces/app";
import { defineStore } from "pinia";

interface INoAppStore {
  appList: Array<IApk>
}

const appModule = defineStore("appStore", {
  state(): INoAppStore {
    return {
      appList: []
    }
  },

  getters: {

  },

  actions: {
    saveApkList(appList: Array<IApk>) {
      this.appList = appList;
    },
  }
});

export default appModule;