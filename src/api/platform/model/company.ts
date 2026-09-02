import { PageParam } from '@/api/model';


/**
 * 公司
 */
export interface Company {
  /**id*/
  id?: number;
  /**名称*/
  name?: string;
  companyId?: number;
  /**appkey*/
  appkey?: string;
  /**appsecrect*/
  appsecrect?: string;
  /**请求地址列表*/
  appUrl?: AppUrl[];
  /**用户前缀地址*/
  userPrefix?: number;
  /**附加信息*/
  exend?: string;
  exendJson?: Record<string, any>;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}
export interface AppUrl {
     url?: string;
     status?: number;
     key?: string;
     isEdit?: boolean;
}


/**
 * 公司查询条件
 */
export interface CompanyParam extends PageParam {
     /**id*/
     id?: number;

}

