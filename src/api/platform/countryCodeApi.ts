import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { CountryCode, CountryCodeParam } from "@/api/platform/model/countryCode";

/**
* 分页查询
*/
export async function pageCountryCodes(params?: CountryCodeParam) {
// const res = await request.Post<ApiResult<PageResult<CountryCode>>>(
const res = await request.Post<ApiResult<CountryCode>>(
    "/countryCode/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listCountryCode(params?: CountryCodeParam) {
    const res = await request.Post<ApiResult<CountryCode[]>>("/countryCode/exportList",
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
export async function getCountryCode(id: number) {
    const res = await request.Get<ApiResult<CountryCode>>("/countryCode/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addCountryCode(data: CountryCode) {
    const res = await request.Post<ApiResult<unknown>>("/countryCode", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateCountryCode(data: CountryCode) {
    const res = await request.Put<ApiResult<unknown>>("/countryCode", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeCountryCode(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/countryCode/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeCountryCodes(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/countryCode/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/countryCode/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}