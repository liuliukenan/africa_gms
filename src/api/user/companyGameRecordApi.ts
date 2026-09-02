import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { CompanyGameRecord, CompanyGameRecordParam } from "./model/companyGameRecord";

/**
* 分页查询
*/
export async function pageCompanyGameRecords(params: CompanyGameRecordParam) {
const res = await request.Post<ApiResult<PageResult<CompanyGameRecord>>>(
    "/companyGameRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 导出游戏记录（宫睿版）
*/
// export async function exportCompanyGameRecords(params: CompanyGameRecordParam, filename: string) {
//   const res = await request.Post<ApiResult<PageResult<CompanyGameRecord>>>(
//     "/companyGameRecord/exportList",
//     params, {
//     headers: {
//       "filename": filename
//     },
//     responseType: 'blob'
//   });
//   return res;
// }
// 导出游戏记录
export async function exportCompanyGameRecords(params: CompanyGameRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<CompanyGameRecord>>>(
    "/companyGameRecord/list",
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
/**
* 导出
*/
export async function listCompanyGameRecord(params?: CompanyGameRecordParam) {
    const res = await request.Post<ApiResult<CompanyGameRecord[]>>("/companyGameRecord/exportList",
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
export async function getCompanyGameRecord(id: number) {
    const res = await request.Get<ApiResult<CompanyGameRecord>>("/companyGameRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addCompanyGameRecord(data: CompanyGameRecord) {
    const res = await request.Post<ApiResult<unknown>>("/companyGameRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateCompanyGameRecord(data: CompanyGameRecord) {
    const res = await request.Put<ApiResult<unknown>>("/companyGameRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeCompanyGameRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/companyGameRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeCompanyGameRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/companyGameRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
