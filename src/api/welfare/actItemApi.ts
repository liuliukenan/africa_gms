import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { ActItemVO, ActItemParam } from './model/actItem';

/** 分页查询活动列表 */
export async function pageActItem(params: ActItemParam) {
  const res = await request.Post<ApiResult<PageResult<ActItemVO>>>(
    '/act/actItem/list',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出活动列表 */
export async function exportActItem(params: ActItemParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ActItemVO>>>(
    '/act/actItem/list',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
