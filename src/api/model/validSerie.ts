import { PageParam } from '@/api/model/index';


/**
 * 礼品码系列
 */
export interface ValidSerie {
 /**序号*/
 id? : number;
 type? : number;
 /**系列*/
 serie? : string;
 /**金币*/
 gold? : number;
 /**是否每天*/
 hasEveryDay? : boolean;
 /**是否启用*/
 hasOpen? : boolean;
 /**过期时间*/
 expireTime? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 礼品码系列查询条件
 */
export interface ValidSerieParam extends PageParam {
     /**序号*/
     id? : number;
     type? : number;
     /**系列*/
     serie? : string;
     /**金币*/
     gold? : number;
     /**是否每天*/
     hasEveryDay? : boolean;
     /**是否启用*/
     hasOpen? : boolean;
}

