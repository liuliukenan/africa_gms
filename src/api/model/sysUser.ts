import type { PageParam } from '@/api/model/index';
/**
 * 用户
 */
export interface SysUser {
  /** 用户id */
  id?: number;
  /** 账号 */
  account?: string;
  /** 姓名 */
  realname?: string;
  // 代理人
  username?: string;
  /** 密码 */
  password?: string;
  /** 昵称 */
  userName?: string;
  /** 头像 */
  avatar?: string;

  /** 手机号 */
  phone?: string;
  // 登录次数
  loginCount?: number;
  /** 状态, 1开启 0关闭*/
  status?: number;
  isMask?: boolean;

  /** 是否启用谷歌验证码, 0不启用 1启用*/
  useVerification?: number;

  /** 角色列表 */
  userType?: '';

  /** 创建时间 */
  creTime?: string;
  authorities?: [];
  roles?: { idGroup: number[] };
  secretKey?: string;
  roleId?: number | undefined;
}

/**
 * 用户搜索条件
 */
export interface SysUserParam extends PageParam {
  account?: string;
  /** 姓名 */
  realname?: string;
  /** 手机号 */
  phone?: string;
  /** 状态 */
  status?: number;
  /** 账号 */
  username?: string;
}
