/** VIP配置列表VO */
export interface VipConfigListVO {
  /** 主键ID */
  id: number;
  /** 国家代码 */
  countryCode: number;
  /** VIP等级 */
  level: number;
  /** VIP等级名称 */
  levelName: string;
  /** 升级需要的累计流水 */
  upgradeFlow: number;
  /** 排序值 */
  sortOrder: number;
  /** 状态：1=启用，0=禁用 */
  status: number;
  /** 奖励策略数量 */
  strategyCount: number;
  /** 更新时间 */
  updateTime: string;
  /** 更新人 */
  updateBy: number;
}

/** VIP配置列表查询参数 */
export interface VipConfigListParam {
  /** 国家代码 */
  countryCode?: number;
}
