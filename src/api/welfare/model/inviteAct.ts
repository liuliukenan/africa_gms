import { PageParam } from '@/api/model';

/**
 * 邀请拉新奖励记录VO
 */
export interface ActRecordVO {
  /** 主键ID */
  id?: number;
  /** 二级类型 */
  subType?: string;
  /** uid */
  uid?: number;
  /** 被邀请人用户ID */
  invitedUid?: number;
  /** 被邀请人手机号 */
  invitedPhone?: string;
  /** 注册时间 */
  regTime?: string;
  /** 邀请人ID */
  inviterId?: number;
  /** 奖励类型 */
  goodsType?: string;
  /** 奖励数量/金额 */
  amount?: number;
  /** 流水倍数 */
  flowMultiple?: number;
  /** 关联邮件ID */
  mailId?: number;
  /** 状态：0=正常，1=IP风控，2=设备风控 */
  status?: number;
  /** 风控原因 */
  riskReason?: string;
  /** 补发标志 */
  compensation?: boolean;
  /** 国家代码 */
  countryCode?: number;
  /** 渠道 */
  channel?: number;
  /** 代理ID */
  agentId?: number;
  /** 过期天数 */
  expire?: number;
  /** 创建时间 */
  createTime?: string;
}

/**
 * 邀请拉新奖励记录查询条件
 */
export interface ActRecordParam extends PageParam {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段名 */
  sortName?: string;
  /** 排序方式 */
  orderName?: string;
  /** 二级类型 */
  subType?: string;
  /** 奖励接收人用户ID */
  uid?: number;
  /** 被邀请人用户ID */
  invitedUid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 状态 */
  status?: number;
  /** 渠道 */
  channel?: number;
  /** 代理ID */
  agentId?: number;
}
