import { PageParam } from '@/api/model';

// 2代理转账
export interface SvipPayCount {
  daykey?: number;
  sendAmount?: number;
  sendNum?: number;
  id?: number;
  receiveAmount?: number;
  receiveNum?: number;
  uid?: number;
}

// 2代理转账---查询参数
export interface SvipPayCountParams extends PageParam {
  uid?: number;
  sortName?: string;
}

// 裂变
export interface FissionCard {
  avgMount?: number;
  avgRegiter?: number;
  avgPay?: number;
  registerCnt?: number;
  payCnt?: number;
  participantCnt?: number;
  participantFirstCnt?: number;
  awardCnt?: number;
  firstTaskNum?: number;
  firstTaskAward?: number;
  registerDoCnt?: number;
  payDoCnt?: number;
  allTaskFinishNum?: number;
  finishCnt?: number;
  otherTaskFinishNum?: number;
  otherTaskAwardCnt?: number;
  otherTaskAwardNum?: number;
}

export interface Fission {
  registerCnt?: number;
  payCnt?: number;
  participantCnt?: number;
  participantFirstCnt?: number;
  awardCnt?: number;
  firstTaskNum?: number;
  firstTaskAward?: number;
  registerDoCnt?: number;
  payDoCnt?: number;
  allTaskFinishNum?: number;
  finishCnt?: number;
  otherTaskFinishNum?: number;
  otherTaskAwardCnt?: number;
  otherTaskAwardNum?: number;
}

//裂变---查询参数
export interface FissionParams extends PageParam {
  startDay?: string;
  endDay?: string;
}

// 3充值每日统计
export interface SysPayCount {
  id?: number;
  unit?: string;
  withdrawTimes?: number;
  channelType?: string;
  createTime?: number;
  daykey?: number;
  payAmount?: number;
  payTimes?: number;
  ukey?: string;
  withdrawAmount?: number;
}

// 3充值每日统计---查询参数
export interface SysPayCountParams extends PageParam {
  daykey?: string;
  channelType?: string;
}

// 4每日【游戏】总计
export interface GameGoldDayReports {
  id?: number;
  daykey?: number;
  ukey?: string;
  gameId?: number;
  gameName?: string;
  limitTag?: number;
  totalBet?: number;
  totalWin?: number;
  totalResult?: number;
  betNum?: number;
  winNum?: number;
  rollNum?: number;
  personNum?: number;
  createBy?: string | null;
  createTime?: string | null;
  updateBy?: string | null;
  updateTime?: string | null;
}

// 4每日【游戏】总计---查询参数
export interface GameGoldDayReportsParams extends PageParam {
  sid?: string | number;
  gameId?: number;
  sortName?: string;
  startDay?: string;
  endDay?: string;
  type?: number;
}

export interface GameGoldDayReportsEcharts {
  daykey?: number;
  gameId?: number;
  gameName?: string;
  sid?: string;
  id?: number;
  rtp?: number;
  rtp0?: number;
  rtp1?: number;
  rtp2?: number;
  rtp3?: number;
  time?: number | null;
  totalBet?: number;
  totalBet0?: number;
  totalBet1?: number;
  totalBet2?: number;
  totalBet3?: number;
  totalResult?: number;
  totalResult0?: number;
  totalResult1?: number;
  totalResult2?: number;
  totalResult3?: number;
  totalWin?: number;
  totalWin0?: number;
  totalWin1?: number;
  totalWin2?: number;
  totalWin3?: number;
}

// 每月
export interface GameGoldMonthReports {
  id?: number;
  daykey?: number;
  ukey?: string;
  gameId?: number;
  gameName?: string;
  limitTag?: number;
  totalBet?: number;
  totalWin?: number;
  totalResult?: number;
  betNum?: number;
  winNum?: number;
  rollNum?: number;
  personNum?: number;
  createBy?: string | null;
  createTime?: string | null;
  updateBy?: string | null;
  updateTime?: string | null;
}

// 每月
export interface GameGoldMonthReportsParams extends PageParam {
  sid?: string;
  gameId?: number;
  sortName?: string;
  startDay?: string;
  endDay?: string;
  type?: number;
}

// 5用户【游戏】总计
export interface UserGoldTotalReport {
  betNum?: number;
  rollNum?: number;
  totalBet?: number;
  totalResult?: number;
  totalWin?: number;
  uid?: number;
  winNum?: number;
  games?: string;
}

// 5用户【游戏】总计---查询参数
export interface UserGoldTotalReportParams extends PageParam {
  uid?: number;
}

// 6用户每日金币
export interface UserGoldDayReport {
  id?: number;
  uid?: number;
  daykey?: string;
  ukey?: string;
  totalBet?: number;
  totalWin?: number;
  totalResult?: number;
  betNum?: number;
  winNum?: number;
  rollNum?: number;
  regTime?: number;
  games?: {};
}

// 6用户每日金币---查询参数
export interface UserGoldDayReportParams extends PageParam {
  uid?: number;
  lotteryType?: number;
  sortName?: string;
  startDay?: string;
  endDay?: string;
}

// 6详情
export interface UserGameGoldDayReport {
  id?: number;
  uid?: number;
  daykey?: string;
  ukey?: string;
  totalBet?: number;
  totalWin?: number;
  totalResult?: number;
  betNum?: number;
  winNum?: number;
  rollNum?: number;
  regTime?: number;
  gameId?: number;
  gameName?: string;
  limitTag?: number;
  change?: boolean;
}

export interface UserGameGoldDayReportParams extends PageParam {
  uid?: number;
  gameName?: string;
  limitTag?: number;
  daykey?: number;
}

// 1全局统计
export interface GameTotalGoldReport {
  uid?: number; // 可选属性
  betNum?: number;
  change?: boolean;
  gameId?: number;
  gameName?: string;
  id?: number;
  limitTag?: number;
  rollNum?: number;
  totalBet?: number;
  totalResult?: number;
  totalWin?: number;
  ukey?: string;
  winNum?: number;
}

// 1全局统计---查询参数
export interface GameTotalGoldReportParams extends PageParam {
  startTime?: string;
  endTime?: string;
  orderName?: string;
  sortName?: string;
  channelCode?: string;
  type?: number;
  channelType?: number;
}

// 游戏金币统计
export interface GameGoldReport {
  uid?: number; // 可选属性
  betNum?: number;
  sid?: number;
  gameId?: number;
  gameName?: string;
  id?: number;
  limitTag?: number;
  rollNum?: number;
  totalBet?: number;
  totalResult?: number;
  totalWin?: number;
  ukey?: string;
  winNum?: number;
}

// 游戏金币统计---查询参数
export interface GameGoldReportParams extends PageParam {
  type?: number;
  sid?: number;
  gameId?: number;
<<<<<<< HEAD
  startDay: number,
  endDay: number
=======
  startDay: '';
  endDay: '';
>>>>>>> 3c885444051e786b6cf1f030a1465a4f504eb272
}

//综合数据
export interface ComplexCount {
  /**daykey*/
  daykey?: number;
  /**ukey*/
  ukey?: string;
  /**类型*/
  type?: number;
  /**dnu*/
  dnu?: number;
  /**dau*/
  dau?: number;
  /**转化人数(初次充值)*/
  firstPay?: number;
  /**多次充值人数*/
  mutiPay?: number;
  /**总在线时长*/
  totalLineTimeLen?: number;
  /**平均在线时长*/
  avgLineTimeLen?: number;
  /**登录次数*/
  loginTimes?: number;
  /**次日留存*/
  num2?: number;
  /**3日留存*/
  num3?: number;
  /**7日数据*/
  num7?: number;
  /**15日留存*/
  num15?: number;
  /**30日留存*/
  num30?: number;
  /**下注人数*/
  betNum?: number;
  /**充值人数*/
  payNum?: number;
  /**充值金额*/
  payAmount?: number;
  /**提现人数*/
  withdrawNum?: number;
  /**提现金额*/
  withdrawAmount?: number;
}

// 综合数据---查询参数
export interface ComplexCountParams extends PageParam {
  type?: number;
  disClient?: number;
  clientType?: string;
  startDay?: string;
  endDay?: string;
  startDate?: string;
  endDate?: string;
  sortName?: string;
  orderName?: string;
  gameId?: number;
}

//充值综合数据
export interface PayComplexCount {
  id?: number;
  daykey?: number;
  ukey?: string;
  channelCode?: string;
  clientType?: string;
  firstPayGold?: number;
  firstPayNum?: number;
  firstPayTimes?: number;
  payGold?: number;
  payNum?: number;
  payTimes?: number;
  firstTransGold?: number;
  firstTransNum?: number;
  firstTransTimes?: number;
  transGold?: number;
  transNum?: number;
  transTimes?: number;
  firstBankGold?: number;
  firstBankNum?: number;
  firstBankTimes?: number;
  bankGold?: number;
  bankNum?: number;
  bankTimes?: number;
  firstUsdtGold?: number;
  firstUsdtNum?: number;
  firstUsdtTimes?: number;
  usdtGold?: number;
  usdtNum?: number;
  usdtTimes?: number;
}

// 充值综合数据---查询参数
export interface PayComplexCountParams extends PageParam {
  type?: number;
  payType?: number;
  startDay?: string;
  endDay?: string;
  startDate?: string;
  endDate?: string;
  sortName?: string;
  orderName?: string;
}

export interface DownCountParams extends PageParam {
  id?: number;
  uid?: number;
  startDay?: string;
  endDay?: string;
}

export interface DownCount extends PageParam {
  id?: number;
  uid?: number;
  webNum?: number;
  daykey?: number;
  downNum?: number;
}

/**
 * 用户分布数据
 */
export interface AgentParam extends PageParam {
  /**  */
  startDay?: string;
  /**  */
  endDay?: string;
  /**  */
  uid?: number;
}

/**
 * 浏览器分布数据
 */
export interface Agent {
  id?: number;
  uid?: number;
  regNum?: number;
  ukey?: string;
  daykey?: number;
  totalBet?: number;
  totalWin?: number;
  totalResult?: number;
  betNum?: number;
  winNum?: number;
  pay?: number;
  rtp?: number;
  withdraw?: number;
  firstPay?: number;
  updateTime?: string;
}

export interface WithdrawCount {
  clientType?: number;
  uid?: number;
  payType?: number;
  /**  */
  startDay?: string;
  /**  */
  endDay?: string;
}

export interface WithdrawCountParams extends PageParam {
  clientType?: number;
  uid?: number;
  payType?: number;
  /**  */
  startDay?: string;
  /**  */
  endDay?: string;
}
