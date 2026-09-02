import { PageParam } from '@/api/model';
/** 奖励物品 */
export interface RewardGoods {
  /** 奖励物品ID（对应 t_goods.id） */
  goodsId?: number;
  /** 奖励物品 */
  goodsName?: string;
  /** 奖励物品类型（对应 t_goods.type）,可用值:0,1,3,4 */
  goodsType?: string;
  /** 奖励类型 0=固定奖励 1=比例奖励 */
  rewardType?: number;
  /** 固定奖励数量 */
  amount?: number;
  /** 奖励比例 */
  amountRatio?: number;
  /** 最大奖励限制 */
  maxLimit?: number;
  /** 最小奖励限制 */
  minLimit?: number;
  /** 流水倍数 */
  flowMultiple?: number;
  /** 邮件模板ID */
  mailConfId?: number;
  /** Tips模板ID */
  tipsConfId?: number;
  /** 过期天数（有些活动有奖励过期限制） */
  expire?: number;
  weightList?: WeightList[];
}
export interface WeightList {
  id?: number;
  /** 相对权重，必须大于0；所有候选项无需合计为100 */
  weight?: number;
  /** 命中当前候选项时发放的奖励数量 */
  amount?: number;
}
/** 子类型配置 */
export interface ActSubConf {
  deadlineHours?: number;
  /** 同IP限制次数（0=不限） */
  ipLimit?: number;
  /** IP限制周期（天） */
  ipPeriod?: number;
  /** 同设备限制次数（0=不限） */
  deviceLimit?: number;
  /** 设备限制周期（天） */
  devicePeriod?: number;
  /** 奖励限制次数（0=不限） */
  rewardLimit?: number;
  /** 最小充值金额 */
  minRechargeAmount?: number;
   /** 建议充值档位 */
  suggestPayTiers?: number[];
  /** 奖励物品列表 */
  rewardGoods?: RewardGoods[];
  /** 累计阈值（用于累计充值活动） */
  accumulateThreshold?: number;
}

/** 推送项 */
export interface Push {
  /** 主键ID */
  id?: number;
  /** 策略ID */
  strategyId?: number;
  /** 推送名称 */
  pushName?: string;
  /** 延迟值 */
  delayValue?: number;
  /** 延迟单位 */
  delayUnit?: string;
  /** 是否需要奖励 0=否 1=是 */
  needReward?: number;
  /** 短信模板ID */
  smsTemplateId?: number | null;
  /** App推送模板ID */
  appPushTemplateId?: number | null;
  /** 站内信模板ID */
  inAppTemplateId?: number | null;
  /** 排序 */
  sortOrder?: number;
  /** 状态 1=启用 */
  status?: number;
}

/** 推送策略 */
export interface PushStrategy {
  /** 主键ID */
  id?: number;
  /** 活动项ID */
  actItemId?: number;
  /** 子类型 */
  subType?: string;
  /** 国家代码 */
  countryCode?: number;
  /** 策略名称 */
  strategyName?: string;
  /** 条件类型 */
  conditionType?: string | null;
  /** 条件参数 */
  conditionParam?: string | null;
  /** 奖励配置（JSON字符串） */
  rewardConf?: string;
  /** 排序 */
  sortOrder?: number;
  /** 状态 1=启用 */
  status?: number;
  /** 推送列表 */
  pushes?: Push[];
}

/** 每日奖励配置项 */
export interface DayRewardItem {
  /** 天数 */
  day?: number;
  /** 奖励物品列表 */
  rewardGoods?: RewardGoods[];
  /** 推送策略列表 */
  pushes?: PushStrategy[];
}

/** 活动奖励配置 */
export interface ActRewardConf {
  jsonType?: string;
  rechargeWindowDays?: number;
  rechargeThreshold?: number;
  l1MaxDays?: number;
  /** 每日奖励配置列表 */
  days?: DayRewardItem[];
  /** 子类型配置 */
  subActRewardConf?: Record<string, ActSubConf>;
}

/** 注册送礼活动配置请求 */
export interface RegisterBonusRequest {
  /** ID（新增时为空，修改时必填） */
  id?: number;
  /** 国家代码 */
  countryCode: number;
  /** 活动名称 */
  name?: string;
  /** 跳转类型,可用值:0,1,2,3,4 */
  jumpType?: string;
  /** 跳转参数 */
  jumpValue?: string;
  description?: string;
  jumpId?: number;
  /** 图片地址 */
  imgUrl?: string;
  /** 排序 */
  sortNumber?: number;
  /** 状态 */
  status?: boolean;
  /** 活动开始时间 */
  startDate?: string;
  /** 活动结束时间 */
  endDate?: string;
  showStartDate?: string;
  /** 活动显示结束时间 */
  showEndDate?: string;
  subTitle?: string;
  /** 推送策略配置 */
  pushStrategies?: PushStrategy[];
  /** 配置值 */
  configValue?: ActRewardConf;
}


/**
 * 注册送礼奖励记录VO
 */
export interface RegisterRecordVO {
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
 * 注册送礼奖励记录查询条件
 */
export interface RegisterRecordParam extends PageParam {
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
