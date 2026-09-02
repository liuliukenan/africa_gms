import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Lottery, LotteryParam } from '@/api/lottery/model/index';

/**
 * 分页查询
 */
export async function pageLottery(params: LotteryParam) {
  const res = await request.Post<ApiResult<PageResult<Lottery>>>('/lotteryHistoryDraw/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 修改
export async function updateHistory(data:{id:number,num:number}) {
    const res = await request.Put<ApiResult<Lottery>>('/lotteryHistoryDraw',data);
    if (res.code === 0) {
      return res.message;
    }
    return Promise.reject(new Error(res.message));
  }