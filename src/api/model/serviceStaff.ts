import { PageParam } from '@/api/model/index';


/**
 * 客服列表
 */
export interface ServiceStaff {
 /**id*/
 uid? : number;
 /** 头像*/
 avatar? : number;
 /**呢称*/
 nickanme? : string;
 /**token*/
 token? : string;
 /**状态*/
 status? : boolean;
 /***/
 upateTime? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 客服列表查询条件
 */
export interface ServiceStaffParam extends PageParam {
     /**id*/
     uid? : number;
     /** 头像*/
     avatar? : number;
     /**呢称*/
     nickanme? : string;
     /**token*/
     token? : string;
     /**状态*/
     status? : boolean;
}

