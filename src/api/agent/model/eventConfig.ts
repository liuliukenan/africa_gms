import { PageParam } from '@/api/model';

/**
 * 代理事件配置
 */
export interface AgentEventConfig {
  /** 主键 ID */
  id?: number;
  /** 事件类型 */
  eventType?: 'AGENT_CREATE' | 'AGENT_COMMISSION_SETTLE' | 'DIRECT_PLAYER_REGISTER' | 'DIRECT_PLAYER_FIRST_RECHARGE' | 'AGENT_WITHDRAW_APPLY' | 'AGENT_WITHDRAW_SUCCESS' | 'AGENT_LEVEL_UP' | 'AGENT_COMMISSION_MODE_CHANGE_APPLY' | 'AGENT_COMMISSION_MODE_CHANGE';
  /** 事件名称 */
  eventName?: string;
  /** 标题模板 */
  titleTemplate?: string;
  /** 补充内容模板 */
  supplementTemplate?: string;
  /** 标题参数描述 */
  titleParamDesc?: string;
  /** 补充参数描述 */
  supplementParamDesc?: string;
  /** 状态：1 启用 0 禁用 */
  status?: number;
  /** 排序 */
  sort?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 代理事件配置查询请求
 */
export interface AgentEventConfigQuery extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** 主键 ID */
  id?: number;
  /** 排序字段 */
  sortName?: string;
  /** 排序方式 */
  orderName?: string;
  /** 事件类型 */
  eventType?: 'AGENT_CREATE' | 'AGENT_COMMISSION_SETTLE' | 'DIRECT_PLAYER_REGISTER' | 'DIRECT_PLAYER_FIRST_RECHARGE' | 'AGENT_WITHDRAW_APPLY' | 'AGENT_WITHDRAW_SUCCESS' | 'AGENT_LEVEL_UP' | 'AGENT_COMMISSION_MODE_CHANGE_APPLY' | 'AGENT_COMMISSION_MODE_CHANGE';
  /** 事件名称（模糊匹配） */
  eventName?: string;
  /** 状态：1 启用 0 禁用 */
  status?: number;
}