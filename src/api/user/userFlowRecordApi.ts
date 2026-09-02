import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserFlowRecord, UserFlowRecordParam } from "./model/userFlowRecord";

/**
* 分页查询
*/
export async function pageUserFlowRecords(params: UserFlowRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserFlowRecord>>>(
    "/userFlowRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出流水记录
*/
export async function exportUserFlowRecords(params: UserFlowRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<UserFlowRecord>>>(
    "/userFlowRecord/list",
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
export async function listUserFlowRecord(params?: UserFlowRecordParam) {
    const res = await request.Post<ApiResult<UserFlowRecord[]>>("/userFlowRecord/exportList",
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
export async function getUserFlowRecord(id: number) {
    const res = await request.Get<ApiResult<UserFlowRecord>>("/userFlowRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserFlowRecord(data: UserFlowRecord) {
    const res = await request.Post<ApiResult<unknown>>("/userFlowRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserFlowRecord(data: UserFlowRecord) {
    const res = await request.Put<ApiResult<unknown>>("/userFlowRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserFlowRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userFlowRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserFlowRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/userFlowRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
