import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type {
  KefuBindParam,
  KefuBindUser,
  KefuDisplayConf,
  KefuGuideParam,
  KefuPlayerParam,
  KefuPlayerRecord,
  KefuRecord,
  KefuStats
} from '@/api/model/kefu';

export async function pageKefu(params: KefuGuideParam) {
  const res = await request.Post<ApiResult<PageResult<KefuRecord>>>('/kefuGuide/list', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function getKefuStats() {
  const res = await request.Get<ApiResult<KefuStats>>('/kefuGuide/stats');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function getOnlineKefuOptions() {
  const res = await request.Get<ApiResult<KefuRecord[]>>('/kefuGuide/onlineOptions');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function getKefuDisplayConf() {
  const res = await request.Get<ApiResult<KefuDisplayConf>>('/kefuGuide/displayConf');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function saveKefuDisplayConf(data: KefuDisplayConf) {
  const res = await request.Put<ApiResult<boolean>>('/kefuGuide/displayConf', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function addKefu(data: Pick<KefuRecord, 'contact' | 'url' | 'showPosition'>) {
  const res = await request.Post<ApiResult<boolean>>('/kefuGuide', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function updateKefu(data: Pick<KefuRecord, 'id' | 'contact' | 'url' | 'showPosition'>) {
  const res = await request.Put<ApiResult<boolean>>('/kefuGuide', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function updateKefuState(id: number, state: number) {
  const res = await request.Put<ApiResult<boolean>>('/kefuGuide/state', { id, state });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function voidKefu(id: number) {
  const res = await request.Put<ApiResult<boolean>>(`/kefuGuide/void/${id}`);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function pageKefuPlayers(params: KefuPlayerParam) {
  const res = await request.Post<ApiResult<PageResult<KefuPlayerRecord>>>('/kefuPlayer/list', params);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function getKefuBindUser(uid: number) {
  const res = await request.Get<ApiResult<KefuBindUser>>(`/kefuPlayer/user/${uid}`);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function bindKefuPlayer(data: KefuBindParam) {
  const res = await request.Post<ApiResult<boolean>>('/kefuPlayer/bind', data);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

export async function unbindKefuPlayer(id: number) {
  const res = await request.Put<ApiResult<boolean>>(`/kefuPlayer/unbind/${id}`);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
