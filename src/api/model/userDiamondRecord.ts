import { PageParam } from '@/api/model/index';

/**
 * 文章
 */
export interface UserDiamondRecord {
  /**用户ID*/
  articleId?: number;
  /**帐号*/
  title?: string;
  /**呢称*/
  content?: string;
  /**主图*/
  headImage?: string;
  /**标签*/
  tags?: string;
  /**浏览次数*/
  viewCount?: number;
  /**点赞次数*/
  likeCount?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 文章查询条件
 */
export interface UserDiamondRecordParam extends PageParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  tablePreName?: string;
  tableName?: string;
  uid?: number;
  type?: number;
  gameId?: number;
  gameName?: string;
  refer?: number;
  startDay?: number;
  endDay?: number;
}
