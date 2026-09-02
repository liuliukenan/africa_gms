import { PageParam } from '@/api/model';


/**
 * 合伙人申请
 */
export interface ParterApply {
 /**id*/
 id? : number;
 /**uid*/
 uid? : number;
 /**whatapp*/
 whatapp? : string;
 /**电话*/
 phone? : string;
 /**状态*/
 status? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 合伙人申请查询条件
 */
export interface ParterApplyParam extends PageParam {
     /**id*/
     id? : number;
     /**uid*/
     uid? : number;
     /**whatapp*/
     whatapp? : string;
     /**电话*/
     phone? : string;
     /**状态*/
     status? : number;
}
// 审核
export interface ApplyParam  {
     /**id*/
     id? : number;
     /**uid*/
     uid? : number;
     /**电话*/
     level? : number;
     /**状态*/
     status? : number;
}

