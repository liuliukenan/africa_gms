import { PageParam } from '@/api/model';


/**
 * 用户钱包记录
 */
export interface UserWalletRecord {
 /**id*/
 id? : number;
 /**用户ID*/
 uid? : number;
 /**uuid*/
 uuid? : number;
 /**操作类型*/
 type? : number;
 /**钱包ID*/
 walletId? : number;
 /**钱包名称*/
 walletName? : string;
 /**公司ID*/
 companyId? : number;
 /**游戏分组*/
 gameGroupId? : number;
 /**游戏ID*/
 gameId? : number;
 /**游戏名称*/
 gameName? : string;
 /**当前金额*/
 amount? : number;
 /**变化前*/
 beforeAmount? : number;
 /**变化后*/
 afterAmount? : number;
 /**订单号*/
 orderNo? : string;
 /**扩展信息*/
 extInfo? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 用户钱包记录查询条件
 */
export interface UserWalletRecordParam extends PageParam {
     /**id*/
     id? : number;
     /**用户ID*/
     uid? : number;
     /**uuid*/
     uuid? : number;
     countryCode? : number;
     /**操作类型*/
     type? : number;
     /**钱包ID*/
     walletId? : number;
     /**钱包名称*/
     walletName? : string;
     startDate? : string;
     endDate? : string;
     /**公司ID*/
     companyId? : number;
     /**游戏分组*/
     gameGroupId? : number;
     /**游戏ID*/
     gameId? : number;
     /**游戏名称*/
     gameName? : string;
     /**当前金额*/
     amount? : number;
     /**变化前*/
     beforeAmount? : number;
     /**变化后*/
     afterAmount? : number;
     /**订单号*/
     orderNo? : string;
     phone? : string;
     /**扩展信息*/
     extInfo? : string;
}

