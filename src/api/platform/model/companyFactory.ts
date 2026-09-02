import { PageParam } from '@/api/model';


/**
 * 三方厂商
 */
export interface CompanyFactory {
 /**id*/
 id? : number;
 /**供应商编码*/
 code? : string;
 /**供应商名称*/
 name? : string;
 /**货币*/
 currency? : string;
 /**语言*/
 lang? : string;
 /**三方返回的完整数据*/
 jsonInfo? : string;
 /**是否启用（0-否 ,1-是）*/
 status? : number;
 /**公司id*/
 companyId? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 三方厂商查询条件
 */
export interface CompanyFactoryParam extends PageParam {
     /**id*/
     id? : number;
     /**供应商编码*/
     code? : string;
     /**供应商名称*/
     name? : string;
     /**货币*/
     currency? : string;
     /**语言*/
     lang? : string;
     /**三方返回的完整数据*/
     jsonInfo? : string;
     /**是否启用（0-否 ,1-是）*/
     status? : number;
     /**公司id*/
     companyId? : number;
}

