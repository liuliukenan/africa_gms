import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserGift, UserGiftRecord, UserGiftRecordParam } from "@/api/welfare/model/userGiftRecord";

/**
* 分页查询
*/
export async function pageUserGiftRecords(params: UserGiftRecordParam) {
const res = await request.Post<ApiResult<PageResult<UserGiftRecord>>>(
    "/userGiftRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserGiftRecord(params?: UserGiftRecordParam) {
    const res = await request.Post<ApiResult<UserGiftRecord[]>>("/userGiftRecord/exportList",
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
export async function getUserGiftRecord(id: number) {
    const res = await request.Get<ApiResult<UserGiftRecord>>("/userGiftRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

// 获取
export async function getUserGift() {
    const res = await request.Get<ApiResult<UserGift>>("/sysConf/getUserGiftConf");
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserGiftRecord(id: number) {
    const res = await request.Get<ApiResult<unknown>>(`/userGiftRecord/add/${id}`);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 保存
export async function saveUserGift(data: UserGift) {
    const res = await request.Post<ApiResult<unknown>>("/sysConf/saveUserGiftConf", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserGiftRecord(data: UserGiftRecord) {
    const res = await request.Put<ApiResult<unknown>>("/userGiftRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserGiftRecord(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userGiftRecord/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeUserGiftRecords(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/userGiftRecord/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// userGiftRecord/listExport
export async function exportUserGift(params?: UserGiftRecordParam) {
  return await request.Post<ApiResult<unknown>>('userGiftRecord/listExport', params, { responseType: 'blob' });
}