import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { FloatWindow, FloatWindowParam } from './model/floatWindow';

/**
 * 分页查询
 */
export async function pageFloatWindows(params: FloatWindowParam) {
  const res = await request.Post<ApiResult<PageResult<FloatWindow>>>('/floatWindow/pageList', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addFloatWindow(data: FloatWindow) {
  const res = await request.Post<ApiResult<unknown>>('/floatWindow', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateFloatWindow(data: FloatWindow) {
  const res = await request.Put<ApiResult<unknown>>('/floatWindow', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 重载悬浮窗缓存
 */
export async function reloadFloatWindow() {
  const res = await request.Post<ApiResult<unknown>>('/floatWindow/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 */
export async function removeFloatWindow(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/floatWindow/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
