import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { RechargeWithdrawRanking, RechargeWithdrawRankingQuery } from "./model/rechargeWithdrawRanking";

/**
 * 分页查询充提排行榜
 */
export async function pageRechargeWithdrawRankings(params: RechargeWithdrawRankingQuery) {
  const res = await request.Post<ApiResult<PageResult<RechargeWithdrawRanking>>>(
    "/stat/rechargeWithdrawRanking/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出充提排行榜
 */
export async function exportRechargeWithdrawRankings(params: RechargeWithdrawRankingQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<RechargeWithdrawRanking>>>(
    "/stat/rechargeWithdrawRanking/list",
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
