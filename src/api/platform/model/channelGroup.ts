import { PageParam } from '@/api/model';

/**
 * 渠道分组VO
 */
export interface ChannelGroupVO {
  /** 分组ID */
  id?: number;
  countryCode?: number;
  /** 分组名称 */
  groupName?: string;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 渠道分组查询条件
 */
export interface ChannelGroupParam extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** ID */
  id?: number;
  /** 排序字段 */
  sortName?: string;
  /** 排序方向 */
  orderName?: string;
  /** 分组名称，支持模糊查询 */
  groupName?: string;
}

/**
 * 渠道分组保存参数
 */
export interface ChannelGroupDTO {
  /** 分组ID，新增时为空 */
  id?: number;
  /** 分组名称 */
  groupName: string;
  /** 备注 */
  remark?: string;
}
