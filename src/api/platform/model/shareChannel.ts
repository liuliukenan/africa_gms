import { PageParam } from '@/api/model';

/** 渠道来源类型：0=普通，1=Facebook，2=TikTok */
export type ChannelSourceType = 0 | 1 | 2;

/** 渠道来源扩展配置公共字段 */
export interface ChannelSourceConf {
  '@class'?: string;
  classType?: string;
  jsonType?: string;
  enabled?: boolean;
  accessToken?: string;
  testEventCode?: string;
  pixelId?: string;
  pixelCode?: string;
  testMode?: boolean;
}

/**
 * Facebook 渠道来源配置
 */
export interface FacebookChannelSourceConf extends ChannelSourceConf {
  /** Jackson 多态类型，后端反序列化需要 */
  '@class'?: string;
  /** 兼容后端 JacksonExt 的类型字段 */
  classType?: string;
  /** 兼容旧配置展示 */
  jsonType?: string;
  /** 是否启用 Facebook 上报 */
  enabled?: boolean;
  /** Facebook Pixel ID */
  pixelId?: string;
  /** Facebook CAPI Access Token，仅 GMS 管理后台配置使用 */
  accessToken?: string;
  /** Meta Events Manager 测试事件码，可选 */
  testEventCode?: string;
  /** 注册事件是否发送到 Meta 测试事件 */
  testMode?: boolean;
}

/** TikTok 渠道来源配置 */
export interface TikTokChannelSourceConf extends ChannelSourceConf {
  /** TikTok Pixel Code */
  pixelCode?: string;
}

/** Facebook CAPI 测试事件结果 */
export interface FacebookPixelTestResult {
  success: boolean;
  channel: number;
  pixelId: string;
  eventName: string;
  eventId: string;
  metaResponse: string;
}

/** TikTok Events API 测试事件结果 */
export interface TikTokPixelTestResult {
  success: boolean;
  channel: number;
  pixelCode: string;
  eventName: string;
  eventId: string;
  tiktokResponse: string;
}

/**
 * 推广渠道
 */
export interface ShareChannel {
  id?: number;
  channel?: number;
  channelType?: number;
  channelName?: string;
  state?: number;
  createBy?: number;
  updateBy?: number;
  createTime?: string;
  updateTime?: string;
  shareUrl?: string;
  remark?: string;
  countryCode?: number;
  roleId?: number;
  useVerification?: number;
  phone?: string;
  groupId?: number;
  groupLeader?: number;
  resigned?: number;
  sourceType?: ChannelSourceType;
  sourceConfig?: ChannelSourceConf;
}

/**
 * 推广渠道查询条件
 */
export interface ShareChannelParam extends PageParam {
  id?: number;
  channel?: number;
  channelName?: string;
  state?: string;
  createBy?: number;
  updateBy?: number;
  createTime?: string;
  updateTime?: string;
  countryCode?: number;
  sourceType?: ChannelSourceType;
}

/**
 * 修改玩家渠道请求参数
 */
export interface UpdateUserChannelDTO {
  uid?: number;
  channel?: number;
}
