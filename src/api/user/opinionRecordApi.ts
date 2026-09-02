import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { OpinionRecord, OpinionRecordParam } from '@/api/model/opinionRecord';

/**
 * 分页查询
 */
export async function pageOpinionRecords(params: OpinionRecordParam) {
  const res = await request.Post<ApiResult<PageResult<OpinionRecord>>>('/opinionRecord/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listOpinionRecord(params?: OpinionRecordParam) {
  const res = await request.Post<ApiResult<OpinionRecord[]>>('/opinionRecord/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getOpinionRecord(id: number) {
  const res = await request.Get<ApiResult<OpinionRecord>>('/opinionRecord/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addOpinionRecord(data: OpinionRecord) {
  const res = await request.Post<ApiResult<unknown>>('/opinionRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateOpinionRecord(data: OpinionRecord) {
  const res = await request.Put<ApiResult<unknown>>('/opinionRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeOpinionRecord(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/opinionRecord/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeOpinionRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/opinionRecord/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
