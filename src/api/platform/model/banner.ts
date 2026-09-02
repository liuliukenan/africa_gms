import { PageParam } from '@/api/model';

/**
 * Banner图
 */
export interface Banner {
  /**id*/
  id?: number;
  /**国家代码*/
  countryCode?: number;
  /**显示名称*/
  name?: string;
  /**所属于分组*/
  gameGroup?: number;
  /**跳转类型*/
  jumpType?: number;
  /**扩展信息*/
  jumpExtend?: string | { list: any[] };
  /**发送范围*/
  userRange?: number;
  /**触发类型*/
  triggerType?: number;
  /**跳转类联ID*/
  jumpId?: number;
  /**排序*/
  sortNumber?: number;
  actId?: number;
  actCompletePolicy?: number;
  /**状态*/
  status?: boolean;
  /**开始时间*/
  startDate?: string;
  /**结束时间*/
  endDate?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  homeUrl?: string[];
  gameId?: number;
  updateTime?: string;
  imgUrl?: string;
  time?: string[];
}

/**
 * Banner图查询条件
 */
export interface BannerParam extends PageParam {
  /**id*/
  id?: number;
  /**国家代码*/
  countryCode?: number;
  /**显示名称*/
  name?: string;
  /**所属于分组*/
  gameGroup?: number;
  /**跳转类型*/
  jumpType?: number;
  /**扩展信息*/
  jumpExtend?: string;
  /**发送范围*/
  userRange?: number;
  /**触发类型*/
  triggerType?: number;
  /**跳转类联ID*/
  jumpId?: number;
  /**排序*/
  sortNumber?: number;
  /**状态*/
  status?: boolean;
}
