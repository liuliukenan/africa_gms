import { PageParam } from '@/api/model';

export interface SearchParam extends PageParam {
    id?: number;
    sortName?: string;
    orderName?: string;
    statType?: number | string;
    countryCode?: number;
    channel?: number;
    agentId?: number;
    companyId?: number;
    factoryId?: number;
    currencyCode?: string;
    userType?: string | number;
    gameGroupId?: number;
    gameId?: number;
    factoryCode?: number;
    clientType?: number;
    uid?: number;
    startDate?: string;
    endDate?: string;
}

