import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { PayItem, PayItemParam } from "./model/payItem";

/**
* 分页查询
*/
export async function pagePayItem(params: PayItemParam) {
const res = await request.Post<ApiResult<PageResult<PayItem>>>(
    "/payItem/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listPayItem(params?: PayItemParam) {
    const res = await request.Post<ApiResult<PayItem[]>>("/payItem/exportList",
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
export async function getPayItem(id: number) {
    const res = await request.Get<ApiResult<PayItem>>("/payItem/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addPayItem(data: PayItem) {
    const res = await request.Post<ApiResult<unknown>>("/payItem/create", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updatePayItem(data: PayItem) {
    const res = await request.Post<ApiResult<unknown>>("/payItem/update", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除
*/
export async function removePayItem(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/payItem/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
// export async function removePayItem(data: (number | undefined)[]) {
//   const res = await request.Delete<ApiResult<unknown>>('/payItem/batchDelete',
//     data
//  );
//   if (res.code === 0) {
//      return res.message;
//   }
//   return Promise.reject(new Error(res.message));
// }
