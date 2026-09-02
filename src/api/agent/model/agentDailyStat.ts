import { PageParam } from '@/api/model';

/**
 * 代理日报表数据
 */
export interface AgentDailyStatVO {
  /** 统计日期 */
  statDate?: string;
  /** 新增代理数 */
  newAgentCount?: number;
  /** 活跃代理数 */
  activeAgentCount?: number;
  /** 返利金额（模式汇总） */
  totalProfit?: number;
  /** 模式1返利 */
  profit1?: number;
  /** 模式2返利 */
  profit2?: number;
  /** 代理提现人数 */
  agentWithdrawCount?: number;
  /** 代理提现金额 */
  agentWithdrawAmount?: number;
  /** 新增玩家数 */
  newUserCount?: number;
  /** 活跃玩家数 */
  activeUserCount?: number;
  /** 首充人数 */
  firstPayUserCount?: number;
  /** 首充金额 */
  firstPayAmount?: number;
  /** 人均首充金额（首充金额/首充人数） */
  avgFirstPayAmount?: number;
  /** 充值人数 */
  rechargeUserCount?: number;
  /** 充值金额 */
  rechargeAmount?: number;
  /** 人均充值金额（充值金额/充值人数） */
  avgRechargeAmount?: number;
  /** 玩家提现人数 */
  userWithdrawCount?: number;
  /** 玩家提现金额 */
  userWithdrawAmount?: number;
  /** 人均提现金额（提现金额/提现人数） */
  avgWithdrawAmount?: number;
  /** 净充值额（充值金额-提现金额） */
  netRechargeAmount?: number;
  /** 投注金额 */
  totalBet?: number;
  /** 盈亏额 */
  profitLoss?: number;
}

/**
 * 代理日报表查询条件
 */
export interface AgentDailyStatParam extends PageParam {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 国家代码 */
  countryCode?: number;
  /** 渠道 */
  channel?: number;
  /** 代理ID */
  agentId?: number;
}
