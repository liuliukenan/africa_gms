import type { RewardGoods } from '@/api/welfare/model/registerGive';
import type { Push } from '@/api/welfare/model/registerGive';

/**
 * KYC推送配置项中的推送DTO（API响应/请求通用）
 * extends Push 兼容 ActivityPush 组件，额外携带 mailTemplateId, pushParam
 */
export interface KycPushItem extends Push {
  /** 邮件模板ID */
  mailTemplateId?: number;
  /** 推送参数JSON */
  pushParam?: string;
}

/**
 * KYC推送配置VO（单条，对应一个事件类型）
 */
export interface KycPushConfigVO {
  /** 策略ID */
  id?: number;
  /** 事件类型：KYC_SUCCESS | KYC_FAIL */
  eventType?: string;
  /** 策略名称 */
  strategyName?: string;
  /** 奖励配置列表 */
  rewardConf?: RewardGoods[];
  /** 启用状态：0=禁用，1=启用 */
  status?: number;
  /** 推送配置列表 */
  pushes?: KycPushItem[];
}

/**
 * KYC推送配置响应
 */
export interface KycPushConfigResult {
  /** KYC推送配置列表 */
  configs?: KycPushConfigVO[];
}

/**
 * KYC推送配置DTO（单条，保存时使用）
 */
export interface KycPushConfigDTO {
  /** 事件类型：KYC_SUCCESS | KYC_FAIL */
  eventType: string;
  /** 策略名称 */
  strategyName?: string;
  /** 奖励配置列表 */
  rewardConf?: RewardGoods[];
  /** 启用状态：0=禁用，1=启用 */
  status?: number;
  /** 推送配置列表 */
  pushes?: KycPushItem[];
}

/**
 * KYC推送配置保存请求
 */
export interface KycPushConfigSaveDTO {
  /** KYC推送配置列表 */
  configs: KycPushConfigDTO[];
}
