import request from '@/utils/request';
import { PostTypeEnum, type ApiResult, type PageResult } from '../model';
import { ByRobotConfig } from './model';
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageByRobotConfigs(params?:ByRobotConfig) {
  const res = await request.Post<ApiResult<PageResult<ByRobotConfig>>>('/fish/byRobotConfig/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 * @param data
 */
export async function addByRobotConfig(data:ByRobotConfig) {
  const res = await request.Post<ApiResult<ByRobotConfig>>('/fish/byRobotConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 * @param data
 */
export async function updateByRobotConfig(data:ByRobotConfig) {
  const res = await request.Put<ApiResult<ByRobotConfig>>('/fish/byRobotConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除
 * @param id 角色id
 */
export async function removeByRobotConfig(id:number) {
  const res = await request.Delete<ApiResult<ByRobotConfig>>('/fish/byRobotConfig/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeByRobotConfigs(ids:number[]) {
  const res = await request.Post<ApiResult<ByRobotConfig>>('/fish/byRobotConfig/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 导出
export async function byRobotConfigExport() {
  return await request.Get<ApiResult<unknown>>('/fish/byRobotConfig/exportExcel',{ responseType: 'blob' });
}

// 上传
export async function byRobotConfigImport(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/fish/byRobotConfig/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}