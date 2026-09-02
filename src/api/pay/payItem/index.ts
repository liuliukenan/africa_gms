import request from '@/utils/request';
import type { PayItemEdit } from '../model';
import { ApiResult } from '@/api/model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function listByChannel(channelId: number) {
  const res = await request.Get<ApiResult<PayItemEdit>>('/payItem/listByChannel/' + channelId);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加充值项
 * @param data
 */
export async function addPayItem(data:PayItemEdit) {
  const res = await request.Post<ApiResult<PayItemEdit>>('/payItem', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改充值项
 * @param data
 */
export async function updatePayItem(data:PayItemEdit) {
  const res = await request.Put<ApiResult<PayItemEdit>>('/payItem', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除充值项
 * @param id 角色id
 */
export async function removePayItem(id:number) {
  const res = await request.Delete<ApiResult<PayItemEdit>>('/payItem/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removePayItems(ids:number[]) {
  const res = await request.Post<ApiResult<PayItemEdit>>('/payItem/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
