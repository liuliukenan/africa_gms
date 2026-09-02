import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Company, CompanyParam } from "./model/company";

/**
* 分页查询
*/
export async function pageCompanys(params: CompanyParam) {
const res = await request.Post<ApiResult<PageResult<Company>>>(
    "/company/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/company/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listCompany(params?: CompanyParam) {
    const res = await request.Post<ApiResult<Company[]>>("/company/exportList",
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
export async function getCompany(id: number) {
    const res = await request.Get<ApiResult<Company>>("/company/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addCompany(data: Company) {
    const res = await request.Post<ApiResult<unknown>>("/company", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateCompany(data: Company) {
    const res = await request.Put<ApiResult<unknown>>("/company", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeCompany(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/company/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeCompanys(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/company/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
