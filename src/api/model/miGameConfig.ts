import { PageParam } from '@/api/model/index';

/**
 * slots游戏配置
 */
export interface MiGameConfig {
  /***/
  gameId?: number;
  start?: boolean;
  /***/
  name?: string;
  /***/
  note?: string;
  /***/
  version?: number;
  /***/
  runVersion?: number;
  /***/
  open?: number;
  /***/
  status?: number;
  /***/
  major?: number;
  /***/
  hasReel?: number;
  freeModel?: number;
  /***/
  gameBase?: any;
  gameBaseStr?: string;
  /***/
  gameExt?: any;
  gameExtStr?: string;
  /***/
  bonusConfig?: any;
  bonusConfigStr?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  items?: RouletteSimulateItem[];
}

export interface RouletteGameUpload {
  gameId: number;
  name?: string;
  file?: File;
}

/**
 * slots游戏配置查询条件
 */
export interface MiGameConfigParam extends PageParam {
  /***/
  gameId?: number;
  /***/
  name?: string;
}

export interface RouletteSimulateItem {
  totalBet?: number;
  totalWin?: number;
  totalWinJackpot?: number;
  sectionBet?: number;
  sectionWin?: number;
  // 普通总额
  commWin?: number;
  commBet?: number;
  commCount?: number;
  maxBet?: number;
  triggerFreeSpinCount?: number;
  freeSpinCount?: number;
  freeSpinWin?: number;
  triggerJackpotCount?: number;
  jackpotWin?: number;
}

export interface RouletteSimulateWater {
  waterIndex?: number;
  rtpIndex?: number;
  waterCount?: number;
  totalBet?: number;
  totalWin?: number;
  waterMoney?: number; // 或者使用 string，如果需要精确的十进制计算可以使用 decimal.js 或 big.js
  profit?: number; // 或者使用 string，如果需要精确的十进制计算可以使用 decimal.js 或 big.js
}

export interface RouletteSimulateGameData {
  runState?: number;
  /* 参数 */
  gameId?: number;
  /* 总数量 */
  count?: number;
  lastIndex?: number;
  step?: number;
  current?: number;
  water1?: number;
  water2?: number;
  water3?: number;
  betIndex?: number;
  baseIndex?: number;
  waterFlag?: boolean;
  totalItem?: RouletteSimulateItem;
  currItem?: RouletteSimulateItem;
  items?: RouletteSimulateItem[];
  waterMap?: Map<number, RouletteSimulateWater>;
  waters?: RouletteSimulateWater[];
}

export interface RouletteSimulateGameParam {
  gameId?: number;
  buyFreeMul?: number;
  rtpIndex?: number;
  start?: boolean;
  gameName?: string;
  water1?: number;
  water2?: number;
  water3?: number;
  betIndex?: number;
  baseIndex?: number;
  num?: number;
  waterFlag?: boolean;
  // 下注基值
  base?: number[];
  // 下注倍数
  bets?: number[];
  // 索引
  rtpCount?: number;
}
