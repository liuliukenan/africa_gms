import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { Dictionary, DictionaryParam } from './model';

/**
 * 分页查询字典列表
 */
export async function pageDictionaries(params: DictionaryParam) {
  const res = await request.Get<ApiResult<Dictionary[]>>(
    '/dictType',
    { params }
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询字典列表
 */
export async function listDictionaries(params?: DictionaryParam) {
  const res = await request.Get<ApiResult<Dictionary[]>>('/dictType', {
    params
  });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加字典
 */
export async function addDictionary(data: Dictionary) {
  const res = await request.Post<ApiResult<unknown>>(
    '/dictType',
    data
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改字典
 */
export async function updateDictionary(data: Dictionary) {
  const res = await request.Put<ApiResult<unknown>>('/dictType', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除字典
 */
export async function removeDictionary(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>(
    '/dictType/' + id
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
