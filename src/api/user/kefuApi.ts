import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Kefu, KefuParam } from "@/api/model/kefu";

/**
* 分页查询
*/
export async function pageKefus(params: KefuParam) {
const res = await request.Post<ApiResult<PageResult<Kefu>>>(
    "/kefu/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listKefu(params?: KefuParam) {
    const res = await request.Post<ApiResult<Kefu[]>>("/kefu/exportList",
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
export async function getKefu(id: number) {
    const res = await request.Get<ApiResult<Kefu>>("/kefu/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addKefu(data: Kefu) {
    const res = await request.Post<ApiResult<unknown>>("/kefu", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateKefu(data: Kefu) {
    const res = await request.Put<ApiResult<unknown>>("/kefu", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeKefu(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/kefu/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeKefus(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/kefu/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
