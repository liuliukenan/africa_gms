import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { PaymentRetention, PaymentRetentionParam } from "./model/payment";

/**
* 人数列表
*/
export async function pagePayment(params: PaymentRetentionParam) {
const res = await request.Post<ApiResult<PageResult<PaymentRetention>>>(
    "/stat/userPaymentRetentionStat/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 比率列表
*/
export async function pagePaymentRate(params: PaymentRetentionParam) {
const res = await request.Post<ApiResult<PageResult<PaymentRetention>>>(
    "/stat/userPaymentRetentionStat/listPercent",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 人数导出表
*/
export async function exportPayment(params: PaymentRetentionParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<PaymentRetention>>>(
    "/stat/userPaymentRetentionStat/list",
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
export async function exportPaymentRate(params: PaymentRetentionParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<PaymentRetention>>>(
    "/stat/userPaymentRetentionStat/listPercent",
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