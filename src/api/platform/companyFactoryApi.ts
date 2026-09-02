import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { CompanyFactory, CompanyFactoryParam } from "./model/companyFactory";

/**
* 分页查询
*/
export async function pageCompanyFactorys(params: CompanyFactoryParam) {
const res = await request.Post<ApiResult<PageResult<CompanyFactory>>>(
    "/companyFactory/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listCompanyFactory(params?: CompanyFactoryParam) {
    const res = await request.Post<ApiResult<CompanyFactory[]>>("/companyFactory/exportList",
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
export async function getCompanyFactory(id: number) {
    const res = await request.Get<ApiResult<CompanyFactory>>("/companyFactory/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addCompanyFactory(data: CompanyFactory) {
    const res = await request.Post<ApiResult<unknown>>("/companyFactory", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateCompanyFactory(data: CompanyFactory) {
    const res = await request.Put<ApiResult<unknown>>("/companyFactory", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeCompanyFactory(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/companyFactory/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeCompanyFactorys(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/companyFactory/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
