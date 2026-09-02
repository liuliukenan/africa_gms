import { PageParam } from '@/api/model';

/**
 * 7天签到奖励记录VO
 */
export interface Daily7RecordVO {
  id?: number;
  subType?: number;
  uid?: number;
  invitedUid?: number;
  invitedPhone?: string;
  regTime?: string;
  inviterId?: number;
  goodsType?: string;
  amount?: number;
  flowMultiple?: number;
  mailId?: number;
  status?: number;
  riskReason?: string;
  compensation?: boolean;
  countryCode?: number;
  channel?: number;
  agentId?: number;
  expire?: number;
  updateTime?: string;
  createTime?: string;
}

/**
 * 7天签到奖励记录查询条件
 */
export interface Daily7RecordParam extends PageParam {
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
  subType?: number;
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
  invitedPhone?: string;
  round?: number;
}
