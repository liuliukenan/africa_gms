import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { UserWalletExample, UserWalletExampleParam } from "./model/userWalletExample";

/**
* 分页查询
*/
export async function pageUserWalletExamples(params: UserWalletExampleParam) {
const res = await request.Post<ApiResult<PageResult<UserWalletExample>>>(
    "/userWalletExample/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listUserWalletExample(params?: UserWalletExampleParam) {
    const res = await request.Post<ApiResult<UserWalletExample[]>>("/userWalletExample/exportList",
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
export async function getUserWalletExample(id: number) {
    const res = await request.Get<ApiResult<UserWalletExample>>("/userWalletExample/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addUserWalletExample(data: UserWalletExample) {
    const res = await request.Post<ApiResult<unknown>>("/userWalletExample", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateUserWalletExample(data: UserWalletExample) {
    const res = await request.Put<ApiResult<unknown>>("/userWalletExample", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeUserWalletExample(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/userWalletExample/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
// 发送服务器
export async function sendConfServer() {
  const res = await request.Get<ApiResult<unknown>>('/userWalletExample/reload');
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
