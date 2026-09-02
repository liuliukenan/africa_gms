import request from '@/utils/request';
import type { ApiResult } from '@/api/model';

/**
 * Bitcom配置
 */
export interface BitcomConfItem {
  key?: string;
  address?: string;
  isEdit?: boolean;
}

export interface BitcomConf {
  bitcomConfList?: BitcomConfItem[];
}

// 获取Bitcom配置
export async function getBitcomConf() {
  const res = await request.Get<ApiResult<BitcomConf>>('/sysConf/getBitcomConf');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 保存Bitcom配置
export async function saveBitcomConf(params: BitcomConf) {
  const res = await request.Post<ApiResult<unknown>>('/sysConf/saveBitcomConf', params);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
