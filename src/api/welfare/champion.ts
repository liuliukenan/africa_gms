import request from '@/utils/request';
import type { ApiResult, PageResult } from '@/api/model';
import { AwardParam, Champion, ChampionRecords, RankRecordsParam} from './model';
// 保存冠军配置
export async function saveChampion(data: Champion) {
    const res = await request.Post<ApiResult<unknown>>('/sysConf/saveChampConf', data);
    if (res.code === 0) {
        return res.message;
    }
    return Promise.reject(new Error(res.message));
}
//冠军配置
export async function getChampion() {
    const res = await request.Get<ApiResult<Champion>>('/sysConf/getChampConf');
    if (res.code === 0) {
        return res.data;
    }
    return Promise.reject(new Error(res.message));
}

/**
 * 冠军排行记录
 */
export async function pageRank(params: RankRecordsParam) {
  const res = await request.Post<ApiResult<PageResult<ChampionRecords[]>>>('/act/userChampActRanking/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
/**
 * 冠军中奖记录
 */
export async function pageAward(params: AwardParam) {
  const res = await request.Post<ApiResult<PageResult<ChampionRecords[]>>>('/act/userChampActAwardRecord/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}