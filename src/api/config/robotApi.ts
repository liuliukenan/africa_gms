import request from '@/utils/request';
import type { Robot, RobotParam } from '../model/robot';
import { ApiResult, PageResult, PostTypeEnum } from '@/api/model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageRobots(params: RobotParam) {
  const res = await request.Post<ApiResult<PageResult<Robot>>>('/robot/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function addRobot(data: Robot) {
  const res = await request.Post<ApiResult<unknown>>('/robot', data, {
    meta: {
      postType: PostTypeEnum.FORM
    }
  }
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function updateRobot(data: Robot) {
  const res = await request.Put<ApiResult<unknown>>('/robot', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function removeRobot(id: number) {
  const res = await request.Delete<ApiResult<unknown>>('/robot/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 导出Excel
export async function exportExcel(params?: RobotParam) {
  return await request.Post<ApiResult<unknown>>('/robot/exportExcel', params, { responseType: 'blob' });
}

// 导入
export async function importExcel(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/robot/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/robot/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
