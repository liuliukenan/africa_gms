import { PageParam } from '@/api/model';

/**
 * 通用流水记录VO
 */
export interface CommonFlowRecordVO {
  /** 主键ID */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 用户昵称 */
  nickname?: string;
  /** 公司ID，0表示主钱包 */
  companyId?: number;
  /** 游戏分组ID，0表示主钱包 */
  gameGroupId?: number;
  /** 游戏ID，0表示主钱包 */
  gameId?: number;
  /** 变更金额 */
  initAmount?: number;
  /** 流水倍数 */
  flowMultiple?: number;
  /** 需要流水 */
  requiredFlow?: number;
  /** 剩余流水 */
  remainingFlow?: number;
  /** 流水类型（使用字典 flow_type_common） */
  flowType?: string;
  /** 状态 0=进行中 1=已完成 */
  status?: number;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
  /** 备注 */
  remark?: string;
  /** 国家 */
  countryCode?: number;
  /** 锁定金额 */
  lockAmount?: number;
  /** 业务关联ID */
  businessId?: string;
  /** 提现扣除标识 true=已扣除 false=正常 */
  withdrawDeducted?: boolean;
}

/**
 * 通用流水记录查询条件
 */
export interface CommonFlowRecordParam extends PageParam {
  /** 主键ID */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 查询类型 0=cash 1=company 2=group 3=game */
  queryType?: number;
  /** 流水类型列表 */
  flowType?: number[];
  /** 状态 0=进行中 1=已完成 2=已关闭 */
  status?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  sortName?: string;
  orderName?: string;
}
