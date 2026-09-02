import { PageParam } from '@/api/model';

/**
 * 短信通道
 */
export interface SmsChannel {
  /**id*/
  id?: number;
  /**sender*/
  sender?: number;
  /**名称*/
  name?: string;
  /**排序*/
  sortNumber?: number;
  /**请求地址*/
  url?: string;
  /**请求apikey*/
  apikey?: string;
  channelType?: number;
  /**请求密钥*/
  apisecret?: string;
  /**附加信息*/
  extend?: string;
  exendJson?: Record<string, any>;
  /**国家列表*/
  countryCodes?: number[];
  /**状态*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 短信通道查询条件
 */
export interface SmsChannelParam extends PageParam {
  /**id*/
  id?: number;
  /**sender*/
  sender?: number;
  /**名称*/
  name?: string;
  /**排序*/
  sortNumber?: number;
  /**请求地址*/
  url?: string;
  /**请求apikey*/
  apikey?: string;
  /**请求密钥*/
  apisecret?: string;
  /**附加信息*/
  extend?: string;
  /**国家列表*/
  countryCodes?: string;
  /**状态*/
  status?: number;
}
