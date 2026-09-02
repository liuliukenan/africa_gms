import { PageParam } from '@/api/model';


/**
 * VIP返利配置
 */
export interface VipRebate {
 /**level*/
 level? : number;
 /**电子*/
 slots? : number;
 /**桌面*/
 cards? : number;
 /**捕鱼*/
 fish? : number;
 /**真人*/
 live? : number;
 /**体育*/
 sports? : number;
 /**彩票*/
 lottery? : number;
 /**其它*/
 other? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * VIP返利配置查询条件
 */
export interface VipRebateParam extends PageParam {
     /**level*/
     level? : number;
     /**电子*/
     slots? : number;
     /**桌面*/
     cards? : number;
     /**捕鱼*/
     fish? : number;
     /**真人*/
     live? : number;
     /**体育*/
     sports? : number;
     /**彩票*/
     lottery? : number;
     /**其它*/
     other? : number;
}
//  VIP返利配置
export interface VipRebateConf{
     open?: boolean;
     waterFlow?: number;
     lastSendTime?: number;
     sendTime?: string;
}
