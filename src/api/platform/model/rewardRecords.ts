import { PageParam } from '@/api/model';

/**
 * VIP奖励记录VO
 */
export interface VipRewardRecordVO {
  /** 记录ID */
  id?: number;
  /** 奖励配置ID */
  rewardConfigId?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 结算时VIP等级 */
  vipLevel?: number;
  /** VIP业务类型 */
  businessType?: string;
  /** 奖励物品类型 */
  goodsType?: string;
  /** 奖励物品ID */
  goodsId?: number;
  /** 实际奖励数量 */
  amount?: number;
  /** 流水倍数 */
  flowMultiple?: number;
  /** 奖励业务ID */
  businessId?: string;
  /** 周期标识 */
  periodKey?: string;
  /** 领取状态：0=未领取，1=已领取 */
  claimStatus?: number;
  /** 奖励状态：0=正常，1=IP限制，2=设备限制，3=奖励次数限制 */
  status?: number;
  /** 风控原因 */
  riskReason?: string;
  /** 风控IP */
  ip?: string;
  /** 风控设备ID */
  deviceId?: string;
  /** 结算时间 */
  settlementTime?: string;
  /** 领取截止时间 */
  expireTime?: string;
  /** 实际领取或自动发放时间 */
  claimTime?: string;
  /** 创建时间 */
  createTime?: string;
}

/**
 * VIP奖励记录查询条件
 */
export interface VipRewardRecordParam extends PageParam {
  /** 用户ID */
  uid?: number;
  /** 奖励配置ID */
  rewardConfigId?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 结算时VIP等级 */
  vipLevel?: number;
  /** VIP业务类型 */
  businessType?: string;
  /** 奖励物品类型 */
  goodsType?: string;
  /** 奖励物品ID */
  goodsId?: number;
  /** 领取状态 */
  claimStatus?: number;
  /** 奖励状态 */
  status?: number;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
}
