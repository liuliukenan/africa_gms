import { PageParam } from '@/api/model/index';

/**
 * 小喇叭查询条件
 */
export interface TrumpetParam extends PageParam {
  /**id*/
  id?: number;
  /**当前内容*/
  text?: string;

  /**设置次数*/
  times?: number;

  /**剩余次数*/
  residuetimes?: number;

  /**语言*/
  lan?: string;

  /**优先级*/
  priority?: number;

  /**代理id*/
  sivpuid?: number;

  /**类型*/
  type?: number;

  /**状态*/
  state?: number;
}

/**
 * 小喇叭
 */
export interface Trumpet {
  /**id*/
  id?: number;
  cancel?: number;
  /**当前内容*/
  text?: string;

  /**设置次数*/
  times?: number;

  /**剩余次数*/
  residueTimes?: number;

  /**语言*/
  lan?: string;

  /**优先级*/
  priority?: number;

  /**代理id*/
  sivpUid?: number;

  /**类型*/
  type?: number;

  /**状态*/
  state?: number;

  /**英语内容*/
  en?: string;

  /**泰语内容*/
  th?: string;

  /**印尼内容*/
  indon?: string;

  /**马来内容*/
  my?: string;
  /**缅甸内容*/
  mm?: string;
  uca?: string;
}
