import { PageParam } from '@/api/model';


/**
 * 合伙人利润表
 */
export interface AgentProfit {
 /**主键*/
 id? : number;
 /**ukey*/
 ukey? : string;
 /**用户ID*/
 uid? : number;
 /**日期*/
 daykey? : number;
 /**充值次数*/
 payTimes? : number;
 /**充值人数*/
 payNums? : number;
 /**充值金额*/
 payAmount? : number;
 /**提现人数*/
 withdrawNums? : number;
 /**提现次数*/
 withdrawTimes? : number;
 endDay? : number;
 startDay? : number;
 /**提现金额*/
 withdrawAmount? : number;
 /**上一日净利*/
 lastDayProfit? : number;
 /**发放状态*/
 status? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 合伙人利润表查询条件
 */
export interface AgentProfitParam extends PageParam {
     /**主键*/
     id? : number;
     /**ukey*/
     ukey? : string;
     /**用户ID*/
     uid? : number;
     /**日期*/
     daykey? : number;
     /**充值次数*/
     payTimes? : number;
     /**充值人数*/
     payNums? : number;
     /**充值金额*/
     payAmount? : number;
     /**提现人数*/
     withdrawNums? : number;
     /**提现次数*/
     withdrawTimes? : number;
     /**提现金额*/
     withdrawAmount? : number;
     /**上一日净利*/
     lastDayProfit? : number;
     /**发放状态*/
     status? : number;
     startDay? : number|string;
     endDay? :  number|string;
}

