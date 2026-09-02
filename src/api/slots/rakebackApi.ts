import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Rakeback, RakebackParam } from "@/api/model/rakeback";

/**
* 分页查询
*/
export async function pageRakebacks(params: RakebackParam) {
const res = await request.Post<ApiResult<PageResult<Rakeback>>>(
    "/rakeback/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listRakeback(params?: RakebackParam) {
    const res = await request.Post<ApiResult<Rakeback[]>>("/rakeback/exportList",
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
export async function getRakeback(id: number) {
    const res = await request.Get<ApiResult<Rakeback>>("/rakeback/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addRakeback(data: Rakeback) {
    const res = await request.Post<ApiResult<unknown>>("/rakeback", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateRakeback(data: Rakeback) {
    const res = await request.Put<ApiResult<unknown>>("/rakeback", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeRakeback(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/rakeback/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeRakebacks(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/rakeback/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
