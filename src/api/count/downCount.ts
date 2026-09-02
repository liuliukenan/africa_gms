import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import { DownCount, DownCountParams } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageDownCounts(params:DownCountParams) {
  const res = await request.Post<ApiResult<PageResult<DownCount>>>('/count/downCount/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加下载统计
 * @param data
 */
export async function addDownCount(data:DownCount) {
  const res = await request.Post<ApiResult<DownCount>>('/count/downCount', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改下载统计
 * @param data
 */
export async function updateDownCount(data:DownCount) {
  const res = await request.Put<ApiResult<DownCount>>('/count/downCount', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除下载统计
 * @param id 角色id
 */
export async function removeDownCount(id:number) {
  const res = await request.Delete<ApiResult<DownCount>>('/count/downCount/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeDownCounts(ids:number[]) {
  const res = await request.Post<ApiResult<DownCount>>('/count/downCount/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
