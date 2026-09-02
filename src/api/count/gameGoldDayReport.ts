import request from '@/utils/request';
import type { ApiResult, PageResult } from '../model';
import type { GameGoldDayReports, GameGoldDayReportsParams, GameGoldDayReportsEcharts, GameGoldMonthReports, GameGoldMonthReportsParams } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageGameGoldDayReports(params?: GameGoldDayReportsParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldDayReports>>>('/count/gameGoldDayReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 详情
export async function pageGameGoldDayReportsInfo(params?: GameGoldDayReportsParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldDayReports>>>('/count/gameGoldDayReport/getChannelList', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// echarts图表
export async function gameGoldDayReportEcharts(params?: GameGoldDayReportsParams) {
  const res = await request.Post<ApiResult<GameGoldDayReportsEcharts>>('/count/gameGoldDayReport/getGameGoldDayTimeReportList', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 每月
export async function pageGameGoldMonthReports(params?: GameGoldMonthReportsParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldMonthReports>>>('/count/gameGoldMonReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}



// 钻石=================================================
// 列表
export async function pageGameDiamondDayReports(params?: GameGoldDayReportsParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldDayReports>>>('/count/gameDiamondDayReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 详情
export async function pageGameDiamondDayReportsInfo(params?: GameGoldDayReportsParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldDayReports>>>('/count/gameDiamondDayReport/getChannelList', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 每月
export async function pageGameDiamondMonthReports(params?: GameGoldMonthReportsParams) {
  const res = await request.Post<ApiResult<PageResult<GameGoldMonthReports>>>('/count/gameDiamondMonReport/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// echarts
export async function gameDiamondDayReportEcharts(params?: GameGoldDayReportsParams) {
  const res = await request.Post<ApiResult<GameGoldDayReportsEcharts>>('/count/gameDiamondDayReport/getGameDiamondDayTimeReportList', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
