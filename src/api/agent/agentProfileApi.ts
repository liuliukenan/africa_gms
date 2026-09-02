import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AgentProfile, AgentProfileParam } from "./model/agentProfile";

/**
* 分页查询
*/
export async function pageAgentProfiles(params: AgentProfileParam) {
const res = await request.Post<ApiResult<PageResult<AgentProfile>>>(
    "/agent/listAgent",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 重置谷歌验证码
export async function resetAgentGoogle(agentId: number) {
    const res = await request.Post<ApiResult<AgentProfile>>("/agent/resetGoogleVerification/" + agentId);
     if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 更新谷歌验证码
export async function updateAgentGoogle(params:AgentProfileParam) {
    const res = await request.Post<ApiResult<AgentProfile>>("/agent/updateGoogleVerificationStatus",params );
     if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listAgentProfile(params?: AgentProfileParam) {
    const res = await request.Post<ApiResult<AgentProfile[]>>("/agent/exportList",
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
export async function getAgentProfile(id: number) {
    const res = await request.Get<ApiResult<AgentProfile>>("/agent/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAgentProfile(data: AgentProfile) {
    const res = await request.Post<ApiResult<unknown>>("/agent", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 修改状态
*/
export async function updateAgentStatus(data: AgentProfile) {
    const res = await request.Post<ApiResult<unknown>>("/agent/updateAgentStatus", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAgentProfile(data: AgentProfile) {
    const res = await request.Put<ApiResult<unknown>>("/agent", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAgentProfile(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/agent/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAgentProfiles(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/agent/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
