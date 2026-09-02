import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserParterCount, UserParterCountParam } from "./model/parterCount";

/**
* 分页查询
*/
export async function pageUserParterCounts(params: UserParterCountParam) {
const res = await request.Post<ApiResult<PageResult<UserParterCount>>>(
    "/act/userParterCount/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserParterCount(params?: UserParterCountParam) {
    const res = await request.Post<ApiResult<UserParterCount[]>>("/act/userParterCount/exportList",
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
export async function getUserParterCount(id: number) {
    const res = await request.Get<ApiResult<UserParterCount>>("/act/userParterCount/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserParterCount(data: UserParterCount) {
    const res = await request.Post<ApiResult<unknown>>("/act/userParterCount", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserParterCount(data: UserParterCount) {
    const res = await request.Put<ApiResult<unknown>>("/act/userParterCount", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserParterCount(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/userParterCount/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserParterCounts(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/userParterCount/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
