import { PageParam } from "@/api/model";

/**
 * 投注记录查询参数
 */
export interface BetParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  countryCode?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  clientType?: number;
  agentId?: number;
  userType?: number;
  gameId?: number;
  gameGroupId?: number;
  factoryCode?: number;
  factoryId?: string;
  companyId?: string;
  periods?: number;
  channel?: number;
  status?: number;
}
// 投注记录
export interface Bet {
  id?: number;
  uid?: number;
  periods?: number;
  hundred?: number;
  ten?: number;
  unit?: number;
  awardNum?: number;
  awardAmount?: number;
  status?: string;
  awardResult?: number;
  createTime?: string;
  updateTime?: string;
}
/**
 * 开奖记录查询参数
 */
export interface OpenAwardParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  periods?: number;
  status?: number;
}
// 开奖记录
export interface OpenAward {
  id?: number;
  uid?: number;
  periods?: number;
  hundred?: number;
  ten?: number;
  unit?: number;
  awardNum?: number;
  awardAmount?: number;
  status?: string;
  awardResult?: number;
  createTime?: string;
  updateTime?: string;
}
/**
 * 机器人配置查询参数
 */
export interface RobotParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  periods?: number;
  status?: number;
}
// 机器人配置
export interface Robot {
  id?: number;
  minPeron?: number;
  maxPeron?: number;
  maxPerson?: number;
  personUserRange?: string[];
  personUserRangeStr?: string;
  personRobotRangeStr?: string;
  personRobotRange?: string[];
  createBy?: number;
  createTime?: string;
  updateBy?: number;
  updateTime?: string;
}
//中奖记录
export interface WinAward {
  id?: number;
  uid?: number;
  username?: string;
  goodName?: string;
  userFlag?: number;
  num?: number;
  type?: number;
  addressStatus?: number;
  receiver?: string;
  address?: string;
  phone?: string;
  expressNumer?: string;
  expressCompany?: string;
  status?: number;
  postalCode?: number;
  createTime?: string;
  updateTime?: string;
}
export interface WinAwardParam extends PageParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  addressStatus?: number;
  receiver?: string;
  phone?: string;
  expressNumer?: string;
  status?: number;
}
export interface TenTimesParam {
  jsonType?: string;
  amount?: number;
  payMult?: number;
  rate?: number;
  buyLimitTimes?: number;
  waterFlowMult?: number;
  intervalTime?: string;
  nextAnnounceTime?: string;
  robotNextTime?: string;
  robotFrequenciesStr?: string;
  robotFrequencies?: number[];
  mm: string;
  vn: string;
  indon: string;
  my: string;
  en: string;
  th: string;
  zh: string;
  uca: string;
}
// 十倍充值活动中奖列表
export interface TenTimesRecord {
  /*** ID */
  id?: number;

  /** * 用户ID*/
  uid?: number;

  /*** 订单号*/
  order_no?: string;

  /** * 日期key*/
  daykey?: number;

  /*** 用户名*/
  username?: string;

  /** * 用户标识 */
  userFlag?: number;

  /** * 金额 */
  amount?: number;

  /*** 目标金额*/
  targetAmount?: number;

  /** * 金币数量 */
  gold?: number;

  /*** 状态 */
  status?: number;

  /*** 创建时间 */
  createTime?: string;

  /** * 更新时间 */
  updateTime?: string;
}

export interface TenTimesRecordParam extends PageParam {
  startDate?: string;
  endDate?: string;
  startDay?: string;
  endDay?: string;
  sortName?: string;
  orderName?: string;
  uid?: number;
  orderNo?: number;
  userFlag?: number;

}

export interface Champion {
  jsonType?: string;
  /**是否开启*/
  open?: boolean;

  /** 当前奖项*/
  currAward?: number;
  preAward?: number;

  /**上期期数*/
  prePeriods?: number;

  /**当前期数*/
  currPeriods?: number;

  /** 开奖日期*/
  openDate?: string;

  /**数量 */
  num?: number;

  /**奖项权重 */
  awardWeights?: string[];
  awardWeightStr?: string;

  /** 开奖时间 */
  openTime?: string[];
  openTime1?: string;
  openTime2?: string;
  openTime3?: string;
  openTime4?: string;

  /**基础奖项 */
  baseAward?: number;

  /** 额外奖项*/
  addAwards?: string[];
  addAwardsStr: string;

  /*** 机器人数量 */
  robotNums?: string[];
  robotNumStr?: string;

  /*** 机器人倍数*/
  robotMutis?: string[];
  robotMutisStr?: string;

  /** * 机器人时间*/
  robotTimes?: string[];
  robotTimesStr?: string;
  /*** 公告时间 */
  announceTimes?: string[];
  announceTimesStr?: string;
  annnounceNextTime: number;
}
export interface ChampionRecords {
    id?: number;
    uid?: number;
    periods?: number;
    periodNum?: number;
    periodName?: string;
    ukey?: string;
    avatar?: string;
    username?: string;
    gameName?: string;
    userFlag?: number;
    gameId?: number;
    ranking?: number;
    muti?: number;
    amount?: number;
    totalBet?: number;
    totalWin?: number;
    createBy?: number;
    createTime?: string;
    updateBy?: number;
    updateTime?: string;
}
export interface RankRecordsParam extends PageParam {
  startDate?: string;
  endDate?: string;
  sortName?: string;
  orderName?: string;
  uid?: number;
  periods?: number;
  ranking?: number;
}
export interface AwardParam extends PageParam {
  startDate?: string;
  endDate?: string;
  sortName?: string;
  orderName?: string;
  uid?: number;
  periods?: number;
  username?: string;
}