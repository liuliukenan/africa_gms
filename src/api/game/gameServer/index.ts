import request from '@/utils/request';
import type { GameServer } from '../model';
import { ApiResult, PageResult } from '@/api/model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageGameServers(params?: GameServer) {
  const res = await request.Post<ApiResult<PageResult<GameServer>>>('/gameServer/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function addGameServer(data: GameServer) {
  const res = await request.Post<ApiResult<unknown>>('/gameServer', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function updateGameServer(data: GameServer) {
  const res = await request.Put<ApiResult<unknown>>('/gameServer', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function removeGameServer(id: number) {
  const res = await request.Delete<ApiResult<unknown>>('/gameServer/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
