/**
 * 彩票查询参数
 */
export interface LotteryParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  issue?: number;
  lotteryType?: number;
}
// 彩票
export interface Lottery {
  id?: number;
  uid?: number;
  issue?: number;
  play_type?: string;
  hundreds?: any[];
  tens?: any[];
  units?: any[];
  group_numbers?: any[];
  bet_gold?: number;
  bet_num?: number;
  mul?: number;
  state?: number;
  buy_gold?: number;
  gold?: number;
  award_num?: string;
  pay_mul?: number;
  create_time?: string;
}
// 彩票配置
export interface LotteryConf {
  jsonType?: string;
  cancelMul?: number;
  issue?: number;
  buyCutOffTime?: number;
  buyCutOffTime2D?: number;
  awardCutOffTime?: number;
  maxMul2D?: number;
  now2DIssue?: number;
  cancelMul2D?: number;
  awardGroup2D?: number;
  awardDirectGold2D?: number;
  awardCutOffTime2D?: number;
  betGolds?: number[];
  betGolds2D?: number[];
  betGoldStr?: string;
  betGolds2DStr?: string;
  maxMul?: number;
  totalBet?: number;
  totalNum?: number;
  awardDirectGold?: number;
  awardGroup3Gold?: number;
  awardGroup6Gold?: number;
  result?: number;
  lotteryCutOffTime?: string;
  lottery2DIssueInfo?: string;
  
}
//用户每日彩票统计
export interface UserDayLotteryCountParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  daykey?: number;
  ukey?: string;
  channelType?: string;
  unit?: string;
}
// 用户每日彩票统计
export interface UserDayLotteryCount {
  id?: number;
  daykey?: number;
  ukey?: string;
  channelType?: string;
  unit?: string;
  payAmount?: number;
  withdrawAmount?: number;
  payTimes?: number;
  withdrawTimes?: number;
  createTime?: string;
}
// 每期彩票统计
export interface IssueLotteryCountParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  uid?: number;
  channelCode?: string;
  startDay?: string|number;
  endDay?: string|number;
  issue?: number;
  lotteryType?: number;
}
// 每期彩票统计
export interface IssueLotteryCount{
  totalBet?: number;
  totalPay?: number;
  totalBack?: number;
  directBet?: number;
  groupBet?: number;
  directPay?: number;
  groupPay?: number;
  change?: boolean;
  issue?: number;
  people_num?: number;
}
// 每期彩票统计
export interface OpenDate{
  state?: number;
  remark?: string;
  createBy?: string;
  updateBy?: string;
  createTime?: string;
  updateTime?: string;
  id?: number;
  daykey?: number;
  weekDay?: string;
}
export interface OpenDateParam{
  state?: number;
  month?: number;
  startDay?: string;
 endDay?: string;
  remark?: string;
  createBy?: string;
  updateBy?: string;
  createTime?: string;
  updateTime?: string;
}
