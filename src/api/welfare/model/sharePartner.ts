/**
 * 分享配置项等级详情
 */
export interface ShareConfItem {
  isEdit?: boolean;
  /**
   * 等级
   */
  level?: number;

  /**
   * 最小值
   */
  min?: number;

  /**
   * 最大值
   */
  max?: number;

  /**
   * 被邀请人奖励金额
   */
  inviteeAmount?: number;

  /**
   * 邀请人奖励金额
   */
  inviterAmount?: number;
}

/**
 * 分享配置
 */
export interface ShareConf {
  open: boolean;
  /**
   * 被邀请人流水要求
   */
  inviteeWaterFlow?: number;

  /**
   * 邀请人流水要求
   */
  inviterWaterFlow?: number;

  /**
   * 返利比例
   */
  rebateRate?: number;

  /**
   * 返利比例流水要求
   */
  rebateRateWaterFlow?: number;

  /**
   * 等级配置项列表
   */
  items?: ShareConfItem[];
}

/**
 * 合伙人配置项详情
 */
export interface PartnerConfItem {
  isEdit?: boolean;
  /**
   * 等级
   */
  level?: number;

  /**
   * 第一层级奖励
   */
  layer1?: number;

  /**
   * 第二层级奖励
   */
  layer2?: number;

  /**
   * 第三层级奖励
   */
  layer3?: number;

  /**
   * 人数要求
   */
  persons?: number;

  /**
   * 流水要求
   */
  waterFlow?: number;
}

/**
 * 合伙人配置
 */
export interface PartnerConf {
  open: boolean;
  /**
   * 合伙人配置项列表
   */
  items?: PartnerConfItem[];
}

/**
 * 分享配置根对象
 */
export interface ShareConfig {
  /**
   * 分享链接
   */
  shareUrl?: string;
  jsonType?: string;

  lastTime: string,
  sendTime: string,
  /**
   * 联系方式1
   */
  phone1?: string;
  phone2?: string;
  name1?: string;
  name2?: string;

  /**
   * 分享配置详情
   */
  shareConf: ShareConf;

  /**
   * 合伙人配置详情
   */
  parterConf: PartnerConf;
}
