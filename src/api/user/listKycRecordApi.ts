import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { ListKycRecordVO, ListKycRecordParam, AuditUserKycDTO } from './model/listKycRecord';

/**
 * 分页查询KYC审核记录
 */
export async function pageListKycRecord(params: ListKycRecordParam) {
  const res = await request.Post<ApiResult<PageResult<ListKycRecordVO>>>(
    '/userManage/listKycRecord',
    params
  );
  if (res.code === 0) return res.data;
  return Promise.reject(new Error(res.message));
}

/**
 * 审核KYC记录
 */
export async function auditKyc(params: AuditUserKycDTO) {
  const res = await request.Post<ApiResult<boolean>>(
    '/userManage/auditKyc',
    params
  );
  if (res.code === 0) return res.message || '操作成功';
  return Promise.reject(new Error(res.message));
}

/**
 * 获取KYC审核记录详情
 */
export async function getKycRecordById(id: number) {
  const res = await request.Get<ApiResult<ListKycRecordVO>>(
    '/userManage/getKycRecordById/' + id
  );
  if (res.code === 0 && res.data) return res.data;
  return Promise.reject(new Error(res.message));
}

/**
 * 导出KYC审核记录
 */
export async function exportListKycRecord(
  params: ListKycRecordParam,
  filename: string
) {
  const res = await request.Post<ApiResult<PageResult<ListKycRecordVO>>>(
    '/userManage/listKycRecord',
     params,
    { headers: { export: true, filename } }
  );
  if (res.code === 0) return res.message;
  return Promise.reject(new Error(res.message));
}

/**
 * 获取用户KYC审核图片URL
 * @param recordId KYC审核记录ID
 * @param field 图片类型:idCardFront | idCardBack | selfie
 */
export async function getKycImage(recordId: number, field: string) {
  const res = await request.Get<ApiResult<string>>(
    `/userManage/kycImageUrl/${recordId}`,
    { params: { field } }
  );
  if (res.code === 0 && res.data) return res.data;
  return Promise.reject(new Error(res.message));
}
