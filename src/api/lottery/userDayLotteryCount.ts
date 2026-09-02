import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { UserDayLotteryCount, UserDayLotteryCountParam } from '@/api/lottery/model';

/**
 * 分页查询
 */
export async function pageUserDayLotteryCount(params: UserDayLotteryCountParam) {
  const res = await request.Post<ApiResult<PageResult<UserDayLotteryCount>>>('/count/userLotteryDayReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
//  /count/userLotteryDayReport/exportExcel
// 导出
export async function exportUserDayLottery(params: UserDayLotteryCountParam) {
  return await request.Post<ApiResult<unknown>>('/count/userLotteryDayReport/exportExcel', params, { responseType: 'blob' });
}