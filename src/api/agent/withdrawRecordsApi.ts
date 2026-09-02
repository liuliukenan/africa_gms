import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { WithdrawRecord, WithdrawRecordParam } from './model/withdrawRecords';

/**
 * 分页查询提现订单列表
 */
export async function pageWithdrawRecords(params: WithdrawRecordParam) {
  const res = await request.Post<ApiResult<PageResult<WithdrawRecord>>>(
    '/agent/listAgentWithdrawRecords',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 审核提现订单
export async function auditWithdrawRecord(data: WithdrawRecordParam) {
    const res = await request.Post<ApiResult<unknown>>("/agent/auditAgentWithdraw", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}