import { PageParam } from '@/api/model/index';

/**
 * 用户登录日志
 */
export interface UserLoginRecord {
  /**id*/
  id?: number;
  /**uid*/
  userId?: number;
  username?: string;
  /**ip*/
  ip?: string;
  os?: string;
  /**address*/
  address?: string;
  remark?: string;
  /**创建时间*/
  createTime?: string;
  apk?: boolean;
}

/**
 * 用户登录日志查询条件
 */
export interface UserLoginRecordParam extends PageParam {
   id?: number;
   countryCode?: number;
  sortName?: string;
  startDate?: string;
  endDate?: string;
  orderName?: string;
  uid?: number;
  ip?: string;
  deviceId?: string;
  phone?: string;
}
