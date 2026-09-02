import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import { ByRtpConfig } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByRtpConfigs(params?:ByRtpConfig) {
  const res = await request.Post<ApiResult<PageResult<ByRtpConfig>>>('/fish/byRtpConfig/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addByRtpConfig(data:ByRtpConfig) {
  const res = await request.Post<ApiResult<ByRtpConfig>>('/fish/byRtpConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateByRtpConfig(data:ByRtpConfig) {
  const res = await request.Put<ApiResult<ByRtpConfig>>('/fish/byRtpConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id id
 */
export async function removeByRtpConfig(id:number) {
  const res = await request.Delete<ApiResult<ByRtpConfig>>('/fish/byRtpConfig/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeByRtpConfigs(ids:number[]) {
  const res = await request.Post<ApiResult<ByRtpConfig>>('/fish/byRtpConfig/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}