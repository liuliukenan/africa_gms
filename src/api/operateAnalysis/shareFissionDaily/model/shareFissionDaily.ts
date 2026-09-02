import { PageParam } from '@/api/model';

/**
 * 分享裂变每日报表VO
 */
export interface ShareFissionDailyVO {
  /** 统计日期 */
  statDate?: string;
  /** 活跃人数 */
  activeUserCount?: number;
  /** 有邀请到成功注册的人数去重 */
  inviteSuccessUserCount?: number;
  /** 注册人数 */
  registerCount?: number;
  /** 新增充值人数 */
  newRechargeUserCount?: number;
  /** 新增充值金额 */
  newRechargeAmount?: number;
  /** 充值人数 */
  rechargeUserCount?: number;
  /** 充值金额 */
  rechargeAmount?: number;
  /** 提现人数 */
  withdrawUserCount?: number;
  /** 提现金额 */
  withdrawAmount?: number;
  /** 参与率 */
  participationRate?: string;
  /** 裂变率 */
  fissionRate?: number;
  /** 新增人均充值金额 */
  newRechargePerCapita?: number;
  /** 新增付费率 */
  newPayRate?: string;
  /** 人均充值金额 */
  rechargePerCapita?: number;
  /** 人均提现金额 */
  withdrawPerCapita?: number;
  /** 净充值额 */
  netRechargeAmount?: number;
  /** 盈余率 */
  surplusRate?: string;
}

/**
 * 分享裂变每日报表查询条件
 */
export interface ShareFissionDailyParam extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** 国家代码 */
  countryCode?: number;
  /** 渠道 */
  channel?: number;
}
