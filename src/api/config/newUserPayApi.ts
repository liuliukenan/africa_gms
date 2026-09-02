import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { NewUserPay, NewUserPayParam } from "@/api/model/newUserPay";

/**
* 分页查询
*/
export async function pageNewUserPays() {
const res = await request.Get<ApiResult<NewUserPay>>(
    "/sysConf/getNewUserPayConfig");
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 保存
*/
export async function saveNewUserPay(data: NewUserPay) {
    const res = await request.Post<ApiResult<unknown>>("/sysConf/saveNewUserPayConfig", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

