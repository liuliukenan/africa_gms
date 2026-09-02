import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { CompanyTransferOrder, CompanyTransferOrderParam, CompanyTransferOrderRefundVO } from "./model/companyTransferOrder";

/**
* 分页查询
*/
export async function pageCompanyTransferOrders(params: CompanyTransferOrderParam) {
const res = await request.Post<ApiResult<PageResult<CompanyTransferOrder>>>(
    "/companyTransferOrder/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 导出
export async function exportCompanyTransferOrder(params: CompanyTransferOrderParam, filename: string) {
const res = await request.Post<ApiResult<PageResult<CompanyTransferOrder>>>(
    "/companyTransferOrder/list",
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
export async function listCompanyTransferOrder(params?: CompanyTransferOrderParam) {
    const res = await request.Post<ApiResult<CompanyTransferOrder[]>>("/companyTransferOrder/exportList",
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
export async function getCompanyTransferOrder(id: number) {
    const res = await request.Get<ApiResult<CompanyTransferOrder>>("/companyTransferOrder/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addCompanyTransferOrder(data: CompanyTransferOrder) {
    const res = await request.Post<ApiResult<unknown>>("/companyTransferOrder", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateCompanyTransferOrder(data: CompanyTransferOrder) {
    const res = await request.Put<ApiResult<unknown>>("/companyTransferOrder", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeCompanyTransferOrder(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/companyTransferOrder/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeCompanyTransferOrders(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/companyTransferOrder/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 三方游戏转出失败退款
 */
export async function refundCompanyTransferOrder(data: CompanyTransferOrderRefundVO) {
  const res = await request.Post<ApiResult<unknown>>("/companyTransferOrder/refund", data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
