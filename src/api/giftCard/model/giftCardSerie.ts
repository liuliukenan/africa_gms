import { PageParam } from '@/api/model/index';

/**
 * 礼包卡系列
 */
export interface GiftCardSerie {
  /**主键ID*/
  id?: number;
  /**系列名称*/
  name?: string;
  /**是否发放到主钱包: 0=钱包模板, 1=主钱包*/
  hasMaster?: boolean;
  /**钱包模板类型, has_master=0时必填*/
  walletType?: number;
  walletName?: string;
  /**礼品卡面额(货币金额)*/
  amount?: number;
  rechargeAmount?: number;
  /**流水倍数, 非负整数, 0=无流水要求*/
  flowMultiple?: number;
  /**领取策略: 1=永久一次, 2=每日一次*/
  useStrategy?: number;
  /**有效期类型(保留)*/
  validityType?: number;
  useType?: number;
  /**有效天数(保留)*/
  validityDays?: number;
  /**启用开始时间*/
  startDate?: string;
  /**启用结束时间*/
  endDate?: string;
  /**状态: 0=停用, 1=启用*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 礼包卡系列统计
 */
export interface GiftCardSerieStatVO {
  /** 系列ID */
  serieId?: number;
  /** 系列名称 */
  name?: string;
  /** 单张面额 */
  amount?: number;
  /** 使用策略：1=永久一次，2=每日一次 */
  useStrategy?: number;
  /** 总生成数 */
  totalGenerated?: number;
  /** 已核销数 */
  totalUsed?: number;
  /** 已作废数 */
  totalVoid?: number;
  /** 待使用数 */
  totalPending?: number;
  /** 生成总金额 */
  totalGeneratedAmount?: number;
  /** 核销总金额 */
  totalUsedAmount?: number;
  /** 作废总金额 */
  totalVoidAmount?: number;
  /** 待使用总金额 */
  totalPendingAmount?: number;
}

/**
 * 礼包卡系列查询条件
 */
export interface GiftCardSerieParam extends PageParam {
  /**系列名称*/
  name?: string;
  /**状态: 0=停用, 1=启用*/
  status?: number;
}

/**
 * 礼品卡系列统计分页查询
 */
export interface GiftCardSerieStatQuery extends PageParam {
  /** 系列名称（模糊搜索） */
  name?: string;
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
}
