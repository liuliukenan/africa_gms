import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { BalanceRanking, BalanceRankingQuery } from "./model/balanceRanking";

/**
 * 分页查询余额排行榜
 */
export async function pageBalanceRankings(params: BalanceRankingQuery) {
  const res = await request.Post<ApiResult<PageResult<BalanceRanking>>>(
    "/stat/balanceRanking/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出余额排行榜
 */
export async function exportBalanceRankings(params: BalanceRankingQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<BalanceRanking>>>(
    "/stat/balanceRanking/list",
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
