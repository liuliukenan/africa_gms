import { PageParam } from '@/api/model';

/**
 * 投注数据
 */
export interface Bet {
  statType?: string;
  gameId?: number;
  gameGroupId?: number;
  betUserCount?: number;
  betCount?: number;
  betAmount?: number;
  prizeAmount?: number;
  prizeCount?: number;
  profitLoss?: number;
  rtp?: string;
  winRate?: string;
  avgBetAmountPerUser?: number;
  avgBetAmountPerBet?: number;
  avgBetCountPerUser?: number;
  /** 现金下注金额 */
  cashBet?: number;
  /** 现金返奖金额 */
  cashReward?: number;
  /** 现金盈亏 */
  cashProfitLoss?: number;
  /** 现金RTP */
  cashRtp?: string;
  /** 奖金下注金额 */
  bonusBet?: number;
  /** 奖金返奖金额 */
  bonusReward?: number;
  /** 奖金盈亏 */
  bonusProfitLoss?: number;
  /** 奖金RTP */
  bonusRtp?: string;
  companyCode?: string;
  factoryCode?: string;
  companyId?: number;
  factoryId?: number;
}

/**
 * 代理充值查询条件
 */
export interface BetParam extends PageParam {
  id?: number;
  sortName?: string;
  orderName?: string;
  startDate?: string;
  endDate?: string;
  statType?: string | number;
  countryCode?: number;
  channel?: number;
  agentId?: number;
  companyId?: number;
  factoryId?: number;
  currencyCode?: string;
  userType?: number;
  gameGroupId?: number;
  gameId?: number;
  clientType?: number;
}
