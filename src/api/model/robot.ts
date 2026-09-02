import { PageParam } from '@/api/model';

/**
 * 机器人配置
 */
export interface Robot {
  /**id*/
  id: number;
  /**电话*/
  phone?: string;
  /**头像*/
  avatar?: string;
  /**默认头像*/
  defaultAvatar?: number;
  /**性别*/
  weight?: number;
  /**呢称*/
  nickname?: string;
  /**状态*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 机器人配置查询条件
 */
export interface RobotParam extends PageParam {
  /**电话*/
  phone?: string;
  /**呢称*/
  nickname?: string;
  /**状态*/
  status?: number;
}
