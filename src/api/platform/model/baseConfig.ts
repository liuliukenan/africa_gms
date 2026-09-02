/**
 * 基础配置
 */
export interface BaseConf {
  jsonType?: string;
  defaultCountrtyCode?: string;
  rechargeFlowMultiple?: number;
  defaultLang?: string;
  itemMap?: Record<string, any>;
  flowCleanCheckSwitch?: boolean;
  flowCleanCheck?: number;
  flowCleanCheckDelayMinutes?: number;
  uploadUrl?: string;
  officialGameUrl?: string;
  planeGameUrl?: string;
  chickenRoadUrl?: string;
  domain?: string;
  shortDomain?: string;
  registerAmount?: number;
  childWalletTransferDelayTime?: number;
  deferRandomMinutes?: number;
  registerFlowMultiple?: number;
}
