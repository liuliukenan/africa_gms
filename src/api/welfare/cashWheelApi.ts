import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { CashWheelActConfigVO, CashWheelSaveRequest, CashWheelRecordVO, CashWheelRecordParam, CashWheelSlotConfigVO, CashWheelDrawConfigVO, ActPushTaskVO, ActPushTaskParam, CashWheelRobotTextVO, CashWheelRobotTextQuery } from './model/cashWheel';
import { PostTypeEnum } from '@/api/model';

/** 获取Cash Wheel配置 */
export async function getCashWheelInfo(countryCode: number) {
  const res = await request.Get<ApiResult<CashWheelActConfigVO>>('/act/cashWheel/getInfo', { params: { countryCode } });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/** 保存Cash Wheel配置 */
export async function saveCashWheel(data: CashWheelSaveRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/save', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 查询Cash Wheel轮盘布局 */
export async function getCashWheelSlots(actItemId: number, round: number) {
  const res = await request.Get<ApiResult<CashWheelSlotConfigVO[]>>('/act/cashWheel/slots', { params: { actItemId, round } });
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 修改Cash Wheel轮盘格子 */
export async function updateCashWheelSlot(data: CashWheelSlotConfigVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/slots/update', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 查询Cash Wheel抽奖命中配置 */
export async function getCashWheelDrawConfigs(actItemId: number, round: number) {
  const res = await request.Get<ApiResult<CashWheelDrawConfigVO[]>>('/act/cashWheel/drawConfigs', { params: { actItemId, round } });
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 修改Cash Wheel抽奖命中配置 */
export async function updateCashWheelDrawConfig(data: CashWheelDrawConfigVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/drawConfigs/update', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 新增Cash Wheel抽奖命中配置 */
export async function addCashWheelDrawConfig(data: CashWheelDrawConfigVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/drawConfigs/add', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 删除Cash Wheel抽奖命中配置 */
export async function deleteCashWheelDrawConfig(id: number) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/drawConfigs/delete', undefined, { params: { id } });
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 发送到服务器 */
export async function reloadCashWheel() {
  const res = await request.Get<ApiResult<boolean>>('/act/cashWheel/reload');
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 导入Cash Wheel抽奖命中配置 */
export async function importCashWheelDrawConfig(round: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/drawConfigs/importExcel', formData, {
    params: { round },
    meta: { postType: PostTypeEnum.FORM_DATA }
  });
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 导出Cash Wheel抽奖命中配置 */
export async function exportCashWheelDrawConfig(round: number) {
  return await request.Post<ApiResult<unknown>>('/act/cashWheel/drawConfigs/exportExcel', undefined, {
    params: { round },
    responseType: 'blob'
  });
}

/** 分页查询Cash Wheel奖励记录 */
export async function pageCashWheelRecord(data: CashWheelRecordParam) {
  const res = await request.Post<ApiResult<PageResult<CashWheelRecordVO>>>('/act/cashWheel/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 分页查询Cash Wheel推送记录 */
export async function pageCashWheelPushTask(data: ActPushTaskParam) {
  const res = await request.Post<ApiResult<PageResult<ActPushTaskVO>>>('/act/cashWheel/pushRecords', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 分页查询Cash Wheel机器人中奖文本 */
export async function pageCashWheelRobotTexts(data: CashWheelRobotTextQuery) {
  const res = await request.Post<ApiResult<PageResult<CashWheelRobotTextVO>>>('/act/cashWheel/robotTexts', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 新增Cash Wheel机器人中奖文本 */
export async function addCashWheelRobotText(data: CashWheelRobotTextVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/robotTexts/add', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 修改Cash Wheel机器人中奖文本 */
export async function updateCashWheelRobotText(data: CashWheelRobotTextVO) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/robotTexts/update', data);
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 删除Cash Wheel机器人中奖文本 */
export async function deleteCashWheelRobotText(id: number) {
  const res = await request.Post<ApiResult<boolean>>('/act/cashWheel/robotTexts/delete', undefined, { params: { id } });
  if (res.code === 0) return { data: res.data, message: res.message };
  return Promise.reject(new Error(res.message));
}

/** 导出Cash Wheel推送记录 */
export async function exportCashWheelPushTask(params: ActPushTaskParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ActPushTaskVO>>>('/act/cashWheel/pushRecords', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/** 导出Cash Wheel奖励记录 */
export async function exportCashWheelRecord(params: CashWheelRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<CashWheelRecordVO>>>('/act/cashWheel/records', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
