import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api/model";
import type { GiftCardRecord, GiftCardRecordParam } from "@/api/model/giftCardRecord";

/**
* 分页查询
*/
export async function pageGiftCardRecords(params: GiftCardRecordParam) {
const res = await request.Post<ApiResult<PageResult<GiftCardRecord>>>(
    "/giftCardRecord/list",
    params);
    if (res.code === 0) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 导出
*/
export async function listGiftCardRecord(params?: GiftCardRecordParam) {
    const res = await request.Post<ApiResult<GiftCardRecord[]>>("/giftCardRecord/exportList",
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
export async function getGiftCardRecord(id: number) {
    const res = await request.Get<ApiResult<GiftCardRecord>>("/giftCardRecord/" + id);
    if (res.code === 0 && res.data) {
     return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 添加
*/
export async function addGiftCardRecord(data: GiftCardRecord) {
    const res = await request.Post<ApiResult<unknown>>("/giftCardRecord", data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 修改
*/
export async function updateGiftCardRecord(data: GiftCardRecord) {
    const res = await request.Put<ApiResult<unknown>>("/giftCardRecord", data);
    if (res.code === 0) {
    return res.message;
    }
    return Promise.reject(new Error(res.message));
}

/**
* 作废
*/
export async function voidGiftCardRecord(id?: number) {
    const res = await request.Get<ApiResult<unknown>>("/giftCardRecord/void/" + id);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
