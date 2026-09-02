import { PageParam } from '@/api/model';


/**
 * 分享奖励表
 */
export interface UserInviterRecord {
 /**用户Id*/
 uid? : number;
 /**一级*/
 layer1? : number;
 /**二级*/
 layer2? : number;
 /**三级*/
 layer3? : number;
 /**注册时间*/
 regTime? : number;
 /**充值金额*/
 payAmount? : number;
 /**被邀请者奖励金额*/
 inviteeAmount? : number;
 /**邀请者奖励金额*/
 inviterAmount? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 分享奖励表查询条件
 */
export interface UserInviterRecordParam extends PageParam {
     /**用户Id*/
     uid? : number;
     startDay? : number;
     endDay? : number;
     /**一级*/
     layer1? : number;
     /**二级*/
     layer2? : number;
     /**三级*/
     layer3? : number;
     /**注册时间*/
     regTime? : number;
     /**充值金额*/
     payAmount? : number;
     /**被邀请者奖励金额*/
     inviteeAmount? : number;
     /**邀请者奖励金额*/
     inviterAmount? : number;
}

