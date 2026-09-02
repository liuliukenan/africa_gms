import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { WaterPool, WaterPoolParam } from "@/api/model/waterPool";

/**
* 分页查询
*/
export async function pageWaterPools(params: WaterPoolParam) {
const res = await request.Post<ApiResult<PageResult<WaterPool>>>(
    "/mi/waterPool/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listWaterPool(params?: WaterPoolParam) {
    const res = await request.Post<ApiResult<WaterPool[]>>("/mi/waterPool/exportList",
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
export async function getWaterPool(id: number) {
    const res = await request.Get<ApiResult<WaterPool>>("/mi/waterPool/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addWaterPool(data: WaterPool) {
    const res = await request.Post<ApiResult<unknown>>("/mi/waterPool", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateWaterPool(data: WaterPool) {
    const res = await request.Put<ApiResult<unknown>>("/mi/waterPool", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}
export async function updateWaterPoolRtp(data: WaterPool) {
    const res = await request.Put<ApiResult<unknown>>("/mi/waterPool/updateRecycle", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeWaterPool(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/mi/waterPool/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeWaterPools(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/mi/waterPool/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
