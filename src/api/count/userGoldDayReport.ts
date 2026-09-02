import request from '@/utils/request';
import { ApiResult,PageResult } from '../model';
import type { UserGoldDayReport,UserGoldDayReportParams } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageUserGoldDayReports(params: UserGoldDayReportParams) {
  const res = await request.Post<ApiResult<PageResult<UserGoldDayReport>>>('/count/userGoldDayReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 钻石
export async function pageUserDiamondDayReports(params: UserGoldDayReportParams) {
  const res = await request.Post<ApiResult<PageResult<UserGoldDayReport>>>('/count/userDiamondDayReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加每日用户金币统计
 * @param data
 */
export async function addUserGoldDayReport(data: UserGoldDayReport) {
  const res = await request.Post<ApiResult<unknown>>('/count/userGoldDayReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改每日用户金币统计
 * @param data
 */
export async function updateUserGoldDayReport(data: UserGoldDayReport) {
  const res = await request.Put<ApiResult<unknown>>('/count/userGoldDayReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除每日用户金币统计
 * @param id 角色id
 */
export async function removeUserGoldDayReport(id: number) {
  const res = await request.Delete<ApiResult<unknown>>('/count/userGoldDayReport/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeUserGoldDayReports(ids: number[]) {
  const res = await request.Post<ApiResult<unknown>>('/count/userGoldDayReport/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
