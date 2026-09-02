import { PageParam } from '@/api/model';


/**
 * VIP
 */
export interface Vip {
 /**vip等级*/
 vipId? : number;
 /**充值金额*/
 payAmount? : number;
 /**升级礼包*/
 upAmount? : number;
 /**升级所需流水*/
 upWaterFlow? : number;
 /**每周奖励*/
 weekReward? : number;
 /**每周奖励所需流水*/
 weekWaterFlow? : number;
 /**每月奖励*/
 monthReward? : number;
 /**每月奖励流水*/
 monthWaterFlow? : number;
 /**抽现手续折扣*/
 withdrawDiscount? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * VIP查询条件
 */
export interface VipParam extends PageParam {
     /**vip等级*/
     vipId? : number;
     /**充值金额*/
     payAmount? : number;
     /**升级礼包*/
     upAmount? : number;
     /**升级所需流水*/
     upWaterFlow? : number;
     /**每周奖励*/
     weekReward? : number;
     /**每周奖励所需流水*/
     weekWaterFlow? : number;
     /**每月奖励*/
     monthReward? : number;
     /**每月奖励流水*/
     monthWaterFlow? : number;
     /**抽现手续折扣*/
     withdrawDiscount? : number;
}

