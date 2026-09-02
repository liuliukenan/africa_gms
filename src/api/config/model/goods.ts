import { PageParam } from '@/api/model';

/**
 * 物品VO
 */
export interface GoodsVO {
  /** ID */
  id?: number;
  /** 类型,可用值:0,1,3,4 */
  type?: string;
  /** 钱包模板ID */
  walletExampleId?: number;
  /** 描述 */
  description?: string;
  /** 名称 */
  name?: string;
  /** 排序编号 */
  sortNumber?: number;
  /** 状态,可用值:0,1 */
  state?: string;
  /** 免费游戏模板ID */
  freeGameExampleId?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 物品查询条件
 */
export interface GoodsParam extends PageParam {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段 */
  sortName?: string;
  /** 排序方式 */
  orderName?: string;
  /** 类型,可用值:0,1,3,4 */
  type?: string;
  /** 名称 */
  name?: string;
  /** 状态,可用值:0,1 */
  status?: string;
}
