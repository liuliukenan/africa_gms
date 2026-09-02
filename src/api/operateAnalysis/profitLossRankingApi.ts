import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ProfitLossRanking, ProfitLossRankingQuery } from "./model/profitLossRanking";

/**
 * 分页查询盈亏排行榜
 */
export async function pageProfitLossRankings(params: ProfitLossRankingQuery) {
  const res = await request.Post<ApiResult<PageResult<ProfitLossRanking>>>(
    "/stat/profitLossRanking/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出盈亏排行榜
 */
export async function exportProfitLossRankings(params: ProfitLossRankingQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ProfitLossRanking>>>(
    "/stat/profitLossRanking/list",
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
