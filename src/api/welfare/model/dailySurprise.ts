import type { PageParam } from '@/api/model';
import type { ActRewardConf, RegisterBonusRequest } from './registerGive';

/** 每日充值惊喜-奖励档位 */
export interface DailyRechargeSurpriseSlot {
  /** 前端唯一标识（不参与后端保存） */
  uid?: number;
  /** 档位编号 */
  slotNo?: number;
  /** 奖励比例 */
  rewardRatio?: number;
  /** 权重 */
  weight?: number;
  /** 每日库存 */
  dailyStock?: number;
}

/**
 * 每日充值惊喜活动配置（configValue）
 * 继承通用活动配置 ActRewardConf，新增活动专属字段
 */
export interface DailyRechargeSurpriseActConf extends ActRewardConf {
  /** 单笔充值门槛 */
  rechargeThreshold?: number;
  rulesThreshold?: number;
  singleRechargeLimit?: number;
  /** 未使用次数上限 */
  remainingTimesLimit?: number;
  /** 每日获得次数上限 */
  dailyTimesLimit?: number;
  /** 次数兜底有效期（天） */
  chanceExpireDays?: number;
  /** Bonus流水倍数 */
  flowMultiple?: number;
  /** 大厅引导弹窗 */
  popupEnabled?: boolean;
  /** 奖励档位配置 */
  slots?: DailyRechargeSurpriseSlot[];
}

/**
 * 每日充值惊喜活动配置请求
 * 继承通用活动配置请求 RegisterBonusRequest
 */
export interface DailyRechargeSurpriseRequest extends RegisterBonusRequest {
  configValue?: DailyRechargeSurpriseActConf;
}

/** 每日充值惊喜-跑马灯文本VO */
export interface DailyRechargeSurpriseRobotTextVO {
  /** ID，新增时为空 */
  id?: number;
  /** 活动ID，后台自动定位 */
  actItemId?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 跑马灯文本模板 */
  textContent?: string;
  /** 权重，0表示不参与随机 */
  weight?: number;
  /** 状态：0=禁用，1=启用 */
  status?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/** 每日充值惊喜-跑马灯文本查询参数 */
export interface DailyRechargeSurpriseRobotTextQuery extends PageParam {
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
  /** 国家代码 */
  countryCode?: number;
  /** 状态：0=禁用，1=启用 */
  status?: number;
  /** 文本关键词 */
  keyword?: string;
  startLocalDate?: string;
  endLocalDate?: string;
}

/** 每日充值惊喜-次数记录VO */
export interface DailyRechargeSurpriseChanceVO {
  /** 记录ID */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 充值订单号 */
  rechargeOrderNo?: string;
  /** 产生次数的充值金额 */
  rechargeAmount?: number;
  /** 状态：0=未使用，1=已使用，2=IP风控，3=设备风控 */
  status?: number;
  /** 是否已超过过期时间 */
  expired?: boolean;
  /** 充值事件IP */
  ip?: string;
  /** 充值事件设备ID */
  deviceId?: string;
  /** 风控原因 */
  riskReason?: string;
  /** 命中格子序号 */
  slotNo?: number;
  /** 奖励比例 */
  rewardRatio?: number;
  /** 奖励金额 */
  rewardAmount?: number;
  /** 次数获得时间 */
  createTime?: string;
  /** 次数过期时间 */
  expireTime?: string;
  /** 抽奖时间 */
  useTime?: string;
}

/** 每日充值惊喜-次数记录查询条件 */
export interface DailyRechargeSurpriseChanceQuery extends PageParam {
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
  /** 国家代码 */
  countryCode?: number;
  /** 用户ID */
  uid?: number;
  /** 状态：0=未使用，1=已使用，2=IP风控，3=设备风控 */
  status?: number;
  /** 充值订单号 */
  rechargeOrderNo?: string;
  startLocalDate?: string;
  endLocalDate?: string;
}
