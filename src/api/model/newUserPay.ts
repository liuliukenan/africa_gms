import { PageParam } from '@/api/model';


/**
 * VIP
 */
export interface NewUserPay {
     list: [],
     firstDayWaterRepairMul: number
}
export interface Items {
     amount: 0,
     rate: 0,
     waterMul: 0,
     maxAmount: 0
}
export interface NewUserPayList {
     times: number,
     Items: []
}


/**
 * VIP查询条件
 */
export interface NewUserPayParam extends PageParam {
     /**vip等级*/
     vipId?: number;
     /**充值金额*/
     payAmount?: number;
     /**升级礼包*/
     upAmount?: number;
     /**升级所需流水*/
     upWaterFlow?: number;
     /**每周奖励*/
     weekReward?: number;
     /**每周奖励所需流水*/
     weekWaterFlow?: number;
     /**每月奖励*/
     monthReward?: number;
     /**每月奖励流水*/
     monthWaterFlow?: number;
     /**抽现手续折扣*/
     withdrawDiscount?: number;
}

