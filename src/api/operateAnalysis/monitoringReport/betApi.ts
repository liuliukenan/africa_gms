import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Bet, BetParam } from "./model/bet";

/**
* 分页查询操作记录
*/
export async function pageGameBet(params: BetParam) {
  const res = await request.Post<ApiResult<PageResult<Bet>>>(
    "/userGameDailyStat/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 导出运营数据表
export async function exportGameBet(params: BetParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<Bet>>>(
    "/userGameDailyStat/list",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}