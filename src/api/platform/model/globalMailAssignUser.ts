import { PageParam } from '@/api/model';


/**
 * 全局邮件指定的用户
 */
export interface GlobalMailAssignUser {
 /**id*/
 id? : number;
 /**全局邮件ID*/
 mid? : number;
 /**用户ID*/
 uid? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 全局邮件指定的用户查询条件
 */
export interface GlobalMailAssignUserParam extends PageParam {
     /**id*/
     id? : number;
     /**全局邮件ID*/
     mid? : number;
     /**用户ID*/
     uid? : number;
}

