import { PageParam } from '@/api/model';


/**
 * 全局邮件
 */
export interface GlobalMail {
  /**id*/
  id?: number;
  /**类型(0所有人1.提定人)*/
  type?: number;
  /**指定国家*/
  countryCode?: number;
  /**模板ID*/
  mailConfId?: number;
  /**数量*/
  amount?: number;
  /**钱包模板*/
  exampleId?: number;
  /**附件类型*/
  annexType?: number;
  /**附件内容*/
  annexText?: string;
  /**邮件主题*/
  title?: string;
  /**内容*/
  content?: string;
  /**发件人名称*/
  fromName?: string;
  /**状态*/
  status?: number;
  /**流水倍数*/
  flowMutl?: number;
  /**开始时间*/
  startDate?: string;
  /**结束时间*/
  endDate?: string;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}



/**
 * 全局邮件查询条件
 */
export interface GlobalMailParam extends PageParam {
     /**id*/
     id? : number;
     /**类型(0所有人1.提定人)*/
     type? : number;
     /**指定国家*/
     countryCode? : number;
     /**邮件主题*/
     title? : string;
     /**内容*/
     content? : string;
     /**发件人名称*/
     fromName? : string;
     /**状态*/
     status? : number;
     /**数量*/
     amount? : number;
     /**流水倍数*/
     flowMutl? : number;
}

