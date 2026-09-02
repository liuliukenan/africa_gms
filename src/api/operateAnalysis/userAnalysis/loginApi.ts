import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { LoginRetention, LoginRetentionParam } from "./model/login";
import { PaymentWithdraw } from "../economicAnalysis/model/paymentWithdraw";

/**
* 分页查询操作记录
*/
export async function pageUserLoginRetention(params: LoginRetentionParam) {
const res = await request.Post<ApiResult<PageResult<LoginRetention>>>(
    "/stat/userLoginRetentionStat/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
export async function pageUserLoginRetentionRate(params: LoginRetentionParam) {
const res = await request.Post<ApiResult<PageResult<LoginRetention>>>(
    "/stat/userLoginRetentionStat/listPercent",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 人数导出表
*/
export async function exportLoginRetention(params: LoginRetentionParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<LoginRetention>>>(
    "/stat/userLoginRetentionStat/list",
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
// 比率导出表
export async function exportLoginRetentionRate(params: LoginRetentionParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<LoginRetention>>>(
    "/stat/userLoginRetentionStat/listPercent",
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