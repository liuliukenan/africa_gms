import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { PaymentWithdraw, PaymentWithdrawParam } from "./model/paymentWithdraw";

/**
* 分页查询操作记录
*/
export async function pagePaymentWithdraw(params: PaymentWithdrawParam) {
const res = await request.Post<ApiResult<PageResult<PaymentWithdraw>>>(
    "/stat/paymentWithdrawUserStat/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出充提分析表
*/
export async function exportPaymentWithdraw(params: PaymentWithdrawParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<PaymentWithdraw>>>(
    "/stat/paymentWithdrawUserStat/list",
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