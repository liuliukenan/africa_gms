import { PageParam } from '@/api/model';

/**
 * 搜索热门游戏配置
 */
export interface GameHots {
  /**id*/
  id?: number;
  countryCode?: number;
  gameId?: number;
  gameName?: string;
  createBy?: number;
  /**排序*/
  sortNumber?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 搜索热门游戏配置查询条件
 */
export interface GameHotsParam extends PageParam {
  /**用户ID*/
  gameId?: number;
  gameName?: string;
}
