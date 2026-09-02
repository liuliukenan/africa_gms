export interface ChannelStatQuery {
  page?: number;
  size?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  countryCode?: number;
  channel?: number;
  channelType?: number;
}

export interface ChannelStatVO {
  id: number;
  channel: number;
  channelName: string;
  channelCreateTime: string;
  topAgentCount: number;
  normalAgentCount: number;
  userCount: number;
  rechargeUserCount: number;
  rechargeAmount: number;
  withdrawUserCount: number;
  withdrawAmount: number;
  netRechargeAmount: number;
  profitRate: string;
}
