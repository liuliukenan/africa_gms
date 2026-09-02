import { PageParam } from '@/api/model';

/**
 * VIP推送任务记录VO
 */
export interface VipPushTaskVO {
  /** 任务ID */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 关联策略ID */
  strategyId?: number;
  /** 策略名称 */
  strategyName?: string;
  /** 关联推送配置ID */
  pushId?: number;
  /** 推送名称 */
  pushName?: string;
  /** 业务触发ID */
  bizId?: string;
  /** 周期标识 */
  periodKey?: string;
  /** VIP业务类型 */
  businessType?: string;
  /** 推送渠道 */
  pushChannel?: string;
  /** 比例奖励基数快照 */
  baseAmount?: number;
  /** 业务触发时间 */
  triggerTime?: string;
  /** 预计执行时间 */
  executeTime?: string;
  /** 原始预计执行时间 */
  originalExecuteTime?: string;
  /** 任务状态 */
  status?: number;
  /** 跳过、取消或失败原因 */
  skipReason?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * VIP推送任务记录查询条件
 */
export interface VipPushTaskParam extends PageParam {
  /** 任务ID */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 关联策略ID */
  strategyId?: number;
  /** 关联推送配置ID */
  pushId?: number;
  /** VIP业务类型 */
  businessType?: string;
  /** 推送渠道 */
  pushChannel?: string;
  /** 任务状态 */
  status?: number;
  /** 周期标识 */
  periodKey?: string;
  /** 业务触发ID */
  bizId?: string;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** 排序字段 */
  sortName?: string;
  /** 排序方式 */
  orderName?: string;
}
