import { PageParam } from '@/api/model';

/**
 * 代理统计数据
 */
export interface AgentStatVO {
  /** 序号 */
  profileId?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 手机号 */
  phone?: string;
  /** 代理ID */
  agentId?: number;
  /** 身份类型: 1=总代理 2=普通代理 */
  agentType?: number;
  /** 上级代理ID */
  inviterAgentId?: number;
  /** 代理等级 */
  agentLevel?: number;
  /** 渠道ID */
  channel?: number;
  /** 注册代理时间 */
  createTime?: string;
  /** 最后活跃时间（有新增直属下级玩家或下级代理） */
  lastActiveTime?: string;
  /** 当前返利模式,可用值:0,1,2,3 */
  commissionModel?: string;
  /** 返利比例（当前代理等级对应的返利比例） */
  rebateRate?: number;
  /** 获得返利（当前代理累计获得的返利） */
  totalProfit?: number;
  /** 贡献返利（当前代理的贡献） */
  totalContribution?: number;
  /** 账户余额 */
  balance?: number;
  /** 团队返利（path下所有代理的返利） */
  teamProfit?: number;
  /** 团队代理数（path下所有代理） */
  teamAgentCount?: number;
  /** 团队玩家数（path下所有玩家） */
  teamUserCount?: number;
  /** 充值人数 */
  rechargeUserCount?: number;
  /** 充值金额 */
  rechargeAmount?: number;
  /** 付费率（充值人数/团队玩家数） */
  payRate?: number;
  /** 人均充值金额（充值金额/充值人数） */
  avgRechargeAmount?: number;
  /** 提现人数 */
  withdrawUserCount?: number;
  /** 提现金额 */
  withdrawAmount?: number;
  /** 提现率（提现人数/团队玩家数） */
  withdrawRate?: number;
  /** 人均提现金额（提现金额/提现人数） */
  avgWithdrawAmount?: number;
  /** 净充值额（充值金额-提现金额） */
  netRechargeAmount?: number;
  /** 团队GGR（path下所有玩家的贡献基数） */
  teamGgr?: number;
  /** ROAS（净充值额/团队返利） */
  roas?: number;
}

/**
 * 下级代理业绩统计数据
 */
export interface AgentStatDetailVO {
  /** 序号 */
  id?: number;
  /** 代理ID */
  agentId?: number;
  /** 手机号 */
  phone?: string;
  /** 代理等级 */
  agentLevel?: number;
  /** 佣金模式,可用值:0,1,2,3 */
  commissionModel?: string;
  /** 注册代理时间 */
  createTime?: string;
  /** 最后活跃时间 */
  lastActiveTime?: string;
  /** 账户余额 */
  balance?: number;
  /** 贡献返利 */
  totalContribution?: number;
  /** 团队成员数 */
  teamUserCount?: number;
  /** 团队充值人数 */
  teamRechargeUserCount?: number;
  /** 团队付费率（团队充值人数/团队成员数） */
  teamPayRate?: number;
  /** 团队充值金额 */
  teamRechargeAmount?: number;
  /** 团队提现金额 */
  teamWithdrawAmount?: number;
  /** 团队净充值额（团队充值金额-团队提现金额） */
  teamNetRechargeAmount?: number;
  /** 团队投注额 */
  teamTotalBet?: number;
  /** 团队赔付额 */
  teamTotalReward?: number;
  /** 团队盈亏额（团队投注额-团队净充值额） */
  teamProfitLoss?: number;
  /** 获得返利（path下所有代理的 total_profit 之和） */
  totalProfit?: number;
}

/**
 * 下级代理业绩统计查询条件
 */
export interface AgentStatDetailParam extends PageParam {
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
  /** 上级代理ID */
  inviterAgentId?: number;
  /** 身份类型: 1=总代理 2=普通代理 */
  agentType?: number;
  /** 代理等级 */
  agentLevel?: number;
}

/**
 * 下级代理玩家业绩统计数据
 */
export interface AgentUserStatDetailVO {
  /** 序号 */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 手机号 */
  phone?: string;
  /** 被邀请时间（bind_time） */
  bindTime?: string;
  /** 最后游戏时间（last_game_time） */
  lastGameTime?: string;
  /** 贡献返利（total_contribution） */
  totalContribution?: number;
  /** 账户余额（来自钱包） */
  totalAmount?: number;
  /** 充值金额（total_pay_success_amount） */
  rechargeAmount?: number;
  /** 提现金额（total_withdraw_success_amount） */
  withdrawAmount?: number;
  /** 净充值额（充值金额 - 提现金额） */
  netRechargeAmount?: number;
  /** 投注金额（total_bet） */
  totalBet?: number;
  /** 盈亏额（total_bet - total_reward） */
  profitLoss?: number;
}

/**
 * 下级代理玩家业绩统计查询条件
 */
export interface AgentUserStatDetailParam extends PageParam {
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
  /** 上级代理ID */
  inviterAgentId?: number;
  /** 身份类型: 1=总代理 2=普通代理 */
  agentType?: number;
  /** 代理等级 */
  agentLevel?: number;
}

/**
 * 代理统计查询条件
 */
export interface AgentStatParam extends PageParam {
  /** 国家代码 */
  countryCode?: number;
  status?: number;
  /** 代理ID */
  agentId?: number;
  /** 上级代理ID */
  inviterAgentId?: number;
  /** 代理等级 */
  agentLevel?: number;
  /** 渠道ID */
  channel?: number;
  /** 身份类型: 1=总代理 2=普通代理 */
  agentType?: number;
  /** 当前返利模式 */
  commissionModel?: string;
  /** 注册时间开始 */
  startDate?: string;
  /** 注册时间结束 */
  endDate?: string;
}
