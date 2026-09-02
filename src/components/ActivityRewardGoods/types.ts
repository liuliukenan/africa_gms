/**
 * 奖励物品表格组件类型定义
 */

import type { RewardGoods } from '@/api/welfare/model/registerGive';

export type { RewardGoods };

export interface ActivityRewardGoodsProps {
  /** 奖励物品列表数据（v-model绑定） */
  modelValue: RewardGoods[];
  /** 活动类型枚举（用于控制组件行为，如 'CASH_WHEEL'/'APK_LOGIN_BONUS'/'vipDailyRebate'） */
  actTypeEnum?: string;
  /** 活动类型标签（用于错误提示） */
  actTypeLabel?: string;
}

export interface ActivityRewardGoodsEmits {
  /** 数据变化事件 */
  (e: 'update:modelValue', value: RewardGoods[]): void;
}
