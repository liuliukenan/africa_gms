import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AgentUserProfile, AgentUserProfileParam } from "./model/agentUserProfile";

/**
* 分页查询
*/
export async function pageAgentUserProfiles(params: AgentUserProfileParam) {
const res = await request.Post<ApiResult<PageResult<AgentUserProfile>>>(
    "/agent/listUser",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listAgentUserProfile(params?: AgentUserProfileParam) {
    const res = await request.Post<ApiResult<AgentUserProfile[]>>("/agent/exportList",
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
export async function getAgentUserProfile(id: number) {
    const res = await request.Get<ApiResult<AgentUserProfile>>("/agent/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAgentUserProfile(data: AgentUserProfile) {
    const res = await request.Post<ApiResult<unknown>>("/agent", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAgentUserProfile(data: AgentUserProfile) {
    const res = await request.Put<ApiResult<unknown>>("/agent", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAgentUserProfile(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/agent/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAgentUserProfiles(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/agent/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
