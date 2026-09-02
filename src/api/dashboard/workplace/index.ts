import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { BaseData, GameData, GameDataParam, RetentionData, DashboardFundVO, DashboardRechargeWithdrawVO, DashboardBonusVO, DashboardFundRiskVO, DashboardUserConversionVO } from '../model/workplace';
// 获取看板基本数据
export async function getBaseDataApi(data: { type: number, countryCode: number }) {
  const res = await request.Get<ApiResult<BaseData>>('/dashboard/dashboardBaseData', { params: data });
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取资金真实性数据
export async function getFundDataApi(data: { type: number; countryCode?: number }) {
  const res = await request.Get<ApiResult<DashboardFundVO>>('/dashboard/dashboardFundData', { params: data });
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取充提结构数据
export async function getRechargeWithdrawDataApi(data: { type: number; countryCode?: number }) {
  const res = await request.Get<ApiResult<DashboardRechargeWithdrawVO>>('/dashboard/dashboardRechargeWithdrawData', { params: data });
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取资金安全异常数据
export async function getFundRiskDataApi(data: { type: number; countryCode?: number }) {
  const res = await request.Get<ApiResult<DashboardFundRiskVO>>('/dashboard/dashboardFundRiskData', { params: data });
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取Bonus健康数据
export async function getBonusDataApi(data: { type: number; countryCode?: number }) {
  const res = await request.Get<ApiResult<DashboardBonusVO>>('/dashboard/dashboardBonusData', { params: data });
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取用户转化数据
export async function getUserConversionDataApi(data: { type: number; countryCode?: number }) {
  const res = await request.Get<ApiResult<DashboardUserConversionVO>>('/dashboard/dashboardUserConversionData', { params: data });
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取留存数据
export async function retentionDataApi(params: { countryCode: number }) {
  const res = await request.Post<ApiResult<RetentionData>>('/dashboard/dashboardRetentionData', params);
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取游戏数据
export async function gameDataApi(params: GameDataParam) {
  const res = await request.Post<ApiResult<GameData[]>>('/dashboard/dashboardGameData', params);
  if (res.code == 0) {
    return res?.data;
  }
  return Promise.reject(new Error(res.message));
}

