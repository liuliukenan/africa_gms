import { PageParam } from '@/api/model';


/**
 * 国家代码
 */
export interface CountryCode {
 /**国家电话*/
 code? : number;
 id? : number;
 phoneLen? : number;
 /**国家名称*/
 name? : string;
 currency? : string;
 /**中文名*/
 note? : string;
 /**时区*/
 timezone? : string;
 /**启用0未用1启用*/
 state? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
  /**主钱包流水清理金额*/
  masterWalletCleanFlowAmount? : number;
  /**子钱包流水清理金额*/
  childWalletCleanFlowAmount? : number;
}



/**
 * 国家代码查询条件
 */
export interface CountryCodeParam extends PageParam {
     /**国家电话*/
     code? : number;
     /**国家名称*/
     name? : string;
     /**中文名*/
     note? : string;
     /**时区*/
     timezone? : string;
     /**启用0未用1启用*/
     state? : number;
}

