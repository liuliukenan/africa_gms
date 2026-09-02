import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { RegisterBonusRequest } from './model/registerGive';
// 获取
export async function getRegisterGive(countryCode: number) {
  const res = await request.Get<ApiResult<RegisterBonusRequest>>('/act/registerBonus', { params: { countryCode } });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存
export async function saveRegisterGive(data: RegisterBonusRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/registerBonus', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/act/registerBonus/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}


import type { RegisterRecordVO, RegisterRecordParam } from './model/registerGive';

/** 分页查询APK首次登录奖励记录 */
export async function pageApkLoginRecord(data: RegisterRecordParam) {
  const res = await request.Post<ApiResult<PageResult<RegisterRecordVO>>>('/act/apkLoginBonus/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出奖励记录 */
export async function exportApkLoginRecord(params: RegisterRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<RegisterRecordVO>>>('/act/apkLoginBonus/records', params,{
   headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
/** 分页查询推送记录 */
export async function pageApkLoginPushTask(data: any) {
  const res = await request.Post<ApiResult<PageResult<any>>>('/act/apkLoginBonus/pushTasks', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}
/** 导出推送记录 */
export async function exportApkLoginPushTask(params: any, filename: string) {
  const res = await request.Post<ApiResult<PageResult<any>>>('/act/apkLoginBonus/pushTasks', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

