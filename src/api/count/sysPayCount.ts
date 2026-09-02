import request from '@/utils/request';
import type { SysPayCount,SysPayCountParams } from './model';
import { ApiResult, PageResult } from '../model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageSysPayCounts(params?:SysPayCountParams) {
  const res = await request.Post<ApiResult<PageResult<SysPayCount>>>('/sysPayCount/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 详情
export async function infoSysPayCounts(id?:number) {
  const res = await request.Post<ApiResult<SysPayCount>>('/sysPayCount/getById'+id);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addSysPayCount(data: SysPayCount) {
  const res = await request.Post<ApiResult<SysPayCount>>('/sysPayCount', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateSysPayCount(data: SysPayCount) {
  const res = await request.Put<ApiResult<SysPayCount>>('/sysPayCount', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeSysPayCount(id:number) {
  const res = await request.Delete<ApiResult<SysPayCount>>('/sysPayCount/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeSysPayCounts(ids) {
  const res = await request.Post<ApiResult<SysPayCount>>('/sysPayCount/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

