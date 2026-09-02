import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { CompanyGame, CompanyGameParam } from "./model/companyGame";

/**
* 分页查询
*/
export async function pageCompanyGames(params: CompanyGameParam) {
const res = await request.Post<ApiResult<PageResult<CompanyGame>>>(
    "/companyGame/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function exportCompanyGame() {
    // const res = await request.Post<ApiResult<CompanyGame[]>>("/companyGame/export",
    // params
    // );
    // if (res.code === 0 && res.data) {
    //  return res.data;
    // }
    // return Promise.reject(new Error(res.message));
    return await request.Get<ApiResult<unknown>>('/companyGame/export', { responseType: 'blob' });
}

/**
* 根据id查询
*/
export async function getCompanyGame(id: number) {
    const res = await request.Get<ApiResult<CompanyGame>>("/companyGame/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addCompanyGame(data: CompanyGame) {
    const res = await request.Post<ApiResult<unknown>>("/companyGame", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateCompanyGame(data: CompanyGame) {
    const res = await request.Put<ApiResult<unknown>>("/companyGame", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeCompanyGame(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/companyGame/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeCompanyGames(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/companyGame/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
