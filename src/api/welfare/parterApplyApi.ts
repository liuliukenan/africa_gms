import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ApplyParam, ParterApply, ParterApplyParam } from "./model/parterApply";

/**
* 分页查询
*/
export async function pageParterApplys(params: ParterApplyParam) {
const res = await request.Post<ApiResult<PageResult<ParterApply>>>(
    "/act/userParterApply/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listParterApply(params?: ParterApplyParam) {
    const res = await request.Post<ApiResult<ParterApply[]>>("/act/userParterApply/exportList",
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
export async function getParterApply(id: number) {
    const res = await request.Get<ApiResult<ParterApply>>("/act/userParterApply/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addParterApply(data: ParterApply) {
    const res = await request.Post<ApiResult<unknown>>("/act/userParterApply", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 审核
export async function auditParterApply(data: ApplyParam) {
    const res = await request.Post<ApiResult<unknown>>("/act/userParterApply/admit", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateParterApply(data: ParterApply) {
    const res = await request.Put<ApiResult<unknown>>("/act/userParterApply", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeParterApply(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/userParterApply/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeParterApplys(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/userParterApply/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
