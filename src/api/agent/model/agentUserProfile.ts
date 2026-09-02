import { PageParam } from '@/api/model';


/**
 * 代理用户列表
 */
export interface AgentUserProfile {
 /**主键ID*/
 id? : number;
 /**上级代理ID*/
 inviterAgentId? : number;
 /**玩家ID*/
 uid? : number;
 /**国家代码*/
 countryCode? : number;
 /**渠道*/
 channel? : number;
 /**累计投注金额*/
 totalBet? : number;
 /**累计赢利金额*/
 totalReward? : number;
 /**累计投注次数*/
 totalBetCnt? : number;
 /**累计获奖次数*/
 totalRewardCnt? : number;
 /**累计充值申请金额*/
 totalPayApplyAmount? : number;
 /**累计充值申请次数*/
 totalPayApplyCnt? : number;
 /**累计充值成功金额*/
 totalPaySuccessAmount? : number;
 /**累计充值成功次数*/
 totalPaySuccessCnt? : number;
 /**首次充值时间*/
 firstPayTime? : string;
 /**首次充值金额*/
 firstPayAmount? : number;
 /**最近充值时间*/
 lastPayTime? : string;
 /**最近充值金额*/
 lastPayAmount? : number;
 /**累计提现申请金额*/
 totalWithdrawApplyAmount? : number;
 /**累计提现申请次数*/
 totalWithdrawApplyCnt? : number;
 /**累计提现成功金额*/
 totalWithdrawSuccessAmount? : number;
 /**累计提现成功次数*/
 totalWithdrawSuccessCnt? : number;
 /**首次提现时间*/
 firstWithdrawTime? : string;
 /**首次提现金额*/
 firstWithdrawAmount? : number;
 /**最近提现时间*/
 lastWithdrawTime? : string;
 /**最近提现金额*/
 lastWithdrawAmount? : number;
 /**累计登录天数*/
 totalLoginDays? : number;
 /**首次游戏时间*/
 firstGameTime? : string;
 /**最近游戏时间*/
 lastGameTime? : string;
 /**首次登录时间*/
 firstLoginTime? : string;
 /**最近登录时间*/
 lastLoginTime? : string;
 /**绑定时间*/
 bindTime? : string;
 /**注册时间*/
 registerTime? : string;
 /**手机号*/
 phone? : string;
 /**贡献*/
 totalContribution? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 代理用户列表查询条件
 */
export interface AgentUserProfileParam extends PageParam {
     /**主键ID*/
     id? : number;
     /**上级代理ID*/
     inviterAgentId? : number;
     queryType? : number;
     /**玩家ID*/
     uid? : number;
     /**国家代码*/
     countryCode? : number;
     /**渠道*/
     channel? : number;
     /**累计投注金额*/
     totalBet? : number;
     /**累计赢利金额*/
     totalReward? : number;
     /**累计投注次数*/
     totalBetCnt? : number;
     /**累计获奖次数*/
     totalRewardCnt? : number;
     /**累计充值申请金额*/
     totalPayApplyAmount? : number;
     /**累计充值申请次数*/
     totalPayApplyCnt? : number;
     /**累计充值成功金额*/
     totalPaySuccessAmount? : number;
     /**累计充值成功次数*/
     totalPaySuccessCnt? : number;
     /**首次充值金额*/
     firstPayAmount? : number;
     /**最近充值金额*/
     lastPayAmount? : number;
     /**累计提现申请金额*/
     totalWithdrawApplyAmount? : number;
     /**累计提现申请次数*/
     totalWithdrawApplyCnt? : number;
     /**累计提现成功金额*/
     totalWithdrawSuccessAmount? : number;
     /**累计提现成功次数*/
     totalWithdrawSuccessCnt? : number;
     /**首次提现金额*/
     firstWithdrawAmount? : number;
     /**最近提现金额*/
     lastWithdrawAmount? : number;
     /**累计登录天数*/
     totalLoginDays? : number;
     /**手机号*/
     phone? : string;
     /**开始时间*/
     startDate? : string;
     /**结束时间*/
     endDate? : string;
     /**贡献*/
     totalContribution? : number;
}

