import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { GiftCardNode, GiftCardNodeParam } from '@/api/giftCard/model/giftCardNode';

/**
 * 分页查询
 */
export async function pageGiftCardNodes(params: GiftCardNodeParam) {
  const res = await request.Post<ApiResult<PageResult<GiftCardNode>>>('/giftCardNode/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 导出
export async function exportGiftCardNodes(nodeId: any) {
  return await request.Post<ApiResult<unknown>>(`/giftCardRecord/exportExcel/${nodeId}`, {}, { responseType: 'blob' });
}
/**
 * 导出
 */
export async function listGiftCardNode(params?: GiftCardNodeParam) {
  const res = await request.Post<ApiResult<GiftCardNode[]>>('/giftCardNode/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getGiftCardNode(id: number) {
  const res = await request.Get<ApiResult<GiftCardNode>>('/giftCardNode/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 重试
export async function retryNode(id: number) {
  const res = await request.Get<ApiResult<GiftCardNode>>('/giftCardNode/retry/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addGiftCardNode(data: GiftCardNode) {
  const res = await request.Post<ApiResult<unknown>>('/giftCardNode', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateGiftCardNode(data: GiftCardNode) {
  const res = await request.Put<ApiResult<unknown>>('/giftCardNode/status', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeGiftCardNode(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/giftCardNode/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGiftCardNodes(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/giftCardNode/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
