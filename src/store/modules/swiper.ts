import { ISwiper, ISwiperSelect } from "@/interfaces/swiper";
import { defineStore } from "pinia";
import { swiperList } from "../../api/swiper";
import ServiceConfig from "../../config/serviceConfig";

interface ISwiperStore {
  type: number,
  list: Array<ISwiper>
}


const swiperModule = defineStore("swiperStore", {
  state() {
    return {
      type: 0,
      list: []
    } as ISwiperStore
  },

  getters: {},

  actions: {
    saveSwiper(SwiperList: Array<ISwiper>) {
      this.list = SwiperList;
    },

    saveType(type: number) {
      this.type = type;
    },

    async requestSwiper(requestData: ISwiperSelect) {
      const result = await swiperList(requestData);
      const swiperData: Array<ISwiper> = result.data;
      swiperData.map(swiper => {
        const baseUrl = import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl;
        swiper.attachment.url = `${baseUrl + swiper.attachment.url}`
        return swiper;
      })

      this.saveSwiper(result.data as Array<ISwiper>);
      this.saveType(requestData.type);
    }
  }
});


export default swiperModule;