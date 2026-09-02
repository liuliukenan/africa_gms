import { PageParam } from '@/api/model';


/**
 * 返利记录
 */
export interface RebateList {
 /**id*/
 id? : number;
 /**时间key*/
 daykey? : number;
 /**用户Id*/
 uid? : number;
 /**总下注*/
 totalBet? : number;
 /**总赢取*/
 totalWin? : number;
 /**slots下注*/
 slotsBet? : number;
 /**slots赢取*/
 slotsWin? : number;
 /**cards下注*/
 cardsBet? : number;
 /**cards赢取*/
 cardsWin? : number;
 /**捕鱼下注*/
 fishBet? : number;
 /**捕鱼赢取*/
 fishWin? : number;
 /**真人下注*/
 liveBet? : number;
 /**真人赢取*/
 liveWin? : number;
 /**体育下注*/
 sportsBet? : number;
 /**体育赢取*/
 sportsWin? : number;
 /**彩票下注*/
 lotteryBet? : number;
 /**彩票赢取*/
 lotteryWin? : number;
 /**其它下注*/
 otherBet? : number;
 /**其它赢取*/
 otherWin? : number;
 /**返利金额*/
 rebateAmount? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 返利记录查询条件
 */
export interface RebateListParam extends PageParam {
     /**id*/
     id? : number;
     /**时间key*/
     daykey? : number;
     /**用户Id*/
     uid? : number;
     /**总下注*/
     totalBet? : number;
     /**总赢取*/
     totalWin? : number;
     /**slots下注*/
     slotsBet? : number;
     /**slots赢取*/
     slotsWin? : number;
     /**cards下注*/
     cardsBet? : number;
     /**cards赢取*/
     cardsWin? : number;
     /**捕鱼下注*/
     fishBet? : number;
     /**捕鱼赢取*/
     fishWin? : number;
     /**真人下注*/
     liveBet? : number;
     /**真人赢取*/
     liveWin? : number;
     /**体育下注*/
     sportsBet? : number;
     /**体育赢取*/
     sportsWin? : number;
     /**彩票下注*/
     lotteryBet? : number;
     /**彩票赢取*/
     lotteryWin? : number;
     /**其它下注*/
     otherBet? : number;
     /**其它赢取*/
     otherWin? : number;
     /**返利金额*/
     rebateAmount? : number;
     startDay? : number;
     endDay? : number;
}

