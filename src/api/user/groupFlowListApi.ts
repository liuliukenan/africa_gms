import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { GroupFlowRecordVO, GroupFlowRecordParam } from './model/groupFlowList';

/**
 * 分组流水记录分页查询
 */
export async function pageGroupFlowList(params: GroupFlowRecordParam) {
  const res = await request.Post<ApiResult<PageResult<GroupFlowRecordVO>>>(
    '/userFlowRecord/groupFlowList',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出分组流水记录
 */
export async function exportGroupFlowList(params: GroupFlowRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<GroupFlowRecordVO>>>(
    '/userFlowRecord/groupFlowList',
    params,
    {
      headers: {
        export: true,
        filename
      }
    }
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
