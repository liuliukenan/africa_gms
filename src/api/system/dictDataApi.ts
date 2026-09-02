import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { DictionaryData } from '@/api/model/dictdata';

export async function listById(id: number) {
  const res = await request.Get<ApiResult<DictionaryData[]>>(
    '/dictData/listByDictId/' + id
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询字典数据列表
 * @param params 查询条件
 */
export async function listByCode(code: string) {
  const res = await request.Get<ApiResult<DictionaryData[]>>(
    '/dictData/listByCode/' + code
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加字典数据
 */
export async function addDictionaryData(data: DictionaryData) {
  const res = await request.Post<ApiResult<unknown>>('/dictData', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改字典数据
 */
export async function updateDictionaryData(data: DictionaryData) {
  const res = await request.Put<ApiResult<unknown>>('/dictData', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除字典数据
 */
export async function removeDictionaryData(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/dictData/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除字典数据
 */
export async function removeDictionaryDataBatch(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>(
    '/dictData/deleteBatch',
    data
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
