import { PageParam } from '@/api/model/index';

/**
 * 邮件记录
 */
export interface Mail {
  /***/
  id?: number;
  uid?: number;
  /**邮件类型*/
  type?: number;

  flowMutl?: number;
  /**发件人*/
  fromUid?: number;
  /**发件人名秒名*/
  fromName?: string;
  /**收件人UID*/
  toUid?: number;
  exampleId?: number;
  annexType?: number;
  tagType?: number;
  /**邮件主题 */
  title?: string;
  /**内容*/
  content?: string;
  /**邮件状态*/
  status?: number;
  /**金币*/
  amount?: number;
  /**返利*/
  rebate?: number;
  /**税收*/
  duty?: number;
  /**发送类型*/
  fromType?: number;
  validHours?: number;
  /**接收类型*/
  toType?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 邮件记录查询条件
 */
export interface MailParam extends PageParam {
  /**邮件类型*/
  type?: number;
  /**发件人*/
  fromUid?: number;
  /**发件人名秒名*/
  fromName?: string;
  startDate?: string;
  endDate?: string;
  /**收件人UID*/
  toUid?: number;
  /**邮件状态*/
  status?: number;
  countryCode?: number;
}
