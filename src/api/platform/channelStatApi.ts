import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { ChannelStatQuery, ChannelStatVO } from "./model/channelStat";

/**
 * 渠道统计
 */
export async function pageChannelStat(params: ChannelStatQuery) {
  const res = await request.Post<ApiResult<PageResult<ChannelStatVO>>>(
    "/channelStat/stat",
    params
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 导出渠道统计
export async function exportChannelStat(params: ChannelStatQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ChannelStatVO>>>(
    "/channelStat/stat",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 渠道日期统计
 */
export async function pageChannelDateStat(params: ChannelStatQuery) {
  const res = await request.Post<ApiResult<PageResult<ChannelStatVO>>>(
    "/channelStat/dailyStat",
    params
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 导出渠道日期统计
export async function exportChannelDateStat(params: ChannelStatQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ChannelStatVO>>>(
    "/channelStat/dailyStat",
    params, {
    headers: {
      "export": true,
      "filename": filename
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
