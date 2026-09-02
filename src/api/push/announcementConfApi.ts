import request from "@/utils/request";
import type { AnnouncementConf, AnnouncementConfParam } from "./model/announcementConf";
import {ApiResult, PageResult, PostTypeEnum} from "@/api/model";

/**
* 发送到服务器
*/
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/announcementConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
* 分页查询
*/
export async function pageAnnouncementConfs(params: AnnouncementConfParam) {
const res = await request.Post<ApiResult<PageResult<AnnouncementConf>>>(
    "/announcementConf/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listAnnouncementConf(params?: AnnouncementConfParam) {
    const res = await request.Post<ApiResult<AnnouncementConf[]>>("/announcementConf/exportList",
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
export async function getAnnouncementConf(id: number) {
    const res = await request.Get<ApiResult<AnnouncementConf>>("/announcementConf/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAnnouncementConf(data: AnnouncementConf) {
    const res = await request.Post<ApiResult<unknown>>("/announcementConf", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAnnouncementConf(data: AnnouncementConf) {
    const res = await request.Put<ApiResult<unknown>>("/announcementConf", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAnnouncementConf(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/announcementConf/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAnnouncementConfs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/announcementConf/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 导出Excel
export async function exportExcel() {
  return await request.Post<ApiResult<unknown>>('/announcementConf/exportExcel', {}, { responseType: 'blob' });
}

// 导入
export async function importExcel(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/announcementConf/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
