import { PageParam } from '@/api/model';

/**
 * 充值留存
 */
export interface PaymentRetention {
    statDate?: string;
    countryCode?: number;
    channel?: number;
    clientType?: number;
    agentId?: number;
    userType?: string;
    userCount?: number;
    retention1d?: number;
    retention2d?: number;
    retention3d?: number;
    retention4d?: number;
    retention5d?: number;
    retention6d?: number;
    retention7d?: number;
    retention14d?: number;
    retention30d?: number;
    retention60d?: number;
    retention90d?: number;
}



/**
 * 充值留存查询条件
 */
export interface PaymentRetentionParam extends PageParam {
    countryCode?: number;
    channel?: number;
    channelType?: number;
    clientType?: number;
    agentId?: number;
    startDate?: string;
    endDate?: string;
    userType?: number;
}

