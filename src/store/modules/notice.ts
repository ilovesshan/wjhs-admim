import { defineStore } from "pinia";
import { noticeList } from "../../api/notice";
import type { INotice, INoticeSelect } from "../../views/system/pages/notice/type";

interface INoticeStore {
  type: number,
  list: Array<INotice>
}

const noticeModule = defineStore("noticeStore", {
  state(): INoticeStore {
    return {
      type: 0,
      list: []
    }
  },

  getters: {

  },

  actions: {
    saveNotice(noticeList: Array<INotice>) {
      this.list = noticeList;
    },

    saveType(type: number) {
      this.type = type;
    },

    async requestNotice(requestData: INoticeSelect) {
      const result = await noticeList(requestData);
      this.saveNotice(result.data as Array<INotice>);
      this.saveType(requestData.type);
    }
  }
});

export default noticeModule;