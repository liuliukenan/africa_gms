import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { VipRewardRecordVO, VipRewardRecordParam } from './model/rewardRecords';

/** 分页查询VIP奖励记录 */
export async function pageVipRewardRecords(params: VipRewardRecordParam) {
  const res = await request.Post<ApiResult<PageResult<VipRewardRecordVO>>>(
    '/vip/rewardRecords',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出VIP奖励记录 */
export async function exportVipRewardRecords(params: VipRewardRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<VipRewardRecordVO>>>(
    '/vip/rewardRecords',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
