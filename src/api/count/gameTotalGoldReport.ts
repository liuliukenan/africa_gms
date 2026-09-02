import request from '@/utils/request';
import type { GameTotalGoldReport,GameTotalGoldReportParams } from './model';
import { ApiResult, PageResult } from '../model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageGameTotalGoldReports(params?:GameTotalGoldReportParams) {
  const res = await request.Post<ApiResult<PageResult<GameTotalGoldReport>>>('/gameTotal/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addGameTotalGoldReport(data: GameTotalGoldReport) {
  const res = await request.Post<ApiResult<unknown>>('/gameTotal', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateGameTotalGoldReport(data: GameTotalGoldReport) {
  const res = await request.Put<ApiResult<unknown>>('/gameTotal', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeGameTotalGoldReport(id:number) {
  const res = await request.Delete<ApiResult<unknown>>('/gameTotal/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeGameTotalGoldReports(ids) {
  const res = await request.Post<ApiResult<unknown>>('/gameTotal/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
