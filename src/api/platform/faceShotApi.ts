import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { CountryAct, FaceShot, FaceShotParam } from './model/faceShot';

/**
 * 分页查询
 */
export async function pageFaceShots(params: FaceShotParam) {
  const res = await request.Post<ApiResult<PageResult<FaceShot>>>('/faceShot/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 根据国家代码查询活动
 */
export async function listByCountryCode(countryCode: number) {
  const res = await request.Get<ApiResult<CountryAct[]>>('/act/actItem/listByCountryCode', { params: { countryCode } });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
/**
 * 导出
 */
export async function listFaceShot(params?: FaceShotParam) {
  const res = await request.Post<ApiResult<FaceShot[]>>('/faceShot/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getFaceShot(id: number) {
  const res = await request.Get<ApiResult<FaceShot>>('/faceShot/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addFaceShot(data: FaceShot) {
  const res = await request.Post<ApiResult<unknown>>('/faceShot', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 级联数据
export async function cascaderFaceShot(data?: any) {
  const res = await request.Post<ApiResult<{ label: string; value: string }[]>>('/gameTag/getTreeLabel', data);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 根据类型获取列表
export async function byTypeGetList(jumpType: number) {
  const res = await request.Get<ApiResult<FaceShot[]>>('/jumpAction/byType/' + jumpType);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/faceShot/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 修改
 */
export async function updateFaceShot(data: FaceShot) {
  const res = await request.Put<ApiResult<unknown>>('/faceShot', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeFaceShot(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/faceShot/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeFaceShots(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/faceShot/batchDelete', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
