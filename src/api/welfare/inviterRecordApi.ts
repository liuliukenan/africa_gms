import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserInviterRecord, UserInviterRecordParam } from "./model/inviterRecord";

/**
* 分页查询
*/
export async function pageUserInviterRecords(params: UserInviterRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserInviterRecord>>>(
    "/act/userInviterRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserInviterRecord(params?: UserInviterRecordParam) {
    const res = await request.Post<ApiResult<UserInviterRecord[]>>("/act/userInviterRecord/exportList",
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
export async function getUserInviterRecord(id: number) {
    const res = await request.Get<ApiResult<UserInviterRecord>>("/act/userInviterRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserInviterRecord(data: UserInviterRecord) {
    const res = await request.Post<ApiResult<unknown>>("/act/userInviterRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserInviterRecord(data: UserInviterRecord) {
    const res = await request.Put<ApiResult<unknown>>("/act/userInviterRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserInviterRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/userInviterRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserInviterRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/userInviterRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
