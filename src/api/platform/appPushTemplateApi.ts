import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { AppPushTemplateVO, AppPushTemplateQuery } from './model/appPushTemplate';

/**
 * 分页查询 APP Push 推送模板
 */
export async function pageAppPushTemplates(params: AppPushTemplateQuery) {
  const res = await request.Post<ApiResult<PageResult<AppPushTemplateVO>>>(
    '/appPushTemplate/list',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listAppPushTemplates(params?: AppPushTemplateQuery) {
  const res = await request.Post<ApiResult<AppPushTemplateVO[]>>(
    '/appPushTemplate/exportList',
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
export async function getAppPushTemplate(id: number) {
  const res = await request.Get<ApiResult<AppPushTemplateVO>>('/appPushTemplate/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addAppPushTemplate(data: AppPushTemplateVO) {
  const res = await request.Post<ApiResult<unknown>>('/appPushTemplate', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateAppPushTemplate(data: AppPushTemplateVO) {
  const res = await request.Put<ApiResult<unknown>>('/appPushTemplate', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 */
export async function removeAppPushTemplate(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/appPushTemplate/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 */
export async function removeAppPushTemplates(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/appPushTemplate/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 重载 APP Push 模板配置到服务器 */
export async function reloadAppPushTemplate() {
  const res = await request.Post<ApiResult<unknown>>('/appPushTemplate/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
