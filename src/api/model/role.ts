import type { PageParam } from '@/api/model/index';
import { TreeKey } from 'element-plus/es/components/tree/src/tree.type.mjs';

/**
 * 角色
 */
export interface Role {
  /** 角色id */
  roleId?:string|number;
  userGroup?:number;
  /** 角色标识 */
  com?: string;
  /** 角色名称 */
  roleName?: string;
  admin?: string;
  hasSupper?: boolean;
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  creTime?: string;
  // 菜单id
  idGroup?: TreeKey[];
}

/**
 * 角色搜索条件
 */
export interface RoleParam extends PageParam {
  /** 角色名称 */
  roleName?: string;
  roleId?: string;
  userGroup?: number;
  /** 备注 */
  remark?: string;
  roleCode?: string;
}
