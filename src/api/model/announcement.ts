import { PageParam } from '@/api/model/index';

/**
 * 跑马灯
 */
export interface Announcement {
  /**id*/
  id?: number;
  cancel?: number;
  /**秒*/
  intervalTime?: number;
  /**类型 0跑马灯1弹窗*/
  type?: number;
  /**code*/
  code?: number;
  /**下次时间*/
  nextTime?: number;
  /**总次数*/
  totalCount?: number;
  /**已发次数*/
  sendCount?: number;
  /**zh*/
  zh?: string;
  /**en*/
  en?: string;
  /**th*/
  th?: string;
  /**mm*/
  mm?: string;
  /**my*/
  my?: string;
  /**vn*/
  vn?: string;
  /**indon*/
  indon?: string;
  uca?: string;
  content?: string;
  /**状态*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 跑马灯查询条件
 */
export interface AnnouncementParam extends PageParam {
  /**id*/
  id?: number;
  /**秒*/
  intervalTime?: number;
  /**类型 0跑马灯1弹窗*/
  type?: number;
  /**code*/
  code?: number;
  /**下次时间*/
  nextTime?: number;
  /**总次数*/
  totalCount?: number;
  /**已发次数*/
  sendCount?: number;
  /**zh*/
  zh?: string;
  /**en*/
  en?: string;
  /**th*/
  th?: string;
  /**mm*/
  mm?: string;
  /**my*/
  my?: string;
  /**vn*/
  vn?: string;
  /**indon*/
  indon?: string;
  /**状态*/
  status?: number;
}
