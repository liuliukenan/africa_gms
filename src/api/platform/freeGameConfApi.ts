import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { FreeGameConf, FreeGameConfParam } from "./model/freeGameConf";

/**
* 分页查询
*/
export async function pageFreeGameConfs(params: FreeGameConfParam) {
const res = await request.Post<ApiResult<PageResult<FreeGameConf>>>(
    "/freeGameConf/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/freeGameConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listFreeGameConf(params?: FreeGameConfParam) {
    const res = await request.Post<ApiResult<FreeGameConf[]>>("/freeGameConf/exportList",
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
export async function getFreeGameConf(id: number) {
    const res = await request.Get<ApiResult<FreeGameConf>>("/freeGameConf/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addFreeGameConf(data: FreeGameConf) {
    const res = await request.Post<ApiResult<unknown>>("/freeGameConf", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateFreeGameConf(data: FreeGameConf) {
    const res = await request.Put<ApiResult<unknown>>("/freeGameConf", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeFreeGameConf(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/freeGameConf/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeFreeGameConfs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/freeGameConf/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
