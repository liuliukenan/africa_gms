import { PageParam } from '@/api/model';


/**
 * 三方游戏
 */
export interface CompanyGame {
 /**id*/
 id? : number;
 /**游戏 uid*/
 gameUid? : string;
 /**游戏名称*/
 gameName? : string;
 /**游戏类型*/
 gameType? : string;
 /**语言*/
 lang? : string;
 /**是否启用（0-否 ,1-是）*/
 status? : number;
 /**货币*/
 currency? : string;
 /**公司id*/
 companyId? : number;
 /**厂商code*/
 factoryCode? : string;
 /**原始信息*/
 jsonInfo? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 三方游戏查询条件
 */
export interface CompanyGameParam extends PageParam {
     /**id*/
     id? : number;
     gameGroup? : number;
     /**游戏 uid*/
     gameUid? : string;
     /**游戏名称*/
     gameName? : string;
     /**游戏类型*/
     gameType? : string;
     /**语言*/
     lang? : string;
     /**是否启用（0-否 ,1-是）*/
     status? : number;
     /**货币*/
     currency? : string;
     /**公司id*/
     companyId? : number;
     /**厂商code*/
     factoryCode? : string;
     /**原始信息*/
     jsonInfo? : string;
}

