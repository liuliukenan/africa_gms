import { PageParam } from '@/api/model';

/**
 * 客服链接统计
 */
export interface LinkStatDaily {
  /***/
  id?: number;
  /***/
  refId?: number;
  /***/
  refType?: string;
  /***/
  clickDate?: string;
  /***/
  count?: number;
  /***/
  createdAt?: string;
  address?: string;
  /***/
  updatedAt?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 客服链接统计查询条件
 */
export interface LinkStatDailyParam extends PageParam {
  /***/
  address?: number;
  /***/
  refType?: string;
}
