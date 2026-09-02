import request from '@/utils/request';
import { type ApiResult, type PageResult, PostTypeEnum } from '@/api/model';
import type { MutiLang, MutiLangParam } from './model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageMutiLangs(params: MutiLangParam) {
  const res = await request.Post<ApiResult<PageResult<MutiLang>>>('/mutiLang/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/mutiLang/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 修改多语言
 * @param data
 */
export async function updateMutiLang(data: MutiLang) {
  const res = await request.Put<ApiResult<unknown>>('/mutiLang', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
export async function exportExcelMutiLang(params: MutiLangParam) {
  return await request.Post<ApiResult<unknown>>('/mutiLang/exportExcel', params, { responseType: 'blob' });
}

export async function exportJsonMutilLang(params: MutiLangParam) {
  return await request.Post<ApiResult<unknown>>('/mutiLang/exportJson', params, { responseType: 'blob' });
}
// 导入
export async function importExcel(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/mutiLang/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// export async function slotsImport(formData) {
//   const res = await request.Post<ApiResult<unknown>>('/slotsGameConfig/import', formData, {
//     meta: {
//       postType: PostTypeEnum.FORM_DATA
//     }
//   });
//   if (res.code === 0) {
//     return res.message;
//   }
//   return Promise.reject(new Error(res.message));
// }
export async function checkNewMutiLang() {
  const res = await request.Get<ApiResult<unknown>>('/mutiLang/checkNew');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
