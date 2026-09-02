import request from '@/utils/request';
import { PostTypeEnum, type ApiResult, type PageResult } from '../model';
import { ByRobotName } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByRobotNames(params?: ByRobotName) {
  const res = await request.Post<ApiResult<PageResult<ByRobotName>>>('/fish/byRobotName/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addByRobotName(data: ByRobotName) {
  const res = await request.Post<ApiResult<ByRobotName>>('/fish/byRobotName', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateByRobotName(data: ByRobotName) {
  const res = await request.Put<ApiResult<ByRobotName>>('/fish/byRobotName', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeByRobotName(id: number) {
  const res = await request.Delete<ApiResult<ByRobotName>>('/fish/byRobotName/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeByRobotNames(ids: number[]) {
  const res = await request.Post<ApiResult<ByRobotName>>('/fish/byRobotName/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 导出
export async function byRobotNameExport() {
  return await request.Get<ApiResult<unknown>>('/fish/byRobotName/exportExcel',{ responseType: 'blob' });
}

// 上传
export async function byRobotNameImport(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/fish/byRobotName/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
