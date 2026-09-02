import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { ProfitModeDistribution, GeneralAgentTop10, NormalAgentTop10, RecentInfo, AgentOverviewParam, CumulativeInfo } from './model/agentOverview';

/**
 * 近期数据概览
 */
export async function getRecentInfo(params: AgentOverviewParam) {
    const res = await request.Post<ApiResult<RecentInfo>>(
        '/agentDashboard/recentInfo',
        params
    );
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 累计数据概览
export async function getCumulativeInfo(params: AgentOverviewParam) {
    const res = await request.Post<ApiResult<CumulativeInfo>>(
        '/agentDashboard/cumulativeInfo',
        params
    );
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 总代理-累计返利TOP10
export async function getGeneralAgentTop10(params: AgentOverviewParam) {
    const res = await request.Post<ApiResult<GeneralAgentTop10[]>>(
        '/agentDashboard/generalAgentTop10',
        params
    );
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 普通代理-累计返利TOP10
export async function getNormalAgentTop10(params: AgentOverviewParam) {
    const res = await request.Post<ApiResult<NormalAgentTop10[]>>(
        '/agentDashboard/normalAgentTop10',
        params
    );
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 利润模式分布
export async function getProfitModeDistribution(params: AgentOverviewParam) {
    const res = await request.Post<ApiResult<ProfitModeDistribution>>(
        '/agentDashboard/profitModeDistribution',
        params
    );
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}