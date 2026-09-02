import { PageParam } from '@/api/model/index';


/**
 * 意见和建议
 */
export interface OpinionRecord {
 /***/
 id? : number;
 /**用户ID*/
 userId? : number;
 /**请求内容*/
 content? : string;
 /**回复内容*/
 replyContent? : string;
 /**状态*/
 status? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 意见和建议查询条件
 */
export interface OpinionRecordParam extends PageParam {
     /***/
     id? : number;
     /**用户ID*/
     userId? : number;
     /**请求内容*/
     content? : string;
     /**回复内容*/
     replyContent? : string;
     /**状态*/
     status? : number;
}

