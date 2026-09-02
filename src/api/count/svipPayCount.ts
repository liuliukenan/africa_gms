import request from '@/utils/request';
import type { SvipPayCount ,SvipPayCountParams} from './model';
import { ApiResult, PageResult } from '../model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageSvipPayCounts(params?:SvipPayCountParams) {
  const res = await request.Post<ApiResult<PageResult<SvipPayCount>>>('/svipPayCount/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addSvipPayCount(data: SvipPayCount) {
  const res = await request.Post<ApiResult<SvipPayCount>>('/svipPayCount', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateSvipPayCount(data: SvipPayCount) {
  const res = await request.Put<ApiResult<SvipPayCount>>('/svipPayCount', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeSvipPayCount(id:number) {
  const res = await request.Delete<ApiResult<SvipPayCount>>('/svipPayCount/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeSvipPayCounts(ids) {
  const res = await request.Post<ApiResult<SvipPayCount>>('/svipPayCount/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
