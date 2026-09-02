import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserWalletRecord, UserWalletRecordParam } from "./model/userWalletRecord";

/**
* 分页查询
*/
export async function pageUserWalletRecords(params: UserWalletRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserWalletRecord>>>(
    "/userWalletRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出用户钱包记录
*/
export async function exportUserWalletRecords(params: UserWalletRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<UserWalletRecord>>>(
    "/userWalletRecord/list",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listUserWalletRecord(params?: UserWalletRecordParam) {
    const res = await request.Post<ApiResult<UserWalletRecord[]>>("/userWalletRecord/exportList",
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
export async function getUserWalletRecord(id: number) {
    const res = await request.Get<ApiResult<UserWalletRecord>>("/userWalletRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserWalletRecord(data: UserWalletRecord) {
    const res = await request.Post<ApiResult<unknown>>("/userWalletRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserWalletRecord(data: UserWalletRecord) {
    const res = await request.Put<ApiResult<unknown>>("/userWalletRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserWalletRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userWalletRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserWalletRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/userWalletRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
