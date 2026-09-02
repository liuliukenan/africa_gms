import type { RewardGoods } from './registerGive';
import type { PageParam } from '@/api/model';

export interface RecallCountryConfigVO {
  id?: number;
  countryCode?: number;
  startTime?: string | number;
  endTime?: string | number;
  status?: number;
  smsMuteStart?: string;
  smsMuteEnd?: string;
  appPushMuteStart?: string;
  appPushMuteEnd?: string;
  inAppMuteStart?: string;
  inAppMuteEnd?: string;
  deferRandomMinutes?: number;
  ipLimit?: number;
  ipPeriod?: number;
  deviceLimit?: number;
  devicePeriod?: number;
}

export interface RecallStrategyVO {
  id?: number;
  countryConfigId?: number;
  countryCode?: number;
  strategyType?: string;
  strategyName?: string;
  conditionType?: string;
  conditionParam?: string;
  rewardConf?: string | null;
  sortOrder?: number;
  status?: number;
  _conditionParams?: Record<string, number>;
}

export interface RecallPushVO {
  id?: number;
  strategyId?: number;
  strategyType?: string;
  pushName?: string;
  delayValue?: number;
  delayUnit?: string;
  needReward?: number;
  smsTemplateId?: number | null;
  appPushTemplateId?: number | null;
  inAppTemplateId?: number | null;
  sortOrder?: number;
  status?: number;
}

export interface RecallStrategyDetail {
  strategy?: RecallStrategyVO;
  pushes?: RecallPushVO[];
  _rewardGoods?: RewardGoods[];
}

export interface RecallConfigVO {
  countryConfig?: RecallCountryConfigVO;
  strategies?: RecallStrategyDetail[];
}

/**
 * 召回任务记录
 */
export interface RecallTaskVO {
  /** 主键 ID */
  id?: number;
  /** 用户 ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 关联配置 ID */
  countryConfigId?: number;
  /** 关联策略 ID */
  strategyId?: number;
  /** 关联推送配置 ID */
  pushId?: number;
  /** 策略类型: register/deposit/login_inactive */
  strategyType?: string;
  /** 推送渠道: SMS/APP_PUSH/IN_APP */
  pushChannel?: string;
  /** 是否需要派发奖励: 0=否 1=是 */
  needReward?: number;
  /** 触发事件发生时间 */
  triggerTime?: string;
  /** 预计执行时间（可能经静默顺延） */
  executeTime?: string;
  /** 任务状态: 0=PENDING 1=EXECUTED 2=SKIPPED 3=CANCELLED 4=IP_BLOCKED 5=DEVICE_BLOCKED 9=PROCESSING */
  status?: number;
  /** 跳过/风控原因 */
  skipReason?: string;
  /** 触发事件时的 IP 地址 */
  ip?: string;
  /** 触发事件时的设备 ID */
  deviceId?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 召回任务记录查询条件
 */
export interface RecallTaskQuery extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  /** 用户ID */
  uid?: number;
  /** 国家配置ID */
  countryConfigId?: number;
  /** 策略类型: register/deposit/login_inactive */
  strategyType?: string;
  /** 推送渠道: SMS/APP_PUSH/IN_APP */
  pushChannel?: string;
  /** 任务状态: 0=PENDING 1=EXECUTED 2=SKIPPED 3=CANCELLED 4=IP_BLOCKED 5=DEVICE_BLOCKED 9=PROCESSING */
  status?: number;
}
