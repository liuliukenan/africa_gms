/**
 * 字典数据
 */
export interface DictionaryData {
  /** 字典数据id */
  dictDataId?: number;
  /** 字典id */
  dictId?: number;
  /** 字典数据标识 */
  dictDataCode: string;
  /** 字典数据名称 */
  dictDataName: string;
  /** 排序号 */
  sortNumber?: number;
  /** 备注 */
  comments?: string;
  /** 创建时间 */
  createTime?: string;
  dictDataColor?: string;
}
