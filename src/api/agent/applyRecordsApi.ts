import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ApplyRecords, ApplyRecordsParam } from "./model/applyRecords";

/**
* 分页查询
*/
export async function pageApplyRecords(params: ApplyRecordsParam) {
const res = await request.Post<ApiResult<PageResult<ApplyRecords>>>(
    "/agent/listAgentApplyRecord",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

export async function exportApplyRecords(params: ApplyRecordsParam, filename: string) {
    const res = await request.Post<ApiResult<PageResult<ApplyRecords>>>(
        "/agent/listAgentApplyRecord",
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

export async function auditAgent(data: ApplyRecords) {
    const res = await request.Post<ApiResult<unknown>>("/agent/auditAgentApply", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 修改代理佣金模式
export async function updateAgentCommissionMode(data: ApplyRecords) {
    const res = await request.Post<ApiResult<unknown>>("/agent/updateAgentCommissionMode", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}