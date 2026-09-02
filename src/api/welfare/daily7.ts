import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { RegisterBonusRequest } from './model/registerGive';
// 获取
export async function getFirstPayGive(countryCode: number) {
  const res = await request.Get<ApiResult<RegisterBonusRequest>>('/act/signInAct', { params: { countryCode } });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存
export async function saveFirstPayGive(data: RegisterBonusRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/signInAct', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/act/signInAct/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 7天签到奖励记录
import type { Daily7RecordVO, Daily7RecordParam } from './model/daily7';

/** 分页查询7天签到奖励记录 */
export async function pageDaily7Record(data: Daily7RecordParam) {
  const res = await request.Post<ApiResult<PageResult<Daily7RecordVO>>>('/act/signInAct/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出7天签到奖励记录 */
export async function exportDaily7Record(params: Daily7RecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<Daily7RecordVO>>>('/act/signInAct/records', params,{
     headers: { export: true, filename: filename }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
