import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { SmsTemplateVO, SmsTemplateQuery } from './model/smsTemplate';

/**
 * 分页查询 短信模板
 */
export async function pageSmsTemplates(params: SmsTemplateQuery) {
  const res = await request.Post<ApiResult<PageResult<SmsTemplateVO>>>(
    '/smsTemplate/list',
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
export async function listSmsTemplates(params?: SmsTemplateQuery) {
  const res = await request.Post<ApiResult<SmsTemplateVO[]>>(
    '/smsTemplate/exportList',
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
export async function getSmsTemplate(id: number) {
  const res = await request.Get<ApiResult<SmsTemplateVO>>('/smsTemplate/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addSmsTemplate(data: SmsTemplateVO) {
  const res = await request.Post<ApiResult<unknown>>('/smsTemplate', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateSmsTemplate(data: SmsTemplateVO) {
  const res = await request.Put<ApiResult<unknown>>('/smsTemplate', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 */
export async function removeSmsTemplate(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/smsTemplate/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 */
export async function removeSmsTemplates(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/smsTemplate/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 重载短信模板配置到服务器 */
export async function reloadSmsTemplate() {
  const res = await request.Post<ApiResult<unknown>>('/smsTemplate/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
