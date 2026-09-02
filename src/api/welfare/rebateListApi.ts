import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { RebateList, RebateListParam } from "./model/rebateList";

/**
* 分页查询
*/
export async function pageRebateLists(params: RebateListParam) {
const res = await request.Post<ApiResult<PageResult<RebateList>>>(
    "/act/userVipRebateRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listRebateList(params?: RebateListParam) {
    const res = await request.Post<ApiResult<RebateList[]>>("/act/userVipRebateRecord/exportList",
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
export async function getRebateList(id: number) {
    const res = await request.Get<ApiResult<RebateList>>("/act/userVipRebateRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addRebateList(data: RebateList) {
    const res = await request.Post<ApiResult<unknown>>("/act/userVipRebateRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateRebateList(data: RebateList) {
    const res = await request.Put<ApiResult<unknown>>("/act/userVipRebateRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeRebateList(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/userVipRebateRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeRebateLists(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/userVipRebateRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
