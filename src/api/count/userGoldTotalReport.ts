import request from '@/utils/request';
import type { ApiResult, PageResult } from "@/api/model";
import type {UserGoldTotalReport,UserGoldTotalReportParams} from "./model";
/**
 * 分页查询
 * @param params 查询条件
 */
export async function pageUserGoldTotalReports(params?:UserGoldTotalReportParams) {
  const res = await request.Post<ApiResult<PageResult<UserGoldTotalReport>>>('/count/userGoldTotalReport/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

// 详情
export async function pageUserGoldTotalReportsInfo(uid?:number) {
  const res = await request.Get<ApiResult<UserGoldTotalReport>>('/count/userGoldTotalReport/getByUid/'+uid,);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加用户金币统计
 * @param data
 */
export async function addUserGoldTotalReport(data:UserGoldTotalReport) {
  const res = await request.Post<ApiResult<unknown>>('/userGoldTotalReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改用户金币统计
 * @param data
 */
export async function updateUserGoldTotalReport(data:UserGoldTotalReport) {
  const res = await request.Put<ApiResult<unknown>>('/userGoldTotalReport', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除用户金币统计
 * @param id 角色id
 */
export async function removeUserGoldTotalReport(id:number) {
  const res = await request.Delete<ApiResult<unknown>>('/userGoldTotalReport/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removeUserGoldTotalReports(ids:number[]) {
  const res = await request.Post<ApiResult<unknown>>('/userGoldTotalReport/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}




// 钻石列表
export async function pageUserDiamondTotalReports(params?:UserGoldTotalReportParams) {
  const res = await request.Post<ApiResult<PageResult<UserGoldTotalReport>>>('/count/userDiamondTotalReport/list',params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 钻石详情
export async function pageUserDiamondTotalReportsInfo(uid?:number) {
  const res = await request.Get<ApiResult<UserGoldTotalReport>>('/count/userDiamondTotalReport/getByUid/'+uid,);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}