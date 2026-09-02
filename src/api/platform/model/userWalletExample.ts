import { PageParam } from '@/api/model';


/**
 * 钱包模板
 */
export interface UserWalletExample {
 /**id*/
 id? : number;
 /**名称*/
 name? : string;
 /**公司ID*/
 companyId? : number;
 /**游戏分组*/
 gameGroupId? : number;
 /**游戏ID*/
 gameId? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
  iconUrl? : string;
}



/**
 * 钱包模板查询条件
 */
export interface UserWalletExampleParam extends PageParam {
     /**id*/
     id? : number;
     /**名称*/
     name? : string;
     /**公司ID*/
     companyId? : number;
     /**游戏分组*/
     gameGroupId? : number;
     /**游戏ID*/
     gameId? : number;
}

