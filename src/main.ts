import { createApp } from "vue";
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.min.js'
import 'element-plus/dist/index.css'
import "@/assets/css/common.less"

import "./permission";

import router from "./router"
import App from "./App.vue";


const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)
app.use(createPinia())
app.mount("#app");
