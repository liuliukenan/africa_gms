import { PageParam } from '@/api/model';


/**
 * 代理列表
 */
export interface AgentProfile {
 /***/
 id? : number;
 useVerification? : number;
 /**代理id*/
 agentId? : number;
 /**国家代码*/
 countryCode? : number;
 /**渠道*/
 channel? : number;
 /**总收益*/
 totalProfit? : number;
 /**总提现*/
 totalWithdraw? : number;
 status? : number;
 /**总推广人数*/
 inviterUserCount? : number;
 /**总推广代理数*/
 inviterAgentCount? : number;
 /**贡献*/
 totalContribution? : number;
 /**上级代理id*/
 inviterAgentId? : number;
 /**累计登录次数*/
 loginCount? : number;
 /**首次登录时间*/
 firstLoginTime? : string;
 /**首次登录IP*/
 firstLoginIp? : string;
 /**首次登录地理位置*/
 firstLoginAddress? : string;
 /**最后登录时间*/
 lastLoginTime? : string;
 /**最后登录IP*/
 lastLoginIp? : string;
 /**最后登录地理位置*/
 lastLoginAddress? : string;
 /**代理等级*/
 agentLevel? : number;
 /**代理类型: 1=总代理 2=普通代理 */
 agentType? : number;
 /**佣金模式 0=CPA 1=Revenue Share 2=Hybrid 3=Turnover*/
 commissionModel? : number;
 /**cpa返利*/
 profit0? : number;
 /**rs返利*/
 profit1? : number;
 /**hybrid返利*/
 profit2? : number;
 /**Turnover返利*/
 profit3? : number;
 /**cpa贡献*/
 contribution0? : number;
 /**rs贡献*/
 contribution1? : number;
 /**hybrid贡献*/
 contribution2? : number;
 /**Turnover贡献*/
 contribution3? : number;
 /**创建时间*/
  createTime? : string;
  /**更新时间*/
  updateTime? : string;
}



/**
 * 代理列表查询条件
 */
export interface AgentProfileParam extends PageParam {
     /***/
     id? : number;
     useVerification? : number;
     /**代理id*/
     agentId? : number;
     /**国家代码*/
     countryCode? : number;
     /**渠道*/
     channel? : number;
     /**总收益*/
     totalProfit? : number;
     /**总提现*/
     totalWithdraw? : number;
     /**总推广人数*/
     inviterUserCount? : number;
     /**总推广代理数*/
     inviterAgentCount? : number;
     /**贡献*/
     totalContribution? : number;
     /**上级代理id*/
     inviterAgentId? : number;
     /**累计登录次数*/
     loginCount? : number;
     /**首次登录IP*/
     firstLoginIp? : string;
     /**首次登录地理位置*/
     firstLoginAddress? : string;
     /**最后登录IP*/
     lastLoginIp? : string;
     /**最后登录地理位置*/
     lastLoginAddress? : string;
     startDate? : string;
     endDate? : string;
     /**代理等级*/
     agentLevel? : number;
     /**代理类型: 1=总代理 2=普通代理 */
     agentType? : number;
     /**佣金模式 0=CPA 1=Revenue Share 2=Hybrid 3=Turnover*/
     commissionModel? : number;
     /**cpa返利*/
     profit0? : number;
     /**rs返利*/
     profit1? : number;
     /**hybrid返利*/
     profit2? : number;
     /**Turnover返利*/
     profit3? : number;
     /**cpa贡献*/
     contribution0? : number;
     /**rs贡献*/
     contribution1? : number;
     /**hybrid贡献*/
     contribution2? : number;
     /**Turnover贡献*/
     contribution3? : number;
}

