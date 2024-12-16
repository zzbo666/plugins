//  copy from ./client.ts   ----------------------------------------------------
import axios, { type AxiosHeaders, type AxiosError } from "axios";
import { RequestConfig, ResponseConfig } from "./client";
import { EOA_ADDRESS, ID_TOKEN } from "./constant";
// import {sessionKey} from '@/configs/key';
// import {getStorageItemAsync} from '@/hooks/useStorageState';
// import { fetch as fetchNetwork } from "@react-native-community/netinfo";
// import { isWeb } from "./device";

// declare const AXIOS_BASE: string;
declare const AXIOS_HEADERS: string;
//  ----------------------------------------------------------------------------

//  新增给quest api使用 ----------------------------------------------------------
export const axiosInstanceForQuestsAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_QUESTS_API_URL,
  headers: {
    ...(typeof AXIOS_HEADERS !== "undefined"
      ? (JSON.parse(AXIOS_HEADERS) as AxiosHeaders)
      : undefined),
    saas_id: process.env.EXPO_PUBLIC_QUEST_API_SAAS_ID || "zeek-app",
  },
});

// 添加请求拦截器
axiosInstanceForQuestsAPI.interceptors.request.use(
  async (config) => {
    // const state = await fetchNetwork();
    // if (!state.isConnected) {
    //   throw new Error("Network Error");
    // }

    // 在请求头中添加 JWT Token
    const token = localStorage.getItem(ID_TOKEN);
    const eoaAddress = localStorage.getItem(EOA_ADDRESS);
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`;
      console.log(config.url);
      config.headers[ID_TOKEN] = `${token}`;
    }
    // if (!isWeb) {
    //   config.headers["Accept-Encoding"] = `*`;
    // }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

export const axiosClientForQuestsAPI = async <
  TData,
  TError = unknown,
  TVariables = unknown
>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const promise = axiosInstanceForQuestsAPI
    .request<TData, ResponseConfig<TData>>(config)
    .catch((e: AxiosError<TError>) => {
      throw e;
    });

  return promise;
};
export default axiosClientForQuestsAPI;
//  ---------------------------------------------------------------------------
