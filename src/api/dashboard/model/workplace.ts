import { PageParam } from "@/api/model";

/**
 * 基本数据
 */
export interface BaseData {
    activeUserCount?: number;
    newUserCount?: number;
    validActiveUserCount?: number;
    rechargeUserCount?: number;
    rechargeRate?: string;
    withdrawRate?: string;
    withdrawUserCount?: number;
    loseUserCount?: number;
    totalRechargeAmount?: number;
    avgRechargeAmount?: number;
    totalWithdrawAmount?: number;
    avgWithdrawAmount?: number;
    netRechargeAmount?: number;
    totalBetAmount?: number;
    totalRewardAmount?: number;
    ggr?: number;
    returnUserCount?: number;
}
// 留存数据
export interface RetentionData {
    d1RetentionRate?: string;
    d3RetentionRate?: string;
    d5RetentionRate?: string;
    d7RetentionRate?: string;
    d14RetentionRate?: string;
}
// 游戏数据
export interface GameData {
    companyId?: number;
    factoryCode?: string;
    gameGroupId?: number;
    gameGroupName?: string;
    gameId?: number;
    gameName?: string;
    betAmount?: number;
    rewardAmount?: number;
    rtp?: string;
}
export interface GameDataParam extends PageParam {
    countryCode?: number;
    type?: number;
    startDate?: string;
    endDate?: string;
}
/** 资金真实性数据 */
export interface DashboardFundVO {
    totalBetAmount?: number;
    totalRewardAmount?: number;
    cashBetAmount?: number;
    cashRewardAmount?: number;
    totalGgr?: number;
    cashGgr?: number;
    bonusGgr?: number;
    cashGgrRate?: string;
    bonusToCashAmount?: number;
    cashNgr?: number;
    withdrawAmount?: number;
    rechargeAmount?: number;
    realProfit?: number;
    platformNetCashFlow?: number;
    cashRetentionRate?: string;
}
/** Bonus健康数据 */
export interface DashboardBonusVO {
    bonusAmount?: number;
    bonusToCashAmount?: number;
    redemptionRate?: string;
    bonusRechargeRate?: string;
}
/** 资金安全异常数据 */
export interface DashboardFundRiskVO {
    withdrawGreaterRechargeUserCount?: number;
    zeroRechargeWithdrawUserCount?: number;
}
/** 用户转化数据 */
export interface DashboardUserConversionVO {
    newUserCount?: number;
    validNewUserCount?: number;
    newRechargeUserCount?: number;
    paymentConversionRate?: string;
    newRepeatRechargeRate?: string;
    newAverageRechargeAmount?: number;
    activeUserCount?: number;
    activeRechargeUserCount?: number;
    activeWithdrawUserCount?: number;
    activeRepeatRechargeRate?: string;
    averageRechargeAmount?: number;
    averageWithdrawAmount?: number;
}
/** 充提结构数据 */
export interface DashboardRechargeWithdrawVO {
    actualRechargeAmount?: number;
    withdrawAmount?: number;
    netRechargeAmount?: number;
    withdrawRechargeRate?: string;
    withdrawUserRechargeAmount?: number;
    withdrawUserCashRewardAmount?: number;
    withdrawUserBonusToCashAmount?: number;
    withdrawUserRechargeRate?: string;
    withdrawUserCashRewardRate?: string;
    withdrawUserBonusToCashRate?: string;
}