import { createApp } from "vue";
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import "@/assets/css/index.less"

import "./permission";

import router from "./router"
import App from "./App.vue";


const app = createApp(App);
app.use(ElementPlus, {
  locale: locale,
})
app.use(router)
app.use(createPinia())
app.mount("#app");
