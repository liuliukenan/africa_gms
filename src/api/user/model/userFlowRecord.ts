import { PageParam } from '@/api/model';


/**
 * 用户流水记录
 */
export interface UserFlowRecord {
 /**主键ID*/
 id? : number;
 /**用户ID*/
 uid? : number;
 /**公司ID，0表示主钱包*/
 companyId? : number;
 /**游戏分组ID，0表示主钱包*/
 gameGroupId? : number;
 /**游戏ID，0表示主钱包*/
 gameId? : number;
 /**需要流水*/
 requiredFlow? : number;
 /**剩余流水*/
 remainingFlow? : number;
 /**流水类型（对应MoneySourceEnum），数值越大优先级越高*/
 flowType? : number;
 /**状态 0=进行中 1=已完成*/
 status? : number;
 /**呢称*/
 nickname? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 用户流水记录查询条件
 */
export interface UserFlowRecordParam extends PageParam {
     countryCode? : number;
     /**主键ID*/
     id? : number;
     /**用户ID*/
     uid? : number;
     /**公司ID，0表示主钱包*/
     companyId? : number;
     /**游戏分组ID，0表示主钱包*/
     gameGroupId? : number;
     /**游戏ID，0表示主钱包*/
     gameId? : number;
     /**需要流水*/
     requiredFlow? : number;
     /**剩余流水*/
     remainingFlow? : number;
     /**流水类型（对应MoneySourceEnum），数值越大优先级越高*/
     flowType? : number;
     /**状态 0=进行中 1=已完成*/
     status? : number;
     /**呢称*/
     nickname? : string;
     endDate? : string;
     startDate? : string;
}

