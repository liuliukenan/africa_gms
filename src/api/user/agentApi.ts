import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Agent, AgentParam } from '@/api/model/agent';

/**
 * 分页查询
 */
export async function pageAgent(params?: AgentParam) {
  const res = await request.Post<ApiResult<PageResult<Agent>>>('/act/userParter/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateAgent(data: Agent) {
  const res = await request.Post<ApiResult<unknown>>('/act/userParter/updateRate', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除Agent
 */
// export async function removeAgent(id?: number) {
//     const res = await request.Delete<ApiResult<unknown>>("/user/" + id);
//     if (res.code === 0) {
//         return res.message;
//     }
//     return Promise.reject(new Error(res.message));
// }
/**
 * 添加
 */
export async function addAgent(data: AgentParam) {
  const res = await request.Post<ApiResult<unknown>>('/user/createAgent', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
