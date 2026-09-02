import { PageParam } from '@/api/model';


/**
 * 分享流水奖励
 */
export interface UserInviterRebeat {
 /**id*/
 id? : number;
 /**用户Id*/
 uid? : number;
 /**ukey*/
 ukey? : string;
 /**daykey*/
 daykey? : number;
 /**总下注*/
 totalBet? : number;
 /**返利人数*/
 totalNum? : number;
 /**总金额*/
 amount? : number;
 /**是否发送*/
 send? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 分享流水奖励查询条件
 */
export interface UserInviterRebeatParam extends PageParam {
     /**id*/
     id? : number;
     startDay? : number;
     endDay? : number;
     /**用户Id*/
     uid? : number;
     /**ukey*/
     ukey? : string;
     /**daykey*/
     daykey? : number;
     /**总下注*/
     totalBet? : number;
     /**返利人数*/
     totalNum? : number;
     /**总金额*/
     amount? : number;
     /**是否发送*/
     send? : string;
}

