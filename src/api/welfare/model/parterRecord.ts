import { PageParam } from '@/api/model';


/**
 * 合伙人奖励详情
 */
export interface UserParterRecord {
 /**id*/
 id? : number;
 /**uid*/
 uid? : number;
 /**时间*/
 daykey? : number;
 /**总下注*/
 totalBet? : number;
 /**总赢取*/
 totalWin? : number;
 /**净利*/
 totalResult? : number;
 /**一级*/
 layer1? : number;
 /**二级*/
 layer2? : number;
 /**三级*/
 layer3? : number;
 /**一级利润*/
 layer1Result? : number;
 /**二级利润*/
 layer2Result? : number;
 /**三级利润*/
 layer3Result? : number;
 /**注册时间*/
 regTime? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 合伙人奖励详情查询条件
 */
export interface UserParterRecordParam extends PageParam {
     /**id*/
     id? : number;
     startDay? : number;
     endDay? : number;
     /**uid*/
     uid? : number;
     /**时间*/
     daykey? : number;
     /**总下注*/
     totalBet? : number;
     /**总赢取*/
     totalWin? : number;
     /**净利*/
     totalResult? : number;
     /**一级*/
     layer1? : number;
     /**二级*/
     layer2? : number;
     /**三级*/
     layer3? : number;
     /**一级利润*/
     layer1Result? : number;
     /**二级利润*/
     layer2Result? : number;
     /**三级利润*/
     layer3Result? : number;
     /**注册时间*/
     regTime? : number;
}

