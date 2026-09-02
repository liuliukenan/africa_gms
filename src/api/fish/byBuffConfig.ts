import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import { ByBuffConfig } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByBuffConfigs(params?:ByBuffConfig) {
  const res = await request.Post<ApiResult<PageResult<ByBuffConfig>>>('/fish/byBuffConfig/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addByBuffConfig(data:ByBuffConfig) {
  const res = await request.Post<ApiResult<ByBuffConfig>>('/fish/byBuffConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateByBuffConfig(data:ByBuffConfig) {
  const res = await request.Put<ApiResult<ByBuffConfig>>('/fish/byBuffConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeByBuffConfig(id:number) {
  const res = await request.Delete<ApiResult<ByBuffConfig>>('/fish/byBuffConfig/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeByBuffConfigs(ids:number[]) {
  const res = await request.Post<ApiResult<ByBuffConfig>>('/fish/byBuffConfig/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
