import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { PayNumData, SaleroomResult, VisitData, CloudData } from './model';

/**
 * 获取支付笔数数据
 */
export async function getPayNumList() {
  const res = await request.Get<ApiResult<PayNumData[]>>(
    'https://cdn.eleadmin.com/20200610/analysis-pay-num.json'
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 获取销售量数据
 */
export async function getSaleroomList() {
  const res = await request.Get<ApiResult<SaleroomResult>>(
    'https://cdn.eleadmin.com/20200610/analysis-saleroom.json'
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 获取最近 1 小时访问情况数据
 * @returns {Promise<Object>}
 */
export async function getVisitHourList() {
  const res = await request.Get<ApiResult<VisitData[]>>(
    'https://cdn.eleadmin.com/20200610/analysis-visits.json'
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 获取词云数据
 */
export async function getWordCloudList() {
  const res = await request.Get<ApiResult<CloudData[]>>(
    'https://cdn.eleadmin.com/20200610/analysis-hot-search.json'
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
