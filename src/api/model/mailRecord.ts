import { PageParam } from '@/api/model/index';


/**
 * 赠送记录
 */
export interface MailRecord {
 /***/
 id? : number;
 /**邮件类型*/
 type? : number;
 /**发件人*/
 fromUid? : number;
 /**发件人名秒名*/
 fromName? : string;
 /**收件人UID*/
 toUid? : number;
 /***/
 toName? : string;
 /**邮件主题 */
 title? : string;
 /**内容*/
 content? : string;
 /**金币*/
 gold? : number;
 /**钻石*/
 diamond? : number;
 /**福卷*/
 coupon? : number;
 /**返利*/
 rebate? : number;
 /**税收*/
 duty? : number;
 /**发送类型*/
 fromType? : number;
 /**接收类型*/
 toType? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 赠送记录查询条件
 */
export interface MailRecordParam extends PageParam {
     /***/
     id? : number;
     /**邮件类型*/
     type? : number;
     /**发件人*/
     fromUid? : number;
     /**发件人名秒名*/
     fromName? : string;
     /**收件人UID*/
     toUid? : number;
     /***/
     toName? : string;
     /**邮件主题 */
     title? : string;
     /**内容*/
     content? : string;
     /**金币*/
     gold? : number;
     /**钻石*/
     diamond? : number;
     /**福卷*/
     coupon? : number;
     /**返利*/
     rebate? : number;
     /**税收*/
     duty? : number;
     /**发送类型*/
     fromType? : number;
     /**接收类型*/
     toType? : number;
}

