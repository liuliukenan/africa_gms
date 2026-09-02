import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AgentProfit, AgentProfitParam } from "@/api/welfare/model/agentProfit";

/**
* 分页查询
*/
export async function pageAgentProfits(params: AgentProfitParam) {
const res = await request.Post<ApiResult<PageResult<AgentProfit>>>(
    "/agentProfit/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listAgentProfit(params?: AgentProfitParam) {
    const res = await request.Post<ApiResult<AgentProfit[]>>("/agentProfit/exportList",
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
export async function getAgentProfit(id: number) {
    const res = await request.Get<ApiResult<AgentProfit>>("/agentProfit/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAgentProfit(data: AgentProfit) {
    const res = await request.Post<ApiResult<unknown>>("/agentProfit", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAgentProfit(data: AgentProfit) {
    const res = await request.Put<ApiResult<unknown>>("/agentProfit", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAgentProfit(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/agentProfit/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 审核
export async function admitAgentProfit(id?: number) {
    const res = await request.Get<ApiResult<unknown>>("/agentProfit/admit/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAgentProfits(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/agentProfit/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
