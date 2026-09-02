import { PageParam } from '@/api/model/index';

export interface GameVerItem {
  jsonType: string;
  packageUrl: string;
  remoteManifestUrl: string;
  remoteVersionUrl: string;
  version: string;
  sourceUrl: string;
  baseUrl: string;
  chatUrl: string;
  payTableUrl: string;
  lobbyUrl: string;
  slotsUrl: string;
  fishUrl: string;
  logUrl: string;
  rouletteUrl: string;
  serLangVersion: string;
}

/**
 * 游戏版本号
 */
export interface GameVersion {
  /**id*/
  id?: number;
  /**基础域名*/
  name: string;
  /**客户端类型*/
  clientType: number;
  /**测试类型*/
  type: number;
  /**信息*/
  gameVerItem: GameVerItem;
  /**状态0禁用1启用*/
  state: number;
  /**创建时间*/
  createTime: string;
  /**更新时间*/
  updateTime: string;
}

/**
 * 游戏版本号查询条件
 */
export interface GameVersionParam extends PageParam {
  /**id*/
  id?: number;
  /**基础域名*/
  name?: string;
  /**客户端类型*/
  clientType?: number;
}
