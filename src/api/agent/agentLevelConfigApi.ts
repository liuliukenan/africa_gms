import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AgentCommissionConf, AgentLevelConfig, AgentLevelConfigParam } from "./model/agentLevelConfig";

/**
* 分页查询
*/
export async function pageAgentLevelConfigs(params: AgentLevelConfigParam) {
const res = await request.Post<ApiResult<PageResult<AgentLevelConfig>>>(
    "/agentConfig/listAgentLevelConfig",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 根据id查询
*/
export async function getAgentLevelConfig(id: number) {
    const res = await request.Get<ApiResult<AgentLevelConfig>>("/agentConfig/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 获取代理分润配置
export async function getCommissionConf(agentCommissionModel: number) {
    const res = await request.Get<ApiResult<AgentCommissionConf>>(`/agentConfig/getAgentCommissionConf/${agentCommissionModel}`);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 保存代理分润配置
export async function saveCommissionConf(data: AgentCommissionConf) {
    const res = await request.Post<ApiResult<unknown>>("/agentConfig/saveAgentCommissionConf", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 添加
*/
export async function addAgentLevelConfig(data: AgentLevelConfig) {
    const res = await request.Post<ApiResult<unknown>>("/agentConfig/createAgentLevelConfig", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAgentLevelConfig(data: AgentLevelConfig) {
    const res = await request.Post<ApiResult<unknown>>("/agentConfig/updateAgentLevelConfig", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAgentLevelConfig(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/agentConfig/deleteAgentLevelConfig/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAgentLevelConfigs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/agentConfig/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
