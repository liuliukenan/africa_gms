import { PageParam } from '@/api/model';

/**
 *近期数据概览
 */
export interface RecentInfo {
  newAgentCount?: number;
  newSuperAgentCount?: number;
  newNormalAgentCount?: number;
  newAgentUserCount?: number;
  totalRebateAmount?: number;
  superAgentRebateAmount?: number;
  normalAgentRebateAmount?: number;
  netRechargeAmount?: number;
  gameProfitLoss?: number;
}
// 总代理Top10
export interface GeneralAgentTop10 {
  rank: number;
  agentId: number;
  totalProfit: number;
  profit0: number;
  profit1: number;
  teamNetRecharge: number;
}
// 普通代理Top10

export interface NormalAgentTop10 {
  rank: number;
  agentId: number;
  totalProfit: number;
  profit0: number;
  profit1: number;
  totalContribution: number;
  teamNetRecharge: number;
}
// 返利模式分布
export interface ProfitModeDistribution {
  commissionModel: number;
  commissionModelName: string;
  agentCount: number;
  ratio: number;
}
// 累计数据概览
export interface CumulativeInfo {
  totalAgentCount?: number;
  totalSuperAgentCount?: number;
  totalNormalAgentCount?: number;
  totalUserCount?: number;
  totalRebateAmount?: number;
  totalSuperAgentRebate?: number;
  totalNormalAgentRebate?: number;
  totalNetRechargeAmount?: number;
  roas?: number;
}

export interface AgentOverviewParam extends PageParam {
  type?: number;
  countryCode?: number;
}
