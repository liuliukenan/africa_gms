import { PageParam } from '@/api/model/index';


/**
 * slots场次配置
 */
export interface SlotsLimitConfig {
 /***/
 id? : number;
 /***/
 name? : string;
 /***/
 limitTag? : number;
 /***/
 betIndexList? : string;
 /***/
 min? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
  betIndexStr? : string;
}



/**
 * slots场次配置查询条件
 */
export interface SlotsLimitConfigParam extends PageParam {
     /***/
     id? : number;
     /***/
     name? : string;
     /***/
     limitTag? : number;
     /***/
     betIndexList? : string;
     /***/
     min? : number;
}

