import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { AgentEventConfig, AgentEventConfigQuery } from './model/eventConfig';

/**
 * 分页查询代理事件配置列表
 */
export async function listAgentEventConfig(params: AgentEventConfigQuery) {
  const res = await request.Post<ApiResult<PageResult<AgentEventConfig>>>(
    '/agentConfig/listAgentEventConfig',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  throw new Error(res.message || '请求失败');
}