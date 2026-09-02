import { PageParam } from '@/api/model';

/**
 * 代理充值
 */
export interface PaymentWithdraw {
    statDate?: string;
    countryCode?: number;
    channel?: number;
    payChannel?: number;
    clientType?: number;
    agentId?: number;
    enumUserType?: string;
    paymentInitiateUserCount?: number;
    paymentInitiateOrderCount?: number;
    paymentSuccessUserCount?: number;
    paymentSuccessOrderCount?: number;
    paymentSuccessRate?: number;
    paymentSuccessAmount?: number;
    paymentSuccessAverageAmount?: number;
    withdrawInitiateUserCount?: number;
    withdrawInitiateOrderCount?: number;
    withdrawSuccessUserCount?: number;
    withdrawSuccessOrderCount?: number;
    withdrawSuccessRate?: number;
    withdrawSuccessAmount?: number;
    withdrawSuccessAverageAmount?: number;
    createTime?: string;
    updateTime?: string;
}



/**
 * 代理充值查询条件
 */
export interface PaymentWithdrawParam extends PageParam {
    countryCode?: number;
    channel?: number;
    channelType?: number;
    clientType?: number;
    agentId?: number;
    startDate?: string;
    endDate?: string;
    payChannel?: number;
    userType?: number;
}

