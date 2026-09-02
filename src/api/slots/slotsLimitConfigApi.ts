import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { SlotsLimitConfig, SlotsLimitConfigParam } from "@/api/model/slotsLimitConfig";

/**
* 分页查询
*/
export async function pageSlotsLimitConfigs(params: SlotsLimitConfigParam) {
const res = await request.Post<ApiResult<PageResult<SlotsLimitConfig>>>(
    "/slotsLimitConfig/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listSlotsLimitConfig(params?: SlotsLimitConfigParam) {
    const res = await request.Post<ApiResult<SlotsLimitConfig[]>>("/slotsLimitConfig/exportList",
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
export async function getSlotsLimitConfig(id: number) {
    const res = await request.Get<ApiResult<SlotsLimitConfig>>("/slotsLimitConfig/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addSlotsLimitConfig(data: SlotsLimitConfig) {
    const res = await request.Post<ApiResult<unknown>>("/slotsLimitConfig", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateSlotsLimitConfig(data: SlotsLimitConfig) {
    const res = await request.Put<ApiResult<unknown>>("/slotsLimitConfig", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeSlotsLimitConfig(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/slotsLimitConfig/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeSlotsLimitConfigs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/slotsLimitConfig/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
