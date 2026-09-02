import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import {GameSearchRecord, GameSearchRecordParam} from "@/api/config/model/gameSearchRecord";

/**
* 分页查询
*/
export async function pageGameSearchRecords(params: GameSearchRecordParam) {
const res = await request.Post<ApiResult<PageResult<GameSearchRecord>>>(
    "/gameSearchRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGameSearchRecord(params?: GameSearchRecordParam) {
    const res = await request.Post<ApiResult<GameSearchRecord[]>>("/gameSearchRecord/exportList",
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
export async function getGameSearchRecord(id: number) {
    const res = await request.Get<ApiResult<GameSearchRecord>>("/gameSearchRecord/getById/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGameSearchRecord(data: GameSearchRecord) {
    const res = await request.Post<ApiResult<unknown>>("/gameSearchRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGameSearchRecord(data: GameSearchRecord) {
    const res = await request.Put<ApiResult<unknown>>("/gameSearchRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGameSearchRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/gameSearchRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGameSearchRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/gameSearchRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
