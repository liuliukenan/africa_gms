import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { CommonFlowRecordVO, CommonFlowRecordParam } from './model/commonFlowList';

/**
 * 通用流水记录分页查询
 */
export async function pageCommonFlowList(params: CommonFlowRecordParam) {
  const res = await request.Post<ApiResult<PageResult<CommonFlowRecordVO>>>(
    '/userFlowRecord/commonFlowList',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/**
 * 导出通用流水记录
 */
export async function exportCommonFlowList(params: CommonFlowRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<CommonFlowRecordVO>>>(
    '/userFlowRecord/commonFlowList',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
