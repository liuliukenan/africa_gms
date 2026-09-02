import { PageParam } from '@/api/model/index';
export interface Conf { }
// 基本配置
export interface BaseConf {
  jsonType?: string; //
  registerCoins?: number;
  bindCoins?: number;
  shareAward?: number;
  reliefFundsTimes?: number;
  reliefFundsCoins?: number;
  reliefFundsOwnCoins?: number;
  gameCode?: string;
  thbRate?: number;
  thbMinWithdrawMoney?: number;
  thbExchangeLis?: any[];
  thbExchangeList?: string[];
  sepayMinMaxList?: string[];
  sepayChannelType?: string[];
  withdrawRanges?: string[];
  payRanges?: string[];
  payFlowMutl?: number;
  validCodeFlowMutl?: number;
  resetFlowGold?: number;
  contractInfos?: ContractInfo[];
}
export interface ContractInfo {
  key?: string;
  isEdit?: boolean;
  type?: string;
  account?: string;
  url?: string;
}

// 签到配置
export interface MonthCardConf {
  jsonType?: string;
  id?: number;
  monthCardGold?: number;
  buyMonthCardGold?: number;
  buyMonthCardApproach?: number;
  items?: Item[];
}
export interface Item {
  id?: number;
  num?: number;
  key?: string;
  isEdit?: boolean;
}

// 轮盘签到配置
export interface SignConf {
  jsonType?: string;
  id?: number;
  baseItems?: BaseItems[];
  plusItems?: PlusItems[];
}
export interface BaseItems {
  uuid?: string | null;
  id?: number;
  num?: number;
  weight?: number;
  key?: string;
  isEdit?: boolean;
}
export interface PlusItems {
  uuid?: string | null;
  id?: number;
  num?: number;
  day?: number;
  key?: string;
  isEdit?: boolean;
}



// 客户端更新
export interface GameVersionConf {
  jsonType?: string;
  packageUrl?: string;
  remoteManifestUrl?: string;
  remoteVersionUrl?: string;
  version?: string;
}

/**
 * 字典搜索条件
 */
export interface ConfParam extends PageParam { }

//每日彩票活动配置
// export interface DailyLotteryConf {
//   jsonType?: string;
//   packageUrl?: string;
//   remoteManifestUrl?: string;
//   remoteVersionUrl?: string;
//   version?: string;
// }
// 每日彩票活动配置
export interface DailyLotteryConf {
  actOpen?: boolean | number;
  robotOpen?: boolean | number;
  prePeriod?: number;
  currentPeriod?: number;
  jackpot?: number;
  openTime?: string;
  betOverTime?: string;
  waterFlowMul?: number;
  announceNextTime?: number;
  announceInterval?: number;
}
// 每日轮盘抽奖活动配置
export interface WheelConf {
   jsonType?: string;
  amount?: number;
  waterFlowMult?: number;
  intervalTime?: number;
  robotCurrentFrequency?: number;
  robotFrequencies?: number[];
  robotFrequenciesStr?: string;
  robotAwards?: number[];
  robotAwardsStr?: string;
}
