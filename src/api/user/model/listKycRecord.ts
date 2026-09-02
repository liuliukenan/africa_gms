import { PageParam } from '@/api/model';

/**
 * KYC审核请求参数
 */
export interface AuditUserKycDTO {
  /** KYC审核记录ID */
  id: number;
  /** 审核结果：1=通过，2=拒绝 */
  status: number;
  /** 审核备注 */
  handleRemark?: string;
}

/**
 * KYC审核记录VO
 */
export interface ListKycRecordVO {
  /** 审核记录ID */
  id?: number;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 真实姓名 */
  realName?: string;
  phone?: string;
  /** 证件号 */
  nationalId?: string;
  /** 身份证正面照片地址 */
  idCardFrontUrl?: string;
  /** 身份证背面照片地址 */
  idCardBackUrl?: string;
  /** 手持身份证自拍照片地址 */
  selfieUrl?: string;
  /** 是否确认已满18岁 */
  ageConfirmed?: boolean;
  /** 审核状态：0=待审核，1=通过，2=拒绝 */
  status?: string;
  /** 审核备注 */
  handleRemark?: string;
  /** 审核人ID */
  handleBy?: number;
  /** 审核时间 */
  handleTime?: string;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
}

/**
 * KYC审核记录查询条件
 */
export interface ListKycRecordParam extends PageParam {
  /** 开始时间，格式：yyyy-MM-dd */
  startDate?: string;
  /** 结束日期，格式：yyyy-MM-dd */
  endDate?: string;
  /** 记录ID */
  id?: number;
  /** 排序字段 */
  sortName?: string;
  /** 排序方式 */
  orderName?: string;
  /** 用户ID */
  uid?: number;
  /** 国家代码 */
  countryCode?: number;
  /** 真实姓名 */
  realName?: string;
  /** 证件号 */
  nationalId?: string;
  /** 审核状态：0=待审核，1=通过，2=拒绝 */
  status?: number;
  /** 审核人ID */
  handleBy?: number;
}
