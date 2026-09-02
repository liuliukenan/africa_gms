import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Vip, VipParam } from "@/api/model/vip";

/**
* 分页查询
*/
export async function pageVips(params: VipParam) {
const res = await request.Post<ApiResult<PageResult<Vip>>>(
    "/vip/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listVip(params?: VipParam) {
    const res = await request.Post<ApiResult<Vip[]>>("/vip/exportList",
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
export async function getVip(id: number) {
    const res = await request.Get<ApiResult<Vip>>("/vip/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addVip(data: Vip) {
    const res = await request.Post<ApiResult<unknown>>("/vip", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateVip(data: Vip) {
    const res = await request.Put<ApiResult<unknown>>("/vip", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeVip(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/vip/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeVips(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/vip/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
