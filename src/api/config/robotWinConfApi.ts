import { RobotWinConf, RobotWinConfParam } from '@/api/config/model/robotWinConf';
import { ApiResult, PageResult, PostTypeEnum } from '@/api/model';
import request from '@/utils/request';
/**
 * 分页查询
 */
export async function pageRobotWinConfs(params: RobotWinConfParam) {
  const res = await request.Post<ApiResult<PageResult<RobotWinConf>>>('/robotWinConf/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listRobotWinConf(params?: RobotWinConfParam) {
  const res = await request.Post<ApiResult<RobotWinConf[]>>('/robotWinConf/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 根据id查询
 */
export async function getRobotWinConf(id: number) {
  const res = await request.Get<ApiResult<RobotWinConf>>('/robotWinConf/' + id);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加
 */
export async function addRobotWinConf(data: RobotWinConf) {
  const res = await request.Post<ApiResult<unknown>>('/robotWinConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改
 */
export async function updateRobotWinConf(data: RobotWinConf) {
  const res = await request.Put<ApiResult<unknown>>('/robotWinConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户
 */
export async function removeRobotWinConf(id?: number) {
  const res = await request.Delete<ApiResult<unknown>>('/robotWinConf/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 发送服务器
 */
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/robotWinConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 导出Excel
export async function exportExcel(params?: RobotWinConfParam) {
  return await request.Post<ApiResult<unknown>>('/robotWinConf/exportExcel', params, { responseType: 'blob' });
}

// 导入
export async function importExcel(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/robotWinConf/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
