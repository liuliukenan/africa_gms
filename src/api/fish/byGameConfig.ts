import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import { ByGameConfig } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByGameConfigs(params?:ByGameConfig) {
  const res = await request.Post<ApiResult<PageResult<ByGameConfig>>>('/fish/byGameConfig/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addByGameConfig(data:ByGameConfig) {
  const res = await request.Post<ApiResult<ByGameConfig>>('/fish/byGameConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateByGameConfig(data:ByGameConfig) {
  const res = await request.Put<ApiResult<ByGameConfig>>('/fish/byGameConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeByGameConfig(id:number) {
  const res = await request.Delete<ApiResult<ByGameConfig>>('/fish/byGameConfig/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeByGameConfigs(ids:number[]) {
  const res = await request.Post<ApiResult<ByGameConfig>>('/fish/byGameConfig/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}