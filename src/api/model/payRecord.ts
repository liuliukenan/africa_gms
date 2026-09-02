import { PageParam } from '@/api/model/index';

/**
 * 充值记录
 */
export interface PayRecord {
  /**id*/
  id?: number;
  channel?: number;
  /**订单号*/
  orderNo?: string;
  /**用户ID*/
  uid?: number;
  /**充值渠道*/
  payChannelId?: number;
  /**充值项*/
  payItemId?: number;
  /**渠道类型*/
  channelType?: string;
  /**通知地址*/
  notifyUrl?: string;
  /**充值金额*/
  amount?: number;
  /***/
  gold?: number;
  /**实际金额*/
  actualPrice?: number;
  /**三方订单号*/
  transactionId?: string;
  /***/
  duty?: number;
  /***/
  simulate?: number;
  /**充值类型*/
  payact?: number;
  /**支付状态*/
  payStatus?: number;
  /**统计状态*/
  countStatus?: number;
  /**跳转地址*/
  jumpUrl?: string;
  /**过期时间*/
  overTime?: number;
  /**订单状态*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  response?: Record<any, any>;
  callback?: Record<any, any>;
  moneyType?: number;
}

/**
 * 充值记录查询条件
 */
export interface PayRecordParam extends PageParam {
  /**id*/
  id?: number;
  /**订单号*/
  orderNo?: string;
  phone?: string;
  moneyType?: number;
  /**用户ID*/
  uid?: number;
  /**充值渠道*/
  payChannelId?: number;
  /**充值项*/
  payItemId?: number;
  /**渠道类型*/
  channelType?: string;
  /**三方订单号*/
  transactionId?: string;
  startDate?: string;
  endDate?: string;
  /**支付状态*/
  payStatus?: number;
  /**统计状态*/
  countStatus?: number;
  /**订单状态*/
  status?: number;
}
