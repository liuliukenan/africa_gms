import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AgentPayCount, AgentPayCountParam } from "@/api/count/model/agentPayCount";

/**
* 分页查询
*/
export async function pageAgentPayCounts(params: AgentPayCountParam) {
const res = await request.Post<ApiResult<PageResult<AgentPayCount>>>(
    "/agentPayCount/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listAgentPayCount(params?: AgentPayCountParam) {
    const res = await request.Post<ApiResult<AgentPayCount[]>>("/agentPayCount/exportList",
    params
    );
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 根据id查询
*/
export async function getAgentPayCount(id: number) {
    const res = await request.Get<ApiResult<AgentPayCount>>("/agentPayCount/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAgentPayCount(data: AgentPayCount) {
    const res = await request.Post<ApiResult<unknown>>("/agentPayCount", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAgentPayCount(data: AgentPayCount) {
    const res = await request.Put<ApiResult<unknown>>("/agentPayCount", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAgentPayCount(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/agentPayCount/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAgentPayCounts(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/agentPayCount/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
