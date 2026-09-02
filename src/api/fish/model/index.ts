export interface ByBaseFish {
  appearSound?: undefined;
  claim?: [number, number];
  deathSound?: undefined;
  fishType?: number;
  group?: number;
  hitRate?: number;
  hurtSound?: undefined;
  impact?: number[];
  isTurn?: boolean;
  nickname?: string;
  showWeight?: number;
  speedRate?: number;
  updateBy?: undefined;
  updateTime?: undefined;
  fishLine?: string;
  claimStr: string;
  impactStr: string;
  fishLineStr: string;
}
export interface ByBuffConfig {
  id?: number;
  gameLevel?: number;
  isBoss?: number;
  weight?: number;
  buffRate?: number;
  top?: number;
  bottom?: number;
}
export interface ByGameConfig {
  id?: number;
  blackRatio?: number;
  whiteRatio?: number;
}
export interface ByRtpConfig {
  id?: number;
  gameLevel?: number;
  ctrlTop?: number;
  ctrlBottom?: number;
  ctrlMulti?: number;
}
export interface ByWaterPool {
  id?: number;
  channel?: number;
  currTotalBet?: number;
  currTotalPay?: number;
  currRtp?: number;
  currBetNums?: number;
  nextClearTime?: string;
  profitMoney?: number;
  totalBet?: number;
  totalPay?: number;
  betNums?: number;
  daykey?: number;
  todayTotalBet?: number;
  todayTotalPay?: number;
  todayProfitMoney?: number;
  todayBetNum?: number;
  updateTime?: string;
}
// 机器人配置
export interface ByRobotConfig {
  id?: number;
  bets?: number[];
  betsStr?: string;
  times?: number[];
  timesStr?: string;
  gold?: number[];
  goldStr?: string;
  lockProb?: number;
  leaveProb?: number;
  bulletBf?: number;
  lockType?: number;
  weight?: number;
  bulletProb?: number;
  autoProb?: number;
  waitProb?: number;

}
//机器人名称
export interface ByRobotName {
  id?: number;
  name?: string;
}
