/**
 * 裂变查询参数
 */
export interface FissionParam {
  startDate?: string;
  endDate?: string;
  id?: number;
  qustType?: number;
  taskType?: number;
  rewardType?: number;
  sortName?: string;
  orderName?: string;
  preTask?: number;
}
// 裂变
export interface Fission {
  id?: number;
  taskRefer?: number;
  questNameCn?: string;
  questChineseCn?: string;
  questNameEn?: string;
  questChineseEn?: string;
  questNameTh?: string;
  questChineseTh?: string;
  questNameMy?: string;
  questChineseMy?: string;
  questNameIdn?: string;
  questChineseIdn?: string;
  questNameVn?: string;
  questChineseVn?: string;
  questNameMya?: string;
  questChineseMya?: string;
  qustType?: number;
  taskType?: number;
  needNum?: number;
  gameId?: number;
  isTogether?: number;
  preTask?: number;
  isReturn?: number;
  rewardType?: number;
  rewardNum?: number;
  createBy?: number;
  createTime?: string;
  updateBy?: number;
  updateTime?: string;
}