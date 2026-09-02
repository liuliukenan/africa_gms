import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { RecallConfigVO, RecallTaskVO, RecallTaskQuery } from './model/userRecall';

export async function getRecallConfig(countryCode: number) {
  const res = await request.Get<ApiResult<RecallConfigVO>>('/recall/config/' + `${countryCode}`);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function saveRecallConfig(data: RecallConfigVO) {
  const res = await request.Put<ApiResult<unknown>>('/recall/config', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 分页查询用户召回记录 */
export async function pageRecallRecord(params: RecallTaskQuery) {
  const res = await request.Post<ApiResult<PageResult<RecallTaskVO>>>('/recall/task/list', params);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出用户召回记录 */
export async function exportRecallRecord(params: RecallTaskQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<RecallTaskVO>>>('/recall/task/list', params, {
   headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/** 重载召回配置到服务器 */
export async function reloadRecall() {
  const res = await request.Post<ApiResult<unknown>>('/recall/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
