import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ServiceStaff, ServiceStaffParam } from "@/api/model/serviceStaff";

/**
* 分页查询
*/
export async function pageServiceStaffs(params: ServiceStaffParam) {
const res = await request.Post<ApiResult<PageResult<ServiceStaff>>>(
    "/serviceStaff/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listServiceStaff(params?: ServiceStaffParam) {
    const res = await request.Post<ApiResult<ServiceStaff[]>>("/serviceStaff/exportList",
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
export async function getServiceStaff(id: number) {
    const res = await request.Get<ApiResult<ServiceStaff>>("/serviceStaff/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addServiceStaff(data: ServiceStaff) {
    const res = await request.Post<ApiResult<unknown>>("/serviceStaff", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateServiceStaff(data: ServiceStaff) {
    const res = await request.Put<ApiResult<unknown>>("/serviceStaff", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeServiceStaff(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/serviceStaff/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeServiceStaffs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/serviceStaff/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
