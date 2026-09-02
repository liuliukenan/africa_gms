import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { VipLevel, VipLevelParam } from "@/api/model/vipLevel";

/**
* 分页查询
*/
export async function pageVipLevels(params: VipLevelParam) {
const res = await request.Post<ApiResult<PageResult<VipLevel>>>(
    "/vipLevel/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listVipLevel(params?: VipLevelParam) {
    const res = await request.Post<ApiResult<VipLevel[]>>("/vipLevel/exportList",
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
export async function getVipLevel(id: number) {
    const res = await request.Get<ApiResult<VipLevel>>("/vipLevel/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addVipLevel(data: VipLevel) {
    const res = await request.Post<ApiResult<unknown>>("/vipLevel", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateVipLevel(data: VipLevel) {
    const res = await request.Put<ApiResult<unknown>>("/vipLevel", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeVipLevel(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/vipLevel/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeVipLevels(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/vipLevel/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
