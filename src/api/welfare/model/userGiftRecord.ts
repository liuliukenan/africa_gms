import { PageParam } from '@/api/model';


/**
 * 合伙人奖励详情
 */
export interface UserGiftRecord {
 /**id*/
 id? : number;
 /**用户ID*/
 uid? : number;
 /**手机号*/
 phone? : string;
 /**金额*/
 amount? : number;
 /**发放状态*/
 state? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
  nickname? : string;
}

export interface  UserGift{
    amount:number;
    flowMutl:number;
    jsonType?:string;
    open?:boolean;
    
}

/**
 * 合伙人奖励详情查询条件
 */
export interface UserGiftRecordParam extends PageParam {
     /**id*/
     id? : number;
     /**用户ID*/
     uid? : number;
     /**手机号*/
     phone? : string;
     /**金额*/
     amount? : number;
     /**发放状态*/
     state? : number;
}

