import { PageParam } from '@/api/model';


/**
 * 合伙人奖励报告
 */
export interface UserParterCount {
 /**id*/
 id? : number;
 /**uid*/
 uid? : number;
 /**合伙人等级*/
 level? : number;
 /**ukey*/
 ukey? : string;
 /**日key*/
 daykey? : number;
 /**周key*/
 monkey? : number;
 /**直接人数*/
 layer1Num? : number;
 /**直接结果*/
 layer1Result? : number;
 /**直接下注*/
 layer1Bet? : number;
 /**二级人数*/
 layer2Num? : number;
 /**二级结果*/
 layer2Result? : number;
 /**二级下注*/
 layer2Bet? : number;
 /**三级人数*/
 layer3Num? : number;
 /**三级结果*/
 layer3Result? : number;
 /**三级下注*/
 layer3Bet? : number;
 /**奖励金额*/
 awardAmount? : number;
 /**状态*/
 status? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 合伙人奖励报告查询条件
 */
export interface UserParterCountParam extends PageParam {
     /**id*/
     id? : number;
     /**uid*/
     uid? : number;
     startDay? : number;
     endDay? : number;
     /**合伙人等级*/
     level? : number;
     /**ukey*/
     ukey? : string;
     /**日key*/
     daykey? : number;
     /**周key*/
     monkey? : number;
     /**直接人数*/
     layer1Num? : number;
     /**直接结果*/
     layer1Result? : number;
     /**直接下注*/
     layer1Bet? : number;
     /**二级人数*/
     layer2Num? : number;
     /**二级结果*/
     layer2Result? : number;
     /**二级下注*/
     layer2Bet? : number;
     /**三级人数*/
     layer3Num? : number;
     /**三级结果*/
     layer3Result? : number;
     /**三级下注*/
     layer3Bet? : number;
     /**奖励金额*/
     awardAmount? : number;
     /**状态*/
     status? : number;
}

