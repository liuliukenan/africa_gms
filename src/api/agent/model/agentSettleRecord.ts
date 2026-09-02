/**
 * 代理结算记录VO
 */
export interface AgentSettleRecordVO {
  /** ID */
  id?: number;
  /** 代理ID */
  agentId?: number;
  /** 上级代理ID */
  inviterAgentId?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 渠道 */
  channel?: number;
  /** 代理类型：1=总代理 2=普通代理 */
  agentType?: number;
  /** 结算日期（结算当天） */
  statDate?: string;
  /** 佣金模式 */
  commissionModel?: string;
  /** 结算开始时间（周期起始） */
  settleStartTime?: string;
  /** 结算结束时间（周期截止，不含） */
  settleEndTime?: string;
  /** 周期内总收益 */
  totalProfit?: number;
  /** 周期内总贡献（直属玩家和下级代理贡献之和） */
  totalContribution?: number;
  /** 周期内原始贡献基数（所有直属玩家贡献之和） */
  totalContributionBase?: number;
  /** 创建时间 */
  createTime?: string;
  /** 总页数 */
  totalPage?: number;
}

/**
 * 代理结算记录查询条件
 */
export interface AgentSettleRecordParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束时间，格式：yyyy-MM-dd */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段 */
  sortName?: string;
  /** 排序方式 */
  orderName?: string;
  /** 代理ID（可选） */
  agentId?: number;
  /** 上级代理ID（可选） */
  inviterAgentId?: number;
  /** 国家代码（可选） */
  countryCode?: number;
  /** 渠道（可选） */
  channel?: number;
  /** 代理类型（可选，1=总代理 2=普通代理） */
  agentType?: number;
  /** 佣金模式（可选）,可用值:0,1,2,3 */
  commissionModel?: string;
  /** 当前页数 */
  page?: number;
  /** 分页大小 */
  size?: number;
  /** 分页大小 */
  limit?: number;
}
