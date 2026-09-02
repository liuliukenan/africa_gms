import request from '@/utils/request';
import type { ApiResult } from '@/api/model';
interface FirstPayParam {
    jsonType?:string,
    openStatus: boolean,
    payCompFlowMult: number,
    advicePayAmount?: number,
}
// 保存首日充值补偿配置
export async function saveFirstPay(data: FirstPayParam) {
    const res = await request.Post<ApiResult<unknown>>('/sysConf/saveFirstDayPayCompConf', data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
//首日充值补偿配置
export async function getFirstPay() {
    const res = await request.Get<ApiResult<unknown>>('/sysConf/getFirstDayPayCompConf');
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}