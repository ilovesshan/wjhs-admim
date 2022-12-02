import { createApp } from "vue";
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "@/assets/css/common.less"

import router from "./router"
import App from "./App.vue";


const app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount("#app");
