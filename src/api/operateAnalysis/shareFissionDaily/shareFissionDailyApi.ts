import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ShareFissionDailyVO, ShareFissionDailyParam } from "./model/shareFissionDaily";

/**
 * 分页查询分享裂变每日报表
 */
export async function pageShareFissionDaily(params: ShareFissionDailyParam) {
  const res = await request.Post<ApiResult<PageResult<ShareFissionDailyVO>>>(
    "/stat/shareFissionStat/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出分享裂变每日报表
 */
export async function exportShareFissionDaily(params: ShareFissionDailyParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ShareFissionDailyVO>>>(
    "/stat/shareFissionStat/list",
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
