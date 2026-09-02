import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { RegisterBonusRequest } from './model/registerGive';
// 复购奖励记录
import type { RepayRecordVO, RepayRecordParam, ActPushTaskVO, ActPushTaskParam } from './model/repay';
// 获取
export async function getRepay(countryCode: number) {
  const res = await request.Get<ApiResult<RegisterBonusRequest>>('/act/repay', { params: { countryCode } });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存
export async function saveRepay(data: RegisterBonusRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/repay', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/act/repay/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 分页查询复购奖励记录 */
export async function pageRepayRecord(data: RepayRecordParam) {
  const res = await request.Post<ApiResult<PageResult<RepayRecordVO>>>('/act/repay/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出复购奖励记录 */
export async function exportRepayRecord(params: RepayRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<RepayRecordVO>>>('/act/repay/records', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/** 分页查询推送任务记录 */
export async function pagePushTask(data: ActPushTaskParam) {
  const res = await request.Post<ApiResult<PageResult<ActPushTaskVO>>>('/act/repay/pushTasks', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出推送任务记录 */
export async function exportPushTask(params: ActPushTaskParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ActPushTaskVO>>>('/act/repay/pushTasks', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
