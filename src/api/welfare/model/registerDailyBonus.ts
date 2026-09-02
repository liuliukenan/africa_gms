import { PageParam } from '@/api/model';
import type { RewardGoods, PushStrategy } from '@/api/welfare/model/registerGive';

/** 奖励物品 - 复用registerGive中的RewardGoods类型 */
export type RegisterDailyBonusRewardGoods = RewardGoods;

/** 推送配置项 */
export interface ActPushPushVO {
  /** ID */
  id?: number;
  /** 关联策略ID */
  strategyId?: number;
  /** 推送名称，如"注册10分钟推送" */
  pushName?: string;
  /** 延迟数值，如10、24、72 */
  delayValue?: number;
  /** 延迟单位：MINUTES / HOURS / DAYS */
  delayUnit?: string;
  /** 是否需要派发奖励：0=否 1=是 */
  needReward?: number;
  /** SMS推送模板ID（为空则不发送SMS） */
  smsTemplateId?: number | null;
  /** APP推送模板ID（为空则不发送APP Push） */
  appPushTemplateId?: number | null;
  /** 站内信推送模板ID（为空则不发送站内信） */
  inAppTemplateId?: number;
  /** 排序权重（值小优先） */
  sortOrder?: number;
  /** 启用状态：0=禁用 1=启用 */
  status?: number;
}

/** 推送策略 - 继承PushStrategy并扩展pushes字段 */
export interface ActPushStrategyVO extends PushStrategy {
  /** 策略下的推送配置列表 */
  pushes?: ActPushPushVO[];
}

/** 每日奖励配置 */
export interface RegisterDailyBonusDayConfigVO {
  /** 注册后的第几天，从1开始 */
  dayNo?: number;
  /** 当日奖励展示名称 */
  rewardName?: string;
  /** 奖励展示图标相对路径或完整URL */
  rewardIconUrl?: string;
  /** 单日奖励限制次数，0表示不限制 */
  rewardLimit?: number;
  /** 当日奖励物品列表 */
  rewardGoods?: RegisterDailyBonusRewardGoods[];
  /** 当日推送策略，子类型由服务端按dayNo固定 */
  pushStrategies?: ActPushStrategyVO[];
}

/** 推荐游戏 */
export interface RegisterDailyBonusRecommendedGameVO {
  /** 游戏ID */
  gameId?: number;
  /** 展示图标相对路径或完整URL */
  iconUrl?: string;
}

/** 注册后每日奖励配置VO */
export interface RegisterDailyBonusConfigVO {
  /** 活动ID，修改时必填 */
  id?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 活动名称 */
  name?: string;
  /** 跳转类型,可用值:0,1,2,3,4 */
  jumpType?: string;
  /** 跳转参数 */
  jumpId?: string;
  /** 活动图片地址 */
  imgUrl?: string;
  /** 排序 */
  sortNumber?: number;
  /** 启用状态 */
  status?: boolean;
  /** 活动开始时间 */
  startDate?: string;
  /** 活动结束时间 */
  endDate?: string;
  /** 展示开始时间 */
  showStartDate?: string;
  /** 展示结束时间 */
  showEndDate?: string;
  /** 活动描述 */
  description?: string;
  /** 活动副标题 */
  subTitle?: string;
  /** 同一注册IP允许参与的玩家上限，0表示不限制 */
  ipLimit?: number;
  /** 注册IP风控统计周期，单位：天 */
  ipPeriod?: number;
  /** 同一注册设备允许参与的玩家上限，0表示不限制 */
  deviceLimit?: number;
  /** 注册设备风控统计周期，单位：天 */
  devicePeriod?: number;
  /** 推荐游戏列表 */
  recommendedGames?: RegisterDailyBonusRecommendedGameVO[];
  /** 每日奖励及对应推送配置 */
  days?: RegisterDailyBonusDayConfigVO[];
}

/** 注册后每日奖励配置请求 */
export interface RegisterDailyBonusConfigRequest {
  /** 活动ID，修改时必填 */
  id?: number;
  /** 国家代码 */
  countryCode: number;
  /** 活动名称 */
  name?: string;
  /** 跳转类型 */
  jumpType?: string;
  /** 跳转参数 */
  jumpId?: string;
  /** 活动图片地址 */
  imgUrl?: string;
  /** 排序 */
  sortNumber?: number;
  /** 启用状态 */
  status?: boolean;
  /** 活动开始时间 */
  startDate?: string;
  /** 活动结束时间 */
  endDate?: string;
  /** 展示开始时间 */
  showStartDate?: string;
  /** 展示结束时间 */
  showEndDate?: string;
  /** 活动描述 */
  description?: string;
  /** 活动副标题 */
  subTitle?: string;
  /** 同一注册IP允许参与的玩家上限 */
  ipLimit?: number;
  /** 注册IP风控统计周期 */
  ipPeriod?: number;
  /** 同一注册设备允许参与的玩家上限 */
  deviceLimit?: number;
  /** 注册设备风控统计周期 */
  devicePeriod?: number;
  /** 推荐游戏列表 */
  recommendedGames?: RegisterDailyBonusRecommendedGameVO[];
  /** 每日奖励及对应推送配置 */
  days?: RegisterDailyBonusDayConfigVO[];
}

/**
 * 活动奖励记录VO（实际API返回结构）
 */
export interface ActRecordVO {
  /** 主键ID */
  id?: number;
  /** 二级类型 */
  subType?: string;
  /** 用户ID */
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
  /** 更新时间 */
  updateTime?: string;
  /** 创建时间 */
  createTime?: string;
  /** 轮次 */
  round?: number;
}

/**
 * 活动奖励记录查询条件
 */
export interface ActRecordQuery extends PageParam {
  /** 当前页数 */
  page?: number;
  /** 分页大小 */
  size?: number;
  /** 分页大小 */
  limit?: number;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 国家代码，未传时默认254 */
  countryCode?: number;
  /** 主键ID */
  id?: number;
  /** 排序字段名 */
  sortName?: string;
  /** 排序方向 */
  orderName?: string;
  /** 二级类型 */
  subType?: string;
  /** 奖励接收人用户ID */
  uid?: number;
  /** 邀请人用户ID */
  inviterId?: number;
  /** 被邀请人用户ID */
  invitedUid?: number;
  /** 状态：0=正常，1=IP风控，2=设备风控 */
  status?: number;
  /** 渠道 */
  channel?: number;
  /** 代理ID */
  agentId?: number;
  /** 轮数 */
  round?: number;
  /** 手机号 */
  invitedPhone?: string;
  /** 本地开始日期 */
  startLocalDate?: string;
  /** 本地结束日期 */
  endLocalDate?: string;
}

/** 兼容旧类型名 */
export type RegisterDailyBonusRecordVO = ActRecordVO;
export type RegisterDailyBonusRecordParam = ActRecordQuery;
