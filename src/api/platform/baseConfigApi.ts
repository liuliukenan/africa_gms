import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import { BaseConf } from "./model/baseConfig";

// 获取基础配置
export async function getBaseConfApi() {
  const res = await request.Get<ApiResult<BaseConf>>('/sysConf/getAppConf');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存基础配置
export async function saveBaseConfApi(params: BaseConf) {
  const res = await request.Post<ApiResult<unknown>>('/sysConf/saveAppConf', params);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/sysConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}