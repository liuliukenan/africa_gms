import { PageParam } from '@/api/model';

/**
 * 代理提现订单
 */
export interface WithdrawRecord {
  id?: number;
  channel?: number;
  countryCode?: number;
  currency?: string;
  agentId?: number;
  inviterAgentId?: number;
  orderNo?: string;
  amount?: number;
  fee?: number;
  actualAmount?: number;
  uid?: number;
  status?: number;
  phone?: string;
  auditor?: string;
  remark?: string;
  reason?: string;
  createTime?: string;
  handleRemark?: string;
  auditTime?: string;
  approved?: boolean;
}

/**
 * 代理提现订单查询参数
 */
export interface WithdrawRecordParam extends PageParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  sortName?: string;
  orderName?: string;
  status?: number;
  agentId?: number;
  phone?: string;
  orderNo?: string;
  countryCode?: number;
  auditTime?: string;
  approved?: boolean;
}
