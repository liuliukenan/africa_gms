import request from '@/utils/request';
import type { GameGoldReport,GameGoldReportParams } from './model';
import { ApiResult, PageResult } from '../model';
// 游戏金币
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageGameGoldReport(params?:GameGoldReportParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldReport>>>('/count/gameGoldYearReport/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 钻石
export async function pageDiamondReport(params?:GameGoldReportParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldReport>>>('/count/gameDiamondTotalReport/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}