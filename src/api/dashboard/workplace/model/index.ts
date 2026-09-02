/**
 *今日
 */

export interface Data {
  day: number;
  today: Today;
  total: Total;
}

export interface Today {
  day?: number;
  daykey?: number;
  dnu?: number;
  onlineAvg?: number;
  onlineCurr?: number;
  onlineMax?: number;
  onlineNum?: number;
  onlineTimes?: number;
  pay?: number;
  rtp?: number;
  totalBet?: number;
  totalResult?: number;
  totalWin?: number;
  totalWithdraw?: number;
  total?: number;
  createTime?: string;
}

export interface Total {
  createTime?: string;
  daykey: number;
  dnu: number;
  onlineAvg: number;
  onlineCurr: number;
  onlineMax: number;
  onlineNum: number;
  onlineTimes: number;
  pay: number;
  rtp: number;
  totalBet: number;
  totalResult: number;
  totalWin: number;
  totalWithdraw: number;
}
