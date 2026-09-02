import { PageParam } from '@/api/model/index';

/**
 * slots水池信息
 */
export interface WaterPool {
  /**id*/
  id?: number;
  value?: number;
  gameName?: string;
  /***/
  ukey?: string;
  /**游戏ID*/
  gameId?: number;
  /**水量*/
  waterIndex?: number;
  /***/
  black?: number;
  /**渠道ID*/
  channel?: number;
  /**水量*/
  currMoney?: number;

  currTotalBet?: number;
  currTotalPay?: number;
  currBetNums?: number;
  /**抽成*/
  profitMoney?: number;
  /**当前回收*/
  totalBet?: number;
  /**当前支出*/
  totalPay?: number;
  /**总下注*/
  betNums?: number;
  /***/
  daykey?: number;
  /**今日回收*/
  todayTotalBet?: number;
  /**今日支出*/
  todayTotalPay?: number;
  /***/
  todayProfitMoney?: number;
  /**今日下注次数*/
  todayBetNum?: number;
  nextClearTime?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * slots水池信息查询条件
 */
export interface WaterPoolParam extends PageParam {

  /**游戏ID*/
  gameId?: number;
  type?: number;
  /**水量*/
  waterIndex?: number;
  /***/
  gameName?: number;

}
