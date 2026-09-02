import request from '@/utils/request';
import type { WithdrawCount, WithdrawCountParams } from './model';
import { ApiResult, PageResult } from '../model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageWithdrawCount(params?: WithdrawCountParams) {
  const res = await request.Post<ApiResult<PageResult<WithdrawCount>>>('/count/withdrawComplexCount/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageWithdrawDiamondCount(params?: WithdrawCountParams) {
  const res = await request.Post<ApiResult<PageResult<WithdrawCount>>>('/count/withdrawDiamondComplexCount/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
