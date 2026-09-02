
import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import { FirstPayGive } from "./model/firstPayGive";
// 获取
export async function getFirstPayGiveApi() {
    const res = await request.Get<ApiResult<FirstPayGive>>("/act/firstPay");
    if (res.code === 0 && res.data) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 保存
export async function saveFirstPayGiveApi(data: FirstPayGive) {
    const res = await request.Post<ApiResult<unknown>>("/act/firstPay", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/act/firstPay/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 首充奖励记录
import type { FirstPayRecordVO, FirstPayRecordParam } from './model/firstPayGive';

/** 分页查询首充奖励记录 */
export async function pageFirstPayRecord(data: FirstPayRecordParam) {
  const res = await request.Post<ApiResult<PageResult<FirstPayRecordVO>>>('/act/firstPay/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出首充奖励记录 */
export async function exportFirstPayRecord(params: FirstPayRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<FirstPayRecordVO>>>('/act/firstPay/records', {
    params,
    headers: { export: true, filename }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}