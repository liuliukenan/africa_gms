import request from '@/utils/request';
import type { GameChannels } from '../model';
import { ApiResult, PageResult } from '@/api/model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageGameChannels(params?: GameChannels) {
  const res = await request.Post<ApiResult<PageResult<GameChannels>>>('/gameChannel/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
export async function addGameChannels(data: GameChannels) {
  const res = await request.Post<ApiResult<unknown>>('/gameChannel', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
export async function updateGameChannels(data: GameChannels) {
  const res = await request.Put<ApiResult<unknown>>('/gameChannel', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
export async function removeGameChannels(id: number) {
  const res = await request.Delete<ApiResult<unknown>>('/gameChannel/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
