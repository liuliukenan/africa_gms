import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { SmsChannel, SmsChannelParam } from "./model/smsChannel";

/**
* 分页查询
*/
export async function pageSmsChannels(params: SmsChannelParam) {
const res = await request.Post<ApiResult<PageResult<SmsChannel>>>(
    "/smsChannel/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/smsChannel/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listSmsChannel(params?: SmsChannelParam) {
    const res = await request.Post<ApiResult<SmsChannel[]>>("/smsChannel/exportList",
    params
    );
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 根据id查询
*/
export async function getSmsChannel(id: number) {
    const res = await request.Get<ApiResult<SmsChannel>>("/smsChannel/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addSmsChannel(data: SmsChannel) {
    const res = await request.Post<ApiResult<unknown>>("/smsChannel", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateSmsChannel(data: SmsChannel) {
    const res = await request.Put<ApiResult<unknown>>("/smsChannel", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeSmsChannel(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/smsChannel/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeSmsChannels(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/smsChannel/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
