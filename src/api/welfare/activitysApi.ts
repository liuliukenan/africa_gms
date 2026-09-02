import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import { RegisterBonusRequest } from './model/registerGive';
// 获取
export async function getActInfo(params:{countryCode: number,actTypeEnum: string}) {
  const res = await request.Get<ApiResult<RegisterBonusRequest>>('/act/actItem/getInfo', { params});
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存
export async function saveActInfo(data: RegisterBonusRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/actItem/save', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendActInfoServer() {
  const res = await request.Post<ApiResult<unknown>>('/act/actItem/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}