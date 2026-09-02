/**
 * 玩家渠道修改记录查询参数
 */
export interface ChannelChangeRecordQuery {
  page?: number;
  size?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  /** 本次操作入口玩家ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 原渠道ID */
  oldChannel?: number;
  /** 新渠道ID */
  newChannel?: number;
  /** 操作人ID */
  operatorId?: number;
}

/**
 * 玩家渠道修改记录VO
 */
export interface ChannelChangeRecordVO {
  id?: number;
  /** 本次操作入口玩家ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 原渠道ID */
  oldChannel?: number;
  /** 新渠道ID */
  newChannel?: number;
  /** 操作人ID */
  operatorId?: number;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
}
