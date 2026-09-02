import { PageParam } from '@/api/model';

/**
 * 跑马灯模板
 */
export interface AnnouncementConf {
  keyId?: number /**名称*/;
  name?: string;
  /**跑马灯类型*/
  sourceType?: number;
  /**跳转类型*/
  jumpType?: number;
  /**跳转ID/跳转功能*/
  jumpId?: number;
  /**多语言跑马灯内容，{"EN":"...","SW":"..."}，支持占位符*/
  announcementContent?: string;
  /**状态*/
  state?: number;
  /**随机抽取权重*/
  weight?: number;

  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 跑马灯模板查询条件
 */
export interface AnnouncementConfParam extends PageParam {
  /**名称*/
  name?: string;
  /**跑马灯类型*/
  sourceType?: number;
  /**状态*/
  state?: number;
  id?: number;
  /**随机抽取权重*/
  selectFlag?: boolean;
  /**keyid*/
  keyId?: number;
}
