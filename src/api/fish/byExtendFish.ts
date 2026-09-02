import request from '@/utils/request';

import { ApiResult, PageResult } from '@/api/model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function getExtendFish() {
  const res = await request.Get<ApiResult<PageResult<any>>>('/fish/byExtendFish/getInfo');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 添加
export async function addByExtendFish(data: any) {
  const res = await request.Post<ApiResult<any>>('/fish/byExtendFish', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 修改
export async function updateByExtendFish(data) {
  const res = await request.Put<ApiResult<any>>('/fish/byExtendFish', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
