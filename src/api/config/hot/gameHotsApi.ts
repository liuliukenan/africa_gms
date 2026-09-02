import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { GameHots, GameHotsParam } from "@/api/config/model/gameHots";

/**
* 分页查询
*/
export async function pageGameHotss(params: GameHotsParam) {
const res = await request.Post<ApiResult<PageResult<GameHots>>>(
    "/gameHots/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGameHots(params?: GameHotsParam) {
    const res = await request.Post<ApiResult<GameHots[]>>("/gameHots/exportList",
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
export async function getGameHots(id: number) {
    const res = await request.Get<ApiResult<GameHots>>("/gameHots/getById/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGameHots(data: GameHots) {
    const res = await request.Post<ApiResult<unknown>>("/gameHots", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

export async function sendGameHotsToServer() {
  const res = await request.Get<ApiResult<unknown>>('/gameHots/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGameHots(data: GameHots) {
    const res = await request.Put<ApiResult<unknown>>("/gameHots", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGameHots(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/gameHots/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGameHotss(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/gameHots/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
