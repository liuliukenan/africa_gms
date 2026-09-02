import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserFreeGame, UserFreeGameParam } from "./model/userFreeGame";

/**
* 分页查询
*/
export async function pageUserFreeGames(params: UserFreeGameParam) {
const res = await request.Post<ApiResult<PageResult<UserFreeGame>>>(
    "/userFreeGame/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserFreeGame(params?: UserFreeGameParam) {
    const res = await request.Post<ApiResult<UserFreeGame[]>>("/userFreeGame/exportList",
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
export async function getUserFreeGame(id: number) {
    const res = await request.Get<ApiResult<UserFreeGame>>("/userFreeGame/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserFreeGame(data: UserFreeGame) {
    const res = await request.Post<ApiResult<unknown>>("/userFreeGame", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserFreeGame(data: UserFreeGame) {
    const res = await request.Put<ApiResult<unknown>>("/userFreeGame", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserFreeGame(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userFreeGame/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserFreeGames(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/userFreeGame/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
