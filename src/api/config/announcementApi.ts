import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Announcement, AnnouncementParam } from "@/api/model/announcement";

/**
* 分页查询
*/
export async function pageAnnouncements(params: AnnouncementParam,type?: number) {
const res = await request.Post<ApiResult<PageResult<Announcement>>>(
    "/announcement/list/"+type,
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listAnnouncement(params?: AnnouncementParam) {
    const res = await request.Post<ApiResult<Announcement[]>>("/announcement/exportList",
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
export async function getAnnouncement(id: number) {
    const res = await request.Get<ApiResult<Announcement>>("/announcement/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAnnouncement(data: Announcement) {
    const res = await request.Post<ApiResult<unknown>>("/announcement", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAnnouncement(data: Announcement) {
    const res = await request.Put<ApiResult<unknown>>("/announcement", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAnnouncement(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/announcement/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAnnouncements(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/announcement/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
