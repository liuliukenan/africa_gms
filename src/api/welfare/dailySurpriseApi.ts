import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type {
  DailyRechargeSurpriseRequest,
  DailyRechargeSurpriseRobotTextVO,
  DailyRechargeSurpriseRobotTextQuery,
  DailyRechargeSurpriseChanceVO,
  DailyRechargeSurpriseChanceQuery
} from './model/dailySurprise';

// 获取活动配置
export async function getDailySurpriseActInfo(params: { countryCode: number; actTypeEnum: string }) {
  const res = await request.Get<ApiResult<DailyRechargeSurpriseRequest>>('/act/actItem/getInfo', { params });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 保存活动配置
export async function saveDailySurpriseActInfo(data: DailyRechargeSurpriseRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/actItem/save', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 发送活动配置到服务器
export async function sendDailySurpriseActInfo() {
  const res = await request.Post<ApiResult<unknown>>('/act/actItem/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 分页查询每日充值惊喜-跑马灯文本 */
export async function pageDailySurpriseRobotTexts(data: DailyRechargeSurpriseRobotTextQuery) {
  const res = await request.Post<ApiResult<PageResult<DailyRechargeSurpriseRobotTextVO>>>('/act/dailyRechargeSurprise/robotTexts', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 新增每日充值惊喜-跑马灯文本 */
export async function addDailySurpriseRobotText(data: DailyRechargeSurpriseRobotTextVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/dailyRechargeSurprise/robotTexts/add', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 修改每日充值惊喜-跑马灯文本 */
export async function updateDailySurpriseRobotText(data: DailyRechargeSurpriseRobotTextVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/dailyRechargeSurprise/robotTexts/update', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 删除每日充值惊喜-跑马灯文本 */
export async function deleteDailySurpriseRobotText(id: number) {
  const res = await request.Post<ApiResult<boolean>>('/act/dailyRechargeSurprise/robotTexts/delete', undefined, { params: { id } });
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 分页查询每日充值惊喜-次数记录 */
export async function pageDailySurpriseChanceRecords(data: DailyRechargeSurpriseChanceQuery) {
  const res = await request.Post<ApiResult<PageResult<DailyRechargeSurpriseChanceVO>>>('/act/dailyRechargeSurprise/chanceRecords', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出每日充值惊喜-次数记录 */
export async function exportDailySurpriseChanceRecords(params: DailyRechargeSurpriseChanceQuery, filename: string) {
  const res = await request.Post<ApiResult<PageResult<DailyRechargeSurpriseChanceVO>>>('/act/dailyRechargeSurprise/chanceRecords', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
