import request from "@/utils/request";
import { PostTypeEnum, type ApiResult, type PageResult } from "@/api/model";
import type { GlobalMailAssignUser, GlobalMailAssignUserParam } from "./model/globalMailAssignUser";

/**
* 分页查询
*/
export async function pageGlobalMailAssignUsers(params: GlobalMailAssignUserParam) {
const res = await request.Post<ApiResult<PageResult<GlobalMailAssignUser>>>(
    "/globalMailAssignUser/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 导入
export async function uploadGlobalMailAssignUsers(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/globalMailAssignUser/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function exportExcelGlobalMails() {
  return await request.Post<ApiResult<unknown>>('/globalMailAssignUser/exportExcel', {}, { responseType: 'blob' });
}


/**
* 导出
*/
export async function listGlobalMailAssignUser(params?: GlobalMailAssignUserParam) {
    const res = await request.Post<ApiResult<GlobalMailAssignUser[]>>("/globalMailAssignUser/exportList",
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
export async function getGlobalMailAssignUser(id: number) {
    const res = await request.Get<ApiResult<GlobalMailAssignUser>>("/globalMailAssignUser/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGlobalMailAssignUser(data: GlobalMailAssignUser) {
    const res = await request.Post<ApiResult<unknown>>("/globalMailAssignUser", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGlobalMailAssignUser(data: GlobalMailAssignUser) {
    const res = await request.Put<ApiResult<unknown>>("/globalMailAssignUser", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGlobalMailAssignUser(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/globalMailAssignUser/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGlobalMailAssignUsers(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/globalMailAssignUser/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
