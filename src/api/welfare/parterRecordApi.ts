import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserParterRecord, UserParterRecordParam } from "./model/parterRecord";

/**
* 分页查询
*/
export async function pageUserParterRecords(params: UserParterRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserParterRecord>>>(
    "/act/userParterRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserParterRecord(params?: UserParterRecordParam) {
    const res = await request.Post<ApiResult<UserParterRecord[]>>("/act/userParterRecord/exportList",
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
export async function getUserParterRecord(id: number) {
    const res = await request.Get<ApiResult<UserParterRecord>>("/act/userParterRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserParterRecord(data: UserParterRecord) {
    const res = await request.Post<ApiResult<unknown>>("/act/userParterRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserParterRecord(data: UserParterRecord) {
    const res = await request.Put<ApiResult<unknown>>("/act/userParterRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserParterRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/userParterRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserParterRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/userParterRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
