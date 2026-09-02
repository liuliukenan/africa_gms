import request from '@/utils/request';
import type { ByBaseFish } from './model';
import { ApiResult, PageResult, PostTypeEnum } from '@/api/model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByBaseFishs() {
  const res = await request.Get<ApiResult<PageResult<ByBaseFish>>>('/fish/byBaseFish/list');
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 添加
export async function addByBaseFish(data: ByBaseFish) {
  const res = await request.Post<ApiResult<ByBaseFish>>('/fish/byBaseFish', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 修改
export async function updateByBaseFish(data: ByBaseFish) {
  const res = await request.Put<ApiResult<ByBaseFish>>('/fish/byBaseFish', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 删除
export async function removeByBaseFish(id: number) {
  const res = await request.Delete<ApiResult<unknown>>('/fish/byBaseFish/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 导出
export async function byBaseFishExport() {
  return await request.Get<ApiResult<unknown>>('/fish/byBaseFish/exportExcel',{ responseType: 'blob' });
}

// 上传
export async function byBaseFishImport(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/fish/byBaseFish/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
export async function fishReload(type?: number) {
    const res = await request.Get<ApiResult<PageResult<ByBaseFish>>>('/fish/byBaseFish/reload/'+type);
    if (res.code === 0) {
      return res.message;
    }
    return Promise.reject(new Error(res.message));
  }
