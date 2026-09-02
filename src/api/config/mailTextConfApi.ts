import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { MailTextConf, MailTextConfParam } from '@/api/config/model/mailTextConf';


/**
 * 分页查询
 */
export async function pageMailTextConfs(params: MailTextConfParam) {
  const res = await request.Post<ApiResult<PageResult<MailTextConf>>>('/mailTextConf/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/mailTextConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 导出
 */
export async function listMailTextConf(params?: MailTextConfParam) {
  const res = await request.Post<ApiResult<MailTextConf[]>>('/mailTextConf/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getMailTextConf(id: number) {
  const res = await request.Get<ApiResult<MailTextConf>>('/mailTextConf/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addMailTextConf(data: MailTextConf) {
  const res = await request.Post<ApiResult<unknown>>('/mailTextConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateMailTextConf(data: MailTextConf) {
  const res = await request.Put<ApiResult<unknown>>('/mailTextConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeMailTextConf(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/mailTextConf/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
