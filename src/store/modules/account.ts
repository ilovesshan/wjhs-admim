import { IUserBalance, IUserIntegral } from "@/api/account";
import { defineStore } from "pinia";

interface IOrderState {
  userIntegralList: Array<IUserIntegral>,
  userBalanceList: Array<IUserBalance>,
}

const accountModule = defineStore("accountStore", {
  state(): IOrderState {
    return {
      userIntegralList: [],
      userBalanceList: [],
    }
  },

  getters: {},

  actions: {
    saveUserIntegralList(userIntegralList: Array<IUserIntegral>) {
      this.userIntegralList = userIntegralList;
    },

    saveUserBalanceList(userBalanceList: Array<IUserBalance>) {
      this.userBalanceList = userBalanceList;
    },
  }
});
export default accountModule;