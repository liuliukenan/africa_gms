import { PageParam } from '@/api/model';

/**
 * 系统Tips
 */
export interface TipsRun {
  /**id*/
  id?: number;
  /**标题*/
  title?: string;
  countryCode?: number;
  /**配置ID*/
  tipsConfId?: number;
  /**开始时间*/
  startDate?: string;
  /**结束时间*/
  endDate?: string;
  /**显示总数*/
  totalCount?: number;
  /**显示次数*/
  sendCount?: number;
  /**下次时间*/
  nextTime?: number;
  /**状态*/
  state?: boolean;
  /**时间间隔*/
  timeLen?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  time?: string[];
}

/**
 * 系统Tips查询条件
 */
export interface TipsRunParam extends PageParam {
  /**id*/
  id?: number;
  /**标题*/
  title?: string;
  /**配置ID*/
  tipsConfId?: number;
  countryCode?: number;
  /**状态*/
  state?: number;
}
