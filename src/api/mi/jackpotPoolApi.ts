import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { JackpotPool, JackpotPoolParam } from "@/api/model/jackpotPool";

/**
* 分页查询
*/
export async function pageJackpotPools(params: JackpotPoolParam) {
const res = await request.Post<ApiResult<PageResult<JackpotPool>>>(
    "/mi/jackpotPool/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listJackpotPool(params?: JackpotPoolParam) {
    const res = await request.Post<ApiResult<JackpotPool[]>>("/mi/jackpotPool/exportList",
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
export async function getJackpotPool(id: number) {
    const res = await request.Get<ApiResult<JackpotPool>>("/mi/jackpotPool/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addJackpotPool(data: JackpotPool) {
    const res = await request.Post<ApiResult<unknown>>("/mi/jackpotPool", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateJackpotPool(data: JackpotPool) {
    const res = await request.Put<ApiResult<unknown>>("/mi/jackpotPool", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeJackpotPool(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/mi/jackpotPool/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeJackpotPools(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/mi/jackpotPool/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
