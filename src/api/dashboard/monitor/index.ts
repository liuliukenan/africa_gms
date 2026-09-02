import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { UserCount, BrowserCount } from './model';
const BASE_URL = import.meta.env.BASE_URL;

/**
 * 获取中国地图geo数据
 */
export async function getChinaMapData() {
  const res = await request.Get<any>(
    BASE_URL + 'json/china-provinces.geo.json',
    { baseURL: '' }
  );
  if (res.data) {
    return res.data;
  }
  return Promise.reject(new Error('获取地图数据失败'));
}

/**
 * 获取用户分布数据
 */
export async function getUserCountList() {
  const res = await request.Get<ApiResult<UserCount[]>>(
    'https://cdn.eleadmin.com/20200610/monitor-user-count.json'
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 获取用户浏览器分布数据
 */
export async function getBrowserCountList() {
  const res = await request.Get<ApiResult<BrowserCount[]>>(
    'https://cdn.eleadmin.com/20200610/monitor-browser-count.json'
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
