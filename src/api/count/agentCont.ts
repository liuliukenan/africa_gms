import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Agent, AgentParam } from './model';

/**
 * 获取统计数据
 */
export async function getCountData(params:AgentParam) {
  const res = await request.Post<ApiResult<PageResult<Agent>>>('/agentCount/getTotal',params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function pageAgentData(params?: AgentParam) {
  const res = await request.Post<ApiResult<PageResult<Agent>>>('/agentCount/list', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
