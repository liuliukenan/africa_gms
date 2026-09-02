import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { UserDiamondRecord, UserDiamondRecordParam } from '../model/userDiamondRecord';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageUserDiamondRecords(params?:UserDiamondRecordParam) {
  const res = await request.Post<ApiResult<PageResult<UserDiamondRecord>>>('/userDiamondRecord/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加用户金币
 * @param data
 */
export async function addUserDiamondRecord(data:UserDiamondRecord) {
  const res = await request.Post<ApiResult<unknown>>('/userDiamondRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改用户金币
 * @param data
 */
export async function updateUserDiamondRecord(data:UserDiamondRecord) {
  const res = await request.Put<ApiResult<unknown>>('/userDiamondRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户金币
 * @param id 角色id
 */
export async function removeUserDiamondRecord(id:number) {
  const res = await request.Delete<ApiResult<unknown>>('/userDiamondRecord/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeUserDiamondRecords(ids:number[]) {
  const res = await request.Post<ApiResult<unknown>>('/userDiamondRecord/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 导出金币日志 
export async function exportExcelDiamondRecord(params: UserDiamondRecordParam) {
  return await request.Post<ApiResult<unknown>>('/userDiamondRecord/exportExcel', params, { responseType: 'blob' });
}