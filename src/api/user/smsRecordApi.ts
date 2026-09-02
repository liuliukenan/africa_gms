import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { SmsRecord, SmsRecordParam } from "@/api/model/smsRecord";

/**
* 分页查询
*/
export async function pageSmsRecords(params: SmsRecordParam) {
const res = await request.Post<ApiResult<PageResult<SmsRecord>>>(
    "/smsRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出（异步任务模式）
*/
export async function exportSmsRecords(params: SmsRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<SmsRecord>>>(
    "/smsRecord/list",
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
export async function listSmsRecord(params?: SmsRecordParam) {
    const res = await request.Post<ApiResult<SmsRecord[]>>("/smsRecord/exportList",
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
export async function getSmsRecord(id: number) {
    const res = await request.Get<ApiResult<SmsRecord>>("/smsRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addSmsRecord(data: SmsRecord) {
    const res = await request.Post<ApiResult<unknown>>("/smsRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateSmsRecord(data: SmsRecord) {
    const res = await request.Put<ApiResult<unknown>>("/smsRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeSmsRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/smsRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeSmsRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/smsRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
