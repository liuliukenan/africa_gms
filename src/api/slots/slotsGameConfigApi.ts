import request from '@/utils/request';
import { ApiResult, PageResult, PostTypeEnum } from '@/api/model';
import type { SlotsGameConfig, SlotsGameConfigParam } from '@/api/model/slotsGameConfig';

/**
 * 分页查询
 */
export async function pageSlotsGameConfigs(params?: SlotsGameConfigParam) {
  const res = await request.Post<ApiResult<PageResult<SlotsGameConfig>>>('/slotsGameConfig/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listSlotsGameConfig(params?: SlotsGameConfigParam) {
  const res = await request.Post<ApiResult<SlotsGameConfig[]>>('/slotsGameConfig/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function slotsCloseGame(gameId:number) {
  const res = await request.Get<ApiResult<unknown>>('/slotsGameConfig/closeGame/' + gameId);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function slotsOpenGame(gameId:number) {
  const res = await request.Get<ApiResult<unknown>>('/slotsGameConfig/reloadGame/' + gameId);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function addSlotsGameConfig(data: SlotsGameConfig) {
  const res = await request.Post<ApiResult<SlotsGameConfig>>('/slotsGameConfig/add', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function slotsExport(gameId:number) {
  return await request.Get('/slotsGameConfig/export/' + gameId, { responseType: 'blob' });
}

export async function slotsImport(formData) {
  const res = await request.Post<ApiResult<unknown>>('/slotsGameConfig/import', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function slotsSimulateBefer(gameId:number) {
  const res = await request.Get<ApiResult<SlotsGameConfig>>('/slotsGameConfig/simulateBefer/' + gameId);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function slotsSimulateRun(param:any) {
  const res = await request.Post<ApiResult<SlotsGameConfig>>('/slotsGameConfig/simulateRun', param);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function exportGameSimulate(gameId:number) {
  return await request.Get<ApiResult<unknown>>('/slotsGameConfig/slotsRoundExport/' + gameId, { responseType: 'blob' });
}

/**
 * 修改
 */
export async function updateSlotsGameConfig(data: SlotsGameConfig) {
  const res = await request.Put<ApiResult<unknown>>('/slotsGameConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
