import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type {  IssueLotteryCountParam,IssueLotteryCount } from '@/api/lottery/model';
/**
 * 分页查询
 */
export async function pageIssueLotteryCount(params: IssueLotteryCountParam) {
  const res = await request.Post<ApiResult<PageResult<IssueLotteryCount>>>('/count/issueLotteryTotalReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 导出
export async function exportIssueLottery(params: IssueLotteryCountParam) {
  return await request.Post<ApiResult<unknown>>('/count/issueLotteryTotalReport/exportExcel', params, { responseType: 'blob' });
}