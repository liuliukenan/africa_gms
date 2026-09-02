import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { WithdrawAutoAuditRuleVO, WithdrawAutoAuditRuleParam } from './model/auditWithdrawConf';

/** 查询所有规则 */
export async function listWithdrawAutoAuditRule(params?: WithdrawAutoAuditRuleParam) {
  const res = await request.Get<ApiResult<WithdrawAutoAuditRuleVO[]>>(
    '/withdraw/autoAuditRule/list',
    { params }
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 修改审核提现配置 */
export async function updateWithdrawAutoAuditRule(data: WithdrawAutoAuditRuleVO) {
  const res = await request.Put<ApiResult<object>>(
    '/withdraw/autoAuditRule',
    data
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
