import { PageParam } from '@/api/model';

/**
 * 用户挂号记录
 */
export interface UserRegisterRecord {
  /**主键ID*/
  id?: number;
  /**订单号*/
  orderNo?: string;
  /**订单类型*/
  planName?: string;
  /**用户ID*/
  userId?: number;
  /**openid*/
  openid?: string;
  /**用户名*/
  username?: string;
  /**联系电话*/
  phone?: string;
  /**就诊地址*/
  address?: number;
  /**省*/
  province?: string;
  /**市*/
  city?: string;
  /**区*/
  district?: string;
  /**快递地址*/
  expressAddress?: string;
  /**支付金额*/
  payPrice?: number;
  /**订单状态 -1已取消 0待支付 1已完成*/
  status?: number;
  /**支付回调地址*/
  payNotifyUrl?: string;
  /**支付时间*/
  payTime?: string;
  /**取消时间*/
  cancelTime?: string;
  /**取消原因*/
  cancelReason?: string;
  /**微信支付订单号(分账时有效)|三方支付订单号*/
  transactionId?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 用户挂号记录查询条件
 */
export interface UserRegisterRecordParam extends PageParam {
  /**主键ID*/
  id?: number;
  planName?: string;
  /**用户名*/
  username?: string;
  /**联系电话*/
  phone?: string;
  /**就诊地址*/
  address?: number;
  /**订单状态 -1已取消 0待支付 1已完成*/
  status?: number;
}
