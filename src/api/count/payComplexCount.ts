import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import type { PayComplexCount, PayComplexCountParams } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pagePayComplexCount(params?:PayComplexCountParams) {
  const res = await request.Post<ApiResult<PageResult<PayComplexCount>>>('/count/payComplexCount/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pagePayDiamondComplexCount(params?:PayComplexCountParams) {
  const res = await request.Post<ApiResult<PageResult<PayComplexCount>>>('/count/payDiamondComplexCount/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 详情列表
export async function pagePayComplexCountInfo(params?:PayComplexCountParams) {
  const res = await request.Post<ApiResult<PageResult<PayComplexCount>>>('/count/payComplexCount/channelList',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
