/**
 * 代理查询参数
 */
export interface AgentParam {
  uid?: number;
  startId?: number;
  num?: number;
  areaCode?: string;
}
// 代理list
export interface Agent {
  originalWeight?: number | undefined;
  isEdit?: boolean;
  uid?: number;
  weight?: number;
  startId?: number;
  num?: number;
  level?: number;
  rate?: number;
  areaCode?: string;
  pwd?: string;
  parterRate?: number;
  username?: string;
  nickname?: string;
  parterLevel?: number;
  whatapp?: string;
  phone?: string;
}
