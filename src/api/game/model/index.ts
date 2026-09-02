import { PageParam } from "@/api/model";

// 游戏服务
export interface GameServer {
  id?: number;
  name?: string;
  serverType?: number;
  addr?: string;
  port?: string;
  channelId?: number;
  state?: boolean;
}

// 渠道
export interface GameChannels {
  id?: number;
  name?: string;
  ip?: string;
  channelId?: number;
  token?: number | string;
  state?: boolean;
}

// 游戏配置
export interface GameConf {
  gameId?: number;
  haveDemo?: number;
  gameGroup?: number;
  flowCalcType?: number;
  flowSettleType?: number;
  flowSettleDelaySeconds?: number;
  factoryCode?: string;
  gameTag?: number;
  gameType?: number;
  name?: string;
  companyId?: number;
  muti?: string;
  rtp?: string;
  wave?: string;
  orgGameId?: string;
  token?: number | string;
  state?: number;
  hot?: number;
  note?: string;
  version?: string;
  sid?: number;
  tag?: number;
  direct?: number;
  icon?: string;
  iconType?: number;
  sortNumber?: number;
  en?: string;
}
export interface GameConfParam extends PageParam {
  gameId?: number;
  name?: string;
  orderName?: string;
  sortName?: string;
  sid?: number;
}
