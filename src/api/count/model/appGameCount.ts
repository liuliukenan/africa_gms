import { PageParam } from '@/api/model';


/**
 * 冲提利润表
 */
export interface AppGameCount {
     /**时间*/
     daykey?: number;
     /**平台毛利*/
     totalResult?: number;
     /**充值金额*/
     payAmount?: number;
     /**充值人数*/
     payNum?: number;
     /**赠礼金额*/
     giftAmount?: number;
     /**赠礼数量*/
     giftNum?: number;
     /**提现金额*/
     withdrawAmount?: number;
     /**提现人数*/
     withdrawNum?: number;
     /**手续费*/
     duty?: number;
     /**电子*/
     slotsResult?: number;
     /**捕鱼*/
     fishResult?: number;
     /**真人*/
     liveResult?: number;
     /**棋牌*/
     cardResult?: number;
     /**运动*/
     sportsResult?: number;
     /**彩票*/
     lotteryResult?: number;
     /**其它*/
     otherResult?: number;
     /**开始余额*/
     startAmount?: number;
     /**结整余额*/
     overAmount?: number;
     /**创建时间*/
     createTime?: string;
     /**更新时间*/
     updateTime?: string;
}



/**
 * 冲提利润表查询条件
 */
export interface AppGameCountParam extends PageParam {
     /**时间*/
     daykey?: number;
     startDay?: string;
     endDay?: string;
     /**平台毛利*/
     totalResult?: number;
     /**充值金额*/
     payAmount?: number;
     /**充值人数*/
     payNum?: number;
     /**赠礼金额*/
     giftAmount?: number;
     /**赠礼数量*/
     giftNum?: number;
     /**提现金额*/
     withdrawAmount?: number;
     /**提现人数*/
     withdrawNum?: number;
     /**手续费*/
     duty?: number;
     /**电子*/
     slotsResult?: number;
     /**捕鱼*/
     fishResult?: number;
     /**真人*/
     liveResult?: number;
     /**棋牌*/
     cardResult?: number;
     /**运动*/
     sportsResult?: number;
     /**彩票*/
     lotteryResult?: number;
     /**其它*/
     otherResult?: number;
     /**开始余额*/
     startAmount?: number;
     /**结整余额*/
     overAmount?: number;
}

