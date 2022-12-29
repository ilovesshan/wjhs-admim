import { defineStore } from "pinia";
import { IFeedback } from "@/interfaces/feedback";

interface IOrderState {
  feedbackList: Array<IFeedback>
}

const feedbackModule = defineStore("feedbackStore", {
  state(): IOrderState {
    return {
      feedbackList: [],
    }
  },

  getters: {},

  actions: {
    saveRecycleGoodsList(feedbackList: Array<IFeedback>) {
      this.feedbackList = feedbackList;
    },
  }
});
export default feedbackModule;