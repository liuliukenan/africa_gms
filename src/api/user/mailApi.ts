import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Mail, MailParam } from "@/api/model/mail";

/**
* 分页查询
*/
export async function pageMails(params: MailParam) {
const res = await request.Post<ApiResult<PageResult<Mail>>>(
    "/mail/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listMail(params?: MailParam) {
    const res = await request.Post<ApiResult<Mail[]>>("/mail/exportList",
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
export async function getMail(id: number) {
    const res = await request.Get<ApiResult<Mail>>("/mail/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 退回
export async function backMail(id: number) {
    const res = await request.Get<ApiResult<unknown>>("/mail/backMail/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addMail(data: Mail) {
    const res = await request.Post<ApiResult<unknown>>("/mail", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateMail(data: Mail) {
    const res = await request.Put<ApiResult<unknown>>("/mail", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeMail(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/mail/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeMails(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/mail/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
