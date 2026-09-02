import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { LinkStatDaily, LinkStatDailyParam } from '@/api/platform/model/linkStatDaily';

/**
 * 分页查询
 */
export async function pageLinkStatDailys(params: LinkStatDailyParam) {
  const res = await request.Post<ApiResult<PageResult<LinkStatDaily>>>('/linkStatDaily/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listLinkStatDaily(params?: LinkStatDailyParam) {
  const res = await request.Post<ApiResult<LinkStatDaily[]>>('/linkStatDaily/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getLinkStatDaily(id: number) {
  const res = await request.Get<ApiResult<LinkStatDaily>>('/linkStatDaily/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addLinkStatDaily(data: LinkStatDaily) {
  const res = await request.Post<ApiResult<unknown>>('/linkStatDaily', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateLinkStatDaily(data: LinkStatDaily) {
  const res = await request.Put<ApiResult<unknown>>('/linkStatDaily', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeLinkStatDaily(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/linkStatDaily/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeLinkStatDailys(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/linkStatDaily/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
