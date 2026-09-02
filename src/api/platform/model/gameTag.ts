import { PageParam } from '@/api/model';


/**
 * 游戏标签
 */
export interface GameTag {
     /**id*/
     id?: number;
     colNum?: number;
     rowNum?: number;
     tagId?: number;
     /**原游戏ID*/
     tagName?: string;
     /**游戏类型*/
     gameGroup?: number;
     /**排序*/
     sortNumber?: number;
     /**状态*/
     state?: number;
     /**真实人数比例*/
     realRate?: number;
     /**人数系数区间*/
     betaRates?: string[];
     betaRatesStr?: string;
     /**基础人数区间*/
     baseRates?: string[];
     baseRatesStr?: string;
     /**创建时间*/
     createTime?: string;
     /**更新时间*/
     updateTime?: string;
}



/**
 * 游戏标签查询条件
 */
export interface GameTagParam extends PageParam {
     /**id*/
     tagId?: number;
     /**原游戏ID*/
     tagName?: string;
     /**游戏类型*/
     gameGroup?: number;
     /**排序*/
     sortNumber?: number;
     /**状态*/
     state?: number;
     /**真实人数比例*/
     realRate?: number;
     /**人数系数区间*/
     betaRates?: string;
     /**基础人数区间*/
     baseRates?: string;
}

