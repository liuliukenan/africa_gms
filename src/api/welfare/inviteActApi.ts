import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { RegisterBonusRequest } from './model/registerGive';
// 邀请拉新奖励记录
import type { ActRecordVO, ActRecordParam } from './model/inviteAct';
// 获取
export async function getInviteAct(countryCode: number) {
  const res = await request.Get<ApiResult<RegisterBonusRequest>>('/act/inviteAct', { params: { countryCode } });
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 保存
export async function saveInviteAct(data: RegisterBonusRequest) {
  const res = await request.Post<ApiResult<boolean>>('/act/inviteAct', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/act/inviteAct/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/** 分页查询邀请拉新奖励记录 */
export async function pageActRecord(data: ActRecordParam) {
  const res = await request.Post<ApiResult<PageResult<ActRecordVO>>>('/act/inviteAct/records', data);
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/** 导出邀请拉新奖励记录 */
export async function exportActRecord(params: ActRecordParam, filename: string) {
  const res = await request.Post<ApiResult<PageResult<ActRecordVO>>>('/act/inviteAct/records', params, {
    headers: {
      export: true,
      filename: filename
    }
  });
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}
