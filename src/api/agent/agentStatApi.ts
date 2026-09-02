import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type {
  AgentStatVO,
  AgentStatParam,
  AgentStatDetailVO,
  AgentStatDetailParam,
  AgentUserStatDetailVO,
  AgentUserStatDetailParam
} from './model/agentStat';

/**
 * 分页查询代理统计
 */
export async function pageAgentStat(params: AgentStatParam) {
  const res = await request.Post<ApiResult<PageResult<AgentStatVO>>>(
    '/agentStat/agentStat',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 分页查询下级代理业绩详情
 */
export async function pageAgentStatDetail(params: AgentStatDetailParam) {
  const res = await request.Post<ApiResult<PageResult<AgentStatDetailVO>>>(
    '/agentStat/agentStatDetail',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 导出下级代理
 */
export async function exportAgentStatDetail(params: AgentStatDetailParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<AgentStatDetailVO>>>(
    "/agentStat/agentStatDetail",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 分页查询下级代理玩家业绩详情
 */
export async function pageAgentUserStatDetail(params: AgentUserStatDetailParam) {
  const res = await request.Post<ApiResult<PageResult<AgentUserStatDetailVO>>>(
    '/agentStat/agentUserStatDetail',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 导出下级玩家
 */
export async function exportAgentUserStatDetail(params: AgentUserStatDetailParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<AgentUserStatDetailVO>>>(
    "/agentStat/agentUserStatDetail",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}