import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import { ByWaterPool } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByWaterPools(params?:ByWaterPool) {
  const res = await request.Post<ApiResult<PageResult<ByWaterPool>>>('/fish/byWaterPool/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addByWaterPool(data:ByWaterPool) {
  const res = await request.Post<ApiResult<ByWaterPool>>('/fish/byWaterPool', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateByWaterPool(data:ByWaterPool) {
  const res = await request.Put<ApiResult<ByWaterPool>>('/fish/byWaterPool', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id id
 */
export async function removeByWaterPool(id:number) {
  const res = await request.Delete<ApiResult<ByWaterPool>>('/fish/byWaterPool/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeByWaterPools(ids:number[]) {
  const res = await request.Post<ApiResult<ByWaterPool>>('/fish/byWaterPool/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}