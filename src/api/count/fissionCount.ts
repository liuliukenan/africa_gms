import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { FissionCard,Fission, FissionParams } from './model';

/**
 * 获取统计数据
 */
export async function getFissionCard(params?: FissionParams) {
  const res = await request.Post<ApiResult<FissionCard>>('/count/taskCount/viewList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function pageFissionCount(params?: FissionParams) {
  const res = await request.Post<ApiResult<PageResult<Fission>>>('/count/taskCount/list', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
