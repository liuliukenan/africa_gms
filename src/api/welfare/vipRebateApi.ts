import request from "@/utils/request";
import { PostTypeEnum, type ApiResult, type PageResult } from "@/api/model";
import type { VipRebate, VipRebateParam ,VipRebateConf} from "@/api/welfare/model/vipRebate";
// 保存VIP返利配置
export async function saveVipRebateConf(data: VipRebateConf) {
    const res = await request.Post<ApiResult<unknown>>('/sysConf/saveVipRebateConf', data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
//VIP返利配置
export async function getVipRebateConf() {
    const res = await request.Get<ApiResult<unknown>>('/sysConf/getVipRebateConf');
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 分页查询
*/
export async function pageVipRebates(params: VipRebateParam) {
const res = await request.Post<ApiResult<PageResult<VipRebate>>>(
    "/act/vipRebate/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listVipRebate(params?: VipRebateParam) {
    const res = await request.Post<ApiResult<VipRebate[]>>("/act/vipRebate/exportList",
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
export async function getVipRebate(id: number) {
    const res = await request.Get<ApiResult<VipRebate>>("/act/vipRebate/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addVipRebate(data: VipRebate) {
    const res = await request.Post<ApiResult<unknown>>("/act/vipRebate", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateVipRebate(data: VipRebate) {
    const res = await request.Put<ApiResult<unknown>>("/act/vipRebate", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeVipRebate(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/act/vipRebate/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
export async function removeVipRebates(data: (number | undefined)[]) {
  const res = await request.Delete<ApiResult<unknown>>('/act/vipRebate/batchDelete',
    data
 );
  if (res.code === 0) {
     return res.message;
  }
  return Promise.reject(new Error(res.message));
}
// 导出
export async function exportExcel() {
  return await request.Post<ApiResult<unknown>>('/act/vipRebate/exportExcel', {}, { responseType: 'blob' });
}

// 导入
export async function importExcel(formData: any) {
  const res = await request.Post<ApiResult<unknown>>('/act/vipRebate/importExcel', formData, {
    meta: {
      postType: PostTypeEnum.FORM_DATA
    }
  });
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}