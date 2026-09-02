import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Lottery, LotteryParam,LotteryConf } from '@/api/lottery/model/index';

/**
 * 分页查询
 */
export async function pageLottery(params: LotteryParam) {
  const res = await request.Post<ApiResult<PageResult<Lottery>>>('/lottery/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 获取配置
export async function getLotteryConf() {
  const res = await request.Get<ApiResult<LotteryConf>>('/lottery/config');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 存储配置
export async function saveLotteryConf(data: LotteryConf) {
  const res = await request.Post<ApiResult<Lottery>>('/lottery/saveLotteryConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 开奖
export async function openLottery(result:string,type:number) {
  const res = await request.Post<ApiResult<Lottery>>('/lottery/open?result='+result+'&&type='+type);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
export async function sendConfServer(type: string | number) {
  const res = await request.Get<ApiResult<unknown>>('/sysConf/reload/' + type);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 2d导出
export async function exportLotteryList(params: LotteryParam) {
  return await request.Post<ApiResult<unknown>>('/lottery/exportExcel', params, { responseType: 'blob' });
}