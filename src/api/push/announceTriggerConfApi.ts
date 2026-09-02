import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { AnnounceTriggerConf, AnnounceTriggerConfParam } from "./model/announceTriggerConf";

/**
* 分页查询
*/
export async function pageAnnounceTriggerConfs(params?: AnnounceTriggerConfParam) {
const res = await request.Post<ApiResult<AnnounceTriggerConf[]>>(
    "/announceTriggerConf/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/announceTriggerConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listAnnounceTriggerConf(params?: AnnounceTriggerConfParam) {
    const res = await request.Post<ApiResult<AnnounceTriggerConf[]>>("/announceTriggerConf/exportList",
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
export async function getAnnounceTriggerConf(id: number) {
    const res = await request.Get<ApiResult<AnnounceTriggerConf>>("/announceTriggerConf/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 获取跑马灯开关配置
export async function getAnnounceSwitchConf() {
    const res = await request.Get<ApiResult<AnnounceTriggerConf>>("/sysConf/getAnnounceSwitchConf");
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addAnnounceTriggerConf(data: AnnounceTriggerConf) {
    const res = await request.Post<ApiResult<unknown>>("/announceTriggerConf", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 保存跑马灯开关配置
export async function saveAnnounceSwitchConf(data: AnnounceTriggerConf) {
    const res = await request.Post<ApiResult<unknown>>("/sysConf/saveAnnounceSwitchConf", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateAnnounceTriggerConf(data: AnnounceTriggerConf) {
    const res = await request.Put<ApiResult<unknown>>("/announceTriggerConf", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeAnnounceTriggerConf(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/announceTriggerConf/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeAnnounceTriggerConfs(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/announceTriggerConf/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
