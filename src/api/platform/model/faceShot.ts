import { PageParam } from '@/api/model';

/**
 * 拍脸图
 */
export interface FaceShot {
  /**id*/
  id?: number;
  /**key_id*/
  keyId?: number;
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
  /**每日显示总数*/
  dayDisplayTimes?: number;
  actCompletePolicy?: number;
  /**排序*/
  sortNumber?: number;
  /**状态*/
  status?: boolean;
  gameId?: number;
  /**开始时间*/
  startDate?: string;
  /**结束时间*/
  endDate?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  actId?: string;
  actName?: string;
  hasFloat?: boolean;
  homeUrl?: string[];
  imgUrl?: string;
  time?: string[];
}

/**
 * 拍脸图查询条件
 */
export interface FaceShotParam extends PageParam {
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
  /**每日显示总数*/
  dayDisplayTimes?: number;
  /**排序*/
  sortNumber?: number;
  /**状态*/
  status?: number;
}

export interface CountryAct {
  id: number;
  countryCode?: number;
  type?: string;
  name?: string;
  jumpType?: string;
  jumpId?: string;
  configValue?: {
    jsonType?: string;
  };
  userRange?: number;
  triggerType?: number;
  imgUrl?: string;
  sortNumber?: number;
  status?: boolean;
  startDate?: string;
  endDate?: string;
  showStartDate?: string;
  showEndDate?: string;
  createBy?: number;
  createTime?: string;
  updateBy?: number;
  updateTime?: string;
  description?: string;
  subTitle?: string;
}
