import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import type { ComplexCount, ComplexCountParams } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageComplexCount(params?:ComplexCountParams) {
  const res = await request.Post<ApiResult<PageResult<ComplexCount>>>('/count/complexCount/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 详情列表
export async function pageComplexCountInfo(params?:ComplexCountParams) {
  const res = await request.Post<ApiResult<PageResult<ComplexCount>>>('/count/complexCount/channelList',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}