import type { PageParam } from "@/api/model";

/**
 * 余额排行榜实体
 */
export interface BalanceRanking {
  /** 排名 */
  rank?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 手机号 */
  phone?: string;
  /** Cash余额 */
  cashBalance?: number;
  /** Bonus余额 */
  bonusBalance?: number;
  /** 总余额（Cash余额+Bonus余额） */
  totalBalance?: number;
}

/**
 * 余额排行榜查询参数
 */
export interface BalanceRankingQuery extends PageParam {
  /** 分页大小 */
  size?: number;
  /** 排行周期：0=总榜，1=今日，7=近7日，30=近30日 */
  periodType?: number;
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
}
