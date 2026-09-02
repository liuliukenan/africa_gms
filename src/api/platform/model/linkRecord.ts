import { PageParam } from '@/api/model';

/**
 * 客服链接
 */
export interface LinkRecord {
  /***/
  id?: number;
  /***/
  type?: string;
  /***/
  name?: string;
  /***/
  address?: string;
  /***/
  totalCount?: number;
  /***/
  createAt?: string;
  /***/
  updateAt?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 客服链接查询条件
 */
export interface LinkRecordParam extends PageParam {
  /***/
  type?: string;
  /***/
  name?: string;
  /***/
  address?: string;
}
