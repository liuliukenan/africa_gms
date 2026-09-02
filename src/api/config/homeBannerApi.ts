import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Banner, BannerParam } from "@/api/model/homeBanner";

/**
* 分页查询
*/
export async function pageBanner(params: BannerParam) {
const res = await request.Post<ApiResult<PageResult<Banner>>>(
    "/banner/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Post<ApiResult<unknown>>('/banner/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
/**
* 导出
*/
export async function listBanner(params?: BannerParam) {
    const res = await request.Post<ApiResult<Banner[]>>("/banner/exportList",
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
export async function getBanner(id: number) {
    const res = await request.Get<ApiResult<Banner>>("/banner/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 复制
*/
export async function copyBanner(id: number) {
    const res = await request.Post<ApiResult<unknown>>("/banner/copy/" + id, {});
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addBanner(data: Banner) {
    const res = await request.Post<ApiResult<unknown>>("/banner", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateBanner(data: Banner) {
    const res = await request.Put<ApiResult<unknown>>("/banner", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeBanner(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/banner/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 批量删除用户
 */
// export async function removeBanner(data: (number | undefined)[]) {
//   const res = await request.Delete<ApiResult<unknown>>('/banner/batchDelete',
//     data
//  );
//   if (res.code === 0) {
//      return res.message;
//   }
//   return Promise.reject(new Error(res.message));
// }
