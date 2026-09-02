import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { JumpAction, JumpActionParam } from "./model/jumpAction";

/**
* 分页查询
*/
export async function pageJumpActions(params: JumpActionParam) {
const res = await request.Post<ApiResult<PageResult<JumpAction>>>(
    "/jumpAction/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/jumpAction/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listJumpAction(params?: JumpActionParam) {
    const res = await request.Post<ApiResult<JumpAction[]>>("/jumpAction/exportList",
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
export async function getJumpAction(id: number) {
    const res = await request.Get<ApiResult<JumpAction>>("/jumpAction/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addJumpAction(data: JumpAction) {
    const res = await request.Post<ApiResult<unknown>>("/jumpAction", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateJumpAction(data: JumpAction) {
    const res = await request.Put<ApiResult<unknown>>("/jumpAction", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeJumpAction(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/jumpAction/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeJumpActions(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/jumpAction/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
