import { PageParam } from '@/api/model';

/**
 * 用户登录留存
 */
export interface LoginRetention {
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
}



/**
 * 用户登录留存查询条件
 */
export interface LoginRetentionParam extends PageParam {
    countryCode?: number;
    channel?: number;
    clientType?: number;
    agentId?: number;
    startDate?: string;
    endDate?: string;
    payChannel?: number;
    userType?: number;
}

