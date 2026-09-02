import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import type { GlobalMail, GlobalMailParam } from './model/globalMail';

/**
* 分页查询
*/
export async function pageGlobalMails(params: GlobalMailParam) {
  const res = await request.Post<ApiResult<PageResult<GlobalMail>>>('/globalMail/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 发送服务器
export async function sendServer() {
  const res = await request.Get<ApiResult<unknown>>('/globalMail/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}


/**
* 导出
*/
export async function listGlobalMail(params?: GlobalMailParam) {
    const res = await request.Post<ApiResult<GlobalMail[]>>("/globalMail/exportList",
    params
    );
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 根据id查询
*/
export async function getGlobalMail(id: number) {
    const res = await request.Get<ApiResult<GlobalMail>>("/globalMail/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGlobalMail(data: GlobalMail) {
    const res = await request.Post<ApiResult<unknown>>("/globalMail", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGlobalMail(data: GlobalMail) {
    const res = await request.Put<ApiResult<unknown>>("/globalMail", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGlobalMail(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/globalMail/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGlobalMails(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/globalMail/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
