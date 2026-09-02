/**
 * 提现自动审核规则VO
 */
export interface WithdrawAutoAuditRuleVO {
  /** ID */
  id?: number;
  
  /** 用户类型：0=普通用户（非首充）, 1=首充用户（注册后首次充值） */
  userType?: number;
  
  /** 指标类型 */
  indicatorType?: string;
  
  /** 规则名称（显示名） */
  ruleName?: string;
  
  /** L1 下界（含），null 表示负无穷 */
  l1Min?: number;
  
  /** L1 上界（不含），null 表示正无穷 */
  l1Max?: number;
  
  /** L2 下界（含），null 表示负无穷 */
  l2Min?: number;
  
  /** L2 上界（不含），null 表示正无穷 */
  l2Max?: number;
  
  /** L3 下界（含），null 表示负无穷 */
  l3Min?: number;
  
  /** L3 上界（不含），null 表示正无穷 */
  l3Max?: number;
  
  /** 检测周期（天） */
  checkPeriodDays?: number;
  
  /** 是否启用 */
  enabled?: boolean;
  
  /** 排序（升序） */
  sort?: number;
  
  /** 备注说明 */
  remark?: string;
  
  /** 创建人ID */
  createBy?: number;
  
  /** 更新人ID */
  updateBy?: number;
  
  /** 创建时间 */
  createTime?: string;
  
  /** 更新时间 */
  updateTime?: string;
}

/**
 * 提现自动审核规则查询条件
 */
export interface WithdrawAutoAuditRuleParam {
  /** 用户类型 */
  userType?: number;
  
  /** 指标类型 */
  indicatorType?: string;
  
  /** 规则名称 */
  ruleName?: string;
  
  /** 是否启用 */
  enabled?: boolean;
}
