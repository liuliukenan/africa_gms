import request from '@/utils/request';
import type { ApiResult } from "@/api/model";
import type { PayChannel,PayChannelParams,UpdateRewardConfigParams } from '../model';

/**
 * 分页查询
 * @param params 查询条件
 */
export async function payChannels(params:PayChannelParams) {
  const res = await request.Post<ApiResult<PayChannel>>('/payChannel/list', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 获取奖励配置
export async function getRewardConfigApi(params:PayChannelParams) {
  const res = await request.Get<ApiResult<PayChannel>>('/payChannel/getRewardConfig', { params });
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 更新支付渠道奖励配置
export async function updateRewardConfigApi(params:UpdateRewardConfigParams) {
  const res = await request.Post<ApiResult<string>>('/payChannel/updateRewardConfig', params);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 查询渠道余额
export async function queryChannels(params:PayChannelParams) {
  const res = await request.Post<ApiResult<PayChannel>>('/payChannel/queryPayChannelBalance?channelId=' + params.channelId);
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 添加充值渠道
 * @param data
 */
export async function addPayChannel(data:PayChannelParams) {
  const res = await request.Post<ApiResult<PayChannel>>('/payChannel', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改充值渠道
 * @param data
 */
export async function updatePayChannel(data:PayChannelParams) {
  const res = await request.Put<ApiResult<PayChannel>>('/payChannel', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除充值渠道
 * @param id 角色id
 */
export async function removePayChannel(id:number) {
  const res = await request.Delete<ApiResult<PayChannel>>('/payChannel/' + id);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除
 * @param ids id集合
 */
export async function removePayChannels(ids:number[]) {
  const res = await request.Post<ApiResult<PayChannel>>('/payChannel/deleteBatch', ids);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
