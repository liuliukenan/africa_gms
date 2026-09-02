import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Bet, BetParam, OpenAward, OpenAwardParam, Robot, RobotParam ,WinAward,WinAwardParam} from './model/index';

/**
 * 开奖记录
 */
export async function pageOpenAward(params?: BetParam) {
  const res = await request.Post<ApiResult<PageResult<Bet>>>('/wheelActAwardConfig/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}




/**
 * 添加奖励配置
 * @param data
 */
export async function addAward(data: any) {
  const res = await request.Post<ApiResult<any>>('/wheelActAwardConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改奖励配置
 * @param data
 */
export async function updateAward(data: any) {
  const res = await request.Put<ApiResult<any>>('/wheelActAwardConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除奖励配置
 * @param id 角色id
 */
export async function removeAward(id: number) {
  const res = await request.Delete<ApiResult<Robot>>('/wheelActAwardConfig/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}


/**
 * 中奖记录列表
 */
export async function pageWinAward(params?: WinAwardParam) {
  const res = await request.Post<ApiResult<PageResult<WinAward>>>('/userWheelActAwardRecord/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function winAwardGiftCount() {
  const res = await request.Get<ApiResult<PageResult<WinAward>>>('/userWheelActAwardRecord/giftCount');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 修改发货状态
 * @param data
 */
export async function updateWinAward(data: WinAward) {
  const res = await request.Put<ApiResult<unknown>>('/userWheelActAwardRecord', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
export async function infoAward(id: number) {
  const res = await request.Get<ApiResult<WinAward>>('/userWheelActAwardRecord/getById/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
