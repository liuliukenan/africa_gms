import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AppGameCount, AppGameCountParam } from "@/api/count/model/appGameCount";

/**
* 分页查询冲提利润比
*/
export async function pageAppGameCounts(params: AppGameCountParam) {
const res = await request.Post<ApiResult<PageResult<AppGameCount>>>(
    "/count/appGameCount/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出冲提利润比
*/
export async function listAppGameCount(params?: AppGameCountParam) {
    const res = await request.Post<ApiResult<AppGameCount[]>>("/count/appGameCount/exportList",
    params
    );
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 根据id查询冲提利润比
*/
export async function getAppGameCount(id: number) {
    const res = await request.Get<ApiResult<AppGameCount>>("/count/appGameCount/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加冲提利润比
*/
export async function addAppGameCount(data: AppGameCount) {
    const res = await request.Post<ApiResult<unknown>>("/appGameCount", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改冲提利润比
*/
export async function updateAppGameCount(data: AppGameCount) {
    const res = await request.Put<ApiResult<unknown>>("/appGameCount", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户冲提利润比
*/
export async function removeAppGameCount(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/count/appGameCount/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAppGameCounts(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/count/appGameCount/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
