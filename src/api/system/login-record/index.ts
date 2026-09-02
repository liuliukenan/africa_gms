import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { LoginRecord, LoginRecordParam } from './model';

/**
 * 分页查询登录日志
 */
export async function pageLoginRecords(params: LoginRecordParam) {
  const res = await request.Get<ApiResult<PageResult<LoginRecord>>>(
    '/system/login-record/page',
    { params }
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询登录日志列表
 */
export async function listLoginRecords(params?: LoginRecordParam) {
  const res = await request.Get<ApiResult<LoginRecord[]>>(
    '/system/login-record',
    { params }
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
