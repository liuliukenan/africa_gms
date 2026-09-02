import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { TenTimesParam, TenTimesRecord, TenTimesRecordParam } from './model';
// 保存首日充值补偿配置
export async function saveTenTimes(data: TenTimesParam) {
    const res = await request.Post<ApiResult<unknown>>('/sysConf/savePay10Conf', data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
//首日充值补偿配置
export async function getTenTimes() {
    const res = await request.Get<ApiResult<TenTimesParam>>('/sysConf/getPay10Conf');
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

export async function pageTenTimesRecord(params?: TenTimesRecordParam) {
  const res = await request.Post<ApiResult<PageResult<TenTimesRecord>>>('/user10ActRecord/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}