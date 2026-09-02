// 基本配置
export interface PayChannel {
  channelId?: number;
  account?: string;
  secretKey?: string;
  channelType?: string;
  baseUrl?: string;
  notifyUrl?: string;
  hasAssignItem?: false;
  annex?: string;
  name?: string;
  status?: number;
  minPayLimit?: number;
  maxPayLimit?: number;
  minWithdrawLimit?: number;
  maxWithdrawLimit?: number;
  iconUrl?: string | null;
  withdrawFee?: number;
  rechargeFee?: number;
  withdrawDailyLimit?: number;
  identityVerificationThreshold?: number | null;
  withdrawCheckGameTransfers?: number | null;
  payMailConfId?: number;
  paySmsConfId?: number;
  payTipsConfId?: number;
  withdrawMailConfId?: number;
  withdrawSmsConfId?: number;
  withdrawTipsConfId?: number;
  withdrawFailMailConfId?: number | null;
  withdrawFailSmsConfId?: number | null;
  withdrawFailSmsMap?: Record<string, number>;
  withdrawFailTipsConfId?: number | null;
  withdrawAutoAuditMin?: number;
  withdrawAutoAuditMax?: number;
}
export interface PayChannelParams {
  channelId?: number;
  rechargeFee?: number;
  account?: string;
  secretKey?: string;
  channelType?: string;
  baseUrl?: string;
  notifyUrl?: string;
  hasAssignItem?: false;
  annex?: string;
  withdrawDailyAmountLimit?: number;
  name?: string;
  status?: number;
  minPayLimit?: number;
  maxPayLimit?: number;
  minWithdrawLimit?: number;
  maxWithdrawLimit?: number;
  withdrawAutoAuditMin?: number;
  withdrawAutoAuditMax?: number;
  withdrawFee?: number;
  withdrawDailyLimit?: number;
  identityVerificationThreshold?: number;
  withdrawCheckGameTransfers?: number;
  payMailConfId?: number;
  payTipsConfId?: number;
  withdrawMailConfId?: number;
  withdrawTipsConfId?: number;
  withdrawSmsConfId?: number;
  paySmsConfId?: number;
  withdrawFailMailConfId?: number;
  withdrawFailSmsConfId?: number;
  withdrawFailSmsMap?: Record<string, number>;
  withdrawFailTipsConfId?: number;
}
export interface PayItem {
  id?:number;
  moneyType?: number;
  payChannelId?: number;
  channelType?: string;
  payFlatType?: number;
  jumpType?: number;
  payThirdItem?: string;
  unit?: string;
  amount?: number
  gold?: number;
  fix?: boolean;
  sortNumber?: number;
  hide?: boolean;
  remark?: string;
  createTime?: string
}

/** 支付渠道奖励配置更新参数 */
export interface UpdateRewardConfigParams {
  /** 渠道ID */
  id: number;
  /** 奖励配置 */
  rewardConfig: {
    jsonType: string;
    subActRewardConf: Record<string, import('@/api/welfare/model/registerGive').ActSubConf>;
  };
}
