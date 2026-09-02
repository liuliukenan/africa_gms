import { PageParam } from '@/api/model/index';


/**
 * 返水配置
 */
export interface Rakeback {
    id?: number;
    moneyType?: number;
    vip?: number;
    itemTable: ItemTable[]
}
export interface ItemTable {
    id?: number;
    gameType?: number;
    tableData?: RakebackTableData[]
}
export interface RakebackTableData {
    id?: number;
    gameChanel?: number;
    reback?: number;
    isEdit?:boolean;
}



/**
 * 返水配置查询条件
 */
export interface RakebackParam extends PageParam {

}

