import request from '@/utils/request';
import { PostTypeEnum, type ApiResult } from '@/api/model';
import type { SysUser } from '@/api/model/sysUser';
import type { UpdatePasswordParam } from './model';

/**
 * 获取当前登录用户的个人信息/菜单/权限/角色
 */
export async function getUserInfo(): Promise<SysUser> {
  const res = await request.Get<ApiResult<SysUser>>('auth/getInfo');
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
// 修改密码
export async function updatePassword(data: UpdatePasswordParam): Promise<string> {
  const res = await request.Post<ApiResult<unknown>>('/auth/password', data,{
    meta: {
      postType: PostTypeEnum.FORM
    }
  });
  if (res.code === 0) {
    return res.message ?? '修改成功';
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改当前登录用户的个人信息
 */
export async function updateUserInfo(data: SysUser): Promise<SysUser> {
  const res = await request.Put<ApiResult<SysUser>>('/auth/user', data);
  if (res.code === 0 && res.data) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}
