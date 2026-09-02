import type { PageParam } from '@/api/model';

/**
 * 历史客服配置模型，保留给现有页面使用。
 */
export interface Kefu {
  id?: number;
  type?: number;
  url?: string;
  createTime?: string;
  updateTime?: string;
}

/**
 * 历史客服配置查询参数，保留给现有页面使用。
 */
export interface KefuParam extends PageParam {
  id?: number;
  type?: number;
  url?: string;
}

export interface KefuRecord {
  id?: number;
  showPosition: number;
  contact: string;
  url: string;
  state: number;
  invalid: number;
  invalidUser?: number;
  players: number;
  todayBindCount?: number;
  createTime?: string;
  updateTime?: string;
}

export interface KefuGuideParam extends PageParam {
  contact?: string;
  status?: number;
}

export interface KefuStats {
  totalCount: number;
  onlineCount: number;
  activePlayerCount: number;
  todayBindCount: number;
}

export interface KefuDisplayConf {
  jsonType: 'KefuDisplayConf';
  conditionType: number;
}

export interface KefuPlayerRecord {
  id: number;
  uid: number;
  phone?: string;
  kefuId: number;
  kefuContact: string;
  showPosition: number;
  bindTime?: string;
}

export interface KefuPlayerParam extends PageParam {
  uid?: number;
  kefuContact?: string;
}

export interface KefuBindUser {
  uid: number;
  phone?: string;
  bound: boolean;
}

export interface KefuBindParam {
  uid: number;
  kefuId: number;
}
