import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { GameGroup, GameGroupParam } from "@/api/model/gameGroup";

/**
* 分页查询
*/
export async function pageGameGroups(params: GameGroupParam) {
const res = await request.Post<ApiResult<PageResult<GameGroup>>>(
    "/gameGroup/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGameGroup(params?: GameGroupParam) {
    const res = await request.Post<ApiResult<GameGroup[]>>("/gameGroup/exportList",
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
export async function getGameGroup(id: number) {
    const res = await request.Get<ApiResult<GameGroup>>("/gameGroup/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGameGroup(data: GameGroup) {
    const res = await request.Post<ApiResult<unknown>>("/gameGroup", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGameGroup(data: GameGroup) {
    const res = await request.Put<ApiResult<unknown>>("/gameGroup", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGameGroup(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/gameGroup/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGameGroups(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/gameGroup/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
