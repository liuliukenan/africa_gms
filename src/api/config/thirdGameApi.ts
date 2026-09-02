import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Announcement, AnnouncementParam } from "@/api/model/announcement";

/**
* 分页查询
*/
export async function getThirdGameConf(params: any) {
const res = await request.Post<ApiResult<unknown>>(
    "/sysConf/getThirdGame",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

export async function saveThirdGameConf(data: any) {
    const res = await request.Post<ApiResult<unknown>>("/sysConf/saveThirdGame", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}