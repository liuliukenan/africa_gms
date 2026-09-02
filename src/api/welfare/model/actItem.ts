import { PageParam } from '@/api/model';

/**
 * 活动列表VO
 */
export interface ActItemVO {
  /** id */
  id?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 类型 */
  type?: string;
  /** 显示名称 */
  name?: string;
  /** 跳转类型,可用值:0,1,2,3,4 */
  jumpType?: string;
  /** 跳转 */
  jumpId?: string;
  /** value */
  value?: Record<string, unknown>;
  /** jsonType */
  jsonType?: string;
  /** 发送范围 */
  userRange?: number;
  /** 触发类型 */
  triggerType?: number;
  /** 图片地址 */
  imgUrl?: string;
  /** 排序 */
  sortNumber?: number;
  /** 状态 */
  status?: boolean;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 显示开始时间 */
  showStartDate?: string;
  /** 显示结束时间 */
  showEndDate?: string;
  /** 创建人 */
  createBy?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新人 */
  updateBy?: number;
  /** 更新时间 */
  updateTime?: string;
  /** 描述 */
  description?: string;
}

/**
 * 活动列表查询条件
 */
export interface ActItemParam extends PageParam {
  /** id */
  id?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 类型 */
  type?: string;
  /** 显示名称 */
  name?: string;
  /** 状态 */
  status?: number;
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** 排序字段 */
  sortName?: string;
  /** 排序方向 */
  orderName?: string;
}
