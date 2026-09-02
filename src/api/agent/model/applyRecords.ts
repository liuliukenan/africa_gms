import { PageParam } from '@/api/model';


/**
 * 代理申请列表
 */
export interface ApplyRecords {
  id?: number;
  uid?: number;
  countryCode?: number;
  channel?: number;
  phone?: string;
  whatsApp?: string;
  agentType?: number;
  agentLevel?: number;
  inviterAgentType?: number;
  commissionModel?: string;
  oldCommissionModel?: string;
  parentId?: number;
  status?: number;
  createType?: number;
  handleRemark?: string;
  handleTime?: string;
  createTime?: string;
  lastUpdateTime?: string;
}
/**
 * 代理用户列表查询条件
 */
export interface ApplyRecordsParam extends PageParam {
    phone?: string;
    whatsApp?: string;
    startDate?: string;
    endDate?: string;
    status?: number;
}
