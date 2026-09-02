import { PageParam } from '@/api/model';


/**
 * 代理充值
 */
export interface AgentPayCount {
 /**主键*/
 id? : number;
 /**代理id*/
 ukey? : number;
 /**日期*/
 daykey? : number;
 /**发送类型*/
 fromType? : number;
 /**接收类型*/
 toType? : number;
 /**金币金额*/
 goldAmount? : number;
 /**金币次数*/
 goldTimes? : number;
 /**钻石金额*/
 diamondAmount? : number;
 /**钻石次数*/
 diamondTimes? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 代理充值查询条件
 */
export interface AgentPayCountParam extends PageParam {
     /**主键*/
     id? : number;
     /**代理id*/
     ukey? : number;
     /**日期*/
     daykey? : number;
     /**发送类型*/
     fromType? : number;
     /**接收类型*/
     toType? : number;
     /**金币金额*/
     goldAmount? : number;
     /**金币次数*/
     goldTimes? : number;
     /**钻石金额*/
     diamondAmount? : number;
     /**钻石次数*/
     diamondTimes? : number;
}

