import { PageParam } from '@/api/model/index';

/**
 * slots奖池信息
 */
export interface JackpotPool {
  /***/
  id?: number;
  /***/
  ukey?: string;
  /**游戏ID*/
  gameId?: number;
  gameName?: string;
  /***/
  channel?: number;
  /**bet_index*/
  betIndex?: number;
  /**奖池1*/
  coins1?: number;
  /**奖池2*/
  coins2?: number;
  /**奖池3*/
  coins3?: number;
  /**奖池4*/
  coins4?: number;
  /**奖池5*/
  coins5?: number;
  /**奖池6*/
  coins6?: number;
  /**奖池7*/
  coins7?: number;
  /**奖池8*/
  coins8?: number;
  /**奖池9*/
  coins9?: number;
  /**清理随机0*/
  clearRand1?: number;
  /**清理随机1*/
  clearRand2?: number;
  /**清理随机2*/
  clearRand3?: number;
  /**清理随机4*/
  clearRand4?: number;
  /**清理随机5*/
  clearRand5?: number;
  /**清理随机6*/
  clearRand6?: number;
  /**清理随机7*/
  clearRand7?: number;
  /**清理随机8*/
  clearRand8?: number;
  /**清理随机9*/
  clearRand9?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * slots奖池信息查询条件
 */
export interface JackpotPoolParam extends PageParam {
  /***/
  id?: number;
  /***/
  ukey?: string;
  gameName?: string;
  /**游戏ID*/
  gameId?: number;
  /***/
  channel?: number;
  /**bet_index*/
  betIndex?: number;
  /**奖池1*/
  coins1?: number;
  /**奖池2*/
  coins2?: number;
  /**奖池3*/
  coins3?: number;
  /**奖池4*/
  coins4?: number;
  /**奖池5*/
  coins5?: number;
  /**奖池6*/
  coins6?: number;
  /**奖池7*/
  coins7?: number;
  /**奖池8*/
  coins8?: number;
  /**奖池9*/
  coins9?: number;
  /**清理随机0*/
  clearRand1?: number;
  /**清理随机1*/
  clearRand2?: number;
  /**清理随机2*/
  clearRand3?: number;
  /**清理随机4*/
  clearRand4?: number;
  /**清理随机5*/
  clearRand5?: number;
  /**清理随机6*/
  clearRand6?: number;
  /**清理随机7*/
  clearRand7?: number;
  /**清理随机8*/
  clearRand8?: number;
  /**清理随机9*/
  clearRand9?: number;
}
