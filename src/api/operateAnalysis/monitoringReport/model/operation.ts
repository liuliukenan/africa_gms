import { PageParam } from '@/api/model';

/**
 * 代理充值
 */
export interface Operation {
    statDate?: string;
    statType?: number;
    statWeek?: number;
    statMonth?: number;
    countryCode?: number;
    channel?: number;
    clientType?: number;
    agentId?: number;
    newUsers?: number;
    newDevices?: number;
    newValidUsers?: number;
    promoRegistrations?: number;
    promoCost?: number;
    promoRegistrationCost?: number;
    shareFissionRegistrations?: number;
    activeUsers?: number;
    validActiveUsers?: number;
    payingActiveUsers?: number;
    oldActiveUsers?: number;
    newUserPaymentCount?: number;
    newUserPaymentAmount?: number;
    newUserPaymentRate?: number;
    newUserArpu?: number;
    newUserArppu?: number;
    newUserRepurchaseCount?: number;
    newUserRepurchaseRate?: number;
    firstPaymentUserCount?: number;
    firstPaymentAmount?: number;
    firstPaymentArppu?: number;
    activeUserPaymentCount?: number;
    activeUserPaymentAmount?: number;
    activeUserPaymentRate?: number;
    activeUserArpu?: number;
    activeUserArppu?: number;
    oldUserPaymentCount?: number;
    oldUserPaymentAmount?: number;
    oldUserPaymentRate?: number;
    oldUserArpu?: number;
    oldUserArppu?: number;
    oldUserRepurchaseCount?: number;
    oldUserRepurchaseRate?: number;
    withdrawCount?: number;
    withdrawAmount?: number;
    withdrawAverageAmount?: number;
    paymentWithdrawDiff?: number;
}



/**
 * 代理充值查询条件
 */
export interface OperationParam extends PageParam {
    countryCode?: number;
    channel?: number;
    channelType?: number;
    clientType?: number;
    agentId?: number;
    startDate?: string;
    endDate?: string;
    status?: number;
}

