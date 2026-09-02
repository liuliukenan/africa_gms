import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { ChannelGroupVO, ChannelGroupParam, ChannelGroupDTO } from './model/channelGroup';

/**
 * 分页查询渠道分组
 */
export async function pageChannelGroup(params: ChannelGroupParam) {
  const res = await request.Post<ApiResult<PageResult<ChannelGroupVO>>>(
    '/channelGroup/list',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/**
 * 导出渠道分组
 */
export async function exportChannelGroup(params: ChannelGroupParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ChannelGroupVO>>>(
    '/channelGroup/list',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/**
 * 新增渠道分组
 */
export async function addChannelGroup(data: ChannelGroupDTO) {
  const res = await request.Post<ApiResult<boolean>>('/channelGroup', data);
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/**
 * 修改渠道分组
 */
export async function updateChannelGroup(data: ChannelGroupDTO) {
  const res = await request.Put<ApiResult<boolean>>('/channelGroup', data);
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/**
 * 删除渠道分组
 */
export async function removeChannelGroup(id: number) {
  const res = await request.Delete<ApiResult<boolean>>('/channelGroup/' + id);
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/**
 * 获取渠道分组选项
 */
export async function getChannelGroupOptions() {
  const res = await request.Post<ApiResult<ChannelGroupVO[]>>('/channelGroup/options');
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}
