import { PageParam } from '@/api/model';

/**
 * Tips配置
 */
export interface TipsConf {
  /**id*/
  id?: number;
  /**key_id*/
  keyId?: number;
  /**跳转名称*/
  tipsName?: string;
  /**跳转类型*/
  tipsType?: number;
  gameId?: number;
  /**颜色类型*/
  colorType?: number;
  /**内容*/
  tipsText?: string;
  /**跳转类型*/
  jumpType?: number;
  /**跳转ID*/
  jumpId?: number;
  /**扩展信息*/
  jumpExtend?: string | { list: any[] };
  /**时长*/
  timeLen?: number;
  /**状态*/
  state?: number;
  paramNames: string[];
  paramNameStr: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  homeUrl?: string;
  countryCode?: string;
  remark?: string;
}
/**
 * Tips配置查询条件
 */
export interface TipsConfParam extends PageParam {
  /**跳转名称*/
  tipsName?: string;
  /**跳转类型*/
  tipsType?: number;
  /**状态*/
  state?: number;
  countryCode?: string;
  remark?: string;
}
