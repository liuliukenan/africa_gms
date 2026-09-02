import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { MailLimit, MailLimitParam } from "@/api/model/mailLimit";

/**
* 分页查询
*/
export async function pageMailLimits(params: MailLimitParam) {
const res = await request.Post<ApiResult<PageResult<MailLimit>>>(
    "/mailLimit/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listMailLimit(params?: MailLimitParam) {
    const res = await request.Post<ApiResult<MailLimit[]>>("/mailLimit/exportList",
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
export async function getMailLimit(id: number) {
    const res = await request.Get<ApiResult<MailLimit>>("/mailLimit/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addMailLimit(data: MailLimit) {
    const res = await request.Post<ApiResult<unknown>>("/mailLimit", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateMailLimit(data: MailLimit) {
    const res = await request.Put<ApiResult<unknown>>("/mailLimit", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeMailLimit(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/mailLimit/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeMailLimits(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/mailLimit/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
