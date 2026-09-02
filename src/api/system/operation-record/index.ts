import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { OperationRecord, OperationRecordParam } from './model';

/**
 * 分页查询操作日志
 */
export async function pageOperationRecords(params: OperationRecordParam) {
  const res = await request.Post<ApiResult<PageResult<OperationRecord>>>('/adminRecord/list', params);
  console.log(99,res);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询操作日志列表
 */
export async function listOperationRecords(params?: OperationRecordParam) {
  const res = await request.Get<ApiResult<OperationRecord[]>>('/system/operation-record', { params });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
export async function exportExcel(params?: any) { 
  const res = await request.Post<ApiResult<any[]>>("/adminRecord/exportExcel", params, { responseType: 'blob' });
  console.log(100,res);
  // if (res.code === 0 && res.data) {
   return res.data;
  // }
  // return await request.Post<ApiResult<unknown>>('/mutiLang/exportExcel', params, { responseType: 'blob' });
  
  return Promise.reject(new Error('请求失败'));
}
// export async function exportExcel(params?: any) {
//   return await request.Post<ApiResult<unknown>>('/adminRecord/exportExcel', params, { responseType: 'blob' });
// }