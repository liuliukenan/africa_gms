import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { RtpConfig, RtpConfigParam } from "@/api/model/rtpConfig";

/**
* 分页查询
*/
export async function pageRtpConfigs(params: RtpConfigParam) {
const res = await request.Post<ApiResult<PageResult<RtpConfig>>>(
    "/mi/rtpConfig/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listRtpConfig(params?: RtpConfigParam) {
    const res = await request.Post<ApiResult<RtpConfig[]>>("/mi/rtpConfig/exportList",
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
export async function getRtpConfig(id: number) {
    const res = await request.Get<ApiResult<RtpConfig>>("/mi/rtpConfig/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addRtpConfig(data: RtpConfig) {
    const res = await request.Post<ApiResult<unknown>>("/mi/rtpConfig", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateRtpConfig(data: RtpConfig) {
    const res = await request.Put<ApiResult<unknown>>("/mi/rtpConfig", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeRtpConfig(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/mi/rtpConfig/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeRtpConfigs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/mi/rtpConfig/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
