import { PageParam } from '@/api/model';

/**
 * 礼包卡节点
 */
export interface GiftCardNode {
  /**主键ID*/
  id?: number;
  /**关联系列ID*/
  serieId?: number;
  /**节点名称*/
  nodeName?: string;
  /**推广/渠道标识, 手动输入, 可重复*/
  nodeCode?: string;
  /**卡号前缀, 4位大写字母(排除易混字母)*/
  codePrefix?: string;
  /**计划生成卡号数量, 上限5000*/
  totalCount?: number;
  /**实际已生成卡号数量*/
  generatedCount?: number;
  /**已核销卡号数量*/
  usedCount?: number;
  /**已作废卡号数量*/
  voidCount?: number;
  /**生成状态: 0=待生成, 1=生成中, 2=成功, 3=失败*/
  generateStatus?: number;
  /**生成失败原因*/
  generateError?: string;
  /**节点状态: 0=停用, 1=启用*/
  status?: number;
  /**创建时间*/
  createTime?: string;
  /**更新时间*/
  updateTime?: string;
}

/**
 * 礼包卡节点查询条件
 */
export interface GiftCardNodeParam extends PageParam {
  /**关联系列ID*/
  serieId?: number;

  serieName?: string;
  /**节点名称*/
  nodeName?: string;
  /**推广/渠道标识, 手动输入, 可重复*/
  nodeCode?: string;

  /**节点状态: 0=停用, 1=启用*/
  status?: number;
}
