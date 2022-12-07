import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import { ElMessage, ElLoading } from 'element-plus'

import ServiceConfig from "../config/serviceConfig"

import router from "../router"
import { LCache, SCache } from "../utils/cache"

const baseConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.MODE == "development" ? ServiceConfig.devBaseUrl : ServiceConfig.prodBaseUrl,
  timeout: import.meta.env.MODE == "development" ? ServiceConfig.devTimeout : ServiceConfig.prodTimeout,
}

interface CusResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

const instance: AxiosInstance = axios.create(baseConfig)

let loadingInstance: any = null;

// 请求拦截器
instance.interceptors.request.use(config => {
  // 开启loading
  loadingInstance = ElLoading.service({ lock: true, text: '拼命加载中...', background: 'rgba(0, 0, 0, 0.7)', });

  // 添加token信息
  config.headers!["Authorization"] = SCache.get("token");

  // 添加时间戳
  if (config.url?.includes('?')) {
    config.url += `&t=${new Date().getTime()}`
  } else {
    config.url += `?t=${new Date().getTime()}`
  }
  return config;
},
  error => {
    // 关闭loading
    loadingInstance.close();
    ElMessage({ message: "请求失败,请联系网站管理员", type: 'error' });
    console.log(error);
  });


// 响应拦截器
instance.interceptors.response.use(response => {
  // 关闭loading
  loadingInstance.close();
  return response;
},
  error => {
    // 关闭loading
    loadingInstance.close();
    if (error.response && error.response.status == 301) {
      router.push("/login");
      ElMessage({ message: error.response.data.message, type: 'error' });
    } else if (error.response && error.response.status == 400) {
      ElMessage({ message: error.response.data.message, type: 'error' });
    } else {
      ElMessage({ message: "请求失败,请联系网站管理员", type: 'error' });
    }
  });

const request = async<T = any>(config: AxiosRequestConfig): Promise<CusResponse<T>> => {
  return new Promise(async (resolve, reject) => {
    const res = await instance.request<CusResponse<T>>(config);
    const { code, message, data } = res.data;
    if (code == 200) {
      resolve(res.data)
    } else {
      ElMessage({ message, type: 'error' });
    }
  });
}

export default request;