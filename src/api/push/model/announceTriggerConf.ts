import { PageParam } from '@/api/model';


/**
 * 跑马灯触发配置
 */
export interface AnnounceTriggerConf {
  /***/
  id?: number;
  /**触发类型：WIN_NORMAL/WIN_ADVANCED/WITHDRAW/INVITE*/
  triggerType?: number;
  /**最低倍数（WIN 类，与 min_win_amount AND 关系）*/
  minMultiplier?: number;
  /**倍数上限，机器人随机区间用（预留）*/
  maxMultiplier?: number;
  /**最低提款金额（WITHDRAW）*/
  minAmount?: number;
  maxAmount?: number;
  /**是否机器人专属配置*/
  isRobot?: boolean;

  /***/
  state?: boolean;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
  /**抽取权重*/
  weight?: number;
  /**说明*/
  description?: string;
}


/**
 * 跑马灯触发配置查询条件
 */
export interface AnnounceTriggerConfParam extends PageParam {
     /***/
     id? : number;
     /**触发类型：WIN_NORMAL/WIN_ADVANCED/WITHDRAW/INVITE*/
     triggerType? : number;
     /**是否机器人专属配置*/
     isRobot? : number;
     /**倍数上限，机器人随机区间用（预留）*/
     maxMultiplier? : number;
     /***/
     state? : number;
}

