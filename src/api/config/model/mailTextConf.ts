import { PageParam } from '@/api/model';

/**
 * 邮件文本配置
 */
export interface MailTextConf {
  /**id*/
  id?: number;
  keyId?: number;
  countryCode?: number;
  tagType?: number;
  /**邮件标题*/
  mailTitle?: string;
  /**内容*/
  mailText?: string;
  /**图片位置*/
  imgPos?: number;
  /**图片URL*/
  imgUrl?: string | string[];
  /**按钮文件*/
  buttonText?: string;
  /**跳转类型*/
  jumpType?: number;
  /**跳转ID*/
  jumpId?: number;
  /**扩展信息*/
  jumpExtend?: string | { list: any[] };
  /**状态*/
  state?: boolean;
  remark?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  paramNames: string[];
  paramNameStr: string;
  homeUrl?: string;
  gameId?: number;
  time?: string[];
  timeStr?: string;
}

/**
 * 邮件文本配置查询条件
 */
export interface MailTextConfParam extends PageParam {
  /**id*/
  id?: number;
  /**邮件标题*/
  mailTitle?: string;
  /**状态*/
  state?: boolean;
  /**跳转类型*/
  jumpType?: number;
  /**跳转ID*/
  jumpId?: number;
  countryCode?: number;
  remark?: string;
}
