import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { GiftCardSerie, GiftCardSerieParam, GiftCardSerieStatVO, GiftCardSerieStatQuery } from '@/api/giftCard/model/giftCardSerie';

/**
 * 分页查询
 */
export async function pageGiftCardSeries(params: GiftCardSerieParam) {
  const res = await request.Post<ApiResult<PageResult<GiftCardSerie>>>('/giftCardSerie/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listGiftCardSerie(params?: GiftCardSerieParam) {
  const res = await request.Post<ApiResult<GiftCardSerie[]>>('/giftCardSerie/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getGiftCardSerie(id: number) {
  const res = await request.Get<ApiResult<GiftCardSerie>>('/giftCardSerie/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addGiftCardSerie(data: GiftCardSerie) {
  const res = await request.Post<ApiResult<unknown>>('/giftCardSerie', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateGiftCardSerie(data: GiftCardSerie) {
  const res = await request.Put<ApiResult<unknown>>('/giftCardSerie', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeGiftCardSerie(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/giftCardSerie/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGiftCardSeries(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/giftCardSerie/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 核销维度统计
 */
export async function giftStatTotal() {
  const res = await request.Post<ApiResult<GiftCardSerieStatVO>>('/giftStat/total');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 各系列表现统计（分页）
 */
export async function giftStatSerie(params: GiftCardSerieStatQuery) {
  const res = await request.Post<ApiResult<PageResult<GiftCardSerieStatVO>>>('/giftStat/serie', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
