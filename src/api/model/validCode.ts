import { PageParam } from '@/api/model/index';


/**
 * 礼品码详情
 */
export interface ValidCode {
 /**序号*/
 id? : number;
 /**系列*/
 serieId? : number;
 /***/
 serieCode? : string;
 /**代码*/
 code? : string;
 /**钻石*/
 diamond? : number;
 /**金币*/
 gold? : number;
 /**用户*/
 userId? : number;
 /**推荐点*/
 point? : number;
 /***/
 status? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 礼品码详情查询条件
 */
export interface ValidCodeParam extends PageParam {
     /**序号*/
     id? : number;
     /**系列*/
     serieId? : number;
     /***/
     serieCode? : string;
     /**代码*/
     code? : string;
     /**钻石*/
     diamond? : number;
     /**金币*/
     gold? : number;
     /**用户*/
     userId? : number;
     /**推荐点*/
     point? : number;
     /***/
     status? : number;
}

