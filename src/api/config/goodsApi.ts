import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { GoodsVO, GoodsParam } from './model/goods';

/**
 * 分页查询
 */
export async function pageGoods(params: GoodsParam) {
  const res = await request.Post<ApiResult<PageResult<GoodsVO>>>(
    '/goods/list',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function exportGoods(params: GoodsParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<GoodsVO>>>(
    '/goods/list',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addGoods(data: GoodsVO) {
  const res = await request.Post<ApiResult<unknown>>('/goods', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateGoods(data: GoodsVO) {
  const res = await request.Put<ApiResult<unknown>>('/goods/update', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 */
export async function removeGoods(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/goods/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
