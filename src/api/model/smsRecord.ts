import { PageParam } from '@/api/model/index';


/**
 * 短信记录
 */
export interface SmsRecord {
  /**id*/
  id?: number;
  /**类型*/
  type?: number;
  /**手机号*/
  phone?: string;

  fullPhone?: string;

  /**验证码*/
  code?: string;
  /**消息*/
  message?: string;
  /**状态*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}



/**
 * 短信记录查询条件
 */
export interface SmsRecordParam extends PageParam {
     /**id*/
     id? : number;
     countryCode? : number;
     /**类型*/
     type? : number;
     /**手机号*/
     phone? : string;
     /**验证码*/
     code? : string;
     /**消息*/
     message? : string;
     /**状态*/
     status? : number;
     /**开始时间*/
     startDate? : string;
     /**结束时间*/
     endDate? : string;
}

