import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { Bet, BetParam, OpenAward, OpenAwardParam,Robot,RobotParam } from './model/index';

/**
 * 投注记录
 */
export async function pageBet(params: BetParam) {
  const res = await request.Post<ApiResult<PageResult<Bet>>>('/userLotteryActTick/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 开奖记录
 */
export async function pageOpenAward(params: OpenAwardParam) {
  const res = await request.Post<ApiResult<PageResult<OpenAward>>>('/lotteryActRecord/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 机器人配置
 */
export async function pageRobot(params: RobotParam) {
  const res = await request.Post<ApiResult<PageResult<Robot>>>('/lotteryActRobot/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加机器人配置
 * @param data
 */
export async function addRobot(data:Robot) {
  const res = await request.Post<ApiResult<Robot>>('/lotteryActRobot', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改机器人配置
 * @param data
 */
export async function updateRobot(data:Robot) {
  const res = await request.Put<ApiResult<Robot>>('/lotteryActRobot', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除机器人配置
 * @param id 角色id
 */
export async function removeRobot(id:number) {
  const res = await request.Delete<ApiResult<Robot>>('/lotteryActRobot/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}