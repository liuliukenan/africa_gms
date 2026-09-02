import { PageParam } from '@/api/model';


/**
 * 搜索关键字配置
 */
export interface GameKeywords {
 /**id*/
 id? : number;
 /**名称*/
 keyText? : string;
 /**排序ID*/
 sortNumber? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
  createBy? : string;
  updateBy? : string;
}



/**
 * 搜索关键字配置查询条件
 */
export interface GameKeywordsParam extends PageParam {
     /**id*/
     id? : number;
     /**名称*/
     keyText? : string;
     /**排序ID*/
     sortNumber? : number;
}

