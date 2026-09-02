import request from '@/utils/request';
import type { GameConf ,GameConfParam} from '../model';
import { ApiResult, PageResult, PostTypeEnum } from '@/api/model';
import type { MutiLangParam } from '@/api/mutiLang/model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageGameConf(params: GameConfParam) {
  const res = await request.Post<ApiResult<PageResult<GameConf>>>('/gameConf/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function addGameConf(data: GameConf) {
  const res = await request.Post<ApiResult<unknown>>('/gameConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function updateGameConf(data: GameConf) {
  const res = await request.Put<ApiResult<unknown>>('/gameConf', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function removeGameConf(id: number) {
  const res = await request.Delete<ApiResult<unknown>>('/gameConf/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function exportGameConfExcel() {
  return await request.Post<ApiResult<unknown>>('/gameConf/exportExcel', {}, { responseType: 'blob' });
}

// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/gameConf/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

// 上传多语言
export async function uploadGameConf(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/gameConf/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
