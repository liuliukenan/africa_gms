import { PageParam } from '@/api/model';


/**
 * 游戏分组配置
 */
export interface GameGroup {
 /**id*/
 groupId? : number;
 /**原游戏ID*/
 groupName? : string;
 /**游戏类型*/
 gameType? : number;
 /**排序*/
 sortNumber? : number;
 /**状态*/
 state? : number;
 /**真实人数比例*/
 realRate? : number;
 /**人数系数区间*/
 betaRates? :  number[];
 /**基础人数区间*/
 baseRates? : number[];
 baseRatesStr? : string;
 betaRatesStr? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 游戏分组配置查询条件
 */
export interface GameGroupParam extends PageParam {
     /**id*/
     groupId? : number;
     /**原游戏ID*/
     groupName? : string;
     /**游戏类型*/
     gameType? : number;
     /**排序*/
     sortNumber? : number;
     /**状态*/
     state? : number;
     /**真实人数比例*/
     realRate? : number;
     /**人数系数区间*/
     betaRates? : string;
     /**基础人数区间*/
     baseRates? : string;
}

