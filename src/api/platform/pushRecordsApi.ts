import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { VipPushTaskVO, VipPushTaskParam } from './model/pushRecords';

/** 分页查询VIP推送任务记录 */
export async function pageVipPushTasks(params: VipPushTaskParam) {
  const res = await request.Post<ApiResult<PageResult<VipPushTaskVO>>>(
    '/vip/pushRecords',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出VIP推送任务记录 */
export async function exportVipPushTasks(params: VipPushTaskParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<VipPushTaskVO>>>(
    '/vip/pushRecords',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
