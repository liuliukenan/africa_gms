import type { SysUser } from '@/api/model/sysUser';

/**
 * 登录参数
 */
export interface LoginParam {
  /** 账号 */
  account?: string;
  /** 密码 */
  password?: string;
  /** 租户id */
  tenantId?: number;
  /** 是否记住密码 */
  remember?: boolean;
}

/**
 * 登录返回结果
 */
export interface LoginResult {
  /** token */
  token?: string;
  /** 用户信息 */
  user?: SysUser;
}

/**
 * 图形验证码返回结果
 */
export interface CaptchaResult {
  /** 图形验证码base64数据 */
  uuid: string;
  /** 验证码文本 */
  code: string;
  image: string;
}
