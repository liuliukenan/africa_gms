import { PageParam } from '@/api/model/index';

/**
 * 提现
 */
export interface PayWithdraw {
  id?: number;
  uid?: number;
  orderNo?: string;
  transactionId?: string;
  currency?: string;
  amount?: number;
  fee?: number;
  payChannelId?: number;
  phone?: string;
  status?: string;
  createTime?: string;
  auditTime?: string;
  updateTime?: string;
  replayOrderNo?: string;
  refund?: boolean;
  simulate?: boolean;
  response?: any;
  callback?: any;
}
export interface SimulateParam {
  resultCode?: string;
  orderNo?: string;
  resultDesc?: string;
}
/**
 * 提现查询条件
 */
export interface PayWithdrawParam extends PageParam {
  id?: number;
  uid?: number;
  status?: string;
  phone?: string;
  sortName?: string;
  orderName?: string;
  transactionId?: string;
  startDate?: string;
  endDate?: string;
  replayOrderNo?: string;
  channelType?: number;


  orderNo?: string;
  approved?: boolean;
  refund?: boolean;
  reason?: string;
}
