import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { AgentSettleRecordVO, AgentSettleRecordParam } from './model/agentSettleRecord';

/** 分页查询代理结算记录 */
export async function pageAgentSettleRecord(params: AgentSettleRecordParam) {
  const res = await request.Post<ApiResult<PageResult<AgentSettleRecordVO>>>(
    '/agent/listAgentSettleRecord',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出代理结算记录 */
export async function exportAgentSettleRecord(params: AgentSettleRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<AgentSettleRecordVO>>>(
    '/agent/listAgentSettleRecord',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
