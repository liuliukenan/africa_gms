import { PageParam } from '@/api/model';


/**
 * 用户免费游戏
 */
export interface UserFreeGame {
 /**id*/
 id? : number;
 /**uid*/
 uid? : number;
 /**触发类型*/
 triggerSpinType? : number;
 /**模板类型*/
 freeGameConfId? : number;
 /**名称*/
 name? : number;
 /**游戏ID*/
 gameId? : number;
 /**下注金额*/
 betAmount? : number;
 /**下注索引*/
 base? : number;
 /**level*/
 level? : number;
 /**总次数*/
 totalSpins? : number;
 /**流水倍数*/
 flowMutl? : number;
 /**已用已次*/
 usedSpins? : number;
 /**钱包模板*/
 exampleId? : number;
 /**有效结束时间*/
 expireTime? : string;
 /**状态pending / in_progress / completed / expired / forfeited*/
 status? : number;
 /**累积赢取*/
 totalWin? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 用户免费游戏查询条件
 */
export interface UserFreeGameParam extends PageParam {
     /**id*/
     id? : number;
     /**uid*/
     uid? : number;
     /**触发类型*/
     triggerSpinType? : number;
     /**模板类型*/
     freeGameConfId? : number;
     /**名称*/
     name? : number;
     /**游戏ID*/
     gameId? : number;
     /**下注金额*/
     betAmount? : number;
     /**下注索引*/
     base? : number;
     /**level*/
     level? : number;
     /**总次数*/
     totalSpins? : number;
     /**流水倍数*/
     flowMutl? : number;
     /**已用已次*/
     usedSpins? : number;
     /**钱包模板*/
     exampleId? : number;
     /**状态pending / in_progress / completed / expired / forfeited*/
     status? : number;
     /**累积赢取*/
     totalWin? : number;
}

