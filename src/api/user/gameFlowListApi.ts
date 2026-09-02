import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { GameFlowRecordVO, GameFlowRecordParam } from './model/gameFlowList';

/**
 * 游戏流水记录分页查询
 */
export async function pageGameFlowList(params: GameFlowRecordParam) {
  const res = await request.Post<ApiResult<PageResult<GameFlowRecordVO>>>(
    '/userFlowRecord/gameFlowList',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/**
 * 导出游戏流水记录
 */
export async function exportGameFlowList(params: GameFlowRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<GameFlowRecordVO>>>(
    '/userFlowRecord/gameFlowList',
    params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
