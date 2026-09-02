import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import {GameKeywords, GameKeywordsParam} from "@/api/config/model/gameKeywords";

/**
* 分页查询
*/
export async function pageGameKeywordss(params: GameKeywordsParam) {
const res = await request.Post<ApiResult<PageResult<GameKeywords>>>(
    "/gameKeywords/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGameKeywords(params?: GameKeywordsParam) {
    const res = await request.Post<ApiResult<GameKeywords[]>>("/gameKeywords/exportList",
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
export async function getGameKeywords(id: number) {
    const res = await request.Get<ApiResult<GameKeywords>>("/gameKeywords/getById/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGameKeywords(data: GameKeywords) {
    const res = await request.Post<ApiResult<unknown>>("/gameKeywords", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGameKeywords(data: GameKeywords) {
    const res = await request.Put<ApiResult<unknown>>("/gameKeywords", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGameKeywords(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/gameKeywords/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGameKeywordss(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/gameKeywords/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function sendServerToReload() {
  const res = await request.Get<ApiResult<unknown>>('/gameKeywords/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
