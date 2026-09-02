import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { Trumpet, TrumpetParam } from "@/api/model/trumpet";
import { Announcement, AnnouncementParam } from "../model/announcement";


/**
* 分页查询
*/
export async function pageTrumpets(params: TrumpetParam) {
    const res = await request.Post<ApiResult<PageResult<Trumpet>>>(
        "/trumpet/list",
        params);
        if (res.code === 0) {
         return res.data;
        }
        return Promise.reject(new Error(res.message));
}
export async function pageAnnouncements(params: AnnouncementParam) {
const res = await request.Post<ApiResult<PageResult<Announcement>>>(
    "/announcement/list/1",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}
/**
* 添加
*/
export async function addTrumpet(data: Trumpet) {
    const res = await request.Post<ApiResult<unknown>>("/trumpet", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateTrumpet(data: Trumpet) {
    const res = await request.Put<ApiResult<unknown>>("/trumpet", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 删除用户
*/
export async function removeTrumpet(id?: number) {
    const res = await request.Delete<ApiResult<unknown>>("/trumpet/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

