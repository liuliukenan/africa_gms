import request from "@/utils/request";
import { PostTypeEnum, type ApiResult, type PageResult } from "@/api/model";
import type { GameCountryRelationship, GameCountryRelationshipParam } from "@/api/platform/model/gameCountryRelationship";

/**
* 分页查询
*/
export async function pageGameCountryRelationships(params: GameCountryRelationshipParam) {
const res = await request.Post<ApiResult<PageResult<GameCountryRelationship>>>(
    "/gameCountryRelationship/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGameCountryRelationship(params?: GameCountryRelationshipParam) {
    const res = await request.Post<ApiResult<GameCountryRelationship[]>>("/gameCountryRelationship/exportList",
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
export async function getGameCountryRelationship(id: number) {
    const res = await request.Get<ApiResult<GameCountryRelationship>>("/gameCountryRelationship/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGameCountryRelationship(data: GameCountryRelationship) {
    const res = await request.Post<ApiResult<unknown>>("/gameCountryRelationship", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGameCountryRelationship(data: GameCountryRelationship) {
    const res = await request.Put<ApiResult<unknown>>("/gameCountryRelationship", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeGameCountryRelationship(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/gameCountryRelationship/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeGameCountryRelationships(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/gameCountryRelationship/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/gameCountryRelationship/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 导出Excel
export async function exportExcel(countryCode: string) {
  return await request.Post<ApiResult<unknown>>('/gameCountryRelationship/exportExcel/' + countryCode, {}, { responseType: 'blob' });
}
// 导入
export async function importExcel(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/gameCountryRelationship/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}