/**
 * 活动配置组件通用类型定义
 */

import type { RegisterBonusRequest, RewardGoods, ActSubConf } from '@/api/welfare/model/registerGive';

export type { RegisterBonusRequest, RewardGoods, ActSubConf };

export interface ActivityConfigProps {
    /** 页面标题 */
    title: string;
    /** 获取配置API */
    getApi: (countryCode: number) => Promise<any>;
    /** 保存配置API */
    saveApi: (params: RegisterBonusRequest) => Promise<string | undefined>;
    /** 发送配置到服务器API */
    sendApi: () => Promise<string | undefined>;
    /** 活动类型枚举 */
    typeEnum?: string;
}
