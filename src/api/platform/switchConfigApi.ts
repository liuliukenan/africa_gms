import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
/**
 * 开关配置
 */
export interface SwitchConf {
  jsonType?: string;
  smsSwitch?: boolean;
}

// 获取短信基础配置
export async function getSwitchConfApi() {
  const res = await request.Get<ApiResult<SwitchConf>>('/sysConf/getSwitchConf');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存短信开关配置
export async function saveSwitchConfApi(params: SwitchConf) {
  const res = await request.Post<ApiResult<unknown>>('/sysConf/saveSwitchConf', params);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 获取服务器基础配置
export async function getServerApi() {
  const res = await request.Get<ApiResult<SwitchConf>>('/sysConf/getOpenSwitchConf');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存服务器开关配置
export async function savServerApi(totpCode: number, params: Record<string, unknown>) {
  const res = await request.Post<ApiResult<unknown>>('/sysConf/saveOpenSwitchConf/' + totpCode, params);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
