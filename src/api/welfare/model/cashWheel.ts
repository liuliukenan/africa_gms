import type { PageParam } from '@/api/model';

/**
 * Cash Wheel 活动配置模型
 */

/** 轮盘格子配置 */
export interface WheelSlotConf {
  /** 位置索引 0-7 */
  index?: number;
  /** 格子上显示的奖励文字 */
  label?: string;
  /** 奖励金额 */
  rewardAmount?: number;
}

/** CashWheel轮盘布局VO（接口返回） */
export interface CashWheelSlotConfigVO {
  /** 配置ID，新增时为空，修改时必填 */
  id?: number;
  /** 活动ID */
  actItemId?: number;
  /** 轮次 */
  round?: number;
  /** 格子序号，固定1-8 */
  slotNo?: number;
  /** 显示类型：1=固定值，2=全提，3=随机 */
  displayType?: number;
  /** 展示值 */
  displayAmount?: number;
}

/** 抽奖命中配置（前端表单用） */
export interface DrawConf {
  /** 配置ID（前端临时ID） */
  id?: number;
  /** 配置名称 */
  name?: string;
  /** 选中权重 */
  weight?: number;
  /** 命中的格子索引 */
  slotIndex?: number;
  /** 奖励金额 */
  rewardAmount?: number;
}

/** 命中位置配置 */
export interface HitSlotConf {
  /** 轮盘位置，1-8 */
  slotNo?: number;
  /** 位置类型：1=固定值，2=随机值，3=不中奖 */
  type?: number;
  /** 该位置数值 */
  amount?: number;
}

/** CashWheel抽奖命中配置VO（接口返回） */
export interface CashWheelDrawConfigVO {
  /** 配置ID，新增时为空，修改时必填 */
  id?: number;
  /** 活动ID */
  actItemId?: number;
  /** 轮次 */
  round?: number;
  /** 权重值 */
  weight?: number;
  /** 初始奖励金额 */
  initialAmount?: number;
  /** 预设命中结果 */
  hitSlots?: HitSlotConf[];
}

/** 轮次配置 */
export interface RoundConf {
  /** 轮次 */
  round?: number;
  /** 本轮展示奖励金额 */
  rewardAmount?: number;
  /** 参与后有效期小时数 */
  validHours?: number;
  /** 完成天数展示值 */
  finishDays?: number;
  /** 参与本轮后立即赠送的旋转次数 */
  initialDrawTimes?: number;
  /** 本轮每日有效邀请人数上限，0=不限 */
  dailyInviteLimit?: number;
  /** 完成本轮所需旋转次数 */
  finishRequiredDrawCount?: number;
  // 额外免费次数获得倒计时
  extraFreeCountdownHours?: number;
  // 额外免费倒计时结束后赠送的旋转次数
  extraFreeDrawTimes?: number;
  /** 本轮轮盘布局，固定8格 */
  wheelSlots?: WheelSlotConf[];
  /** 本轮抽奖命中配置列表 */
  drawConfigs?: DrawConf[];
}

/** 开放周期配置 */
export interface PeriodConf {
  /** 开放周期ID */
  id?: number;
  /** 开放开始时间 */
  startTime?: string;
  /** 开放结束时间 */
  endTime?: string;
  /** 轮次配置列表 */
  rounds?: RoundConf[];
  /** 周期内单个玩家领取奖励金额上限 */
  periodUserClaimLimit?: number;
  /** 每个被邀请玩家首充可获得抽奖次数 */
  inviteFirstPayDrawTimes?: number;
}

/** CashWheel活动配置 */
export interface CashWheelActConf {
  /** 类型标识 */
  jsonType?: string;
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
  /** 奖励物品列表 */
  rewardGoods?: RewardGoodsItem[];
  /** 开放周期列表 */
  periods?: PeriodConf[];
  /** 轮次配置列表 */
  rounds?: RoundConf[];
  /** 是否开启循环 */
  cycleEnabled?: boolean;
  /** 循环起始轮 */
  cycleStartRound?: number;
  /** 周期内单个玩家领取奖励金额上限 */
  periodUserClaimLimit?: number;
  /** 每个被邀请玩家首充可获得抽奖次数 */
  inviteFirstPayDrawTimes?: number;
  /** 同一注册设备有效名额上限 */
  sameDeviceValidLimit?: number;
  /** 同一注册IP有效名额上限 */
  sameIpValidLimit?: number;
  /** 注册设备限制周期（天） */
  deviceLimitPeriodDays?: number;
  /** 注册IP限制周期（天） */
  ipLimitPeriodDays?: number;
  /** 被邀请人累计充值成功金额门槛 */
  inviteeTotalRechargeAmount?: number;
  /** 被邀请人累计Cash净流水门槛 */
  inviteeCashNetFlow?: number;
  /** 子类型配置 */
  subActRewardConf?: Record<string, any>;
}

/** 奖励物品 */
export interface RewardGoodsItem {
  /** 奖励物品ID */
  goodsId?: number;
  /** 奖励物品名称 */
  goodsName?: string;
  /** 奖励物品类型 */
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
  /** 过期天数 */
  expire?: number;
  /** 邮件模板ID */
  mailConfId?: number;
  /** 提示模板ID */
  tipsConfId?: number;
}

/** 推送项 */
export interface ActPushPushVO {
  id?: number;
  strategyId?: number;
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

/** 推送策略 */
export interface ActPushStrategyVO {
  id?: number;
  actItemId?: number;
  subType?: string;
  countryCode?: number;
  strategyName?: string;
  conditionType?: string | null;
  conditionParam?: string | null;
  rewardConf?: string;
  sortOrder?: number;
  status?: number;
  pushes?: ActPushPushVO[];
}

/** CashWheel活动配置VO（接口返回） */
export interface CashWheelActConfigVO {
  /** 活动ID */
  id?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 活动名称 */
  name?: string;
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
  /** 显示开始时间 */
  showStartDate?: string;
  /** 显示结束时间 */
  showEndDate?: string;
  /** 活动描述 */
  description?: string;
  /** 副标题 */
  subTitle?: string;
  /** 配置值 */
  configValue?: CashWheelActConf;
  /** 推送策略配置 */
  pushStrategies?: ActPushStrategyVO[];
}

/** CashWheel奖励记录VO */
export interface CashWheelRecordVO {
  id?: number;
  uid?: number;
  phone?: string;
  countryCode?: number;
  channel?: number;
  agentId?: number | null;
  periodId?: number;
  periodStartTime?: number;
  periodEndTime?: number;
  validEndTime?: number;
  round?: number;
  drawConfigId?: number;
  roundConfigSnapshotJson?: string;
  drawConfigSnapshotJson?: string;
  usedDrawCount?: number;
  availableDrawCount?: number;
  finishRequiredDrawCount?: number;
  baseAmount?: number;
  currentAmount?: number;
  goodsType?: string | null;
  flowMultiple?: number | null;
  status?: number;
  claimTime?: number | null;
  createTime?: number;
  updateTime?: number;
}

/** CashWheel奖励记录查询参数 */
export interface CashWheelRecordParam extends PageParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  phone?: string;
  countryCode?: number;
  status?: number;
  channel?: number;
  agentId?: number;
  round?: number;
  periodId?: number;
}

/** 推送任务VO */
export interface ActPushTaskVO {
  id?: number;
  uid?: number;
  countryCode?: number;
  strategyId?: number;
  pushId?: number;
  pushName?: string;
  actItemId?: number;
  subType?: string;
  pushChannel?: string;
  needReward?: number;
  triggerTime?: string;
  executeTime?: string;
  status?: number;
  skipReason?: string;
  ip?: string;
  deviceId?: string;
  createTime?: string;
  updateTime?: string;
}

/** 机器人中奖文本VO */
export interface CashWheelRobotTextVO {
  id?: number;
  actItemId?: number;
  countryCode?: number;
  textContent?: string;
  weight?: number;
  status?: number;
  createTime?: string;
  updateTime?: string;
}

/** 机器人中奖文本查询参数 */
export interface CashWheelRobotTextQuery extends PageParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  actItemId?: number;
  countryCode?: number;
  status?: number;
  keyword?: string;
}

/** 推送任务查询参数 */
export interface ActPushTaskParam extends PageParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  countryCode?: number;
  strategyId?: number;
  pushId?: number;
  subType?: string;
  pushChannel?: string;
  status?: number;
}

/** CashWheel保存请求参数 */
export interface CashWheelSaveRequest {
  /** 活动ID */
  id?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 活动名称 */
  name?: string;
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
  /** 显示开始时间 */
  showStartDate?: string;
  /** 显示结束时间 */
  showEndDate?: string;
  /** 活动描述 */
  description?: string;
  /** 副标题 */
  subTitle?: string;
  /** 配置值 */
  configValue?: CashWheelActConf;
  /** 推送策略配置 */
  pushStrategies?: ActPushStrategyVO[];
}
