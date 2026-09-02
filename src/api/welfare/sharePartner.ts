import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { ShareConfig} from './model/sharePartner';
// 保存冠军配置
export async function saveSharePartner(data: ShareConfig) {
    const res = await request.Post<ApiResult<unknown>>('/sysConf/saveSharePartConf', data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
//合伙人配置
export async function getSharePartner() {
    const res = await request.Get<ApiResult<ShareConfig>>('/sysConf/getSharePartConf');
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

// /**
//  * 合伙人排行记录
//  */
// export async function pageRank(params: RankRecordsParam) {
//   const res = await request.Post<ApiResult<PageResult<ChampionRecords[]>>>('/act/userChampActRanking/list', params);
//   if (res.code === 0) {
//     return res.data;
//   }
//   return Promise.reject(new Error(res.message));
// }
// /**
//  *合伙人中奖记录
//  */
// export async function pageAward(params: AwardParam) {
//   const res = await request.Post<ApiResult<PageResult<ChampionRecords[]>>>('/act/userChampActAwardRecord/list', params);
//   if (res.code === 0) {
//     return res.data;
//   }
//   return Promise.reject(new Error(res.message));
// }