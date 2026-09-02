import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Operation, OperationParam } from "./model/operation";

/**
* 分页查询操作记录
*/
export async function pageOperations(params: OperationParam) {
  const res = await request.Post<ApiResult<PageResult<Operation>>>(
    "/stat/userStat/list",
    params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 导出运营数据表
export async function exportOperations(params: OperationParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<Operation>>>(
    "/stat/userStat/list",
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