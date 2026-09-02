import { PageParam } from '@/api/model';


/**
 * 国家与游戏关系配置表
 */
export interface GameCountryRelationship {
 /**国家*/
 countryCode? : string;
 countryName? : string;
 /**主键ID*/
 id? : string;
 countryCode? : number;
 gameId? : number;
 /**名称*/
 name? : string;
 /**是否火热*/
 hot? : number;
 /**是否新游戏*/
 hasNew? : number;
 /**排序*/
 sortNumber? : number;
 /**状态*/
 state? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 国家与游戏关系配置表查询条件
 */
export interface GameCountryRelationshipParam extends PageParam {
     /**国家*/
     countryCode? : string;
     /**游戏ID*/
     gameId? : number;
     countryCode? : number;
     /**名称*/
     name? : string;
     /**是否火热*/
     hot? : number;
     /**是否新游戏*/
     hasNew? : number;
     /**排序*/
     sortNumber? : number;
     /**状态*/
     state? : number;
}

