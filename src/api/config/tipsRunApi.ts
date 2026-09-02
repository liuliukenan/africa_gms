import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import {TipsRun, TipsRunParam} from "@/api/config/model/tipsRun";

/**
* 分页查询
*/
export async function pageTipsRuns(params: TipsRunParam) {
const res = await request.Post<ApiResult<PageResult<TipsRun>>>(
    "/tipsRun/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listTipsRun(params?: TipsRunParam) {
    const res = await request.Post<ApiResult<TipsRun[]>>("/tipsRun/exportList",
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
export async function getTipsRun(id: number) {
    const res = await request.Get<ApiResult<TipsRun>>("/tipsRun/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addTipsRun(data: TipsRun) {
    const res = await request.Post<ApiResult<unknown>>("/tipsRun", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateTipsRun(data: TipsRun) {
    const res = await request.Put<ApiResult<unknown>>("/tipsRun", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeTipsRun(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/tipsRun/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeTipsRuns(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/tipsRun/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function sendServer() {
  const res = await request.Post<ApiResult<unknown>>('/tipsRun/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
