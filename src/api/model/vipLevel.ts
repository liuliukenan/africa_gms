import { PageParam } from '@/api/model/index';
/**
 * 
 */
export interface VipLevel {
    /**id*/
    id?: number;
    /**基础域名*/
    name: string;
    /**客户端类型*/
    clientType: number;
    /**测试类型*/
    type: number;
    /**状态0禁用1启用*/
    state: number;
    /**创建时间*/
    createTime: string;
    /**更新时间*/
    updateTime: string;
  }
  
  /**
   *查询条件
   */
  export interface VipLevelParam extends PageParam {
    /**id*/
    id?: number;
    /**基础域名*/
    name?: string;
    /**客户端类型*/
    clientType?: number;
  }
  