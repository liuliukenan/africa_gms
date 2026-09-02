import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { AgentDailyStatVO, AgentDailyStatParam } from './model/agentDailyStat';

/**
 * 分页查询代理日报表
 */
export async function pageAgentDailyStat(params: AgentDailyStatParam) {
  const res = await request.Post<ApiResult<PageResult<AgentDailyStatVO>>>(
    '/agentStat/agentDailyStat',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
