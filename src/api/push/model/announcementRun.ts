import { PageParam } from '@/api/model';

/**
 * 跳马灯配置
 */
export interface AnnouncementRun {
  /***/
  id?: number;
  /**配置id*/
  announcementConfId?: number;

  /**运营标识名称*/
  title?: string;
  /**是否启用*/
  state?: boolean;
  /**生效开始时间*/
  startDate?: string;
  /**生效结束时间*/
  endDate?: string;
  /**总推送次数，-1 表示不限*/
  totalCount?: number;
  /**推送间隔（分钟）*/
  timeLen?: number;
  /**已推送次数*/
  sendCount?: number;
  /**下次推送时间戳（ms）*/
  nextTime?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 跳马灯配置查询条件
 */
export interface AnnouncementRunParam extends PageParam {
  /**配置id*/
  announcementConfId?: number;
  /**运营标识名称*/
  title?: string;
}
