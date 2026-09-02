import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { ChannelChangeRecordVO, ChannelChangeRecordQuery } from './model/channelChangeRecord';

/**
 * 分页查询玩家渠道修改记录
 */
export async function pageChannelChangeRecord(params: ChannelChangeRecordQuery) {
  const res = await request.Post<ApiResult<PageResult<ChannelChangeRecordVO>>>(
    '/channel/changeRecord/list',
    params
  );
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出玩家渠道修改记录
 */
export async function exportChannelChangeRecord(
  params: ChannelChangeRecordQuery,
  filename: string
) {
  const res = await request.Post<ApiResult<PageResult<ChannelChangeRecordVO>>>(
    '/channel/changeRecord/list',
    params,
    {
      headers: {
        export: true,
        filename: filename
      }
    }
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
