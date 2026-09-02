import { PageParam } from '@/api/model';


/**
 * 游戏记录
 */
export interface CompanyGameRecord {
 /**主键ID*/
 id? : number;
 /**玩家ID*/
 uid? : number;
 /**国家*/
 countryCode? : number;
 /**渠道*/
 channel? : number;
 /**代理*/
 agentId? : number;
 /**公司*/
 companyId? : number;
 /**厂商*/
 factoryCode? : string;
 /**游戏类型*/
 gameGroupId? : number;
 /**游戏ID*/
 gameId? : number;
 /**游戏名称*/
 gameName? : string;
 /**游戏局号*/
 gameRound? : string;
 /**唯一编号*/
 serialNumber? : string;
 /**投注金额*/
 betAmount? : number;
 /**返奖金额*/
 winAmount? : number;
 /**现金账户下注金额(分)*/
 cashBet? : number;
 /**品类账户下注金额(分)*/
 categoryBet? : number;
 /**游戏账户下注金额(分)*/
 gameBet? : number;
 /**现金账户赢取金额(分)*/
 cashWin? : number;
 /**品类账户赢取金额(分)*/
 categoryWin? : number;
 /**游戏账户赢取金额(分)*/
 gameWin? : number;
 /**触发旋转类型*/
 triggerSpinType? : number;
 /**触发订单号*/
 triggerOrderNo? : string;
 /**有效流水*/
 calcFlow? : number;
 /**投注时间*/
 recordTime? : string;
}



/**
 * 游戏记录查询条件
 */
export interface CompanyGameRecordParam extends PageParam {
     /**主键ID*/
     id? : number;
     /**玩家ID*/
     uid? : number;
     /**国家*/
     countryCode? : number;
     /**渠道*/
     channel? : number;
     /**代理*/
     agentId? : number;
     /**公司*/
     companyId? : number;
     /**厂商*/
     factoryCode? : string;
     /**游戏类型*/
     gameGroupId? : number;
     /**游戏ID*/
     gameId? : number;
     /**游戏名称*/
     gameName? : string;
     /**游戏局号*/
     gameRound? : string;
     phone? : string;
     /**唯一编号*/
     serialNumber? : string;
     /**投注金额*/
     betAmount? : number;
     /**返奖金额*/
     winAmount? : number;
     /**现金账户下注金额(分)*/
     cashBet? : number;
     /**品类账户下注金额(分)*/
     categoryBet? : number;
     /**游戏账户下注金额(分)*/
     gameBet? : number;
     /**现金账户赢取金额(分)*/
     cashWin? : number;
     /**品类账户赢取金额(分)*/
     categoryWin? : number;
     /**游戏账户赢取金额(分)*/
     gameWin? : number;
     /**触发旋转类型*/
     triggerSpinType? : number;
     /**触发订单号*/
     triggerOrderNo? : string;
     /**有效流水*/
     calcFlow? : number;
     /**投注时间*/
     recordTime? : string;
     startDate? : string;
     endDate? : string;
     /**导出数量限制*/
     exportLimit? : number;
}

