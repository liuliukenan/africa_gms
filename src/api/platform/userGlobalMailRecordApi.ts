import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserGlobalMailRecord, UserGlobalMailRecordParam } from "@/api/model/userGlobalMailRecord";

/**
* 分页查询
*/
export async function pageUserGlobalMailRecords(params: UserGlobalMailRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserGlobalMailRecord>>>(
    "/userGlobalMailRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserGlobalMailRecord(params?: UserGlobalMailRecordParam) {
    const res = await request.Post<ApiResult<UserGlobalMailRecord[]>>("/userGlobalMailRecord/exportList",
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
export async function getUserGlobalMailRecord(id: number) {
    const res = await request.Get<ApiResult<UserGlobalMailRecord>>("/userGlobalMailRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserGlobalMailRecord(data: UserGlobalMailRecord) {
    const res = await request.Post<ApiResult<unknown>>("/userGlobalMailRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserGlobalMailRecord(data: UserGlobalMailRecord) {
    const res = await request.Put<ApiResult<unknown>>("/userGlobalMailRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserGlobalMailRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userGlobalMailRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserGlobalMailRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/userGlobalMailRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
