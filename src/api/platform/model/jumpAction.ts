import { PageParam } from '@/api/model';


/**
 * 跳转行为表
 */
export interface JumpAction {
 /**id*/
 id? : number;
 /**跳转名称*/
 jumpName? : string;
 /**跳转类型*/
 jumpType? : number;
 /**跳转地址*/
 jumpAddress? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 跳转行为表查询条件
 */
export interface JumpActionParam extends PageParam {
     /**id*/
     id? : number;
     /**跳转名称*/
     jumpName? : string;
     /**跳转类型*/
     jumpType? : number;
     /**跳转地址*/
     jumpAddress? : number;
}

