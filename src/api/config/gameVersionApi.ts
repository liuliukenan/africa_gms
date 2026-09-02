import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { GameVersion, GameVersionParam } from "@/api/model/gameVersion";

/**
* 分页查询
*/
export async function pageGameVersions(params: GameVersionParam) {
const res = await request.Post<ApiResult<PageResult<GameVersion>>>(
    "/gameVersion/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGameVersion(params?: GameVersionParam) {
    const res = await request.Post<ApiResult<GameVersion[]>>("/gameVersion/exportList",
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
export async function getGameVersion(id: number) {
    const res = await request.Get<ApiResult<GameVersion>>("/gameVersion/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGameVersion(data: GameVersion) {
    const res = await request.Post<ApiResult<unknown>>("/gameVersion", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGameVersion(data: GameVersion) {
    const res = await request.Put<ApiResult<unknown>>("/gameVersion", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGameVersion(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/gameVersion/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGameVersions(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/gameVersion/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
