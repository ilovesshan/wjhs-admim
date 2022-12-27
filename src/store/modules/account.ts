import { IUserIntegral } from "@/interfaces/user-integral";
import { defineStore } from "pinia";

interface IOrderState {
  userIntegralList: Array<IUserIntegral>
}

const accountModule = defineStore("accountStore", {
  state(): IOrderState {
    return {
      userIntegralList: [],
    }
  },

  getters: {},

  actions: {
    saveUserIntegralList(userIntegralList: Array<IUserIntegral>) {
      this.userIntegralList = userIntegralList;
    },
  }
});
export default accountModule;