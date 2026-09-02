import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";

/**
 * 用户在线统计记录查询参数
 */
export interface UserOnlineRecordQuery {
  /** 当前页数 */
  page: number;
  /** 分页大小 */
  size?: number;
  /** 分页大小 */
  limit?: number;
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  /** 指标：0=在线人数，1=充值次数，2=充值金额，3=提现次数，4=提现金额；为空时默认在线人数 */
  metric?: number;
  /** 国家代码，仅用于充值、提现指标的时区和数据筛选，示例值(254) */
  countryCode?: number;
}

/**
 * 分页查询请求参数
 */
export interface PageOnlineCountsParams {
  userOnlineRecordQuery: UserOnlineRecordQuery;
}

/**
 * 分页查询
 */
interface OnlineCount {
  currentValue: number;
  previousValue: number;
  timePoint: string;
}

export async function pageOnlineCounts(params: PageOnlineCountsParams) {
  const res = await request.Post<ApiResult<PageResult<OnlineCount[]>>>(
    "/userOnlineRecord/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}