import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AnnouncementRun, AnnouncementRunParam } from "./model/announcementRun";

/**
* 分页查询
*/
export async function pageAnnouncementRuns(params: AnnouncementRunParam) {
const res = await request.Post<ApiResult<PageResult<AnnouncementRun>>>(
    "/announcementRun/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/announcementRun/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listAnnouncementRun(params?: AnnouncementRunParam) {
    const res = await request.Post<ApiResult<AnnouncementRun[]>>("/announcementRun/exportList",
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
export async function getAnnouncementRun(id: number) {
    const res = await request.Get<ApiResult<AnnouncementRun>>("/announcementRun/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAnnouncementRun(data: AnnouncementRun) {
    const res = await request.Post<ApiResult<unknown>>("/announcementRun", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAnnouncementRun(data: AnnouncementRun) {
    const res = await request.Put<ApiResult<unknown>>("/announcementRun", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAnnouncementRun(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/announcementRun/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAnnouncementRuns(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/announcementRun/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
