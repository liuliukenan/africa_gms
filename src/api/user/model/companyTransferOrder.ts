import { PageParam } from '@/api/model';


/**
 * 用户转账记录
 */
export interface CompanyTransferOrder {
 /**主键ID*/
 id? : number;
 /**玩家ID*/
 uid? : number;
 /**公司ID*/
 companyId? : number;
 /**游戏ID*/
 gameId? : number;
 /**游戏名称*/
 gameName? : string;
 /**转账类型: 1-转入(IN), 2-转出(OUT)*/
 transferType? : number;
 /**转账ID*/
 transferId? : string;
 /**转账状态: 0-创建, 1-成功, 2-失败, 3-手动成功, 500-未知异常*/
 status? : number;
 /**备注*/
 remark? : string;
 /**游戏UID(三方游戏id)*/
 gameUid? : string;
 /**三方变更金额*/
 creditAmount? : number;
 /**货币代码*/
 currencyCode? : string;
 /**语言*/
 language? : string;
 /**转账前三方余额*/
 beforeAmount? : number;
 /**转账后三方余额*/
 afterAmount? : number;
 /**主钱包金额*/
 cashAmount? : number;
 /**分类钱包金额*/
 categoryAmount? : number;
 /**游戏钱包金额*/
 gameAmount? : number;
 /**分类钱包ID*/
 categoryWalletId? : number;
 /**游戏钱包ID*/
 gameWalletId? : number;
 /**转账前主钱包余额*/
 beforeCashAmount? : number;
 /**转账前分类钱包余额*/
 beforeCategoryAmount? : number;
 /**转账前游戏钱包余额*/
 beforeGameAmount? : number;
 /**转账后主钱包余额*/
 afterCashAmount? : number;
 /**转账后分类钱包余额*/
 afterCategoryAmount? : number;
 /**转账后游戏钱包余额*/
 afterGameAmount? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 三方游戏退款VO
 */
export interface CompanyTransferOrderRefundVO {
  /**主键ID*/
  id?: number;
  /**退款备注*/
  remark?: string;
}

/**
 * 用户转账记录查询条件
 */
export interface CompanyTransferOrderParam extends PageParam {
     /**主键ID*/
     id? : number;
     /**玩家ID*/
     uid? : number;
     /**公司ID*/
     companyId? : number;
     countryCode? : number;
     /**游戏ID*/
     gameId? : number;
     /**游戏名称*/
     gameName? : string;
     /**转账类型: 1-转入(IN), 2-转出(OUT)*/
     transferType? : number;
     /**转账ID*/
     transferId? : string;
     phone? : string;
     /**转账状态: 0-创建, 1-成功, 2-失败, 3-手动成功, 500-未知异常*/
     status? : number;
     /**备注*/
     remark? : string;
     /**游戏UID(三方游戏id)*/
     gameUid? : string;
     /**三方变更金额*/
     creditAmount? : number;
     /**货币代码*/
     currencyCode? : string;
     /**语言*/
     language? : string;
     /**转账前三方余额*/
     beforeAmount? : number;
     /**转账后三方余额*/
     afterAmount? : number;
     /**主钱包金额*/
     cashAmount? : number;
     /**分类钱包金额*/
     categoryAmount? : number;
     /**游戏钱包金额*/
     gameAmount? : number;
     /**分类钱包ID*/
     categoryWalletId? : number;
     /**游戏钱包ID*/
     gameWalletId? : number;
     /**转账前主钱包余额*/
     beforeCashAmount? : number;
     /**转账前分类钱包余额*/
     beforeCategoryAmount? : number;
     /**转账前游戏钱包余额*/
     beforeGameAmount? : number;
     /**转账后主钱包余额*/
     afterCashAmount? : number;
     /**转账后分类钱包余额*/
     afterCategoryAmount? : number;
     /**转账后游戏钱包余额*/
     afterGameAmount? : number;
     startDate? : string;
     endDate? : string;
}

