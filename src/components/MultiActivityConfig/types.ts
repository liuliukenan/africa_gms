/**
 * 多配置活动组件通用类型定义
 */

import type { RegisterBonusRequest, RewardGoods, ActSubConf } from '@/api/welfare/model/registerGive';

export type { RegisterBonusRequest, RewardGoods, ActSubConf };

export interface MultiActivityConfigProps {
    /** 页面标题 */
    title: string;
    /** 获取配置API */
    getApi: (countryCode: number) => Promise<any>;
    /** 保存配置API */
    saveApi: (params: RegisterBonusRequest) => Promise<string | undefined>;
    /** 发送配置到服务器API */
    sendApi: () => Promise<string | undefined>;
    /** 配置键名数组 */
    configKeys: string[];
    /** 配置标签映射 */
    configLabels: Record<string, string>;
    /** 活动类型（用于控制特定活动类型的字段显示） */
    actTypeEnum?: string;
}
