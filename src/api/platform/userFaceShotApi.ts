import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserFaceShot, UserFaceShotParam } from "./model/userFaceShot";

/**
* 分页查询
*/
export async function pageUserFaceShots(params: UserFaceShotParam) {
const res = await request.Post<ApiResult<PageResult<UserFaceShot>>>(
    "/userFaceShot/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserFaceShot(params?: UserFaceShotParam) {
    const res = await request.Post<ApiResult<UserFaceShot[]>>("/userFaceShot/exportList",
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
export async function getUserFaceShot(id: number) {
    const res = await request.Get<ApiResult<UserFaceShot>>("/userFaceShot/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserFaceShot(data: UserFaceShot) {
    const res = await request.Post<ApiResult<unknown>>("/userFaceShot", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserFaceShot(data: UserFaceShot) {
    const res = await request.Put<ApiResult<unknown>>("/userFaceShot", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserFaceShot(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userFaceShot/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserFaceShots(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/userFaceShot/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
