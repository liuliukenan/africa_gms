import request from '@/utils/request';
import type {ApiResult, PageResult} from '@/api/model';
import type {Role, RoleParam} from '../model/role';
import type {Menu} from '../model/menu';

/**
 * 分页查询角色 不传参数就是查询所有列表数据
 */
export async function pageRoles(params?: RoleParam) {
  const res = await request.Post<ApiResult<PageResult<Role>>>(
    '/sysRole/list',
    params
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 查询角色列表
 */
// export async function listRoles(params?: RoleParam) {
//   const res = await request.Post<ApiResult<Role[]>>('/sysRole', params);
//   if (res.code === 0 && res.data) {
//     return res.data;
//   }
//   return Promise.reject(new Error(res.message));
// }

/**
 * 添加角色
 */
export async function addRole(data: Role) {
  const res = await request.Post<ApiResult<unknown>>('/sysRole', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改角色
 */
export async function updateRole(data: Role) {
  const res = await request.Put<ApiResult<unknown>>('/sysRole', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 删除角色
 */
export async function removeRole(roleId?: number | string) {
  const res = await request.Delete<ApiResult<unknown>>('/sysRole/' + roleId);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 批量删除角色
 */
export async function removeRoles(data: (number | string | undefined)[]) {
  const res = await request.Post<ApiResult<unknown>>('/sysRole/deleteBatch', data);
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 获取角色分配的菜单
 */
export async function listRoleMenus(roleId?: number|string) {
  const res = await request.Get<ApiResult<Menu[]>>(
    '/sysRole/listRoleMenus/'+ roleId
  );
  if (res.code === 0) {
    return res.data;
  }
  return Promise.reject(new Error(res.message));
}

/**
 * 修改角色菜单
 */
export async function updateRoleMenus(roleId?: number, data?: number[]) {
  const res = await request.Post<ApiResult<unknown>>(
    '/sysRole/saveRoleMenus/' + roleId,
    data
  );
  if (res.code === 0) {
    return res.message;
  }
  return Promise.reject(new Error(res.message));
}
