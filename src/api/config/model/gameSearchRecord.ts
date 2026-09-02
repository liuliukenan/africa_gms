import { PageParam } from '@/api/model';


/**
 * 搜索查询记录
 */
export interface GameSearchRecord {
 /**id*/
 id? : number;
 /**游戏ID*/
 uid? : number;
 /**搜索内容*/
 keyText? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 搜索查询记录查询条件
 */
export interface GameSearchRecordParam extends PageParam {
     /**id*/
     id? : string;
     /**游戏ID*/
     uid? : string;
     /**搜索内容*/
     keyText? : string;
}

