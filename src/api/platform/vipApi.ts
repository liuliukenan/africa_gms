import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { VipConfigListVO, VipConfigListParam } from './model/vip';

/** VIP基础配置DTO */
export interface VipBaseConfigDTO {
  /** 国家代码 */
  countryCode: number;
  /** 周奖励结算日：1=周一，7=周日 */
  weeklyRewardSettlementDay: number;
  /** 周奖励领取保留天数 */
  weeklyRewardClaimRetentionDays: number;
  /** 月奖励结算日：1-31 */
  monthlyRewardSettlementDay: number;
  /** 月奖励领取保留天数 */
  monthlyRewardClaimRetentionDays: number;
  /** 每日流水返利结算时间（hh:mm） */
  dailyTurnoverRebateSettlementTime: string;
  /** 每周损失返利结算日：1=周一，7=周日 */
  weeklyLossRebateSettlementDay: number;
  /** 专属客服开放等级 */
  exclusiveCustomerServiceLevel: number;
  exclusiveCustomerServiceUrl: string;
}

/** 更新VIP基础配置 */
export async function updateVipBaseConfig(data: VipBaseConfigDTO) {
  const res = await request.Put<ApiResult<boolean>>(
    '/vip/baseConfig',
    data
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/** 获取VIP基础配置 */
export async function getVipBaseConfig(params: { countryCode: number }) {
  const res = await request.Get<ApiResult<VipBaseConfigDTO>>(
    '/vip/baseConfig',
    { params }
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 获取VIP配置列表 */
export async function getVipConfigList(params: VipConfigListParam) {
  const res = await request.Get<ApiResult<VipConfigListVO[]>>(
    '/vip/list',
    { params }
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 发送到服务器 */
export async function reloadVipConfig() {
const res = await request.Put<ApiResult<unknown>>('/vip/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 保存VIP配置 */
export async function saveVipConfig(data: any) {
  const res = await request.Put<ApiResult<boolean>>(
    '/vip/vipLevelConfig',
    data
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/** 获取VIP配置详情 */
export async function getVipConfigDetail(id: number) {
  const res = await request.Get<ApiResult<any>>(
    `/vip/vipLevelConfig/${id}`
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}
