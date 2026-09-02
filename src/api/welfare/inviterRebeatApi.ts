import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserInviterRebeat, UserInviterRebeatParam } from "./model/inviterRebeat";

/**
* 分页查询
*/
export async function pageUserInviterRebeats(params: UserInviterRebeatParam) {
const res = await request.Post<ApiResult<PageResult<UserInviterRebeat>>>(
    "/act/userInviterRebeat/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserInviterRebeat(params?: UserInviterRebeatParam) {
    const res = await request.Post<ApiResult<UserInviterRebeat[]>>("/act/userInviterRebeat/exportList",
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
export async function getUserInviterRebeat(id: number) {
    const res = await request.Get<ApiResult<UserInviterRebeat>>("/act/userInviterRebeat/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserInviterRebeat(data: UserInviterRebeat) {
    const res = await request.Post<ApiResult<unknown>>("/act/userInviterRebeat", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserInviterRebeat(data: UserInviterRebeat) {
    const res = await request.Put<ApiResult<unknown>>("/act/userInviterRebeat", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserInviterRebeat(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/userInviterRebeat/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserInviterRebeats(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/userInviterRebeat/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
