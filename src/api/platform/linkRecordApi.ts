import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { LinkRecord, LinkRecordParam } from "@/api/model/linkRecord";

/**
* 分页查询
*/
export async function pageLinkRecords(params: LinkRecordParam) {
const res = await request.Post<ApiResult<PageResult<LinkRecord>>>(
    "/linkRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listLinkRecord(params?: LinkRecordParam) {
    const res = await request.Post<ApiResult<LinkRecord[]>>("/linkRecord/exportList",
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
export async function getLinkRecord(id: number) {
    const res = await request.Get<ApiResult<LinkRecord>>("/linkRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addLinkRecord(data: LinkRecord) {
    const res = await request.Post<ApiResult<unknown>>("/linkRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateLinkRecord(data: LinkRecord) {
    const res = await request.Put<ApiResult<unknown>>("/linkRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeLinkRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/linkRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeLinkRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/linkRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
