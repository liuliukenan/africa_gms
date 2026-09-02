import request from '@/utils/request';
import { ApiResult, PageResult,PostTypeEnum } from '@/api/model';
import type { Fission, FissionParam } from './model';

/**
 * 分页查询
 */
export async function pageFission(params: FissionParam) {
  const res = await request.Post<ApiResult<PageResult<Fission>>>('/taskInfo/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 根据id查询
*/
export async function getFission(id: number) {
  const res = await request.Get<ApiResult<Fission>>("/taskInfo/getById/" + id);
  if (res.code === 0 && res.data) {
   return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 修改
export async function updateFission(data:Fission) {
  const res = await request.Put<ApiResult<Fission>>('/taskInfo', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 添加
export async function addFission(data:Fission) {
  const res = await request.Post<ApiResult<Fission>>('/taskInfo', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 删除
export async function removeFission(id: number) {
    const res = await request.Delete<ApiResult<unknown>>('/taskInfo/' + id);
    if (res.code === 0) {
      return res.message;
    }
    return Promise.reject(new Error(res.message));
  }

// 导出
export async function exportFission(params?: FissionParam) {
  return await request.Post<ApiResult<unknown>>('/taskInfo/exportExcel', params, { responseType: 'blob' });
}

// 上传
export async function uploadFission(formData: any) {
    const res = await request.Post<ApiResult<unknown>>('/taskInfo/importExcel', formData, {
      meta: {
        postType: PostTypeEnum.FORM_DATA
      }
    });
    if (res.code === 0) {
      return res.message;
    }
    return Promise.reject(new Error(res.message));
  }
  
