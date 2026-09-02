import request from '@/utils/request';
import { ApiResult, PageResult } from '../model';
import { GameTotalGoldReport } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageUserGameTotalGoldReports(uid?: number) {
  const res = await request.Post<ApiResult<PageResult<GameTotalGoldReport>>>('count/userGoldTotalReport/getByUid/' + uid);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加用户游戏总计
 * @param data
 */
export async function addUserGameTotalGoldReport(data) {
  const res = await request.Post<ApiResult<GameTotalGoldReport>>('/userGameTotalGoldReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改用户游戏总计
 * @param data
 */
export async function updateUserGameTotalGoldReport(data: GameTotalGoldReport) {
  const res = await request.Put<ApiResult<GameTotalGoldReport>>('/userGameTotalGoldReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户游戏总计
 * @param id 角色id
 */
export async function removeUserGameTotalGoldReport(id: number) {
  const res = await request.Delete<ApiResult<GameTotalGoldReport>>('/userGameTotalGoldReport/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeUserGameTotalGoldReports(ids: number[]) {
  const res = await request.Post<ApiResult<GameTotalGoldReport>>('/userGameTotalGoldReport/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
