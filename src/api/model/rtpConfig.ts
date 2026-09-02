import { PageParam } from '@/api/model/index';

/**
 * slots水池配置
 */
export interface RtpConfig {
  /***/
  gameId?: number;
  gameName?: string;
  blackWater?: number;
  /***/
  revenue?: number;
  /***/
  ctrlMulti?: number;
  /***/
  ctrlRevenue?: number;
  resetInterval: number;

  /***/
  //  awards? : string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  defaultWaterStr?: string;
  defaultWater?: string;
  awards?: ConfigAwards[];
}

export interface ConfigAwards {
  key?: string;
  baseCoins?: number;
  tickAdd?: number;
  minRate?: number;
  maxRate?: number;
  isEdit?: boolean;
}

/**
 * slots水池配置查询条件
 */
export interface RtpConfigParam extends PageParam {
  /***/
  gameId?: number;
  type?: number;
  /***/
  revenue?: number;
  /***/
  ctrlMulti?: number;
  /***/
  ctrlRevenue?: number;
  /***/
  awards?: string;
  gameName?: ConfigAwards[];
}
