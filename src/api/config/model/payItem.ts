import { PageParam } from '@/api/model';


export interface PayItem {
    id?: number;
    amount?: number;
    status?: number;
    remark?: string;
    createTime?: string;
    updateTime?: string;
}

export interface PayItemParam extends PageParam {
    id?: number;
    amount?: number;
    remark?: string;
    createTime?: string;
    updateTime?: string;
}

