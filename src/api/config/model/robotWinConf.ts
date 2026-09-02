import { PageParam } from '@/api/model';

/**
 * 机器人中奖配置
 */
export interface RobotWinConf {
  /***/
  id?: number;
  /**游戏ID（关联 t_game_conf）*/
  gameId?: number;
  /**游戏名称（冗余，供模板 {game} 占位符）*/
  gameName?: string;
  /**抽取权重，数值越大被选中概率越高*/
  weight?: number;
  /**下注金额列表，JSON数组如[100,200,500]，使用时随机取一个*/
  betAmounts?: number[];
  /**启用/禁用*/
  state?: number;
  /**创建时间*/
  createTime?: string;
  betAmountsStr?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 机器人中奖配置查询条件
 */
export interface RobotWinConfParam extends PageParam {
  /**游戏ID（关联 t_game_conf）*/
  gameId?: number;
  /**游戏名称（冗余，供模板 {game} 占位符）*/
  gameName?: string;

  /**启用/禁用*/
  state?: number;
}
