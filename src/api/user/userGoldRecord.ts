import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { UserGoldRecord, UserGoldRecordParam } from '../model/userGoldRecord';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageUserGoldRecords(params?:UserGoldRecordParam) {
  const res = await request.Post<ApiResult<PageResult<UserGoldRecord>>>('/userGoldRecord/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加用户金币
 * @param data
 */
export async function addUserGoldRecord(data:UserGoldRecord) {
  const res = await request.Post<ApiResult<unknown>>('/userGoldRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改用户金币
 * @param data
 */
export async function updateUserGoldRecord(data:UserGoldRecord) {
  const res = await request.Put<ApiResult<unknown>>('/userGoldRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户金币
 * @param id 角色id
 */
export async function removeUserGoldRecord(id:number) {
  const res = await request.Delete<ApiResult<unknown>>('/userGoldRecord/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeUserGoldRecords(ids:number[]) {
  const res = await request.Post<ApiResult<unknown>>('/userGoldRecord/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 导出金币日志 
export async function exportExcelGoldRecord(params: UserGoldRecordParam) {
  return await request.Post<ApiResult<unknown>>('/userGoldRecord/exportExcel', params, { responseType: 'blob' });
}