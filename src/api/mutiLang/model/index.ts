import { PageParam } from '@/api/model';
/**
 * 字典数据
 */
export interface MutiLang {
  msgKey?: string;
  content?: string;
  type?: number|string;
  /** 创建时间 */

  msgCode?: number|string;
  /** 创建时间 */
  createTime?: string;
  langType?: string;
}

/**
 * 字典数据搜索条件
 */
export interface MutiLangParam extends PageParam {
    type?: number|string;
    msgCode?: number|string;
}
