import { PageParam } from '@/api/model/index';


/**
 * 礼包卡记录
 */
export interface GiftCardRecord {
 /**主键ID*/
 id? : number;
 /**关联系列ID*/
 serieId? : number;
 /**关联节点ID*/
 nodeId? : number;
 /**唯一卡号, code_prefix + 12位随机码, 全局唯一*/
 cardCode? : string;
 /**核销发放金额(冗余系列面额)*/
 amount? : number;
 /**核销使用人UID*/
 userId? : number;
 /**卡状态: 0=待使用, 1=已核销, 2=已作废*/
 status? : number;
 /**核销时间*/
 useTime? : string;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 礼包卡记录查询条件
 */
export interface GiftCardRecordParam extends PageParam {
     /**主键ID*/
     id? : number;
     /**关联系列ID*/
     serieId? : number;
     /**关联节点ID*/
     nodeId? : number;
     /**唯一卡号, code_prefix + 12位随机码, 全局唯一*/
     cardCode? : string;
     /**核销发放金额(冗余系列面额)*/
     amount? : number;
     /**核销使用人UID*/
     userId? : number;
     /**卡状态: 0=待使用, 1=已核销, 2=已作废*/
     status? : number;
}

