import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { RegisterDailyBonusConfigVO, RegisterDailyBonusConfigRequest, RegisterDailyBonusRecordVO, RegisterDailyBonusRecordParam } from './model/registerDailyBonus';

/** 获取注册后每日奖励配置 */
export async function getRegisterDailyBonusConfig(countryCode: number) {
  const res = await request.Get<ApiResult<RegisterDailyBonusConfigVO>>(`/act/registerDailyBonus/config/${countryCode}`);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/** 保存注册后每日奖励配置 */
export async function saveRegisterDailyBonusConfig(data: RegisterDailyBonusConfigRequest) {
  const res = await request.Put<ApiResult<boolean>>('/act/registerDailyBonus/config', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 发送配置到服务器 */
export async function reloadRegisterDailyBonusConfig() {
  const res = await request.Post<ApiResult<unknown>>('/act/actItem/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 分页查询注册后每日奖励记录 */
export async function pageRegisterDailyBonusRecords(data: RegisterDailyBonusRecordParam) {
  const res = await request.Post<ApiResult<PageResult<RegisterDailyBonusRecordVO>>>('/act/registerDailyBonus/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出注册后每日奖励记录 */
export async function exportRegisterDailyBonusRecords(params: RegisterDailyBonusRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<RegisterDailyBonusRecordVO>>>('/act/registerDailyBonus/records', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
