import type { PageParam } from "@/api/model";

/**
 * 充提排行榜实体
 */
export interface RechargeWithdrawRanking {
  /** 排名 */
  rank?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 手机号 */
  phone?: string;
  /** 充值成功总额 */
  rechargeAmount?: number;
  /** 充值成功次数 */
  rechargeCount?: number;
  /** 提现成功总额 */
  withdrawAmount?: number;
  /** 提现成功次数 */
  withdrawCount?: number;
  /** 净充值（充值成功总额-提现成功总额） */
  netRecharge?: number;
  /** 盈余率（净充值/充值成功总额） */
  surplusRate?: string;
}

/**
 * 充提排行榜查询参数
 */
export interface RechargeWithdrawRankingQuery extends PageParam {
  /** 分页大小 */
  size?: number;
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  /** 国家代码 */
  countryCode?: number;
  /** 渠道类型 */
  channelTypes?: number;
  /** 排行周期：0=总榜，1=今日，7=近7日，30=近30日 */
  periodType: number;
}
