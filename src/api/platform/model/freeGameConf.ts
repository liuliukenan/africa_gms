import { PageParam } from '@/api/model';


/**
 * 免费游戏配置
 */
export interface FreeGameConf {
 /**id*/
 id? : number;
 /**名称*/
 name? : string;
 /**类型*/
 triggerSpinType? : number;
 /**游戏ID*/
 gameId? : number;
 /**金额*/
 amount? : number;
 /**下注索引*/
 base? : number;
 /**bet*/
 bet? : number;
 /**level*/
 /**rtpIndex*/
 rtpIndex? : number;
 level? : number;
 /**rtp信息*/
 controlSet? : [{
     start? : number;
     to? : number;
     rtp? : number;
 }];
 /**流水倍数*/
 flowMutl? : number;
 /**有效天数*/
 validDays? : number;
 /**钱包模板*/
 exampleId? : number;
 requiredFlow? : number;
 /**次数*/
 totalSpins? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 免费游戏配置查询条件
 */
export interface FreeGameConfParam extends PageParam {
     /**id*/
     id? : number;
     /**名称*/
     name? : string;
     /**类型*/
     triggerSpinType? : number;
     /**游戏ID*/
     gameId? : number;
     /**金额*/
     amount? : number;
     /**下注索引*/
     base? : number;
     /**level*/
     level? : number;
     /**rtp信息*/
     controlSet? : string;
     /**流水倍数*/
     flowMutl? : number;
     /**有效天数*/
     validDays? : number;
     /**钱包模板*/
     exampleId? : number;
     /**次数*/
     totalSpins? : number;
}

