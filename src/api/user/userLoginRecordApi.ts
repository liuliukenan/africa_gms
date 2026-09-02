import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserLoginRecord, UserLoginRecordParam } from "@/api/model/userLoginRecord";

/**
* 分页查询
*/
export async function pageUserLoginRecords(params: UserLoginRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserLoginRecord>>>('/userLoginEvent/list', params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 
/**
* 导出
*/
export async function exportUserLoginRecords(params: UserLoginRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<UserLoginRecord>>>(
    "/userLoginEvent/list",
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