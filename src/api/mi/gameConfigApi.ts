import request from '@/utils/request';
import { ApiResult, PageResult, PostTypeEnum } from '@/api/model';
import type { MiGameConfig, MiGameConfigParam } from '@/api/model/miGameConfig';

/**
 * 分页查询
 */
export async function pageGameConfigs(params?: MiGameConfigParam) {
  const res = await request.Post<ApiResult<PageResult<MiGameConfig>>>('/mi/gameConfig/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 导出
 */
export async function listGameConfig(params?: MiGameConfigParam) {
  const res = await request.Post<ApiResult<MiGameConfig[]>>('/mi/gameConfig/exportList', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function rouletteCloseGame(gameId:number) {
  const res = await request.Get<ApiResult<unknown>>('/mi/gameConfig/closeGame/' + gameId);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function rouletteOpenGame(gameId:number) {
  const res = await request.Get<ApiResult<unknown>>('/mi/gameConfig/reloadGame/' + gameId);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function addGameConfig(data: MiGameConfig) {
  const res = await request.Post<ApiResult<MiGameConfig>>('/mi/gameConfig/add', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function rouletteExport(gameId:number) {
  return await request.Get('/mi/gameConfig/export/' + gameId, { responseType: 'blob' });
}

export async function rouletteImport(formData) {
  const res = await request.Post<ApiResult<unknown>>('/mi/gameConfig/import', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

export async function rouletteSimulateBefer(gameId:number) {
  const res = await request.Get<ApiResult<MiGameConfig>>('/mi/gameConfig/simulateBefer/' + gameId);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function rouletteSimulateRun(param:any) {
  const res = await request.Post<ApiResult<MiGameConfig>>('/mi/gameConfig/simulateRun', param);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function exportGameSimulate(gameId:number) {
  return await request.Get<ApiResult<unknown>>('/mi/gameConfig/rouletteRoundExport/' + gameId, { responseType: 'blob' });
}

/**
 * 修改
 */
export async function updateGameConfig(data: MiGameConfig) {
  const res = await request.Put<ApiResult<unknown>>('/mi/gameConfig', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
