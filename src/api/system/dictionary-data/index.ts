import request from '@/utils/request';
import type { ApiResult ,PageResult} from '@/api/model';
import type { DictionaryData, DictionaryDataParam } from './model';

/**
 * 分页查询字典数据
 */
export async function pageDictionaryData(params: DictionaryDataParam) {
  const res = await request.Get<ApiResult<PageResult<DictionaryData>>>(
    '/dictData/page',
    { params }
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询字典数据列表
 */
export async function listDictionaryData(params: DictionaryDataParam) {
  const res = await request.Get<ApiResult<DictionaryData[]>>(
    '/dictData',
    { params }
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
export async function listByCodeString(code:string|number) {
  const res = await request.Get<ApiResult<DictionaryData[]>>('/dictData/listByCode/' + code);
  if (res.code === 0) {
    return res.data?.map((d) => {
      return {
        value: d.dictDataCode,
        label: d.dictDataName,
        color: d.dictDataColor
      };
    });
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 查询字典数据列表
 */
export async function listByDictId(dictId: string|number) {
  const res = await request.Get<ApiResult<DictionaryData[]>>(
    '/dictData/listByDictId/'+dictId,
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
  const res = await request.Post<ApiResult<unknown>>(
    '/dictData',
    data
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改字典数据
 */
export async function updateDictionaryData(data: DictionaryData) {
  const res = await request.Put<ApiResult<unknown>>(
    '/dictData',
    data
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除字典数据
 */
export async function removeDictionaryData(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>(
    '/dictData/' + id
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除字典数据
 */
export async function removeDictionaryDataBatch(data: (number | undefined)[]) {
  const res = await request.Post<ApiResult<unknown>>(
    '/dictData/deleteBatch',
    data 
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
