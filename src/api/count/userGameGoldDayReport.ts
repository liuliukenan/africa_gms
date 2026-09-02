import request from '@/utils/request';
import { ApiResult, PageResult } from '../model';
import { UserGameGoldDayReport,UserGameGoldDayReportParams } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageUserGameGoldDayReports(params?:UserGameGoldDayReportParams) {
  const res = await request.Post<ApiResult<PageResult<UserGameGoldDayReport>>>('/count/userGoldDayReport/getByUidAndDay',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 钻石
export async function pageUserGameDiamondDayReports(params?:UserGameGoldDayReportParams) {
  const res = await request.Post<ApiResult<PageResult<UserGameGoldDayReport>>>('/count/userDiamondDayReport/getByUidAndDay',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加每日用户金币统计
 * @param data
 */
export async function addUserGameGoldDayReport(data:UserGameGoldDayReport) {
  const res = await request.Post<ApiResult<unknown>>('/userGameGoldDayReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改每日用户金币统计
 * @param data
 */
export async function updateUserGameGoldDayReport(data:UserGameGoldDayReport) {
  const res = await request.Put<ApiResult<unknown>>('/userGameGoldDayReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除每日用户金币统计
 * @param id 角色id
 */
export async function removeUserGameGoldDayReport(id:number) {
  const res = await request.Delete<ApiResult<unknown>>('/userGameGoldDayReport/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeUserGameGoldDayReports(ids:number[]) {
  const res = await request.Post<ApiResult<unknown>>('/userGameGoldDayReport/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
