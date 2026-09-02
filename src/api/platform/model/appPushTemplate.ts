import { PageParam } from '@/api/model';

/**
 * APP Push推送模板
 */
export interface AppPushTemplateVO {
  /** 主键 ID */
  id?: number;
  /** 模板编码（业务唯一标识） */
  templateCode?: string;
  /** 模板名称（人工可读） */
  templateName?: string;
  /** 国家代码（如 254=肯尼亚），NULL表示通用模板 */
  countryCode?: number;
  /** 推送标题，占位符 {paramName} */
  title?: string;
  /** 推送内容，占位符 {paramName} */
  content?: string;
  /** 参数名称列表 */
  paramNames?: string[];
  /** 参数名称字符串（表单用） */
  paramNameStr?: string;
  /** 启用状态：0=禁用 1=启用 */
  status?: number;
  /** 创建人 */
  createBy?: number;
  /** 更新人 */
  updateBy?: number;
}

/**
 * APP Push推送模板查询条件
 */
export interface AppPushTemplateQuery extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  /** 模板编码 */
  templateCode?: string;
  /** 模板名称 */
  templateName?: string;
  /** 国家代码 */
  countryCode?: number;
  /** 启用状态：0=禁用 1=启用 */
  status?: number;
}
