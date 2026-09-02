import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { BaseConf, Conf, DailyLotteryConf, MonthCardConf, SignConf, WheelConf } from './model';

// 获取轮盘签到配置
export async function getSignConf() {
  const res = await request.Get<ApiResult<SignConf>>('sysConf/getSignConf');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存轮盘签到配置
export async function saveSignConf(data: SignConf) {
  const res = await request.Post<ApiResult<SignConf>>('/sysConf/saveSignConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 获取排行榜配置
export async function getDailyRankConf() {
  const res = await request.Get<ApiResult<unknown>>('sysConf/getDailyRankConf');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存排行榜配置
export async function saveDailyRankConf(data: Conf) {
  const res = await request.Post<ApiResult<Conf>>('/sysConf/saveDailyRankConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 获取基本配置数据
export async function getAppConf() {
  const res = await request.Get<ApiResult<BaseConf>>('sysConf/getAppConf');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 存储基本配置
export async function saveAppConf(data: BaseConf) {
  const res = await request.Post<ApiResult<BaseConf>>('/sysConf/saveAppConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function getMonthCard() {
  const res = await request.Get<ApiResult<MonthCardConf>>('sysConf/getMonthCard');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 存储基本配置
export async function saveMonthCard(data: MonthCardConf) {
  const res = await request.Post<ApiResult<MonthCardConf>>('/sysConf/saveMonthCard', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function getFaq() {
  const res = await request.Get<ApiResult<unknown>>('sysConf/getFaq');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function saveFaq(data: Conf) {
  const res = await request.Post<ApiResult<Conf>>('/sysConf/saveFaq', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer(type: string | number) {
  const res = await request.Get<ApiResult<unknown>>('/sysConf/reload/' + type);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 服务器状态
export async function getServerState() {
  const res = await request.Get<ApiResult<unknown>>('sysConf/getServerState');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 打开预开服状态
export async function openServerState() {
  const res = await request.Get<ApiResult<unknown>>('/sysConf/openServerState');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function closeServerState() {
  const res = await request.Get<ApiResult<unknown>>('/sysConf/closeServerState');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 保存每日彩票活动配置21
export async function saveDailyLotteryConf(data: DailyLotteryConf) {
  const res = await request.Post<ApiResult<unknown>>('/sysConf/saveLotterActConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 每日彩票活动配置
export async function getDailyLottery() {
  const res = await request.Get<ApiResult<DailyLotteryConf>>('/sysConf/getLotterActConf');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存每日轮盘抽奖活动配置
export async function saveWheelConf(data: WheelConf) {
  const res = await request.Post<ApiResult<unknown>>('/sysConf/saveDayWheelActConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
//每日轮盘抽奖活动配置
export async function getWheelConf() {
  const res = await request.Get<ApiResult<WheelConf>>('/sysConf/getDayWheelActConf');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
