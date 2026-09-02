import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
import type { KycPushConfigResult, KycPushConfigSaveDTO } from './model/kycPush';

/**
 * 获取KYC推送配置
 */
export async function getKYCPushConfig() {
  const res = await request.Get<ApiResult<KycPushConfigResult>>(
    '/commonPush/getKYCPushConfig'
  );
  if (res.code === 0 && res.data) return res.data;
  return Promise.reject(new Error(res.message));
}

/**
 * 编辑KYC推送配置
 */
export async function updateKYCPushConfig(params: KycPushConfigSaveDTO) {
  const res = await request.Post<ApiResult<boolean>>(
    '/commonPush/updateKYCPushConfig',
    params
  );
  if (res.code === 0) return res.message || '操作成功';
  return Promise.reject(new Error(res.message));
}

/**
 * 重新加载KYC推送配置（发送服务器）
 */
export async function reloadKYCPush() {
  const res = await request.Post<ApiResult<boolean>>(
    '/commonPush/reload'
  );
  if (res.code === 0) return res.message || '操作成功';
  return Promise.reject(new Error(res.message));
}
