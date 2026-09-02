import { PageParam } from '@/api/model/index';


/**
 * 邮件记录
 */
export interface MailLimit {
 /***/
 id? : number;
 /***/
 fromType? : number;
 /***/
 toType? : number;
 /***/
 min? : number;
 /***/
 max? : number;
 /***/
 duty? : number;
 /***/
 rebate? : number;
 /***/
 ownMoney? : number;
 /***/
 unbindMoney? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 邮件记录查询条件
 */
export interface MailLimitParam extends PageParam {
     /***/
     id? : number;
     /***/
     fromType? : number;
     /***/
     toType? : number;
     /***/
     min? : number;
     /***/
     max? : number;
     /***/
     duty? : number;
     /***/
     rebate? : number;
     /***/
     ownMoney? : number;
     /***/
     unbindMoney? : number;
}

