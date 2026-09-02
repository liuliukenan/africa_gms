import { PageParam } from '@/api/model';


/**
 * 代理等级配置
 */
export interface AgentLevelConfig {
     /**主键ID*/
     id?: number;
     /**代理类型: 1=总代理 2=普通代理*/
     agentType?: number;
     /**代理等级*/
     agentLevel?: number;
     /**分润模式: 0=CPA 1=Revenue Share 2=Hybrid 3=Turnover*/
     commissionModel?: number;
     /**分润比例*/
     rate?: number;
     rate1?: number;
     /**需满足的升级条件个数，满足其中N条即可升级*/
     upgradeConditionCount?: number;
     /**[RS] 总付费人数阈值（仅普代直属下属），NULL=不启用*/
     rsTotalPaidUserCount?: number;
     /**[RS] 团队总GGR阈值（仅普代直属下属），NULL=不启用*/
     rsTotalGgr?: number;
     /**[RS] 结算周期内团队GGR阈值（仅普代直属下属），NULL=不启用*/
     rsCycleGgr?: number;
     /**[RS] 结算周期内新增付费用户阈值（仅普代直属下属），NULL=不启用*/
     rsCycleNewPaidUserCount?: number;
     /**[CPA] 总付费人数阈值（仅普代直属下属），NULL=不启用*/
     cpaTotalPaidUserCount?: number;
     /**[CPA] 总充值金额阈值（仅普代直属下属），NULL=不启用*/
     cpaTotalRechargeAmount?: number;
     /**[CPA] 周期内总充值金额阈值（仅普代直属下属），NULL=不启用*/
     cpaCycleRechargeAmount?: number;
     /**[CPA] 周期内新增付费用户阈值（仅普代直属下属），NULL=不启用*/
     cpaCycleNewPaidUserCount?: number;
     /**[MA] 总付费人数阈值（含直属+普代直属），NULL=不启用*/
     maTotalPaidUserCount?: number;
     /**[MA] 总充值金额阈值（含直属+普代直属），NULL=不启用*/
     maTotalRechargeAmount?: number;
     /**[MA] 结算周期内新增付费用户阈值（含直属+普代直属），NULL=不启用*/
     maCycleNewPaidUserCount?: number;
     /**[MA] 团队总GGR阈值（含直属+普代直属），NULL=不启用*/
     maTotalGgr?: number;
     /**[MA] 团队周期内GGR阈值（含直属+普代直属），NULL=不启用*/
     maCycleGgr?: number;
     /**创建时间*/
     createTime?: string;
     /**更新时间*/
     updateTime?: string;
}



/**
 * 代理等级配置查询条件
 */
export interface AgentLevelConfigParam extends PageParam {
     /**主键ID*/
     id?: number;
     /**代理类型: 1=总代理 2=普通代理*/
     agentType?: number;
     /**代理等级*/
     agentLevel?: number;
     /**分润模式: 0=CPA 1=Revenue Share 2=Hybrid 3=Turnover*/
     commissionModel?: number;
     /**分润比例*/
     rate?: number;
     /**需满足的升级条件个数，满足其中N条即可升级*/
     upgradeConditionCount?: number;
     /**[RS] 总付费人数阈值（仅普代直属下属），NULL=不启用*/
     rsTotalPaidUserCount?: number;
     /**[RS] 团队总GGR阈值（仅普代直属下属），NULL=不启用*/
     rsTotalGgr?: number;
     /**[RS] 结算周期内团队GGR阈值（仅普代直属下属），NULL=不启用*/
     rsCycleGgr?: number;
     /**[RS] 结算周期内新增付费用户阈值（仅普代直属下属），NULL=不启用*/
     rsCycleNewPaidUserCount?: number;
     /**[CPA] 总付费人数阈值（仅普代直属下属），NULL=不启用*/
     cpaTotalPaidUserCount?: number;
     /**[CPA] 总充值金额阈值（仅普代直属下属），NULL=不启用*/
     cpaTotalRechargeAmount?: number;
     /**[CPA] 周期内总充值金额阈值（仅普代直属下属），NULL=不启用*/
     cpaCycleRechargeAmount?: number;
     /**[CPA] 周期内新增付费用户阈值（仅普代直属下属），NULL=不启用*/
     cpaCycleNewPaidUserCount?: number;
     /**[MA] 总付费人数阈值（含直属+普代直属），NULL=不启用*/
     maTotalPaidUserCount?: number;
     /**[MA] 总充值金额阈值（含直属+普代直属），NULL=不启用*/
     maTotalRechargeAmount?: number;
     /**[MA] 结算周期内新增付费用户阈值（含直属+普代直属），NULL=不启用*/
     maCycleNewPaidUserCount?: number;
     /**[MA] 团队总GGR阈值（含直属+普代直属），NULL=不启用*/
     maTotalGgr?: number;
     /**[MA] 团队周期内GGR阈值（含直属+普代直属），NULL=不启用*/
     maCycleGgr?: number;
}
// 代理基础配置

export interface AgentCommissionConf {
     settlePeriod?: number;
     settlePeriodValue?: number;
     commissionItem?: CommissionItem;
}
interface CommissionItem {
     agentCommissionModel?: number;
     rechargeRate?: number;
     withdrawRate?: number;
     otherFee?: number;
     tripartiteRate?: number;
     welfareRate?: number;
}