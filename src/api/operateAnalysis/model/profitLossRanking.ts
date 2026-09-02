import type { PageParam } from "@/api/model";

/**
 * 盈亏排行榜实体
 */
export interface ProfitLossRanking {
  /** 排名 */
  rank?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 手机号 */
  phone?: string;
  /** 注册时间 */
  registerTime?: string;
  /** 现金下注 */
  cashBet?: number;
  /** 现金赔付 */
  cashReward?: number;
  /** Bonus下注 */
  bonusBet?: number;
  /** Bonus返奖 */
  bonusReward?: number;
  /** 玩家盈亏（返奖-下注） */
  profitLoss?: number;
  /** RTP（总赔付/总投注） */
  rtp?: string;
  /** 参与局数 */
  betCount?: number;
  /** 总投注金额（现金下注+Bonus下注） */
  totalBet?: number;
  /** 总赔付金额（现金赔付+Bonus返奖） */
  totalReward?: number;
  /** 现金盈亏（现金赔付-现金下注） */
  cashProfitLoss?: number;
  /** 现金RTP（现金赔付/现金下注） */
  cashRtp?: string;
  /** Bonus盈亏（Bonus返奖-Bonus下注） */
  bonusProfitLoss?: number;
  /** Bonus RTP（Bonus返奖/Bonus下注） */
  bonusRtp?: string;
}

/**
 * 盈亏排行榜查询参数
 */
export interface ProfitLossRankingQuery extends PageParam {
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
