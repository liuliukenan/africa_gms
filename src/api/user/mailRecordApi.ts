import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { MailRecord, MailRecordParam } from "@/api/model/mailRecord";

/**
* 分页查询
*/
export async function pageMailRecords(params: MailRecordParam) {
const res = await request.Post<ApiResult<PageResult<MailRecord>>>(
    "/mailRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listMailRecord(params?: MailRecordParam) {
    const res = await request.Post<ApiResult<MailRecord[]>>("/mailRecord/exportList",
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
export async function getMailRecord(id: number) {
    const res = await request.Get<ApiResult<MailRecord>>("/mailRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addMailRecord(data: MailRecord) {
    const res = await request.Post<ApiResult<unknown>>("/mailRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateMailRecord(data: MailRecord) {
    const res = await request.Put<ApiResult<unknown>>("/mailRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeMailRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/mailRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeMailRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/mailRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
